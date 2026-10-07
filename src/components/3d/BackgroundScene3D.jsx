import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function BackgroundScene3D({ theme = 'emerald', intensity = 0.85 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // SCENE & CAMERA SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020408, 0.022);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 26);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // COLOR PALETTE MAP (DARK HACKER DEFENSE)
    const colorMap = {
      emerald: {
        primary: 0x00ff66,
        secondary: 0x00f0ff,
        grid: 0x062816,
        nodes: 0x00ff66,
        lines: 0x00ff88
      },
      cyan: {
        primary: 0x00f0ff,
        secondary: 0x38bdf8,
        grid: 0x062030,
        nodes: 0x00f0ff,
        lines: 0x38bdf8
      },
      crimson: {
        primary: 0xff0055,
        secondary: 0xf43f5e,
        grid: 0x2e0612,
        nodes: 0xff0055,
        lines: 0xf43f5e
      },
      amber: {
        primary: 0xf59e0b,
        secondary: 0xfbbf24,
        grid: 0x281905,
        nodes: 0xf59e0b,
        lines: 0xfbbf24
      }
    };
    const activeColor = colorMap[theme] || colorMap.emerald;

    // 1. CYBER DEFENSE NODE CONSTELLATION (1000+ BRANCHES MESH TOPOLOGY)
    const nodeCount = 110;
    const nodeCoords = [];
    const nodeVelocities = [];
    const maxLinkDistance = 5.2;

    for (let i = 0; i < nodeCount; i++) {
      nodeCoords.push(
        (Math.random() - 0.5) * 44, // x
        (Math.random() - 0.5) * 32, // y
        (Math.random() - 0.5) * 16  // z
      );
      nodeVelocities.push({
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.008
      });
    }

    const nodePositions = new Float32Array(nodeCoords);
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));

    // Glowing Node Points
    const nodeMat = new THREE.PointsMaterial({
      color: activeColor.nodes,
      size: 0.28,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodePoints);

    // Dynamic Cyber Mesh Links (Connecting nearby branch nodes)
    const maxLines = nodeCount * 8;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineMesh);

    // 2. MATRIX RAIN DIGITAL GLYPH PARTICLES
    const rainCount = 450;
    const rainPositions = new Float32Array(rainCount * 3);
    const rainSpeeds = new Float32Array(rainCount);

    for (let i = 0; i < rainCount; i++) {
      rainPositions[i * 3] = (Math.random() - 0.5) * 55;
      rainPositions[i * 3 + 1] = (Math.random() - 0.5) * 45;
      rainPositions[i * 3 + 2] = (Math.random() - 0.5) * 22;
      rainSpeeds[i] = 0.08 + Math.random() * 0.16;
    }

    const rainGeo = new THREE.BufferGeometry();
    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));

    const rainMat = new THREE.PointsMaterial({
      color: activeColor.primary,
      size: 0.16,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const rainPoints = new THREE.Points(rainGeo, rainMat);
    scene.add(rainPoints);

    // 3. PERSPECTIVE CYBER HORIZON GRID (SUBTERRANEAN DEFENSE MESH)
    const gridHelper = new THREE.GridHelper(70, 50, activeColor.primary, activeColor.grid);
    gridHelper.position.y = -9.5;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.35;
    scene.add(gridHelper);

    // 4. CONCENTRIC DEFENSE RADAR RINGS IN DEEP BACKGROUND
    const radarGroup = new THREE.Group();
    radarGroup.position.set(0, 0, -8);

    [10, 16, 22].forEach((radius, idx) => {
      const ringGeo = new THREE.RingGeometry(radius, radius + 0.06, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: activeColor.primary,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.12 - idx * 0.03
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      radarGroup.add(ring);
    });
    scene.add(radarGroup);

    // MOUSE TRACKING & PARALLAX
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const handlePointerMove = (e) => {
      mouseX = (e.clientX / width - 0.5) * 2;
      mouseY = -(e.clientY / height - 0.5) * 2;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (document.hidden) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth Camera Parallax to Mouse
      targetCameraX += (mouseX * 1.5 - targetCameraX) * 0.04;
      targetCameraY += (mouseY * 1.2 - targetCameraY) * 0.04;
      camera.position.x = targetCameraX;
      camera.position.y = targetCameraY;
      camera.lookAt(0, 0, 0);

      // Radar slow rotation & breath
      radarGroup.rotation.z = elapsed * 0.06;

      // Animate Subterranean Cyber Grid forward motion
      gridHelper.position.z = (elapsed * 2.5) % (70 / 50);

      // 1. UPDATE NODE CONSTELLATION POSITIONS & MESH CONNECTIONS
      const posAttr = nodeGeo.attributes.position;
      const posArray = posAttr.array;

      for (let i = 0; i < nodeCount; i++) {
        const i3 = i * 3;
        posArray[i3] += nodeVelocities[i].x;
        posArray[i3 + 1] += nodeVelocities[i].y;
        posArray[i3 + 2] += nodeVelocities[i].z;

        // Bounce back inside boundary
        if (Math.abs(posArray[i3]) > 22) nodeVelocities[i].x *= -1;
        if (Math.abs(posArray[i3 + 1]) > 16) nodeVelocities[i].y *= -1;
        if (Math.abs(posArray[i3 + 2]) > 8) nodeVelocities[i].z *= -1;
      }
      posAttr.needsUpdate = true;

      // Build Connecting Dynamic Links between nearby nodes
      let lineIndex = 0;
      const cPrimary = new THREE.Color(activeColor.lines);

      for (let i = 0; i < nodeCount; i++) {
        const x1 = posArray[i * 3];
        const y1 = posArray[i * 3 + 1];
        const z1 = posArray[i * 3 + 2];

        for (let j = i + 1; j < nodeCount; j++) {
          const x2 = posArray[j * 3];
          const y2 = posArray[j * 3 + 1];
          const z2 = posArray[j * 3 + 2];

          const distSq = (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2;

          if (distSq < maxLinkDistance ** 2 && lineIndex < maxLines) {
            const alpha = 1.0 - Math.sqrt(distSq) / maxLinkDistance;

            const ptr = lineIndex * 6;
            linePositions[ptr] = x1;
            linePositions[ptr + 1] = y1;
            linePositions[ptr + 2] = z1;
            linePositions[ptr + 3] = x2;
            linePositions[ptr + 4] = y2;
            linePositions[ptr + 5] = z2;

            lineColors[ptr] = cPrimary.r * alpha;
            lineColors[ptr + 1] = cPrimary.g * alpha;
            lineColors[ptr + 2] = cPrimary.b * alpha;
            lineColors[ptr + 3] = cPrimary.r * alpha;
            lineColors[ptr + 4] = cPrimary.g * alpha;
            lineColors[ptr + 5] = cPrimary.b * alpha;

            lineIndex++;
          }
        }
      }

      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;
      lineGeo.setDrawRange(0, lineIndex * 2);

      // 2. UPDATE MATRIX RAIN PARTICLES
      const rainPos = rainGeo.attributes.position.array;
      for (let i = 0; i < rainCount; i++) {
        rainPos[i * 3 + 1] -= rainSpeeds[i];
        if (rainPos[i * 3 + 1] < -22) {
          rainPos[i * 3 + 1] = 22;
          rainPos[i * 3] = (Math.random() - 0.5) * 55;
        }
      }
      rainGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.innerHTML = '';
      }
      renderer.dispose();
      nodeGeo.dispose();
      lineGeo.dispose();
      rainGeo.dispose();
    };
  }, [theme, intensity]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020408]"
      style={{ opacity: intensity }}
    />
  );
}
