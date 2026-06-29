"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { rooms, planUnits, company } from "@/lib/content";
import { useT } from "@/lib/i18n";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------- tunables ---------- */
const S = 0.095; // plan-unit -> world scale
const WALL_H = 1.18; // full wall height (world)
const WALL_T = 0.13; // wall thickness
const TILE_T = 0.1; // floor tile thickness
const FIT = 13.5; // world units guaranteed visible on the limiting axis
const ISO_POLAR = 0.9553; // 54.74° from zenith = true isometric elevation
const START_AZ = Math.PI / 4; // 45°

// flat blueprint-diagram palette
const KIND_COLOR: Record<string, string> = {
  living: "#f4d9a6",
  bed: "#cfe0f2",
  kitchen: "#bfe8df",
  wet: "#e3e7eb",
  hall: "#efe8d8",
  dress: "#e8e0cf",
  balcony: "#d4ecc9",
};

// realistic floor base colours for the RENDER look
const KIND_FLOOR: Record<string, string> = {
  living: "#c79f6a", // warm oak
  bed: "#d4b483", // light oak
  kitchen: "#dfe3e6", // porcelain tile
  wet: "#e7eaec", // bathroom tile
  hall: "#c2a06a", // oak
  dress: "#cdb084", // oak
  balcony: "#b6a98f", // stone deck
};
const TILE_KINDS = new Set(["wet", "kitchen"]);

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const smooth = (a: number, b: number, x: number) => {
  const e = clamp01((x - a) / (b - a));
  return e * e * (3 - 2 * e);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* world helpers — origin centred on the plan footprint */
const cx = (r: { x: number; w: number }) =>
  (r.x + r.w / 2 - planUnits.w / 2) * S;
const cz = (r: { y: number; h: number }) =>
  (r.y + r.h / 2 - planUnits.h / 2) * S;

function makeLabelTexture(color: string, label: string, area: string, ww: number, wd: number) {
  const px = 110;
  const cw = Math.max(64, Math.round(ww * px));
  const ch = Math.max(64, Math.round(wd * px));
  const c = document.createElement("canvas");
  c.width = cw;
  c.height = ch;
  const g = c.getContext("2d")!;
  g.fillStyle = color;
  g.fillRect(0, 0, cw, ch);
  g.strokeStyle = "rgba(20,22,26,0.10)";
  g.lineWidth = Math.max(2, Math.min(cw, ch) * 0.035);
  g.strokeRect(g.lineWidth, g.lineWidth, cw - g.lineWidth * 2, ch - g.lineWidth * 2);
  const base = Math.min(cw, ch);
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillStyle = "#22262b";
  g.font = `600 ${Math.max(13, base * 0.17)}px "Space Grotesk", system-ui, sans-serif`;
  g.fillText(label, cw / 2, ch / 2 - base * 0.07);
  g.fillStyle = "rgba(34,38,43,0.55)";
  g.font = `400 ${Math.max(10, base * 0.12)}px "JetBrains Mono", monospace`;
  g.fillText(`${area} m²`, cw / 2, ch / 2 + base * 0.12);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

// procedural wood-plank / tile floor for the RENDER look
function makeFloorTexture(kind: string, ww: number, wd: number) {
  const px = 70;
  const cw = Math.max(96, Math.round(ww * px));
  const ch = Math.max(96, Math.round(wd * px));
  const c = document.createElement("canvas");
  c.width = cw;
  c.height = ch;
  const g = c.getContext("2d")!;
  const base = KIND_FLOOR[kind] ?? "#cdb084";
  g.fillStyle = base;
  g.fillRect(0, 0, cw, ch);

  if (TILE_KINDS.has(kind)) {
    // square tiles + grout
    const step = Math.max(26, Math.min(cw, ch) * 0.16);
    g.strokeStyle = "rgba(120,128,134,0.35)";
    g.lineWidth = 2;
    for (let x = step; x < cw; x += step) {
      g.beginPath();
      g.moveTo(x, 0);
      g.lineTo(x, ch);
      g.stroke();
    }
    for (let y = step; y < ch; y += step) {
      g.beginPath();
      g.moveTo(0, y);
      g.lineTo(cw, y);
      g.stroke();
    }
  } else {
    // wood planks (long axis = longer side)
    const horiz = ww >= wd;
    const span = horiz ? ch : cw;
    const plank = Math.max(20, span * 0.16);
    g.lineWidth = 2;
    for (let p = plank; p < span; p += plank) {
      g.strokeStyle = "rgba(60,42,22,0.28)";
      g.beginPath();
      if (horiz) {
        g.moveTo(0, p);
        g.lineTo(cw, p);
      } else {
        g.moveTo(p, 0);
        g.lineTo(p, ch);
      }
      g.stroke();
    }
    // faint grain streaks
    g.strokeStyle = "rgba(80,56,30,0.10)";
    g.lineWidth = 1;
    for (let i = 0; i < 60; i++) {
      const a = Math.random();
      g.beginPath();
      if (horiz) {
        const y = a * ch;
        g.moveTo(Math.random() * cw, y);
        g.lineTo(Math.random() * cw, y);
      } else {
        const x = a * cw;
        g.moveTo(x, Math.random() * ch);
        g.lineTo(x, Math.random() * ch);
      }
      g.stroke();
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

export default function ScrollPlanHero() {
  const { t } = useT();
  const tx = t.intro;
  const h = t.hero;

  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const titleRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);

  const progress = useRef(0);

  // visual style — kept as an option (diagram = blueprint look, render = PBR look)
  const [mode, setMode] = useState<"diagram" | "render">("render");
  useEffect(() => {
    const s = window.localStorage.getItem("meridian-hero-style");
    if (s === "render" || s === "diagram") setMode(s);
  }, []);
  const setStyle = (m: "diagram" | "render") => {
    setMode(m);
    try {
      window.localStorage.setItem("meridian-hero-style", m);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    const rendered = mode === "render";
    const canvas = canvasRef.current!;
    const stage = stageRef.current!;

    /* ---------- renderer ---------- */
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = rendered ? THREE.ACESFilmicToneMapping : THREE.NoToneMapping;
    renderer.toneMappingExposure = rendered ? 1.05 : 1.0;

    const scene = new THREE.Scene();

    // soft image-based lighting for the render look
    let pmrem: THREE.PMREMGenerator | null = null;
    if (rendered) {
      pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    }

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 200);
    camera.position.set(0, 40, 0);

    /* ---------- lights ---------- */
    const hemi = new THREE.HemisphereLight(0xffffff, 0xcfc8b6, rendered ? 0.35 : 1.05);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(rendered ? 0xfff1dc : 0xffffff, rendered ? 2.1 : 1.15);
    dir.position.set(6, 14, 8);
    dir.castShadow = true;
    const sm = rendered ? 2048 : 1024;
    dir.shadow.mapSize.set(sm, sm);
    dir.shadow.radius = rendered ? 6 : 3;
    dir.shadow.camera.near = 1;
    dir.shadow.camera.far = 60;
    const d = 9;
    dir.shadow.camera.left = -d;
    dir.shadow.camera.right = d;
    dir.shadow.camera.top = d;
    dir.shadow.camera.bottom = -d;
    dir.shadow.bias = -0.0004;
    scene.add(dir);
    const fill = new THREE.DirectionalLight(0xffffff, rendered ? 0.18 : 0.35);
    fill.position.set(-8, 6, -6);
    scene.add(fill);

    /* ---------- model (built from the same room data as the 2D plan) ---------- */
    const model = new THREE.Group();
    scene.add(model);

    const planW = planUnits.w * S;
    const planD = planUnits.h * S;

    // base slab
    const slab = new THREE.Mesh(
      new THREE.BoxGeometry(planW + 0.7, 0.2, planD + 0.7),
      new THREE.MeshStandardMaterial({
        color: rendered ? 0xe7dfcc : 0xf1ecdf,
        roughness: rendered ? 0.65 : 0.95,
        metalness: 0,
        envMapIntensity: rendered ? 0.8 : 0,
      })
    );
    slab.position.y = -0.11;
    slab.receiveShadow = true;
    model.add(slab);

    const WH = rendered ? 0.92 : WALL_H; // shorter render walls reveal floors
    const wallMat = new THREE.MeshStandardMaterial({
      color: rendered ? 0xe7ddc9 : 0xf4f1ea, // warm plaster vs flat white
      roughness: rendered ? 0.85 : 0.72,
      metalness: 0,
      envMapIntensity: rendered ? 0.8 : 0,
    });

    const wallMeshes: THREE.Mesh[] = [];
    const edgeMats: THREE.LineBasicMaterial[] = [];

    for (const r of rooms) {
      const ww = r.w * S;
      const wd = r.h * S;
      const x = cx(r);
      const z = cz(r);
      const color = KIND_COLOR[r.kind] ?? "#e8e2d2";

      // floor tile — top face carries the baked room label
      const top = new THREE.MeshStandardMaterial({
        map: rendered
          ? makeFloorTexture(r.kind, ww, wd)
          : makeLabelTexture(color, r.label, r.area, ww, wd),
        roughness: rendered ? (TILE_KINDS.has(r.kind) ? 0.35 : 0.55) : 0.85,
        metalness: 0,
        envMapIntensity: rendered ? 0.85 : 0,
      });
      const side = new THREE.MeshStandardMaterial({
        color: rendered ? (KIND_FLOOR[r.kind] ?? color) : color,
        roughness: rendered ? 0.6 : 0.9,
        envMapIntensity: rendered ? 0.7 : 0,
      });
      const tile = new THREE.Mesh(
        new THREE.BoxGeometry(ww, TILE_T, wd),
        [side, side, top, side, side, side]
      );
      tile.position.set(x, TILE_T / 2, z);
      tile.receiveShadow = true;
      tile.castShadow = false;
      model.add(tile);

      // accent edge outline (reads as the "drawing" in the flat phase)
      const edgeMat = new THREE.LineBasicMaterial({
        color: 0xff5d2e,
        transparent: true,
        opacity: 0.55,
      });
      edgeMats.push(edgeMat);
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(ww, TILE_T, wd)),
        edgeMat
      );
      edges.position.set(x, TILE_T / 2 + 0.002, z);
      edges.visible = !rendered;
      model.add(edges);

      // four perimeter walls (rise in place — geometry never moves in plan)
      const segs: [number, number, number, number][] = [
        [ww + WALL_T, WALL_T, x, z - wd / 2], // north
        [ww + WALL_T, WALL_T, x, z + wd / 2], // south
        [WALL_T, wd + WALL_T, x - ww / 2, z], // west
        [WALL_T, wd + WALL_T, x + ww / 2, z], // east
      ];
      for (const [sw, sd, wx, wz] of segs) {
        const wall = new THREE.Mesh(new THREE.BoxGeometry(sw, WH, sd), wallMat);
        wall.position.set(wx, 0, wz);
        wall.castShadow = true;
        wall.receiveShadow = true;
        wall.userData.wx = wx;
        wall.userData.wz = wz;
        wallMeshes.push(wall);
        model.add(wall);
      }
    }

    // outer footprint outline
    const outlineMat = new THREE.LineBasicMaterial({
      color: 0xff5d2e,
      transparent: true,
      opacity: 0.7,
    });
    edgeMats.push(outlineMat);
    const outline = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(planW, TILE_T, planD)),
      outlineMat
    );
    outline.position.y = TILE_T / 2 + 0.003;
    outline.visible = !rendered;
    model.add(outline);

    // soft contact shadow catcher
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(120, 120),
      rendered
        ? new THREE.MeshStandardMaterial({
            color: 0xe9e2d3,
            roughness: 0.55,
            metalness: 0,
            envMapIntensity: 0.7,
          })
        : new THREE.ShadowMaterial({ opacity: 0.12 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.115; // sits just under the slab
    ground.receiveShadow = true;
    scene.add(ground);

    // soft studio backdrop (render only) — grounds the model in a scene
    if (rendered) {
      const bg = document.createElement("canvas");
      bg.width = 16;
      bg.height = 256;
      const bgc = bg.getContext("2d")!;
      const grd = bgc.createLinearGradient(0, 0, 0, 256);
      grd.addColorStop(0, "#f6f1e7");
      grd.addColorStop(0.55, "#efe7d6");
      grd.addColorStop(1, "#e3dac6");
      bgc.fillStyle = grd;
      bgc.fillRect(0, 0, 16, 256);
      const bgt = new THREE.CanvasTexture(bg);
      bgt.colorSpace = THREE.SRGBColorSpace;
      scene.background = bgt;
    }

    /* ---------- sizing ---------- */
    const resize = () => {
      const w = stage.clientWidth;
      const ht = stage.clientHeight;
      renderer.setSize(w, ht, false);
      const aspect = w / ht;
      let halfW: number, halfH: number;
      if (aspect >= 1) {
        halfH = FIT / 2;
        halfW = halfH * aspect;
      } else {
        halfW = FIT / 2;
        halfH = halfW / aspect;
      }
      camera.left = -halfW;
      camera.right = halfW;
      camera.top = halfH;
      camera.bottom = -halfH;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    /* ---------- per-frame update ---------- */
    const updateOverlay = (el: HTMLElement | null, opacity: number, ty = 0) => {
      if (!el) return;
      el.style.opacity = String(opacity);
      el.style.transform = `translate3d(0, ${ty}px, 0)`;
      el.style.pointerEvents = opacity > 0.5 ? "auto" : "none";
    };

    const update = () => {
      const p = progress.current;
      const tilt = smooth(0.0, 0.45, p); // 2D -> 3D
      const spin = smooth(0.45, 1.0, p); // 360° rotation

      // walls extrude in place
      const wallP = tilt;
      for (const w of wallMeshes) {
        w.scale.y = Math.max(0.0001, wallP);
        w.position.y = (WH * wallP) / 2;
      }
      // accent outlines fade as the solid form takes over
      const eo = 1 - 0.75 * tilt;
      for (const m of edgeMats) m.opacity = m === outlineMat ? 0.7 * eo : 0.55 * eo;

      // camera: axis-aligned top-down -> isometric (45°), then orbit a full turn
      const polar = lerp(0.0006, ISO_POLAR, tilt);
      const az = lerp(0, START_AZ, tilt) + spin * Math.PI * 2;
      const R = 40;
      camera.position.set(
        R * Math.sin(polar) * Math.cos(az),
        R * Math.cos(polar),
        R * Math.sin(polar) * Math.sin(az)
      );
      camera.up.set(0, 1, 0);
      camera.lookAt(0, lerp(0, 0.45, tilt), 0);

      // overlays (driven directly — no React re-render)
      updateOverlay(titleRef.current, 1 - smooth(0.02, 0.3, p), -smooth(0.02, 0.3, p) * 40);
      updateOverlay(hintRef.current, 1 - smooth(0.0, 0.1, p));
      updateOverlay(outroRef.current, smooth(0.6, 0.92, p), (1 - smooth(0.6, 0.92, p)) * 30);

      const status = statusRef.current;
      if (status) {
        let label = tx.clickToBuild;
        if (p > 0.06 && p < 0.45) label = tx.assembling;
        else if (p >= 0.45 && p < 0.97) label = "360°";
        else if (p >= 0.97) label = tx.doneLine;
        if (status.dataset.label !== label) {
          status.textContent = label;
          status.dataset.label = label;
        }
        status.style.opacity = String(0.4 + 0.6 * Math.sin(Math.min(p, 0.99) * Math.PI));
      }
    };

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      update();
      renderer.render(scene, camera);
    };
    loop();

    /* ---------- scroll driver ---------- */
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: stage,
      pinSpacing: true,
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });
    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      st.kill();
      if (pmrem) pmrem.dispose();
      if (scene.environment) scene.environment.dispose();
      renderer.dispose();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = (m as any).material;
        if (Array.isArray(mat)) mat.forEach((x: THREE.Material) => x.dispose());
        else if (mat) mat.dispose();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t.code, mode]);

  return (
    <section id="top" ref={sectionRef} className="relative h-[500vh]">
      <div ref={stageRef} className="relative h-[100svh] w-full overflow-hidden">
        {/* faint blueprint grid behind the model */}
        <div className="pointer-events-none absolute inset-0 bp-grid opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(255,93,46,0.06),transparent_60%)]" />

        {/* three.js canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* ---- headline (fades as the plan lifts) ---- */}
        <div
          ref={titleRef}
          className="pointer-events-none absolute inset-x-0 top-[12%] z-20 flex flex-col items-center px-6 text-center"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-glow" />
            <span className="font-mono text-[10px] tracking-[0.4em] text-glow">
              {h.kicker}
            </span>
            <span className="h-px w-10 bg-glow" />
          </div>
          <h1 className="font-display text-[12vw] font-medium leading-[0.9] tracking-[-0.02em] text-mist md:text-[7vw]">
            {h.h1.a} <span className="italic text-glow">{h.h1.em}</span> {h.h1.b}
          </h1>
          <p className="mt-5 max-w-md font-sans text-sm leading-relaxed text-fog md:text-base">
            {h.paragraph}
          </p>
        </div>

        {/* ---- status pill (centre) ---- */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 flex justify-center">
          <div
            ref={statusRef}
            className="translate-y-[34vh] font-mono text-[11px] tracking-[0.45em] text-glow"
          >
            {tx.clickToBuild}
          </div>
        </div>

        {/* ---- scroll hint ---- */}
        <div
          ref={hintRef}
          className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] tracking-[0.4em] text-fog">
            {tx.clickToBuild}
          </span>
          <span className="relative flex h-9 w-5 justify-center rounded-full border border-line">
            <span className="mt-1.5 h-1.5 w-1.5 animate-bounce rounded-full bg-glow" />
          </span>
        </div>

        {/* ---- outro (fades in once the model is 3D + spinning) ---- */}
        <div
          ref={outroRef}
          style={{ opacity: 0 }}
          className="absolute inset-x-0 bottom-0 z-20"
        >
          <div className="mx-auto mb-6 max-w-md px-6 text-center">
            <p className="font-display text-lg italic text-mist md:text-xl">
              {tx.doneLine}
            </p>
          </div>
          <div className="border-y border-line/70 bg-graphite/60 backdrop-blur-sm">
            <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-line/70 md:grid-cols-4">
              {h.strip.map(([k, v]) => (
                <div key={k} className="px-6 py-4 md:px-8">
                  <div className="font-mono text-[9px] tracking-[0.3em] text-fog">{k}</div>
                  <div className="mt-1 font-sans text-sm text-mist">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---- style option: diagram <-> render ---- */}
        <div className="absolute left-5 bottom-16 z-30 flex items-center gap-1 rounded-full border border-line bg-graphite/70 p-0.5 backdrop-blur-sm md:bottom-8">
          {(["diagram", "render"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setStyle(m)}
              className={`rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.25em] transition-colors ${
                mode === m ? "bg-glow text-white" : "text-fog hover:text-mist"
              }`}
            >
              {m === "diagram" ? "Plan" : "Render"}
            </button>
          ))}
        </div>

        {/* corner ticks */}
        {[
          "left-5 top-5 border-l border-t",
          "right-5 top-5 border-r border-t",
          "left-5 bottom-5 border-l border-b",
          "right-5 bottom-5 border-r border-b",
        ].map((c, i) => (
          <div
            key={i}
            className={`pointer-events-none absolute h-5 w-5 border-glow/40 ${c}`}
          />
        ))}
      </div>
    </section>
  );
}
