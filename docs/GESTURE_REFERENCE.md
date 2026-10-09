# 🖐️ Spatial Gesture Kinematics & Tracking Reference

This document provides a comprehensive breakdown of the spatial computing gesture detection pipeline implemented in **Project 08: SpaceX Starship Raptor 3 Spatial CAD**.

---

## 1. Computer Vision Pipeline (MediaPipe Hands AI)

The gesture recognition engine uses Google MediaPipe Hands with a 21-node 3D topological hand landmark model:

```
          8 (Index Tip)        12 (Middle Tip)      16 (Ring Tip)       20 (Pinky Tip)
          |                    |                    |                   |
          7 (DIP)              11 (DIP)             15 (DIP)            19 (DIP)
          |                    |                    |                   |
          6 (PIP)              10 (PIP)             14 (PIP)            18 (PIP)
          |                    |                    |                   |
4 (Thumb) 5 (MCP) ------------- 9 (MCP) ------------ 13 (MCP) ---------- 17 (MCP)
   \                                   \             /
    3 (IP)                              \           /
     \                                   \         /
      2 (MCP)                             \       /
       \                                   \     /
        1 (CMC)                             \   /
         \                                   \ /
          0 ---------------------------------- (Wrist Root)
```

### Euclidean Distance Classification Logic:
Rather than brittle bounding box tests or fake pixel sampling, finger extension is determined via Euclidean distance ratios between the fingertip and the wrist root relative to the corresponding PIP joint:

$$\text{Extended}(\text{finger}) \iff \|\mathbf{p}_{\text{tip}} - \mathbf{p}_{\text{wrist}}\| > 1.08 \times \|\mathbf{p}_{\text{pip}} - \mathbf{p}_{\text{wrist}}\|$$

For the thumb, proximity is evaluated against the index MCP joint (`node 5`).

---

## 2. Gesture Matrix Details

### 1. Dual-Hand Interlock Toggle (Both Fists: `✊✊`)
- **Trigger**: Both Hand 1 and Hand 2 simultaneously classified as `Closed Fist`.
- **Debounce**: 1.2-second interlock timer prevents state oscillation across consecutive frames.
- **Action**:
  - If engine is disassembled (`explodeFactor > 0.45`): Smoothly pulls all 10,888 parts into fully assembled flight configuration (`target = 0.0`).
  - If engine is assembled (`explodeFactor <= 0.45`): Smoothly expands all 10,888 parts along separation vectors (`target = 1.0`).

### 2. Air-Pinch & Drag (`🤏`)
- **Trigger**: Thumb tip (`node 4`) and Index tip (`node 8`) distance $< 0.055$.
- **Action**: Selects the active subassembly (e.g., GRCop-42 Cooling Jacket) and translates it in 3D space following the wrist anchor vector $(dx, dy, dz)$.

### 3. The Snap (`💥` Ignition)
- **Trigger**: Rapid pinch-release cycle between Thumb tip (`node 4`) and Middle tip (`node 12`).
  - Phase 1 (Arm): Distance $< 0.055$.
  - Phase 2 (Fire): Distance rapidly expands $> 0.15$ within 380 ms.
- **Action**: Triggers torch igniter sparks, high-intensity orange flash (`0xff7700`), procedural audio ignition crackle, and camera vibration.

### 4. Palm Thrust (`✋` Forward Throttle)
- **Trigger**: Open Palm (`5 fingers extended`) where palm bounding span exceeds $0.235$ normalized viewport units (indicating physical forward movement toward the camera lens).
- **Action**: Dynamically maps distance to throttle $0.0 \to 1.0$, powering the 1,400-particle supersonic exhaust plume, 4 Mach diamond shock cones, and thermal CFD emissive glow.

### 5. Double Swipe Outward (`👐` Zen Mode)
- **Trigger**: Euclidean distance delta between Left Wrist and Right Wrist $> +0.07$ across frames.
- **Action**: Triggers `.zen-mode` CSS transitions, sliding left and right HUD cards offscreen for a clean, distraction-free CAD view. Swiping inward restores panels.

### 6. Continuous Orbit & Pan (`✋`)
- **Trigger**: Open palm moving laterally.
- **Action**: Computes $(\Delta x, \Delta y)$ wrist delta, smoothly driving `engineRootGroup.rotation.y` and Three.js camera target pan.

### 7. Fast Roll (`👉`)
- **Trigger**: Index finger extended while remaining fingers are curled into palm.
- **Action**: Spins the Raptor 3 assembly smoothly along its centerline axis.

### 8. Progressive Throttle / Explode (`👍` / `👎`)
- **Trigger**: Thumb extended vertically while remaining four fingers are closed.
- **Action**: `Thumbs Up` decrements exploded displacement; `Thumbs Down` increments exploded displacement.
