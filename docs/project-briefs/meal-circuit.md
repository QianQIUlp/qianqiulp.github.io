# MealCircuit Project Brief

## Naming

- Display name: `MealCircuit`
- Repository slug: `meal-circuit`
- Repository URL: `https://github.com/QianQIUlp/meal-circuit`
- Release used as the portfolio reference: `v0.3.0`

## Current Status

MealCircuit is a public, actively usable repository with a published `v0.3.0` release.

The README presents it as a local-first, agent-in-the-loop long-term dietary feedback workbench. Portfolio copy should keep that scope and should not infer broader product maturity, user scale, or medical authority beyond the repository evidence.

`v0.3.0` is the first public multi-device release. A local-first Python desktop app and a native Android client share the same encrypted, versioned data model without making an account or a server mandatory. It also introduces optional E2EE Sync v1 with a self-hosted relay. Sync is disabled by default and there is no official hosted service.

## Confirmed Facts

- MealCircuit is described as a local-first, agent-in-the-loop long-term dietary feedback workbench.
- The product itself does not call external model APIs and does not require an API key.
- It stores meal photos, ingredients, daily check-ins, nutrition library entries, and user corrections as a traceable feedback loop.
- It combines a personal doctrine, recent 14-day trends, long-term memory, and current adjustments to produce structured judgments and a next-day meal plan.
- Results are validated against JSON Schema before being written; raw inputs and prior results are not silently overwritten, and user corrections are appended as new history.
- The UI covers Today overview, daily status modules, meal photo analysis, ingredient analysis, nutrition library management, and records or memory views.
- Agent work is driven through CLI pending queues and exported context files rather than background automation.
- Runtime data is kept outside the source repository in a local SQLite-backed private data directory, with environment variables for directory, database path, and port overrides.
- The default Web UI binds to loopback only; enabling remote access does not add authentication or TLS.
- `v0.3.0` packages the desktop app with pywebview for Windows, macOS, and Linux, and adds a native Android client built with Kotlin, Compose, and Room.
- `v0.3.0` adds language-neutral Domain v1 revisions, explicit SQLite/Room migrations, managed content-addressed assets, and encrypted `.mcx` backup and restore.
- Optional E2EE Sync v1 uses a self-hosted FastAPI/PostgreSQL relay with encrypted photo chunks, recovery strings, one-use QR pairing, device revocation, conflict center, and staged account-key rotation.
- Remote entities and assets are encrypted client-side with AES-256-GCM and opaque HMAC-derived identifiers. The implementation has cross-language vectors and negative tamper tests but has not received an independent third-party audit.
- Windows portable ZIP and installer artifacts are unsigned; the macOS app is ad-hoc signed and not notarized; the Linux AppImage is unsigned.
- Android APK and AAB assets are built with the configured release key and verified in CI with `apksigner` and against the restored keystore.
- The current documented boundaries still exclude package OCR and an external nutrition database.
- The repository states that MealCircuit provides general logging and decision support only and is not medical diagnosis or treatment advice.

## Portfolio Positioning

Present MealCircuit as a local-first workbench for long-horizon diet feedback, where the main value is preserving evidence, context, and user corrections so an agent can make better next-step judgments.

Keep the separation of responsibilities explicit: MealCircuit stores facts, assembles context, validates output, and preserves history; an external agent such as Codex or Claude Code performs the analysis when the user initiates a task.

Do not present MealCircuit as a calorie-counter app, a fully autonomous nutrition assistant, a medical product, a mandatory cloud service, or a system with built-in model inference.

## Display Copy Guidance

- Keep local-first, evidence-first, and context assembly visible in the summary and case study.
- Mention the 14-day trend, long-term memory, and next-day menu loop only as documented functionality, not as a quantified health outcome.
- Keep API claims precise: no built-in external model API calls and no API key requirement for MealCircuit itself.
- Keep privacy and ownership claims scoped to documented local storage, no mandatory account, and sync off by default with no official hosted service.
- Keep boundary language explicit around loopback-only defaults, lack of OCR or external nutrition databases, unsigned desktop artifacts, and the absence of an independent cryptographic audit.
- Mention multi-device support only as documented packaging and data-model sharing, never as a synchronized service the project operates.
- Do not claim adoption, retention, weight-loss outcomes, production maturity, or nutritional correctness beyond repository evidence.

## Links

- Repository: `https://github.com/QianQIUlp/meal-circuit`
- README: `https://github.com/QianQIUlp/meal-circuit/blob/main/README.md`
- v0.3.0 release: `https://github.com/QianQIUlp/meal-circuit/releases/tag/v0.3.0`
