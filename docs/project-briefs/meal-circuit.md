# MealCircuit Project Brief

## Naming

- Display name: `MealCircuit`
- Repository slug: `meal-circuit`
- Repository URL: `https://github.com/QianQIUlp/meal-circuit`
- Release used as the portfolio reference: `v0.2.0`

## Current Status

MealCircuit is a public, actively usable repository with a published `v0.2.0` release.

The README presents it as a local-first, agent-in-the-loop long-term dietary feedback workbench. Portfolio copy should keep that scope and should not infer broader product maturity, user scale, or medical authority beyond the repository evidence.

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
- The current documented boundaries exclude user accounts, cloud sync, mobile apps, package OCR, and external nutrition databases.
- The repository states that MealCircuit provides general logging and decision support only and is not medical diagnosis or treatment advice.

## Portfolio Positioning

Present MealCircuit as a local-first workbench for long-horizon diet feedback, where the main value is preserving evidence, context, and user corrections so an agent can make better next-step judgments.

Keep the separation of responsibilities explicit: MealCircuit stores facts, assembles context, validates output, and preserves history; an external agent such as Codex or Claude Code performs the analysis when the user initiates a task.

Do not present MealCircuit as a calorie-counter app, a fully autonomous nutrition assistant, a medical product, a cloud service, or a system with built-in model inference.

## Display Copy Guidance

- Keep local-first, evidence-first, and context assembly visible in the summary and case study.
- Mention the 14-day trend, long-term memory, and next-day menu loop only as documented functionality, not as a quantified health outcome.
- Keep API claims precise: no built-in external model API calls and no API key requirement for MealCircuit itself.
- Keep privacy and ownership claims scoped to documented local storage, no accounts, and no default cloud sync.
- Keep boundary language explicit around loopback-only defaults, missing cloud or mobile features, lack of OCR or external nutrition databases, and non-medical scope.
- Do not claim adoption, retention, weight-loss outcomes, production maturity, or nutritional correctness beyond repository evidence.

## Links

- Repository: `https://github.com/QianQIUlp/meal-circuit`
- README: `https://github.com/QianQIUlp/meal-circuit/blob/main/README.md`
- v0.2.0 release: `https://github.com/QianQIUlp/meal-circuit/releases/tag/v0.2.0`
