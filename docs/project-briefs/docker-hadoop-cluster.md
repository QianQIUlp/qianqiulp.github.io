# Docker-Hadoop-Cluster Project Brief

## Naming

- Display name: `Docker-Hadoop-Cluster`
- Repository slug: `dockder-hadoop-cluster`
- Repository URL: `https://github.com/QianQIUlp/dockder-hadoop-cluster`

Keep the repository slug exactly as `dockder-hadoop-cluster`. Do not rename or "correct" it to `docker-hadoop-cluster`.

## Confirmed Facts

- The project is described as a teaching-oriented way to quickly launch a Hadoop 3.4.1 three-node fully distributed cluster.
- The cluster has explicit node roles across `hadoop1`, `hadoop2`, and `hadoop3`, covering NameNode, ResourceManager, SecondaryNameNode, DataNode, NodeManager, and JobHistoryServer roles.
- Hadoop XML configuration is externalized under `conf/`, with `.env` parameterization for local setup.
- Docker named volumes persist data, and a shared SSH key volume supports node trust.
- The project includes helper scripts such as `up.sh`, `status.sh`, `shell.sh`, and `run-wordcount.sh`.
- It includes a single-node pseudo-distributed mode for local learning, demos, or lower-memory environments.
- It includes GHCR image publishing workflow details such as vulnerability scanning, image signing, SBOM, and provenance.

## Portfolio Positioning

Present this as a teaching, lab, and local-learning tool for Hadoop, HDFS, YARN, MapReduce, Docker Compose, and cluster debugging.

The portfolio copy may say that the project is positioned more toward learning, experimentation, and teaching demos than a production Hadoop platform. Do not phrase that as an official repository guarantee or production-readiness statement.

## Display Copy Guidance

- Use `summary`, `positioning`, `caseStudy`, `highlights`, and `limitations` from `src/data/projects.ts` for page copy.
- Keep `confirmedFacts` concise and evidence-oriented.
- Prefer the compact case-study structure on `/projects/`; avoid making `confirmedFacts` the main visible content.
- Do not claim production readiness, user adoption, stars, performance benchmarks, or maturity beyond repository evidence.
- Keep secondary site sections and learning tracks visually secondary to this real featured project.
