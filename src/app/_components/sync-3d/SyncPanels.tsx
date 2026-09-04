import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import type { BuildScene, SceneBuilder } from "../solution/SolutionScene";
import { LETTER_GEOMETRY_BUILDERS } from "./letter-geometry";
import { LAYERS } from "./sync-content";

const PANEL_COUNT = 4;
const PANEL_W = 2.6;
const PANEL_H = 3.4;
const PANEL_RADIUS = 0.14;
const PANEL_THICKNESS = 0.08;

const BROKEN_COLOR = new THREE.Color("#6b6b78");
const CONVERTED_COLOR = new THREE.Color("#5c45fd");
const LETTER_EMISSIVE = new THREE.Color("#a89bff");

const BROKEN_OFFSETS = [
  { x: -1.6, y: 0.6, z: -3.2, rx: 0.18, ry: -0.5, rz: 0.12 },
  { x: 1.3, y: -0.4, z: -1.6, rx: -0.12, ry: 0.35, rz: -0.08 },
  { x: -1.1, y: -0.9, z: 0.4, rx: 0.22, ry: -0.28, rz: 0.1 },
  { x: 1.7, y: 0.7, z: 2.2, rx: -0.16, ry: 0.4, rz: -0.14 },
];

const PARTICLE_COUNT = 110;
const FALL_TOP = 4.2;
const FALL_BOTTOM = -4.2;
const PARTICLE_GREY = new THREE.Color("#6b6b78");
const PARTICLE_PURPLE = new THREE.Color("#a89bff");

