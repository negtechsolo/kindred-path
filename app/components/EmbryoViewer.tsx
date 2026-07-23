"use client";

import { useEffect, useRef, useState } from "react";

export const STAGES = [
  {
    day: "Day 1",
    name: "Fertilisation",
    copy: "A single fertilised cell. At this point an embryologist is confirming that fertilisation has actually occurred, which is not a given.",
  },
  {
    day: "Day 2",
    name: "Early division",
    copy: "The cell divides into two, then four. The pace and evenness of these divisions is one of the earliest signals embryologists watch.",
  },
  {
    day: "Day 3",
    name: "Cleavage stage",
    copy: "Around eight cells. Some embryos are transferred at this point. Others are cultured further to see which continue developing.",
  },
  {
    day: "Day 5",
    name: "Blastocyst",
    copy: "A fluid cavity forms and the cells separate into two groups: the outer layer that becomes the placenta, and the inner cell mass that becomes the baby.",
  },
];

const MAX_CELLS = 58;

/** Fixed cell layouts for each development stage. */
function layout(stage: number): { x: number; y: number; z: number; r: number }[] {
  const cells: { x: number; y: number; z: number; r: number }[] = [];
  if (stage === 0) {
    cells.push({ x: 0, y: 0, z: 0, r: 0.86 });
  } else if (stage === 1) {
    const t = 0.42;
    [
      [t, t, t],
      [-t, -t, t],
      [-t, t, -t],
      [t, -t, -t],
    ].forEach(([x, y, z]) => cells.push({ x, y, z, r: 0.55 }));
  } else if (stage === 2) {
    const t = 0.4;
    for (let i = 0; i < 8; i += 1) {
      cells.push({
        x: i & 1 ? t : -t,
        y: i & 2 ? t : -t,
        z: i & 4 ? t : -t,
        r: 0.44,
      });
    }
  } else {
    // Blastocyst: outer trophectoderm shell plus an inner cell mass cluster.
    const shell = 44;
    for (let i = 0; i < shell; i += 1) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / shell);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      cells.push({
        x: Math.sin(phi) * Math.cos(theta) * 0.8,
        y: Math.sin(phi) * Math.sin(theta) * 0.8,
        z: Math.cos(phi) * 0.8,
        r: 0.17,
      });
    }
    for (let i = 0; i < 12; i += 1) {
      const a = (i / 12) * Math.PI * 2;
      const ring = i < 6 ? 0.17 : 0.3;
      cells.push({
        x: -0.34 + Math.cos(a) * ring * 0.6,
        y: 0.3 + Math.sin(a) * ring,
        z: 0.28 + Math.cos(a * 1.7) * ring * 0.5,
        r: 0.2,
      });
    }
  }
  return cells;
}

