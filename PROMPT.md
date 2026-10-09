# 📜 Master Prompts & AI Engineering Documentation
## Project 08: SpaceX Starship Raptor 3 Spatial CAD ("Elon Musk Inspiration")

This document details the exact master prompts, technical requirements, and prompt recipes used to create, refactor, and harden the **SpaceX Starship Raptor 3 Spatial CAD** workstation. Use these prompts to reproduce, adapt, or expand this project on GitHub or within any LLM/AI coding agent.

---

## 1. 🌟 The Master Architectural Prompt (Genesis Prompt)

```text
Act as an elite aerospace visualization engineer and computer vision architect. Build a futuristic, browser-based "Iron Man" / Elon Musk-inspired spatial CAD interface for the SpaceX Starship Raptor 3 (V3) rocket engine using WebGL (Three.js), MediaPipe Hands AI, and modern responsive CSS (Tailwind).

Key Requirements:
1. 3D Model & 10,888 Components:
   - Procedurally assemble a geometrically accurate representation of the Raptor 3 engine:
     * Inconel 718 bell nozzle with contoured expansion curve.
     * GRCop-42 copper regenerative cooling jacket with 3,600 micro-channels.
     * Coaxial swirl injector dome with 458 injector elements.
     * Dual Turbopumps (LOX-TP & CH4-TP) with blading and high-pressure volutes.
     * A286 structural double-hex fastener array and internal manifold lattices.
     * TVC electromechanical gimbal actuators.
   - Support smooth continuous 0% to 100% exploded assembly kinematics along mathematical separation vectors.

2. Dual-Hand MediaPipe AI Computer Vision Tracking:
   - Use Google MediaPipe Hands with a 21-node AI skeleton overlay.
   - Detect hands at 60 FPS directly from the user's webcam without requiring specialized controllers.
   - Classify gestures using 3D Euclidean distances between wrist, MCP, PIP, and fingertip nodes.
   - Dual-hand interlock engine to eliminate false positives and allow multi-hand gestures.

3. Advanced Spatial Gesture Kinematics:
   - "Air-Pinch & Drag" (🤏): Select a subassembly and pull it outward along its separation axis.
   - "The Snap" (💥): Rapid thumb-to-middle snap triggers pre-burner torch ignition sequence with camera vibration and sparks.
   - "Palm Thrust" (✋ Forward): Moving open palm toward the camera acts as a physical throttle (0-100%), generating a supersonic exhaust plume, 4 Mach diamond shock cones, and thermal CFD emissive glow.
   - "Both Hands Fist" (✊✊): Dual interlock toggle between full exploded disassembly (100%) and complete nominal re-assembly (0%).
   - "Double Swipe Out" (👐): Rapid outward swipe of both hands enters Zen Mode (hides all UI panels for fullscreen model viewing).
   - "Thumb Up / Thumb Down" (👍 / 👎): Progressive assembly and explosion.
   - "Pinch" (👌): Smooth camera zoom.
   - "Open Palm" (✋): Continuous orbit and pan view.
   - "Index Roll" (👉): Continuous roll spin around centerline axis.

4. Audio Synthesis:
   - Procedural Web Audio API engine (no external audio files needed).
   - Generates low-frequency combustion rumble and ignition spark crackles linked to real-time throttle.

5. Visual Fidelity & Usability:
   - Provide a complete 14+ gesture test grid on screen for instant manual testing without a camera.
   - Display real verified SpaceX flight specifications (280 tf thrust, 350 bar chamber pressure, 1,525 kg mass, T/W 163.9).
```

---

## 2. 🎨 High-Contrast Light Mode Prompt (Video Capture Optimization)

