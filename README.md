# Sentra — Feedback Intelligence Dashboard

Sentra is the visual layer for the Reputation & Feedback Intelligence capstone. It reads processed feedback from an n8n-backed ledger, normalizes the data in one adapter, and exposes only two write actions: acknowledge a manager alert and mark a reviewed draft as sent.

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- React Query for polling/cache/mutations
- Recharts for analytics
- React Router
- Lucide icons

## Run

```bash
npm install
npm run dev
```

The app starts in **demo mode** and seeds 33 realistic feedback records across Lekki, Ikeja, Yaba, Victoria Island and Surulere. Demo mutations are persisted in `localStorage` so the queues and alerts can be demonstrated without n8n.

## Connect n8n

Open **Settings** and choose **Use live data**. Set `BASE_URL` to the n8n host, for example:

```text
https://your-n8n-host.example.com
```

Sentra expects:

```text
GET  {BASE_URL}/webhook/feedback-dashboard
POST {BASE_URL}/webhook/feedback-acknowledge
POST {BASE_URL}/webhook/feedback-mark-sent
```

POST bodies:

```json
{ "feedbackId": "FB-..." }
```

The adapter accepts either a raw array or `{ "data": [...] }`, tolerates missing fields, and normalizes sentiment/severity values. Sentiment is represented on a `-1` to `+1` scale; severity uses a `0–1` score plus low/medium/high display labels.

### CORS

Because Sentra calls the n8n webhooks from the browser, configure the n8n Respond to Webhook/CORS settings to allow the dashboard origin. If the browser reports a network/CORS failure, first verify that the workflow is Active and that the configured `BASE_URL` is correct.

## Demo acceptance paths

The seeded data deliberately includes:

1. **Positive** → Ready to Post, human copies the original review text.
2. **First-time/lower-severity negative** → Private Queue with an AI draft; no manager escalation.
3. **Repeat-negative/high-severity negative** → Manager Alert with a draft and acknowledge action.
4. **Low-confidence/unclear** → Needs Human Review.

Use the global location filter in the header; the selected branch is persisted in the URL query string.

## Project structure

```text
src/
  components/ui.tsx     shared dashboard UI, badges, drawer, timeline
  data/mockData.ts      demo ledger
  lib/api.ts            single data-access adapter + webhook actions
  lib/types.ts          normalized model
  pages/                dashboard routes
  App.tsx               shell, global location filter, polling
```

## Capstone scope

Sentra does **not** run the automation pipeline. The expected journey is job complete → feedback request → customer reply → n8n → AI scoring → repeat check → routing → Google Sheets ledger → Sentra. The Pipeline page makes this journey visible for a reviewer and lets them inspect the path taken by individual feedback records.