function createRoundedRectShape(width: number, height: number, radius: number): THREE.Shape {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

interface PanelRig {
  group: THREE.Group;
  mesh: THREE.Mesh;
  material: THREE.MeshPhysicalMaterial;
  letter: THREE.Mesh;
  letterMaterial: THREE.MeshStandardMaterial;
  localProgress: number;
}

export interface SyncPanelsApi {
  setProgress: (p: number) => void;
  setHoverIndex: (index: number | null) => void;
}

export interface SyncPanelsHandle {
  buildScene: BuildScene;
  api: SyncPanelsApi;
}

// The four SYNC panels: scattered, desaturated glass in the broken state,
// one aligned glowing stack in the converted state, with a particle
// stream that misses the gaps at rest and gets caught once aligned.
export function createSyncPanelsScene(onHoverChange?: (index: number | null) => void): SyncPanelsHandle {
  let progress = 0;
  let hoverIndex: number | null = null;
  let panels: PanelRig[] = [];
  let particles: THREE.InstancedMesh | null = null;
  let rimLight: THREE.PointLight | null = null;
  let raycastTarget: THREE.Object3D[] = [];

  const api: SyncPanelsApi = {
    setProgress: (p: number) => {
      progress = THREE.MathUtils.clamp(p, 0, 1);
    },
    setHoverIndex: (index: number | null) => {
      if (index === hoverIndex) return;
      hoverIndex = index;
      onHoverChange?.(index);
    },
  };

  const buildScene: BuildScene = ({ scene, camera, renderer }) => {
    camera.position.set(0, 0, 8);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(-5, 6, 6);
    scene.add(keyLight);

    rimLight = new THREE.PointLight(0x5c45fd, 6, 14, 2);
    rimLight.position.set(0, 0, -3);
    scene.add(rimLight);

    const ambient = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambient);

    const shape = createRoundedRectShape(PANEL_W, PANEL_H, PANEL_RADIUS);
    const panelGeometry = new THREE.ExtrudeGeometry(shape, {
      depth: PANEL_THICKNESS,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 3,
      curveSegments: 8,
    });
    panelGeometry.center();

    panels = LAYERS.map((layer, i) => {
      const group = new THREE.Group();

      const material = new THREE.MeshPhysicalMaterial({
        color: BROKEN_COLOR.clone(),
        transmission: 0.6,
        roughness: 0.15,
        thickness: 0.6,
        clearcoat: 0.4,
        clearcoatRoughness: 0.2,
        ior: 1.4,
        metalness: 0,
      });
      const mesh = new THREE.Mesh(panelGeometry, material);
      group.add(mesh);

      const letterGeometry = LETTER_GEOMETRY_BUILDERS[layer.letter]();
      const letterMaterial = new THREE.MeshStandardMaterial({
        color: "#d8d3ff",
        emissive: 0x000000,
        emissiveIntensity: 0,
        roughness: 0.4,
        metalness: 0.1,
      });
      const letter = new THREE.Mesh(letterGeometry, letterMaterial);
      letter.position.z = PANEL_THICKNESS / 2 + 0.05;
      letter.userData.panelIndex = i;
      group.add(letter);

      const offset = BROKEN_OFFSETS[i];
      group.position.set(offset.x, offset.y, offset.z);
      group.rotation.set(offset.rx, offset.ry, offset.rz);
      scene.add(group);

      return { group, mesh, material, letter, letterMaterial, localProgress: 0 };
    });
    raycastTarget = panels.map((p) => p.letter);

    const particleGeometry = new THREE.SphereGeometry(0.045, 8, 8);
    const particleMaterial = new THREE.MeshStandardMaterial({ metalness: 0.1, roughness: 0.4 });
    particles = new THREE.InstancedMesh(particleGeometry, particleMaterial, PARTICLE_COUNT);
    const particlePhases = Array.from({ length: PARTICLE_COUNT }, () => Math.random());
    const particleX = Array.from({ length: PARTICLE_COUNT }, () => (Math.random() - 0.5) * 3.4);
    const particleMissDrift = Array.from({ length: PARTICLE_COUNT }, () => (Math.random() - 0.5) * 2.4);
    const particleSpeed = Array.from({ length: PARTICLE_COUNT }, () => 0.12 + Math.random() * 0.08);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      dummy.position.set(particleX[i], FALL_TOP - particlePhases[i] * (FALL_TOP - FALL_BOTTOM), 0);
      dummy.updateMatrix();
      particles.setMatrixAt(i, dummy.matrix);
      particles.setColorAt(i, PARTICLE_GREY);
    }
    scene.add(particles);

    // Pointer-driven hover raycasting, scoped to this canvas only.
    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();
    let localHover: number | null = null;
    function handlePointerMove(e: PointerEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObjects(raycastTarget, false);
      localHover = hits.length > 0 ? (hits[0].object.userData.panelIndex as number) : null;
      api.setHoverIndex(localHover);
    }
    renderer.domElement.addEventListener("pointermove", handlePointerMove);
    renderer.domElement.addEventListener("pointerleave", () => api.setHoverIndex(null));

    const tmpColor = new THREE.Color();

    return {
      update: (elapsed, _delta, pointer) => {
        // Stagger each panel's own convergence across the overall
        // progress so they lock into place one after another, not all
        // at once.
        panels.forEach((panel, i) => {
          const start = i * 0.12;
          const span = 1 - (PANEL_COUNT - 1) * 0.12;
          const local = THREE.MathUtils.clamp((progress - start) / span, 0, 1);
          const eased = 1 - Math.pow(1 - local, 3);
          panel.localProgress = eased;

          const offset = BROKEN_OFFSETS[i];
          const targetZ = i * 0.16;
          panel.group.position.x = THREE.MathUtils.lerp(offset.x, 0, eased);
          panel.group.position.y = THREE.MathUtils.lerp(offset.y, 0, eased);
          panel.group.position.z = THREE.MathUtils.lerp(offset.z, targetZ, eased);
          panel.group.rotation.x = THREE.MathUtils.lerp(offset.rx, 0, eased);
          panel.group.rotation.y = THREE.MathUtils.lerp(offset.ry, 0, eased);
          panel.group.rotation.z = THREE.MathUtils.lerp(offset.rz, 0, eased);

          tmpColor.copy(BROKEN_COLOR).lerp(CONVERTED_COLOR, eased);
          panel.material.color.copy(tmpColor);
          panel.material.transmission = THREE.MathUtils.lerp(0.75, 0.5, eased);

          const isHovered = hoverIndex === i;
          const letterEmissive = THREE.MathUtils.lerp(0.15, 1.1, eased) + (isHovered ? 0.6 : 0);
          panel.letterMaterial.emissive.copy(LETTER_EMISSIVE);
          panel.letterMaterial.emissiveIntensity = letterEmissive;
          panel.letterMaterial.color.copy(
            new THREE.Color("#8a8a94").lerp(new THREE.Color("#f5f5f5"), eased),
          );

          // Pointer tilt: front panels react more than back ones, and a
          // hovered letter pushes forward in Z on top of that.
          const depthFactor = 1 - i / (PANEL_COUNT - 1);
          const maxTiltDeg = THREE.MathUtils.lerp(1.5, 6, depthFactor);
          const maxTiltRad = THREE.MathUtils.degToRad(maxTiltDeg);
          panel.mesh.rotation.y = pointer.x * maxTiltRad;
          panel.mesh.rotation.x = -pointer.y * maxTiltRad;

          const hoverPush = isHovered ? 0.22 : 0;
          panel.letter.position.z = THREE.MathUtils.lerp(
            panel.letter.position.z,
            PANEL_THICKNESS / 2 + 0.05 + hoverPush,
            0.15,
          );
        });

        if (rimLight) {
          rimLight.position.x = pointer.x * 3;
          rimLight.position.y = -pointer.y * 2;
        }

        if (particles) {
          for (let i = 0; i < PARTICLE_COUNT; i++) {
            const phase = (particlePhases[i] + elapsed * particleSpeed[i]) % 1;
            const y = FALL_TOP - phase * (FALL_TOP - FALL_BOTTOM);

            // At progress 0 particles drift off and miss, at progress 1
            // they funnel to center once they pass the last panel.
            const passedAll = y < -1.6;
            const catchPull = passedAll ? progress : progress * 0.3;
            const missDrift = particleMissDrift[i] * (1 - progress);
            const targetX = particleX[i] * (1 - catchPull * 0.85) + missDrift * (1 - catchPull);
            const driftX = targetX + pointer.x * 0.25 * (1 - catchPull);

            dummy.position.set(driftX, y, Math.sin(elapsed + i) * 0.08);
            dummy.updateMatrix();
            particles.setMatrixAt(i, dummy.matrix);

            const caught = passedAll && progress > 0.4;
            tmpColor.copy(caught ? PARTICLE_PURPLE : PARTICLE_GREY);
            particles.setColorAt(i, tmpColor);
          }
          particles.instanceMatrix.needsUpdate = true;
          if (particles.instanceColor) particles.instanceColor.needsUpdate = true;
        }
      },
      dispose: () => {
        renderer.domElement.removeEventListener("pointermove", handlePointerMove);
        panelGeometry.dispose();
        panels.forEach((panel) => {
          panel.material.dispose();
          panel.letterMaterial.dispose();
          panel.letter.geometry.dispose();
        });
        particleGeometry.dispose();
        particleMaterial.dispose();
        particles?.dispose();
        envTexture.dispose();
        pmrem.dispose();
        panels = [];
        particles = null;
        rimLight = null;
      },
    } satisfies SceneBuilder;
  };

  return { buildScene, api };
}
