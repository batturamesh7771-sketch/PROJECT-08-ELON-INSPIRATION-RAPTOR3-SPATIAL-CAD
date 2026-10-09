# 🏛️ System Architecture & Engineering Specifications
## Project 08: SpaceX Starship Raptor 3 Spatial CAD

This document describes the software architecture, rendering pipeline, WebGL data models, and procedural synthesis methods used in this application.

---

## 1. High-Level Technology Stack

```
+-------------------------------------------------------------------------+
|                              USER BROWSER                               |
+------------------------------------+------------------------------------+
|         UI / DOM / HUD LAYER       |         3D WEBGL GRAPHICS          |
|  - Tailwind CSS Responsive Cards   |  - Three.js r128 WebGL Engine      |
|  - High-Contrast Light Theme       |  - ACESFilmic Tone Mapping         |
|  - Real-Time Flight Telemetry HUD  |  - 10,888 Procedural Parts Group   |
|  - 14+ Gesture Simulator Grid      |  - 1,400 Supersonic Plume Points   |
+------------------------------------+------------------------------------+
|           VISION & SENSORS         |            AUDIO SYNTHESIS         |
|  - HTML5 getUserMedia Video Feed   |  - Web Audio API (Web Audio Class) |
|  - Google MediaPipe Hands (v0.4)   |  - White Noise Buffer Generator    |
|  - 21-Node Skeletal Landmark Canvas|  - Biquad Lowpass Rumble Filter    |
|  - Euclidean Kinematics Classifier |  - Dynamic Gain Ramp Modulation    |
+------------------------------------+------------------------------------+
```

---

## 2. 3D Model Hierarchy (10,888 Parts)

Every component is registered with a nominal base position and an exploded expansion vector $\vec{v}_{\text{explode}}$:

$$\mathbf{p}(t) = \mathbf{p}_{\text{base}} + \vec{v}_{\text{explode}} \times f_{\text{explode}} + \mathbf{o}_{\text{isolated}}$$

1. **Combustion Chamber & Bell Nozzle**:
   - Inconel 718 shell with bell spline curve ($y: 10 \to -15$, throat radius $1.8$, exit radius $8.5$).
2. **GRCop-42 Regenerative Jacket**:
   - 3,600 micro-channel cooling channels 3D-printed directly into the liner wall.
3. **Coaxial Swirl Injector Dome**:
   - 458 injector elements arranged in 6 concentric rings ($r: 0.6 \to 3.5$).
4. **Turbopump Rotors & Blading**:
   - Dual OX-TP and CH4-TP assemblies with 968 SX500 blading segments.
5. **Structural Fastener Array**:
   - 1,648 A286 aerospace double-hex studs and bolt flanges.
6. **Internal Regenerative Heat Manifolds**:
   - 1,500 internal cooling fin lattices.
7. **TVC Actuators & Gimbal Mount**:
   - Dual electromechanical gimbal actuators with hydraulic rods and joints.

---

## 3. Light Mode Theme Rendering Specs

To guarantee crystal-clear capture on mobile phone cameras:

- **Scene Background**: `THREE.Color(0xF4F5F7)`
- **Atmospheric Fog**: `THREE.FogExp2(0xF4F5F7, 0.007)`
- **CAD Grid Helper**: 80x80 subdivisions, primary cyan axis (`0x0284c7`), secondary light slate (`0xcbd5e1`)
- **Key Light**: White directional light at $(25, 45, 30)$ with intensity $2.8$
- **Fill Light**: Soft sky-blue directional light at $(-30, 20, -20)$ with intensity $1.6$
- **Rim Light**: Emerald light at $(0, -25, -25)$ with intensity $1.2$
- **Ambient Light**: Flat white ambient at intensity $0.95$

---

## 4. Procedural Web Audio Engine

Zero external sound files are used. The sound engine is 100% synthetically generated in real time:

1. **Rumble Engine**:
   - Generates a 2-second white noise float array buffer.
   - Routes through a `BiquadFilterNode` configured as a low-pass filter at $110\text{ Hz}$.
   - Modulates gain from $0.0 \to 1.0$ linearly corresponding to the palm thrust throttle value.
2. **Ignition Spark**:
   - High-pass filtered noise pulse with exponential decay over 120 milliseconds, simulating torch igniters firing into the pre-burner domes.
