# Hadoop Lab Project Brief

Use this source when updating the personal site. The canonical repository slug
is `docker-hadoop-cluster`; old `dockder-hadoop-cluster` links are incorrect.
The public display name is **Hadoop Lab**; `Docker-Hadoop-Cluster` remains only
as the repository slug and must not be used as the visible project name.

## Naming

- Display name: `Hadoop Lab`
- Repository slug: `docker-hadoop-cluster`
- Repository URL: <https://github.com/QianQIUlp/docker-hadoop-cluster>
- Distributed Hadoop version: `3.4.1`

## Compact case study

**Summary:** A repeatable local Hadoop laboratory that turns environment setup,
service observation, MapReduce execution, node failure and recovery into a
guided learning path, with seven labs that connect results back to principles.

**Problem:** Beginners often spend the lesson fighting downloads, ports,
configuration and opaque daemon failures before they can observe HDFS or YARN.

**Design:** One lifecycle CLI wraps a single-node first-run mode and a three-node
role mode. Both modes share one image and start different daemons through
runtime role arguments. Preflight checks, explicit health evidence, namespaced
labs, safe resets and redacted diagnostics keep the environment understandable
and recoverable.

**Start:** Clone the repository and run `./hadoop-lab init`, `doctor`,
`up standalone` and `demo wordcount` to bring up six Hadoop daemons in one
container and see a first MapReduce result.

**Boundary:** It is a teaching and local experimentation environment, not a
production Hadoop platform. It deliberately excludes Kerberos, NameNode HA,
multi-host orchestration, backup, capacity planning and operational SLAs. Web
and RPC ports bind to `127.0.0.1` by default.

## Confirmed Facts

- The project provides a repeatable local Hadoop teaching and experimentation
  environment based on Hadoop 3.4.1.
- One lifecycle CLI covers a single-node first-run mode and a three-node role
  mode; both share one image and select daemons through runtime role arguments.
- The learning path covers environment preparation, service observation,
  MapReduce execution, and node failure and recovery.
- `doctor`, `status` and `lesson check` return non-zero exit codes on failure so
  teacher scripts and CI can reuse the same checks.
- Seven labs cover first run, HDFS basics, WordCount, YARN observation, cluster
  roles, failure recovery and configuration. Each has goals, expected evidence,
  explanations, automated checks and a minimal-scope reset.
- Stopping containers preserves named volumes by default; only
  `reset MODE --data` deletes the selected mode's data volumes, after
  interactive confirmation or an explicit `--yes`.
- Diagnostic bundles contain only versions, condensed container status, check
  results and recent logs — never `.env` or the full container environment.
- The repository also ships a zero-dependency bilingual static project site
  published separately through Cloudflare Pages.

## Canonical links

- Repository: <https://github.com/QianQIUlp/docker-hadoop-cluster>
- Project site source: <https://github.com/QianQIUlp/docker-hadoop-cluster/tree/main/site>
- Image: <https://github.com/QianQIUlp/docker-hadoop-cluster/pkgs/container/hadoop-cluster-3.4.1>
- README: <https://github.com/QianQIUlp/docker-hadoop-cluster#readme>

## Evidence capture checklist

Capture after a clean standalone run:

1. terminal showing `doctor` passing;
2. terminal showing a healthy `status` service map;
3. WordCount result and its successful lesson check;
4. NameNode overview at 9870;
5. ResourceManager application page at 8088;
6. one three-node degraded/recovered status pair for the case study.

Do not use mocked metrics or imply production readiness, adoption or benchmark
results.
