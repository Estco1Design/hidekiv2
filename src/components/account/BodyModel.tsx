"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { measurements, type MeasurementId } from "@/data/measurements";

export default function BodyModel({
  selected,
  ru,
  value,
}: {
  selected: MeasurementId;
  ru: boolean;
  value?: number;
}) {
  const mount = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    ring: THREE.Group;
    body: THREE.Group;
    draw: () => void;
  } | null>(null);
  const [failed, setFailed] = useState(false);
  const [rotation, setRotation] = useState(0);
  useEffect(() => {
    if (!mount.current) return;
    const container = mount.current;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0.3, 6.8);
    scene.add(new THREE.HemisphereLight(0xdde8ff, 0x222222, 3));
    const light = new THREE.DirectionalLight(0xffffff, 5);
    light.position.set(-3, 3, 4);
    scene.add(light);
    const rim = new THREE.DirectionalLight(0x8899bb, 4);
    rim.position.set(3, 2, -2);
    scene.add(rim);
    const material = new THREE.MeshStandardMaterial({
      color: 0x606974,
      metalness: 0.8,
      roughness: 0.28,
    });
    const body = new THREE.Group();
    scene.add(body);
    const add = (
      geo: THREE.BufferGeometry,
      x: number,
      y: number,
      z: number,
      sx = 1,
      sy = 1,
      sz = 1,
    ) => {
      const mesh = new THREE.Mesh(geo, material);
      mesh.position.set(x, y, z);
      mesh.scale.set(sx, sy, sz);
      body.add(mesh);
      return mesh;
    };
    const points = [
      [0.23, -0.15],
      [0.33, 0.03],
      [0.31, 0.17],
      [0.25, 0.38],
      [0.3, 0.61],
      [0.35, 0.83],
      [0.33, 0.94],
      [0.19, 1.05],
      [0.12, 1.14],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    add(new THREE.LatheGeometry(points, 48), 0, 0, 0, 1, 1, 0.65);
    add(new THREE.CylinderGeometry(0.11, 0.13, 0.18, 32), 0, 1.15, 0);
    add(new THREE.SphereGeometry(1, 32, 24), 0, 1.43, 0, 0.18, 0.24, 0.17);
    for (const sign of [-1, 1]) {
      add(
        new THREE.SphereGeometry(1, 24, 16),
        sign * 0.36,
        0.86,
        0,
        0.13,
        0.14,
        0.13,
      );
      const arm = add(
        new THREE.CapsuleGeometry(0.085, 0.55, 8, 20),
        sign * 0.43,
        0.52,
        0,
      );
      arm.rotation.z = sign * 0.15;
      const forearm = add(
        new THREE.CapsuleGeometry(0.065, 0.47, 8, 20),
        sign * 0.5,
        -0.03,
        0,
      );
      forearm.rotation.z = sign * 0.05;
      add(
        new THREE.SphereGeometry(1, 16, 12),
        sign * 0.52,
        -0.36,
        0,
        0.075,
        0.13,
        0.05,
      );
      add(
        new THREE.CapsuleGeometry(0.125, 0.49, 8, 24),
        sign * 0.17,
        -0.45,
        0,
        1,
        1,
        1.05,
      );
      add(new THREE.CapsuleGeometry(0.085, 0.5, 8, 24), sign * 0.17, -1.06, 0);
      add(
        new THREE.SphereGeometry(1, 20, 16),
        sign * 0.17,
        -1.4,
        0.065,
        0.095,
        0.07,
        0.2,
      );
    }
    const ring = new THREE.Group();
    body.add(ring);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.08, 0);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI * 0.25;
    controls.maxPolarAngle = Math.PI * 0.75;
    const draw = () => renderer.render(scene, camera);
    controls.addEventListener("change", draw);
    const resize = new ResizeObserver(() => {
      const w = container.clientWidth,
        h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      draw();
    });
    resize.observe(container);
    sceneRef.current = { scene, ring, body, draw };
    draw();
    return () => {
      sceneRef.current = null;
      resize.disconnect();
      controls.dispose();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.Line) {
          o.geometry.dispose();
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          mats.forEach((m) => m.dispose());
        } else if (o instanceof THREE.Sprite) {
          o.material.map?.dispose();
          o.material.dispose();
        }
      });
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  useEffect(() => {
    const state = sceneRef.current;
    if (!state) return;
    for (const child of [...state.ring.children]) {
      state.ring.remove(child);
      if (child instanceof THREE.Line) {
        child.geometry.dispose();
        (child.material as THREE.Material).dispose();
      } else if (child instanceof THREE.Sprite) {
        child.material.map?.dispose();
        child.material.dispose();
      }
    }
    const m = measurements.find((x) => x.id === selected)!;
    const points: THREE.Vector3[] = [];
    if (m.rx)
      for (let i = 0; i <= 128; i++) {
        const angle = (i / 128) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * m.rx,
            m.y,
            Math.sin(angle) * m.rz,
          ),
        );
      }
    else if (selected === "height")
      points.push(
        new THREE.Vector3(-0.72, -1.48, 0),
        new THREE.Vector3(-0.72, 1.67, 0),
      );
    else if (selected === "inseam")
      points.push(
        new THREE.Vector3(0.05, -1.43, 0.13),
        new THREE.Vector3(0.05, -0.14, 0.13),
      );
    if (points.length) {
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({
          color: 0xf5d7a4,
          depthTest: false,
          transparent: true,
          opacity: 1,
        }),
      );
      line.renderOrder = 10;
      state.ring.add(line);
    }
    const canvas = document.createElement("canvas");
    canvas.width = 768;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#0b1018";
      ctx.fillRect(0, 0, 768, 128);
      ctx.strokeStyle = "#f5d7a4";
      ctx.strokeRect(1, 1, 766, 126);
      ctx.fillStyle = "#f5d7a4";
      ctx.font = "30px Arial";
      ctx.textAlign = "center";
      ctx.fillText(ru ? m.ru : m.en, 384, 52);
      ctx.fillStyle = "#ffffff";
      ctx.font = "28px Arial";
      ctx.fillText(
        value === undefined
          ? ru
            ? "Линия измерения"
            : "Measurement line"
          : `${value} ${m.unit === "cm" ? (ru ? "см" : "cm") : ru ? "кг" : "kg"}`,
        384,
        96,
      );
      const texture = new THREE.CanvasTexture(canvas);
      const label = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: texture,
          depthTest: false,
          transparent: true,
        }),
      );
      label.position.set(
        0.6,
        selected === "height" ? 1.6 : selected === "weight" ? 0.4 : m.y,
        0.15,
      );
      label.scale.set(1.05, 0.175, 1);
      label.renderOrder = 11;
      state.ring.add(label);
    }
    state.draw();
  }, [selected, failed, ru, value]);
  function rotate(value: number) {
    setRotation(value);
    if (sceneRef.current) {
      sceneRef.current.body.rotation.y = (value * Math.PI) / 180;
      sceneRef.current.draw();
    }
  }
  return (
    <div className="body-viewer">
      <div
        className="body-stage"
        ref={mount}
        role="img"
        aria-label={
          ru
            ? "Вращаемый учебный манекен с линией выбранной мерки"
            : "Rotatable reference mannequin with selected measurement line"
        }
      />
      {failed && (
        <p className="model-fallback">
          {ru
            ? "3D недоступно в этом браузере. Инструкции по снятию мерок доступны справа."
            : "3D is unavailable in this browser. Use the measurement instructions."}
        </p>
      )}
      <div className="body-caption">
        <span>
          {ru
            ? "Учебный манекен, не скан тела"
            : "Reference mannequin, not a body scan"}
        </span>
        <span>{ru ? "Потяните, чтобы вращать" : "Drag to rotate"}</span>
      </div>
      <label className="rotation-control">
        {ru ? "Повернуть модель" : "Rotate model"}
        <input
          type="range"
          min="-180"
          max="180"
          value={rotation}
          onChange={(e) => rotate(Number(e.target.value))}
        />
        <button onClick={() => rotate(0)}>{ru ? "Сбросить" : "Reset"}</button>
      </label>
    </div>
  );
}