export function EmbryoViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef(0);
  const [stage, setStage] = useState(0);
  const [live, setLive] = useState(false);

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 720px)").matches) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        // three.js is only downloaded once the viewer is actually on screen.
        import("three")
          .then((THREE) => {
            if (disposed) return;
            setLive(true);

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
            camera.position.set(0, 0, 4.6);

            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setSize(mount.clientWidth, mount.clientHeight);
            mount.appendChild(renderer.domElement);

            scene.add(new THREE.AmbientLight(0xffffff, 0.55));
            const key = new THREE.DirectionalLight(0xf3e7ff, 2.4);
            key.position.set(3, 4, 5);
            scene.add(key);
            const warm = new THREE.PointLight(0xb89459, 3.2, 14);
            warm.position.set(-3, -1.6, 2.6);
            scene.add(warm);
            const cool = new THREE.PointLight(0x945aa8, 3.6, 14);
            cool.position.set(2.6, -2.4, -2.4);
            scene.add(cool);

            const group = new THREE.Group();
            scene.add(group);

            // Zona pellucida, the shell surrounding the embryo.
            const zona = new THREE.Mesh(
              new THREE.SphereGeometry(1.16, 48, 48),
              new THREE.MeshStandardMaterial({
                color: 0xd8c4e4,
                transparent: true,
                opacity: 0.16,
                roughness: 0.15,
                metalness: 0.1,
                side: THREE.DoubleSide,
              }),
            );
            group.add(zona);

            const geometry = new THREE.SphereGeometry(1, 24, 24);
            const cellMaterial = new THREE.MeshStandardMaterial({
              color: 0xf6ecfa,
              roughness: 0.34,
              metalness: 0.05,
              transparent: true,
              opacity: 0.96,
            });
            const massMaterial = new THREE.MeshStandardMaterial({
              color: 0xb98fd0,
              roughness: 0.3,
              metalness: 0.08,
            });

            const cells = Array.from({ length: MAX_CELLS }, (_, i) => {
              const mesh = new THREE.Mesh(geometry, i >= 44 ? massMaterial : cellMaterial);
              mesh.scale.setScalar(0.001);
              group.add(mesh);
              return mesh;
            });

            const target = layout(0);
            const current = cells.map((_, i) => ({
              x: target[i]?.x ?? 0,
              y: target[i]?.y ?? 0,
              z: target[i]?.z ?? 0,
              r: 0,
            }));

            let dragging = false;
            let lastX = 0;
            let spin = 0;
            let velocity = 0.0028;

            const down = (e: PointerEvent) => {
              dragging = true;
              lastX = e.clientX;
              renderer.domElement.setPointerCapture(e.pointerId);
            };
            const move = (e: PointerEvent) => {
              if (!dragging) return;
              velocity = (e.clientX - lastX) * 0.004;
              spin += velocity;
              lastX = e.clientX;
            };
            const up = () => {
              dragging = false;
            };
            renderer.domElement.addEventListener("pointerdown", down);
            renderer.domElement.addEventListener("pointermove", move);
            renderer.domElement.addEventListener("pointerup", up);
            renderer.domElement.addEventListener("pointerleave", up);

            const resize = () => {
              if (!mount.clientWidth) return;
              renderer.setSize(mount.clientWidth, mount.clientHeight);
              camera.aspect = mount.clientWidth / mount.clientHeight;
              camera.updateProjectionMatrix();
            };
            const ro = new ResizeObserver(resize);
            ro.observe(mount);
            resize();

            let frame = 0;
            const tick = () => {
              frame = requestAnimationFrame(tick);
              const want = layout(stageRef.current);
              cells.forEach((mesh, i) => {
                const goal = want[i] ?? { x: 0, y: 0, z: 0, r: 0 };
                const c = current[i];
                c.x += (goal.x - c.x) * 0.06;
                c.y += (goal.y - c.y) * 0.06;
                c.z += (goal.z - c.z) * 0.06;
                c.r += (goal.r - c.r) * 0.07;
                mesh.position.set(c.x, c.y, c.z);
                mesh.scale.setScalar(Math.max(c.r, 0.0001));
                mesh.visible = c.r > 0.004;
              });
              if (!dragging) {
                velocity += (0.0028 - velocity) * 0.04;
                spin += velocity;
              }
              group.rotation.y = spin;
              group.rotation.x = Math.sin(spin * 0.4) * 0.16;
              renderer.render(scene, camera);
            };
            tick();

            cleanup = () => {
              cancelAnimationFrame(frame);
              ro.disconnect();
              renderer.domElement.removeEventListener("pointerdown", down);
              renderer.domElement.removeEventListener("pointermove", move);
              renderer.domElement.removeEventListener("pointerup", up);
              renderer.domElement.removeEventListener("pointerleave", up);
              geometry.dispose();
              cellMaterial.dispose();
              massMaterial.dispose();
              zona.geometry.dispose();
              (zona.material as InstanceType<typeof THREE.Material>).dispose();
              renderer.dispose();
              if (renderer.domElement.parentNode) renderer.domElement.remove();
            };
          })
          .catch(() => setLive(false));
      },
      { threshold: 0.2 },
    );

    observer.observe(mount);
    return () => {
      disposed = true;
      observer.disconnect();
      cleanup?.();
    };
  }, []);

  const active = STAGES[stage];

  return (
    <div className="embryo-viewer">
      <div className="embryo-stage">
        <span className="embryo-daytag" aria-hidden="true">{STAGES[stage].day}</span>
        <div className="embryo-canvas" ref={mountRef} aria-hidden="true" />
        {!live && (
          <div className="embryo-fallback" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        )}
        <p className="embryo-hint" aria-hidden="true">
          Drag to rotate
        </p>
      </div>

      <div className="embryo-panel">
        <span className="eyebrow">What actually happens in the lab</span>
        <h3>
          {active.day}: <em>{active.name}</em>
        </h3>
        <p>{active.copy}</p>
        <div className="embryo-steps" role="tablist" aria-label="Embryo development stages">
          {STAGES.map((s, i) => (
            <button
              key={s.day}
              type="button"
              role="tab"
              aria-selected={i === stage}
              className={i === stage ? "is-active" : undefined}
              onClick={() => setStage(i)}
            >
              <strong>{s.day}</strong>
              <span>{s.name}</span>
            </button>
          ))}
        </div>
        <p className="embryo-note">
          Not every embryo reaches every stage, and that is normal rather than a failure. Your
          embryologist will explain what happened in your own cycle.
        </p>
      </div>
    </div>
  );
}
