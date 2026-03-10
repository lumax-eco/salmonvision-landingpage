---
title: "Labeling vs. Reviewing"
meta_title: "Labeling vs. Reviewing - SalmonVision User Guide"
description: "Labeling vs. Reviewing from SalmonVision"
draft: false
type: "user-guide"
weight: 8
---

# Labeling vs. Reviewing

There are two main types of data annotation work which we term **labeling** and **reviewing**.

### Labeling

Labeling involves removing AI-generated bounding boxes and drawing your own bounding box, making sure the boxes are of the correct class, starts when the object first appears and ends when it leaves the frame, and the bounding box is tightly fitted around the object. This typically involves manual adjustments for bounding box size at keypoints throughout the observation of a fish. This is **high quality data** that will be used as new training data.

### Reviewing

Reviewing is a much faster process where class assignment is checked and the bounding box should loosely follow and fit the object. The goal of a review is to produce a **correct count**, with less emphasis on the precise location and size of bounding boxes. If an AI annotation is far off there are several options:

1. Adjust the existing bounding box to fit better
2. Delete the bounding box if it is way off and redraw it
3. Delete erroneous extra bounding boxes or draw around fish which have been missed

> The difference between labelled and reviewed data is not clear-cut necessarily (i.e. AI-generated data in a reviewing session can be of "labeled" grade). It is important to remember that when starting a **labeling** session it is of utmost importance to be very precise.

