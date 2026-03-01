---
title: "Data Export"
meta_title: "Data Export - SalmonVision User Guide"
description: "Export detection data from SalmonVision"
draft: false
type: "user-guide"
weight: 7
---

# Data Export

SalmonVision makes it easy to export your monitoring data for analysis, reporting, or integration with other tools.

## Export Formats

| Format | Description |
|---|---|
| **CSV** | Comma-separated values, compatible with Excel and R |
| **JSON** | Structured data for programmatic use |
| **GeoJSON** | Spatial data with detection locations |
| **COCO** | Annotated image dataset format for model retraining |

## Exporting from the Dashboard

1. Navigate to your project dashboard
2. Set your desired **date range** and **filters**
3. Click the **Export** button in the toolbar
4. Choose your format and click **Download**

## Export Fields

Each export includes:

| Field | Description |
|---|---|
| `timestamp` | UTC time of detection |
| `species` | Classified species name |
| `confidence` | Model confidence score (0–1) |
| `direction` | Upstream or downstream |
| `camera_id` | Source camera identifier |
| `bbox` | Bounding box coordinates |
| `image_url` | Link to detection snapshot |

## Scheduled Exports

Set up automatic exports:

1. Go to **Settings → Scheduled Exports**
2. Choose frequency (daily, weekly, monthly)
3. Select format and delivery method (email or cloud storage)
4. Click **Save Schedule**

## API Access

For programmatic export, see the [API Reference](../api-reference/).

---

Previous: [Salmon Detection](../salmon-detection/) | Next: [API Reference](../api-reference/)