```text
Transform raptor3_spatial_cad.html to have a high-contrast, fully responsive Light Mode Theme specifically optimized for video capture (e.g., shooting with mobile phones without screen wash-out) while maintaining the original layout and all interactive features.

Please apply the following design and visibility updates:
1. High-Contrast Light Theme Palette:
   - Main Background: Change the base and workspace background from dark navy/black to a bright off-white/very light gray (#F4F5F7).
   - 3D Workspace Grid: Change the inner CAD viewport to a light-gray grid (#E2E8F0 / #CBD5E1) on a white background with subtle fog to make the metallic Raptor 3 (V3) engine and separated subassemblies (like the cooling channels) highly visible.
   - UI Cards & Panels: Apply a crisp, white-card styling to .sidebar ("SUBASSEMBLY EXPLORER") and the .hud ("DUAL-HAND MATRIX HUD") with subtle, dark border-lines (#CBD5E1) and rich dark navy text (#0F172A) for extreme legibility.
2. Video-Ready Mobile Tracker Highlight:
   - Webcam Preview Box: Dark slate background (#090E18) with a strong border to frame the video capture nicely.
   - Hand Tracking Skeleton / Landmarks: High-visibility neon green/emerald lines (#00FF66 / #10B981) and glowing nodes that show up vividly on camera recordings without blurring or washing out against real-world lighting.
3. High-Contrast Status & Buttons:
   - Vibrant pastel / colored buttons for key gesture triggers:
     * Pinch & Drag: Extract (Light Teal)
     * Snap: Ignite (Light Orange)
     * Palm Thrust: Throttle (Light Green)
     * Swipe Out: Hide UI (Light Purple)
     * Both: Explode (Light Red)
   - Bottom Assemble / Explode dock buttons: High contrast [ASSEMBLE (0%)] in deep green with bright text, and [EXPLODE (100%)] in deep blue/teal with bright text.
   - Active Recognition Box: Clean, bold text that stands out (e.g., "👋 AWAITING HAND IN VIEW" in high-contrast gold/amber).
4. Responsive & Clean Layout:
   - Maintain all existing interactive features: touchless AI tracking, physics, particle plumes, ignition, and pinch-drag logic.
```

---

## 3. 📦 GitHub Upload & Release Prompts

### Repository Name:
`project-08-elon-inspiration-raptor3-spatial-cad`

### Short Description:
> SpaceX Starship Raptor 3 (V3) WebGL 3D CAD engine with touchless AI spatial dual-hand tracking, 10,888 parts explosion/assembly, supersonic plume CFD simulation, and pre-burner ignition synthesis.

### Topics / Tags:
`spacex` `starship` `raptor3` `webgl` `threejs` `mediapipe` `gesture-recognition` `spatial-computing` `elon-musk` `cad-viewer` `javascript`

### Git Commit Messages:
```bash
git init
git add .
git commit -m "feat: complete Raptor 3 spatial CAD engine with MediaPipe AI dual-hand tracking and light mode theme"
```

### GitHub Release v1.0.0 Description:
```markdown
# 🚀 Release v1.0.0: SpaceX Starship Raptor 3 Spatial CAD Engine

### Highlights:
- **10,888 Parts Procedural Architecture**: Complete Raptor 3 engine hierarchy with exploded view assembly vectors.
- **21-Node MediaPipe AI Tracking**: 60 FPS real-time dual-hand tracking with 14+ spatial gestures.
- **Light Mode CAD Theme**: High-contrast off-white theme tuned for mobile camera video capture.
- **Thermal CFD & Particle Plume**: Supersonic exhaust particle system with 4 Mach diamond shock cones.
- **Web Audio Engine**: Procedural combustion sound synthesis.
- **Zero Dependencies**: Standalone HTML/JS running directly in any modern browser.
```

---

## 4. 👨‍💻 Project Information & Metadata

- **Author**: **Mr. Elonikhil**
- **Project Sequence**: **Project 08** (SpaceX Starship & Advanced Aerospace Series)
- **License**: **MIT License**
- **Inspiration**: Elon Musk / *Iron Man* Spatial Holographic Engineering Workstation
