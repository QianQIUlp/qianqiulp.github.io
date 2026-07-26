---
title: Hardening a New Linux Server, from Closing the Door to Keeping Watch
date: 2026-05-20
tags: [Security, Tech]
toc: true
description: A practical Linux server-hardening guide covering security groups, SSH, automatic updates, fail2ban, and a safe rollback path.
ogImage: ../../assets/posts/linux-security-setup/cover.webp
ogImageAlt: Cover image for a practical guide to hardening a new Linux server
license: CC BY-NC 4.0
---

<aside>
<h3>About this piece</h3>

This is the checklist I use when I receive a fresh Linux server. I organise the work into three passes: remove unsafe defaults, harden the actual SSH path, then add the quiet maintenance that keeps the machine from drifting back into a risky state. I explain why I make each change because copying commands without a rollback plan is how people lock themselves out.

<h3>Who it is for</h3>

- Someone setting up a personal VPS or single-user development server
- A reader who wants to understand layered protection rather than paste a hardening script
- Anyone who wants a useful baseline without turning server security into a new profession

<h3>How to read it</h3>

- For a first deployment, follow P0, P1, and P2 in order
- If you only need the essentials, complete P0 and P1 first
- If something breaks, start with the troubleshooting table
- For the reasoning behind the checklist, read “What I kept from this setup”

<h3>Copyright and note</h3>

This is a record of my own setup, not a universal production-security standard. Adapt it to your distribution, provider, users, and risk model—and keep responsibility for every command you run.

<h3>First publication and sharing</h3>

- First published on [Notion](https://www.notion.so/qianqiulp/3661d0b6482180aba964fea1389968f1)
- Licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/). Non-commercial sharing and adaptation are welcome with attribution and a link to the original.
</aside>

## Why I do this immediately

A cloud provider normally delivers a machine that is convenient to enter, not one tailored to my threat model. Root may be reachable, password login may still be enabled, SSH usually listens on port 22, and security updates may depend on me remembering them.

Public addresses are scanned continuously. I cannot make the address secret, but I can make the obvious entry points uninteresting. For a personal VPS, a few carefully verified changes go a long way.

This guide is for personal and learning environments. A multi-user production system, regulated workload, or organisation-wide fleet needs a more deliberate design.

## Why I work in three passes

| Pass | What I am fixing | The everyday analogy |
| --- | --- | --- |
| **P0** | Unsafe defaults that exist right now | Close the door |
| **P1** | Direct network and SSH exposure | Fit a better lock |
| **P2** | Future drift, missed patches, and noisy attacks | Keep watch |

P0 and P1 reduce what can happen today. P2 keeps a server that was secure on day one from becoming neglected six months later.

## Four rules before touching SSH

<aside>

- **Keep the current session open while testing a second one.** The old connection is your way back in.
- **Add before you remove.** Open the new port before closing the old port.
- **Verify every step.** Otherwise one mistake becomes the foundation for the next.
- **Change only what you need.** Every extra change is another variable when you troubleshoot.
</aside>

---

## P0 · Remove the unsafe defaults

### P0.1 Tighten the cloud security group

In the provider console, open the instance's inbound security-group rules. A fresh image may expose rules such as:

- `22/tcp` from `0.0.0.0/0`
- `3389/tcp` from `0.0.0.0/0`
- ICMP from anywhere

For a machine I access from one stable network, I restrict SSH to my current public IP. I remove RDP when the server is not Windows. ICMP can remain if I want it for basic diagnostics.

You can check your current public address with `curl ifconfig.me`. Remember that home addresses can change; an IP allow-list is only useful if I also know how to update it from the provider console.

### P0.2 Patch the machine

```bash
sudo apt update
sudo apt upgrade -y
```

A new instance can still be based on an image with old packages. I patch before installing anything else.

### P0.3 Create an ordinary user

```bash
adduser dev
usermod -aG sudo dev
```

Replace `dev` with the account name you actually want. Then verify the account before moving on:

```bash
su - dev
whoami
sudo -v
```

If `adduser` was accidentally suspended with `Ctrl+Z`, inspect and stop the suspended job, then set the password explicitly:

```bash
jobs
kill %1
passwd dev
```

---

## P1 · Harden the SSH path

### P1.1 Set up key authentication

Generate an Ed25519 key on the client that will initiate the connection:

```bash
ssh-keygen -t ed25519 -C "laptop-to-server"
```

I use a passphrase on personal devices. On the server, switch to the ordinary user and install only the public key:

