# AI for property managers: live demo

No sign-up demo, fictional data only, replay mode (pre-recorded analyses).

- **Live demo:** https://nyyoautomation.github.io/nyyo-syndics-demo/

Three use cases, on one fictional building:

1. **General meeting minutes** (main case): attendance sheet, proxies and meeting notes cross-checked against the bylaws and the notice; ownership shares and majorities recounted per resolution; draft minutes ready to review.
2. **Contractor bid comparison**: three facade bids matched item by item to the architect's specification (areas, options, insulation performance, liability insurance, validity), with a draft note for the board.
3. **Owner complaint reply**: an owner's email cross-checked against the maintenance log, bylaws, building insurance and service charge notice; deadlines flagged and a calm, sourced draft reply.

Every result cites its source (document, page, clause), runs a contradiction check (confirm or dismiss each item) and shows a human-review banner. The tool decides no vote, chooses no contractor and sends nothing to owners. Live input checks, triage and Word export run in the browser.

Mobile-first layout: below 720 px every comparison is a stack of cards with collapsible sources; no page-level horizontal scroll at 360 or 390 px.

## AI defaults (paid setup)

The public demo is a replay and calls no model. For a firm's setup, `config/ai.json` holds the defaults:

- **Default model:** a cost-efficient standard model. Premium models are never the default; they are opt-in per account only.
- **Cost alert above a configurable threshold:** each firm gets an alert when the AI cost of one deliverable exceeds its threshold. Nothing is blocked automatically.
- Cost per deliverable is an estimate, to be confirmed by measurement during the pilot.

Figures shown are estimates on the fictional sample, not promises. Pricing: on quote (Request a quote). Nyyo Automation · Noah Vasseur · Remote · Worldwide. Questions? Ask in your order chat.
