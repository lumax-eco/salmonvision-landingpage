---
title: "Incorrect Detection"
meta_title: "Incorrect Detection - SalmonVision User Guide"
description: "How to handle incorrect detections during video review"
draft: false
type: "user-guide"
weight: 10
---

# 1. Incorrect Detection

Any of the following are considered an incorrect detection:

- Bounding box disappears and reappears
- Detection only occurs after the fish has crossed the midline
- The bounding box is not tracking the fish accurately

**Action:** Delete detection and manually annotate the video.

In this example, the bounding box disappears and reappears multiple times.

![Incorrect detection example](/images/user-guide/image063.jpg)
