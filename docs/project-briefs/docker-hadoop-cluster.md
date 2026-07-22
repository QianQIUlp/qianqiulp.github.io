# Docker-Hadoop-Cluster Project Brief

Use this source when updating the personal site. The canonical repository slug
is `docker-hadoop-cluster`; old `dockder-hadoop-cluster` links are incorrect.

## Compact case study

**Summary:** A repeatable local Hadoop laboratory that turns environment setup,
service observation, MapReduce execution, node failure and recovery into a
guided learning path.

**Problem:** Beginners often spend the lesson fighting downloads, ports,
configuration and opaque daemon failures before they can observe HDFS or YARN.

**Design:** One lifecycle CLI wraps a single-node first-run mode and a three-node
role mode. Preflight checks, explicit health evidence, namespaced labs, safe
resets and redacted diagnostics keep the environment understandable and
recoverable.

**Boundary:** It is a teaching and local experimentation environment, not a
production Hadoop platform. It deliberately excludes HA, Kerberos, multi-host
orchestration and operational SLAs.

## Canonical links

- Repository: <https://github.com/QianQIUlp/docker-hadoop-cluster>
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
