---
title: "Sonar"
meta_title: "Sonar - SalmonVision User Guide"
description: "Guide to sonar video review and annotation in SalmonVision"
draft: false
type: "user-guide"
weight: 17
---

# Sonar

This manual is complementary to the general SalmonVision user guide which we recommend you read before this document.

Sonar review and annotation presents unique challenges to the data reviewer, and differs from RGB video review in several key ways:

1. **Many simultaneous fish** — When reviewing a sonar video, there are many cases where many fish will be visible simultaneously. To ensure that each individual fish is tracked accurately throughout their passage through the sonar beam, focus your attention on an individual fish, and review or label that fish throughout its passage event (through the sonar beam).

2. **Flickering visibility** — Fish in sonar videos can flicker in and out of visibility. When in annotation mode it is important to turn off keypoints for frames where the target fish is not visible, to avoid producing training data with empty bounding boxes.

3. **General object classes** — Sonar labels do not include species classes, but rather general classes of objects (e.g. mammal, small fish, schooling fish, salmon sized fish, debris).

4. **Zooming** — You may want to zoom in on the sonar video to get a better view of a specific area, since fish are often small and represented by only a few pixels. To zoom in on a specific area in the video, **hold the Shift key and use the scroll function** on your mouse to zoom in or out on the image. When zoomed you can also move your view within the sonar image by holding down the Shift button and dragging in the desired direction with your mouse cursor.
