---
title: "In Annotation Mode"
meta_title: "Sonar Annotation Mode - SalmonVision User Guide"
description: "Guide to sonar annotation mode in SalmonVision"
draft: false
type: "user-guide"
weight: 19
---

# Sonar — In Annotation Mode

Start with the initial frame where the fish becomes visible, and confirm that the fish was detected (with a bounding box) at the moment it appears.

If it wasn't initially detected, draw your own bounding box around it, turning on interpolation to enable easy movement and reshaping of the bounding box as it moves.

## Handling Flickering

If object flickering occurs (e.g. the fish becomes momentarily invisible due to obstruction or other data quality issues):

1. **Turn off interpolation** and remove keypoints for those frames, so that the bounding box temporarily disappears
2. **Turn it back on** and move the bounding box for the first keyframe that the fish reappears in to the appropriate location

This will ensure that training data does not include any empty bounding boxes that may confuse model training in the future, and will allow our team to work towards retraining models that track fish more accurately, even in the event that flickering renders them momentarily invisible.
