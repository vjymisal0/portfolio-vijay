# Eraser workflow diagrams

These sanitized flowcharts can be pasted into Eraser using **Diagram as Code**. Replace the text labels with Eraser icons from the icon library where available: `n8n`, `Docker`, `AI`, `cron`, `webhook`, `database`, `YouTube`, and `Telegram`.

## 1. Autonomous media pipeline

```mermaid
flowchart TD
  A[⏱ Schedule trigger] --> B[n8n workflow]
  B --> C[Collect approved input]
  C --> D[AI agent: generate structured plan]
  D --> E{Validation passed?}
  E -->|No| F[Retry or send alert]
  F --> B
  E -->|Yes| G[Media generation pipeline]
  G --> H[Text-to-speech processing]
  H --> I[Package output]
  I --> J[Publishing service]
  J --> K[Execution log]
```

## 2. Lead generation and outreach

```mermaid
flowchart TD
  A[⏱ Scheduled trigger] --> B[n8n workflow]
  B --> C[Query approved data sources]
  C --> D[Normalize and deduplicate]
  D --> E[AI agent: qualify records]
  E --> F{Meets criteria?}
  F -->|No| G[Archive with reason]
  F -->|Yes| H[Store in database or sheet]
  H --> I[Prepare outreach payload]
  I --> J[Manual approval or webhook]
  J --> K[Send through approved integration]
  K --> L[Log result and notify]
```

## 3. VM health monitoring and failover

```mermaid
flowchart TD
  A[⏱ Cron monitor] --> B[Check VM and service health]
  B --> C{Healthy?}
  C -->|Yes| D[Record healthy status]
  D --> A
  C -->|No| E[Capture diagnostics]
  E --> F{Recoverable?}
  F -->|Yes| G[Restart or retry service]
  G --> H[Verify recovery]
  H -->|Recovered| D
  H -->|Still failing| I[Escalate incident]
  F -->|No| I
  I --> J[Telegram alert]
  I --> K[Error log and execution history]
```

## 4. Platform overview

```mermaid
flowchart LR
  A[Users and external events] --> B[Reverse proxy]
  B --> C[n8n automation engine]
  C --> D[AI agents]
  C --> E[Docker services]
  C --> F[External APIs]
  D --> G[Generated decisions or content]
  E --> H[(Persistent data)]
  C --> I[Monitoring and error handler]
  I --> J[Notifications]
```

## Privacy checklist

Do not include channel names, content topics, domains, IP addresses, usernames, credentials, customer names, private URLs, or internal container names in the public diagrams.
