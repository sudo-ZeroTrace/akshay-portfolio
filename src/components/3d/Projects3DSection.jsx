import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { projects } from '../../data/portfolioData';
import { sounds } from '../../utils/soundEffects';
import {
  Shield, ChevronLeft, ChevronRight, Maximize2, X, Play,
  CheckCircle, Layers, Eye, Zap
} from 'lucide-react';

export default function Projects3DSection({ theme = 'emerald' }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [simulatedLog, setSimulatedLog] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [viewMode, setViewMode] = useState('3d');

  const stateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    cardMeshes: [],
    activeIndex: 0,
    mouseOffset: { x: 0, y: 0 },
    dragStartX: 0,
    isDragging: false,
    dragDelta: 0
  });

  const activeProject = projects[activeIndex];

  // Theme color palette
  const getThemeColors = () => {
    switch (theme) {
      case 'cyan':
        return { primary: '#00f0ff', primaryHex: 0x00f0ff, secondary: '#38bdf8', secondaryHex: 0x38bdf8, glowRgb: '0, 240, 255' };
      case 'crimson':
        return { primary: '#ff0055', primaryHex: 0xff0055, secondary: '#fb7185', secondaryHex: 0xfb7185, glowRgb: '255, 0, 85' };
      case 'amber':
        return { primary: '#f59e0b', primaryHex: 0xf59e0b, secondary: '#fbbf24', secondaryHex: 0xfbbf24, glowRgb: '245, 158, 11' };
      case 'emerald':
      default:
        return { primary: '#00ff66', primaryHex: 0x00ff66, secondary: '#00f0ff', secondaryHex: 0x00f0ff, glowRgb: '0, 255, 102' };
    }
  };

  // High-resolution Canvas Texture for crisp cyber project cards
  const createCardTexture = (proj, isCurrent) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1600;
    canvas.height = 1050;
    const ctx = canvas.getContext('2d');
    const colors = getThemeColors();

    // Dark cyber panel gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, 1600, 1050);
    bgGrad.addColorStop(0, '#040913');
    bgGrad.addColorStop(0.5, '#02050a');
    bgGrad.addColorStop(1, '#010307');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1600, 1050);

    // Subtle background cyber grid lines
    ctx.strokeStyle = isCurrent ? `rgba(${colors.glowRgb}, 0.08)` : 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 60; x < 1600; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1050);
      ctx.stroke();
    }
    for (let y = 60; y < 1050; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1600, y);
      ctx.stroke();
    }

    // Outer border
    ctx.strokeStyle = isCurrent ? colors.primary : 'rgba(0, 255, 102, 0.25)';
    ctx.lineWidth = isCurrent ? 10 : 4;
    ctx.strokeRect(24, 24, 1552, 1002);

    // Cyber corner brackets
    ctx.fillStyle = colors.primary;
    const notchSize = 48;
    const notchThick = 12;
    ctx.fillRect(24, 24, notchSize, notchThick);
    ctx.fillRect(24, 24, notchThick, notchSize);
    ctx.fillRect(1576 - notchSize, 24, notchSize, notchThick);
    ctx.fillRect(1576 - notchThick, 24, notchThick, notchSize);
    ctx.fillRect(24, 1026 - notchSize + notchThick, notchThick, notchSize);
    ctx.fillRect(24, 1026, notchSize, notchThick);
    ctx.fillRect(1576 - notchSize, 1026, notchSize, notchThick);
    ctx.fillRect(1576 - notchThick, 1026 - notchSize + notchThick, notchThick, notchSize);

    // Top Header Banner
    ctx.fillStyle = isCurrent ? `rgba(${colors.glowRgb}, 0.18)` : 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(48, 48, 1504, 110);
    ctx.strokeStyle = isCurrent ? colors.primary : 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.strokeRect(48, 48, 1504, 110);

    // Badge and Category
    ctx.fillStyle = colors.primary;
    ctx.font = 'bold 36px "Courier New", monospace';
    ctx.fillText(`[MISSION POD // ${proj.badge}]`, 84, 115);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 30px "Courier New", monospace';
    ctx.fillText(`TARGET: ${proj.codename}`, 900, 115);

    // Project Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 58px "Rajdhani", sans-serif';
    const words = proj.title.split(' ');
    let line = '';
    let y = 240;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      if (ctx.measureText(testLine).width > 1400 && n > 0) {
        ctx.fillText(line, 84, y);
        line = words[n] + ' ';
        y += 70;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 84, y);

    // Accent line
    ctx.strokeStyle = isCurrent ? colors.primary : 'rgba(0, 255, 102, 0.3)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(84, y + 35);
    ctx.lineTo(1516, y + 35);
    ctx.stroke();

    // Short Description
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '36px sans-serif';
    const descWords = proj.shortDesc.split(' ');
    let descLine = '';
    let descY = y + 95;
    for (let n = 0; n < descWords.length; n++) {
      const testLine = descLine + descWords[n] + ' ';
      if (ctx.measureText(testLine).width > 1400 && n > 0) {
        ctx.fillText(descLine, 84, descY);
        descLine = descWords[n] + ' ';
        descY += 52;
      } else {
        descLine = testLine;
      }
    }
    ctx.fillText(descLine, 84, descY);

    // Security Architecture Box
    const archBoxY = 620;
    ctx.fillStyle = 'rgba(8, 20, 36, 0.9)';
    ctx.fillRect(84, archBoxY, 1432, 160);
    ctx.strokeStyle = isCurrent ? `rgba(${colors.glowRgb}, 0.5)` : 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.strokeRect(84, archBoxY, 1432, 160);

    ctx.fillStyle = colors.primary;
    ctx.font = 'bold 26px "Courier New", monospace';
    ctx.fillText('SECURITY ARCHITECTURE BLUEPRINT & TOPOLOGY:', 114, archBoxY + 50);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '28px "Courier New", monospace';
    const archSnippet = proj.architecture.length > 80 ? proj.architecture.substring(0, 80) + '...' : proj.architecture;
    ctx.fillText(archSnippet, 114, archBoxY + 110);

    // Technology Tags at bottom
    ctx.font = 'bold 28px "Courier New", monospace';
    let tagX = 84;
    proj.tags.slice(0, 4).forEach((tag) => {
      const tagText = `[${tag}]`;
      const tagWidth = ctx.measureText(tagText).width + 36;
      ctx.fillStyle = 'rgba(0, 255, 102, 0.12)';
      ctx.fillRect(tagX, 830, tagWidth, 54);
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 2;
      ctx.strokeRect(tagX, 830, tagWidth, 54);
      ctx.fillStyle = colors.primary;
      ctx.fillText(tagText, tagX + 18, 868);
      tagX += tagWidth + 24;
    });

    // Callout badge
    ctx.fillStyle = isCurrent ? colors.primary : '#94a3b8';
    ctx.font = 'bold 32px "Courier New", monospace';
    ctx.fillText('[ CLICK TO INSPECT BLUEPRINT ]', 1020, 868);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  };

  // INITIALIZE 3D COVERFLOW STAGE
  useEffect(() => {
    if (viewMode !== '3d') return;
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 1000;
    let height = container.clientHeight || 600;
    const colors = getThemeColors();

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020408, 0.025);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 13.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const centerLight = new THREE.PointLight(colors.primaryHex, 3.5, 25);
    centerLight.position.set(0, 3, 8);
    scene.add(centerLight);

    const fillLight = new THREE.PointLight(0x00f0ff, 1.8, 20);
    fillLight.position.set(-6, -3, 6);
    scene.add(fillLight);

    // Floor Pedestal Disc
    const floorGeo = new THREE.CylinderGeometry(6, 6, 0.15, 48);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x030812,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: false
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.set(0, -3.2, 0);
    scene.add(floorMesh);

    const floorRingGeo = new THREE.RingGeometry(5.8, 6.0, 48);
    const floorRingMat = new THREE.MeshBasicMaterial({
      color: colors.primaryHex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7
    });
    const floorRing = new THREE.Mesh(floorRingGeo, floorRingMat);
    floorRing.rotation.x = Math.PI / 2;
    floorRing.position.set(0, -3.12, 0);
    scene.add(floorRing);

    // Create 3D Project Cards Group
    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    const cardMeshes = [];

    projects.forEach((proj, idx) => {
      const cardGroup = new THREE.Group();
      const isCur = idx === activeIndex;

      // Card Box Geometry
      const cardGeo = new THREE.BoxGeometry(6.6, 4.35, 0.18);
      const texture = createCardTexture(proj, isCur);

      const materials = [
        new THREE.MeshStandardMaterial({ color: 0x030710, metalness: 0.9, roughness: 0.2 }),
        new THREE.MeshStandardMaterial({ color: 0x030710, metalness: 0.9, roughness: 0.2 }),
        new THREE.MeshStandardMaterial({ color: 0x030710, metalness: 0.9, roughness: 0.2 }),
        new THREE.MeshStandardMaterial({ color: 0x030710, metalness: 0.9, roughness: 0.2 }),
        new THREE.MeshBasicMaterial({ map: texture }), // Front face
        new THREE.MeshStandardMaterial({ color: 0x020409, metalness: 0.95, roughness: 0.1 })
      ];

      const mesh = new THREE.Mesh(cardGeo, materials);
      cardGroup.add(mesh);

      // Glowing Neon Wireframe Outline
      const wireGeo = new THREE.WireframeGeometry(cardGeo);
      const wireMat = new THREE.LineBasicMaterial({
        color: isCur ? colors.primaryHex : 0x1e3a2b,
        transparent: true,
        opacity: isCur ? 0.95 : 0.35
      });
      const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
      cardGroup.add(wireMesh);

      // Laser Scanner Line (only on card)
      const laserGeo = new THREE.PlaneGeometry(6.5, 0.06);
      const laserMat = new THREE.MeshBasicMaterial({
        color: colors.primaryHex,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });
      const laserMesh = new THREE.Mesh(laserGeo, laserMat);
      laserMesh.position.set(0, 0, 0.11);
      laserMesh.visible = isCur;
      cardGroup.add(laserMesh);

      cardGroup.userData = {
        index: idx,
        project: proj,
        materials,
        wireMat,
        laserMesh,
        targetPos: new THREE.Vector3(0, 0, 0),
        targetRotY: 0,
        targetScale: 1.0
      };

      stageGroup.add(cardGroup);
      cardMeshes.push(cardGroup);
    });

    stateRef.current = {
      scene,
      camera,
      renderer,
      cardMeshes,
      activeIndex,
      stageGroup,
      mouseOffset: { x: 0, y: 0 },
      dragStartX: 0,
      isDragging: false,
      dragDelta: 0
    };

    // RAYCASTING CLICK HANDLER
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleCanvasClick = (e) => {
      // Ignore if user was dragging
      if (Math.abs(stateRef.current.dragDelta) > 10) return;

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(stageGroup.children, true);

      if (intersects.length > 0) {
        let hit = intersects[0].object;
        while (hit.parent && hit.parent !== stageGroup) {
          hit = hit.parent;
        }
        if (hit.userData && typeof hit.userData.index === 'number') {
          const clickedIdx = hit.userData.index;
          if (clickedIdx === stateRef.current.activeIndex) {
            sounds.playBeep(1200, 0.1);
            setSelectedProject(projects[clickedIdx]);
          } else {
            sounds.playDivisionSwitch();
            setActiveIndex(clickedIdx);
          }
        }
      }
    };

    renderer.domElement.addEventListener('click', handleCanvasClick);

    // MOUSE & TOUCH DRAG CONTROLS
    const handlePointerDown = (e) => {
      stateRef.current.isDragging = true;
      stateRef.current.dragStartX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      stateRef.current.dragDelta = 0;
    };

    const handlePointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      // Mouse Parallax
      const rect = renderer.domElement.getBoundingClientRect();
      stateRef.current.mouseOffset.x = ((clientX - rect.left) / rect.width - 0.5) * 2;
      stateRef.current.mouseOffset.y = ((clientY - rect.top) / rect.height - 0.5) * 2;

      if (!stateRef.current.isDragging) return;
      stateRef.current.dragDelta = clientX - stateRef.current.dragStartX;
    };

    const handlePointerUp = () => {
      if (!stateRef.current.isDragging) return;
      stateRef.current.isDragging = false;

      const delta = stateRef.current.dragDelta;
      if (Math.abs(delta) > 40) {
        if (delta > 0) {
          sounds.playDivisionSwitch();
          setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
        } else {
          sounds.playDivisionSwitch();
          setActiveIndex((prev) => (prev + 1) % projects.length);
        }
      }
      stateRef.current.dragDelta = 0;
    };

    renderer.domElement.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    renderer.domElement.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // RESIZE
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (document.hidden) return;

      const elapsed = clock.getElapsedTime();
      const curIdx = stateRef.current.activeIndex;

      // Pulse Floor Ring
      floorRingMat.opacity = 0.45 + Math.sin(elapsed * 2.5) * 0.25;

      // Compute CoverFlow Slot Positions for all cards
      cardMeshes.forEach((cardGroup, idx) => {
        let offset = idx - curIdx;
        const total = projects.length;
        // Wrap to closest signed distance
        while (offset > total / 2) offset -= total;
        while (offset < -total / 2) offset += total;

        let targetX = 0;
        let targetZ = 0;
        let targetRotY = 0;
        let targetScale = 1.0;

        if (offset === 0) {
          // ACTIVE CENTER CARD
          targetX = 0;
          targetZ = 0.8;
          targetRotY = stateRef.current.mouseOffset.x * 0.08;
          targetScale = 1.0;
          cardGroup.visible = true;
        } else if (offset === -1) {
          // IMMEDIATE LEFT
          targetX = -4.8;
          targetZ = -2.2;
          targetRotY = 0.48;
          targetScale = 0.84;
          cardGroup.visible = true;
        } else if (offset === 1) {
          // IMMEDIATE RIGHT
          targetX = 4.8;
          targetZ = -2.2;
          targetRotY = -0.48;
          targetScale = 0.84;
          cardGroup.visible = true;
        } else {
          // OUTER SLOTS
          const sign = Math.sign(offset);
          targetX = sign * 9.0;
          targetZ = -5.0;
          targetRotY = -sign * 0.75;
          targetScale = 0.65;
          cardGroup.visible = Math.abs(offset) <= 2;
        }

        // Smooth Lerp Position & Rotation
        cardGroup.position.x += (targetX - cardGroup.position.x) * 0.12;
        cardGroup.position.y += (0 - cardGroup.position.y) * 0.12;
        cardGroup.position.z += (targetZ - cardGroup.position.z) * 0.12;
        cardGroup.rotation.y += (targetRotY - cardGroup.rotation.y) * 0.12;
        cardGroup.rotation.x += (-stateRef.current.mouseOffset.y * 0.05 - cardGroup.rotation.x) * 0.12;

        const curScale = cardGroup.scale.x;
        const nextScale = curScale + (targetScale - curScale) * 0.12;
        cardGroup.scale.set(nextScale, nextScale, nextScale);

        // Animate Laser Scanner on Active Card
        if (offset === 0 && cardGroup.userData.laserMesh) {
          cardGroup.userData.laserMesh.position.y = Math.sin(elapsed * 2.5) * 1.8;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.domElement.removeEventListener('click', handleCanvasClick);
      renderer.domElement.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      renderer.domElement.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.innerHTML = '';
      }
      renderer.dispose();
    };
  }, [viewMode, theme]);

  // Update active index reference & textures when activeIndex changes
  useEffect(() => {
    stateRef.current.activeIndex = activeIndex;
    const colors = getThemeColors();

    if (stateRef.current.cardMeshes) {
      stateRef.current.cardMeshes.forEach((cardGroup, i) => {
        const isCur = i === activeIndex;
        cardGroup.userData.wireMat.color.setHex(isCur ? colors.primaryHex : 0x1e3a2b);
        cardGroup.userData.wireMat.opacity = isCur ? 0.95 : 0.35;
        if (cardGroup.userData.laserMesh) {
          cardGroup.userData.laserMesh.visible = isCur;
        }
        // Update front face texture
        const updatedTex = createCardTexture(cardGroup.userData.project, isCur);
        cardGroup.userData.materials[4].map = updatedTex;
        cardGroup.userData.materials[4].needsUpdate = true;
      });
    }
  }, [activeIndex, theme]);

  const handleNext = () => {
    sounds.playDivisionSwitch();
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    sounds.playDivisionSwitch();
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const runSimulation = (proj) => {
    sounds.playAlert();
    setIsSimulating(true);
    setSimulatedLog('[AUTHENTICATING ZERO-DAY INCIDENT TRIAGE]...\n');
    let step = 0;
    const lines = [
      `[SECURITY_AUDIT]: Interrogating node '${proj.codename}'...`,
      `[TELEMETRY]: Checking Fortinet IPsec & EDR telemetry state...`,
      proj.terminalOutput,
      `[PASS]: Threat vector neutralized. Zero anomalies across 1,000+ nodes.`
    ];

    const interval = setInterval(() => {
      if (step < lines.length) {
        setSimulatedLog((prev) => prev + '\n' + lines[step]);
        step++;
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 450);
  };

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-emerald-500/20">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">
            <Zap className="w-4 h-4 animate-pulse text-emerald-400" />
            <span>Cyber Armory // 3D Interactive HoloDeck</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-tactical text-white tracking-wide">
            CLASSIFIED CYBER PROJECTS
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-1 font-mono max-w-2xl">
            Each project is rendered within a dedicated 3D interactive holographic division. Rotate, inspect, and execute simulated incident response playbooks.
          </p>
        </div>

        {/* CONTROLS & VIEW TOGGLE */}
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <button
            onClick={() => {
              sounds.playBeep(850, 0.05);
              setViewMode(viewMode === '3d' ? 'grid' : '3d');
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-950 border border-emerald-500/40 text-emerald-300 text-xs font-mono hover:bg-emerald-500/10 transition glow-green"
          >
            <Layers className="w-4 h-4" />
            <span>{viewMode === '3d' ? 'Switch to Grid View' : 'Switch to 3D Stage'}</span>
          </button>

          {viewMode === '3d' && (
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous 3D Division"
                className="p-2 rounded bg-slate-950/90 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20 transition hover:scale-105"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next 3D Division"
                className="p-2 rounded bg-slate-950/90 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20 transition hover:scale-105"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3D DIVISION STAGE */}
      {viewMode === '3d' ? (
        <div className="relative">
          <div className="relative w-full h-[600px] bg-slate-950/90 rounded-xl border border-emerald-500/40 glow-green overflow-hidden backdrop-blur-md shadow-2xl">
            {/* Tactical HUD Header */}
            <div className="absolute top-0 inset-x-0 h-10 bg-slate-950/95 border-b border-emerald-500/20 px-4 flex items-center justify-between text-xs font-mono text-gray-400 z-10 pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-bold">CYBER 3D HOLODECK</span>
                <span>// DIVISION {activeIndex + 1} OF {projects.length}</span>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-gray-400">
                <span>DRAG OR CLICK ADJACENT CARD TO ROTATE</span>
                <span>CLICK CENTER CARD TO EXPAND</span>
              </div>
            </div>

            <div
              ref={containerRef}
              className="w-full h-full cursor-grab active:cursor-grabbing select-none"
              tabIndex={0}
              role="region"
              aria-label="3D Interactive Project Stage"
            />

            {/* Active Division Overlay HUD Bar at bottom */}
            <div className="absolute bottom-4 inset-x-4 p-4 rounded-lg bg-slate-950/95 border border-emerald-500/40 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    {activeProject.badge}
                  </span>
                  <span className="text-xs font-mono text-gray-400">
                    {activeProject.codename}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-tactical text-white">
                  {activeProject.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    sounds.playBeep(1200, 0.1);
                    setSelectedProject(activeProject);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded bg-emerald-500 text-slate-950 font-tactical font-bold text-sm hover:bg-emerald-400 transition glow-green hover:scale-105"
                >
                  <Eye className="w-4 h-4" />
                  <span>Inspect Blueprint & Playbook</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Division Selector Pills */}
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            {projects.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => {
                  sounds.playDivisionSwitch();
                  setActiveIndex(idx);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition flex items-center gap-2 ${
                  activeIndex === idx
                    ? 'bg-emerald-500 text-slate-950 font-bold glow-green border border-emerald-300 scale-105'
                    : 'bg-slate-950/80 text-gray-400 border border-slate-800 hover:border-emerald-500/40 hover:text-emerald-300'
                }`}
              >
                <span>0{idx + 1}</span>
                <span className="hidden sm:inline">{proj.badge}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Alternative Responsive 2D Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              className="group relative rounded-xl bg-slate-950/80 border border-emerald-500/20 p-6 backdrop-blur-md hover:border-emerald-500/60 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="text-emerald-400 font-bold">[DIV-{idx + 1}] {proj.badge}</span>
                  <span className="text-gray-500">{proj.codename}</span>
                </div>
                <h3 className="text-xl font-bold font-tactical text-white group-hover:text-emerald-300 transition mb-2">
                  {proj.title}
                </h3>
                <p className="text-gray-400 text-xs font-sans leading-relaxed mb-4">
                  {proj.shortDesc}
                </p>
                <div className="p-2.5 rounded bg-black/80 border border-slate-800 font-mono text-[11px] text-gray-300 mb-4">
                  <div className="text-emerald-400 font-bold mb-1">ARCHITECTURE:</div>
                  <div className="truncate">{proj.architecture}</div>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => {
                    sounds.playBeep(1100, 0.08);
                    setSelectedProject(proj);
                  }}
                  className="w-full py-2 rounded bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 font-mono text-xs font-bold transition flex items-center justify-center gap-2 glow-green"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect Division</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FULL-SCREEN 3D DIVISION DEEP-DIVE MODAL */}
      {selectedProject && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              sounds.playBeep(700, 0.05);
              setSelectedProject(null);
              setSimulatedLog('');
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
        >
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-slate-950 border border-emerald-500/60 glow-green-lg p-6 sm:p-8">
            <button
              onClick={() => {
                sounds.playBeep(700, 0.05);
                setSelectedProject(null);
                setSimulatedLog('');
              }}
              className="absolute top-6 right-6 p-2 rounded-lg bg-slate-900 border border-emerald-500/30 text-gray-400 hover:text-white hover:border-emerald-400 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>CLASSIFIED CYBER MISSION // {selectedProject.badge}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-tactical text-white mb-2">
              {selectedProject.title}
            </h3>
            <div className="text-xs font-mono text-gray-400 mb-6">
              TARGET: <span className="text-emerald-300 font-bold">{selectedProject.codename}</span> | DOMAIN: {selectedProject.category}
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-mono text-emerald-400 uppercase tracking-wider mb-2">
                  [ MISSION OVERVIEW & THREAT VECTOR ]
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed font-sans">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-mono text-emerald-400 uppercase tracking-wider mb-2">
                  [ SECURITY ARCHITECTURE FLOW ]
                </h4>
                <div className="p-3.5 rounded-lg bg-slate-900/90 border border-emerald-500/30 font-mono text-xs text-emerald-200">
                  {selectedProject.architecture}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-mono text-emerald-400 uppercase tracking-wider mb-2">
                  [ MEASURABLE DEFENSE METRICS ]
                </h4>
                <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 font-mono text-xs text-emerald-400 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{selectedProject.metrics}</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-mono text-emerald-400 uppercase tracking-wider mb-2">
                  [ TECH ARSENAL ]
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-slate-900 border border-emerald-500/30 text-emerald-300 font-mono text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Terminal Diagnostic Runner */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-mono text-emerald-400 uppercase tracking-wider">
                    [ LIVE EXPLOIT TRIAGE & CONTAINMENT ]
                  </h4>
                  <button
                    onClick={() => runSimulation(selectedProject)}
                    disabled={isSimulating}
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500 text-slate-950 font-mono text-xs font-bold hover:bg-emerald-400 disabled:opacity-50 transition glow-green"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{isSimulating ? 'Executing...' : 'Run Exploit Triage'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-lg bg-black border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto min-h-[110px]">
                  <div className="text-gray-500 mb-2">
                    # Zero-Day incident containment engine ready
                  </div>
                  {simulatedLog ? (
                    <pre className="whitespace-pre-wrap">{simulatedLog}</pre>
                  ) : (
                    <div className="text-gray-600 italic">
                      Click "Run Exploit Triage" above to verify incident containment and mitigation telemetry.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