```bash
su - dev
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

The `.ssh` directory and `authorized_keys` must belong to that user, not root. Open a **second** terminal and confirm that the ordinary user can log in with the key and run `sudo -v`. Do not close the original session yet.

### P1.2 Choose and open the new SSH port

A non-standard port is not a replacement for authentication, but it removes a great deal of generic port-22 noise. Choose an unused port between 10000 and 65535; this article uses `60022` only as an example.

```bash
sudo ss -tlnp | grep 60022
```

No output means nothing is currently listening there. Add `60022/tcp` to the cloud security group **before** removing port 22. Keep the old rule until the new path has been tested.

### P1.3 Change the SSH daemon configuration

```bash
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak
sudo nano /etc/ssh/sshd_config
```

Make the intended values explicit:

```text
Port 60022
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
```

Validate the syntax before restarting anything:

```bash
sudo sshd -t
```

No output means the configuration parsed successfully. Only disable password login after key login has already worked in a separate session.

### P1.4 Check Ubuntu socket activation

Recent Ubuntu releases may use `ssh.socket`, which can keep port 22 active even after `sshd_config` changes. Check the actual machine instead of assuming:

```bash
sudo systemctl status ssh.socket
sudo ss -tlnp | grep ssh
```

If socket activation is active and you want the service to follow `sshd_config`, switch to the service unit:

```bash
sudo systemctl disable --now ssh.socket
sudo systemctl enable --now ssh.service
```

Check the listening sockets again. If a stale daemon is still holding port 22, identify its PID before terminating it. Then test a new connection to port `60022` while the original session remains open.

### P1.5 Remove the old path only after testing

Once the ordinary user can reconnect reliably through the new port:

- Remove the old port-22 cloud rule
- Remove saved root/password profiles from the client
- Keep `sshd_config.bak` briefly while the new setup settles

At this point the important defaults have changed: the cloud firewall limits reachability, root and password login are disabled, and each client authenticates with its own key.

---

## P2 · Keep the server healthy

### P2.1 Confirm unattended security updates

```bash
sudo systemctl status unattended-upgrades
sudo cat /etc/apt/apt.conf.d/20auto-upgrades
```

I expect these values:

```text
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
```

If the feature is absent or disabled:

```bash
sudo dpkg-reconfigure -plow unattended-upgrades
```

And later I check that it is actually doing work:

```bash
sudo tail -20 /var/log/unattended-upgrades/unattended-upgrades.log
```

### P2.2 Decide whether fail2ban earns its place

With password authentication disabled, fail2ban adds less direct protection than many tutorials imply. I mainly value it for cleaner logs, reduced handshake noise, and a fallback if configuration drifts later.

```bash
sudo apt install fail2ban -y
sudo nano /etc/fail2ban/jail.local
```

```ini
[DEFAULT]
bantime  = 3600
findtime = 600
maxretry = 5
ignoreip = 127.0.0.1/8 ::1

[sshd]
enabled = true
port    = 60022
backend = systemd
```

```bash
sudo systemctl enable --now fail2ban
sudo fail2ban-client status sshd
```

If I connect from changing addresses, I avoid allow-listing a temporary IP and use more forgiving retry and ban windows. If I lock myself out, the provider's browser console or VNC path remains independent of SSH:

```bash
sudo fail2ban-client unban --all
```

### P2.3 Add UFW only if I want a second firewall layer

The cloud security group is already a firewall. UFW adds another boundary on the machine itself. If I use it, order matters:

```bash
# Allow SSH first
sudo ufw allow 60022/tcp comment 'SSH'

sudo ufw show added
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw enable
sudo ufw status verbose
```

Enabling UFW before allowing the active SSH port is an efficient way to lock myself out.

---

## Troubleshooting table

| Symptom | Likely cause | What I check |
| --- | --- | --- |
| `Port` changed, but SSH still listens on 22 | Ubuntu socket activation | Disable `ssh.socket`, enable `ssh.service`, then inspect `ss -tlnp` |
| `Permission denied (publickey)` | Ownership, permissions, user, or key mismatch | `chmod 700 ~/.ssh`, `chmod 600 authorized_keys`, and verify ownership |
| Connection disappears after an SSH restart | New port missing from the cloud firewall | Add first, restart second |
| `adduser` appears frozen | It was suspended with `Ctrl+Z` | `jobs`, `kill %1`, then `passwd` |
| Client UI and server disagree | Client cache or saved profile | Trust kernel state and server logs before the UI |
| Home IP allow-list suddenly fails | The public address changed | Update the rule from the provider console |
| fail2ban blocks me | Retry window is too strict | Use the console, unban, then loosen the parameters |

When client and server disagree, my order of trust is:

```text
kernel state > server command output > server logs > client logs > client UI
```

`ss -tlnp` reads the kernel socket table. It describes what is actually listening, not what a saved client profile expects to be listening.

## Final verification

```bash
sudo ss -tlnp | grep ssh
sudo systemctl is-active ssh.service unattended-upgrades fail2ban
sudo systemctl is-enabled ssh.socket
sudo grep -E "^(Port|PermitRootLogin|PasswordAuthentication|PubkeyAuthentication)" /etc/ssh/sshd_config
```

I also verify from separate client sessions that password login fails, root login fails, and the ordinary user succeeds with the correct key and port.

## What I kept from this setup

Security here is not one perfect control. If a key is stolen, a passphrase may still slow its use. If a port is discovered, root and password login remain disabled. If I make a mistake, the still-open session and provider console give me a way back.

I also stopped treating hardening as a score to maximise. Once the dangerous defaults are gone, each additional control should answer a real need. The most durable rule I kept is simpler: whenever I install a network service, I ask whether it needs to listen on the public interface at all.

```bash
# Publicly reachable
redis-server --bind 0.0.0.0

# Local to this machine
redis-server --bind 127.0.0.1
```

After this pass, I do not tell myself the server is “secure forever.” I know exactly which doors are open, how they are authenticated, and how I will get back in if the next change goes wrong. That is enough to start using the machine.
