# Luc page analytics

Visits, QR scans and WhatsApp chats for [muezz.dev/ref/luc](https://muezz.dev/ref/luc) are written to the
**`luc_events`** Workers Analytics Engine dataset by `src/server/luc-analytics.ts`.

**Where to look:** Cloudflare dashboard → Storage & databases → Analytics Engine → **Studio** → Query tab.
Data is kept for 90 days.

## Columns

| Column      | Meaning                                                                |
| ----------- | ---------------------------------------------------------------------- |
| `blob1`     | Event — `view` (page loaded) or `whatsapp` (sent to the WhatsApp chat) |
| `blob2`     | Source — see below                                                     |
| `blob3`     | Anonymous visitor id (hash of IP + browser + UTC day, resets daily)    |
| `blob4`     | Country code                                                           |
| `timestamp` | When it happened (UTC)                                                 |

| Event / source        | What it means                                        |
| --------------------- | ---------------------------------------------------- |
| `view` / `qr`         | Page opened by scanning a printed QR code            |
| `view` / `direct`     | Page visited from a link or typed in                 |
| `whatsapp` / `qr`     | WhatsApp opened by scanning a printed QR code        |
| `whatsapp` / `screen` | WhatsApp opened by scanning the QR shown on the page |
| `whatsapp` / `page`   | WhatsApp button tapped on the page                   |
| `whatsapp` / `other`  | WhatsApp opened from an old or unknown link          |

"Messages" means chats opened — we can't see whether they actually pressed send.
"Unique" means unique visitors per day: someone who comes back on another day counts again.

## Queries

Change `'30'` to look further back (up to 90 days). Always total with `SUM(_sample_interval)` rather
than `COUNT()`, so the numbers stay right if Cloudflare ever samples the data.

### Summary

```sql
SELECT
  blob1 AS event,
  blob2 AS source,
  SUM(_sample_interval) AS total,
  COUNT(DISTINCT blob3) AS unique_visitors
FROM luc_events
WHERE timestamp > NOW() - INTERVAL '30' DAY
GROUP BY event, source
ORDER BY total DESC
```

### Per day

```sql
SELECT
  toStartOfDay(timestamp) AS day,
  blob1 AS event,
  blob2 AS source,
  SUM(_sample_interval) AS total,
  COUNT(DISTINCT blob3) AS unique_visitors
FROM luc_events
WHERE timestamp > NOW() - INTERVAL '30' DAY
GROUP BY day, event, source
ORDER BY day DESC
```

### Printed QR scans only

```sql
SELECT
  blob1 AS event,
  SUM(_sample_interval) AS scans,
  COUNT(DISTINCT blob3) AS unique_visitors
FROM luc_events
WHERE timestamp > NOW() - INTERVAL '30' DAY
  AND blob2 = 'qr'
GROUP BY event
```

### By country

```sql
SELECT
  blob4 AS country,
  SUM(_sample_interval) AS total
FROM luc_events
WHERE timestamp > NOW() - INTERVAL '30' DAY
GROUP BY country
ORDER BY total DESC
```

### Latest raw events

```sql
SELECT timestamp, blob1 AS event, blob2 AS source, blob4 AS country
FROM luc_events
ORDER BY timestamp DESC
LIMIT 50
```

If a query fails on `COUNT(DISTINCT …)`, delete that line (and the comma before it). The totals still work.
