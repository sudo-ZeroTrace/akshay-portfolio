import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { projects } from '../../data/portfolioData';
import { sounds } from '../../utils/soundEffects';
import {
  Shield, Terminal, Cpu, Lock, Network, Server,
  ChevronLeft, ChevronRight, Maximize2, X, Play,
  CheckCircle, AlertTriangle, ExternalLink, Layers, Eye,
  Zap, Key, Radio
} from 'lucide-react';

export default function Projects3DSection({ theme = 'emerald' }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [simulatedLog, setSimulatedLog] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [viewMode, setViewMode] = useState('3d');

  const threeRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    divisions: [],
    targetRotation: 0,
    currentRotation: 0,
    isDragging: false,
    prevMouseX: 0
  });

  const activeProject = projects[activeIndex];

  // Hex colors based on hacker theme
  const getThemeColors = () => {
    switch (theme) {
      case 'cyan':
        return { primary: '#00f0ff', primaryHex: 0x00f0ff, secondary: '#38bdf8', secondaryHex: 0x38bdf8 };
      case 'crimson':
        return { primary: '#ff0055', primaryHex: 0xff0055, secondary: '#fb7185', secondaryHex: 0xfb7185 };
      case 'amber':
        return { primary: '#f59e0b', primaryHex: 0xf59e0b, secondary: '#fbbf24', secondaryHex: 0xfbbf24 };
      case 'emerald':
      default:
        return { primary: '#00ff66', primaryHex: 0x00ff66, secondary: '#00f0ff', secondaryHex: 0x00f0ff };
    }
  };

  // Build textures for the 3D project cards
  const createCardTexture = (proj, isCurrent) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 680;
    const ctx = canvas.getContext('2d');
    const colors = getThemeColors();

    // Dark hacker panel background
    const bgGrad = ctx.createLinearGradient(0, 0, 1024, 680);
    bgGrad.addColorStop(0, '#040912');
    bgGrad.addColorStop(0.5, '#020509');
    bgGrad.addColorStop(1, '#010306');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 680);

    // Glowing border
    ctx.strokeStyle = isCurrent ? colors.primary : 'rgba(0, 255, 102, 0.2)';
    ctx.lineWidth = isCurrent ? 8 : 3;
    ctx.strokeRect(16, 16, 992, 648);

    // Cyber corner brackets
    ctx.fillStyle = colors.primary;
    const notchSize = 32;
    ctx.fillRect(16, 16, notchSize, 8);
    ctx.fillRect(16, 16, 8, notchSize);
    ctx.fillRect(1008 - notchSize, 16, notchSize, 8);
    ctx.fillRect(1000, 16, 8, notchSize);
    ctx.fillRect(16, 656, notchSize, 8);
    ctx.fillRect(16, 640, 8, notchSize);
    ctx.fillRect(1008 - notchSize, 656, notchSize, 8);
    ctx.fillRect(1000, 640, 8, notchSize);

    // Header bar
    ctx.fillStyle = isCurrent ? 'rgba(0, 255, 102, 0.15)' : 'rgba(255, 255, 255, 0.04)';
    ctx.fillRect(32, 32, 960, 80);

    // Cyber Hex Stamp
    ctx.strokeStyle = colors.primary;
    ctx.lineWidth = 3;
    ctx.strokeRect(930, 48, 48, 48);
    ctx.fillStyle = colors.primary;
    ctx.font = 'bold 20px "Courier New", monospace';
    ctx.fillText('0x', 940, 78);

    // Category & Badge
    ctx.fillStyle = colors.primary;
    ctx.font = 'bold 28px "Courier New", monospace';
    ctx.fillText(`[CYBER_BLADE // ${proj.badge}]`, 56, 80);

    ctx.fillStyle = '#64748b';
    ctx.font = '22px "Courier New", monospace';
    ctx.fillText(`TARGET: ${proj.codename}`, 540, 80);

    // Project Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px "Rajdhani", sans-serif';
    const words = proj.title.split(' ');
    let line = '';
    let y = 175;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 900 && n > 0) {
        ctx.fillText(line, 56, y);
        line = words[n] + ' ';
        y += 50;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 56, y);

    // Divider line
    ctx.strokeStyle = 'rgba(0, 255, 102, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(56, 250);
    ctx.lineTo(968, 250);
    ctx.stroke();

    // Short Description
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '26px sans-serif';
    const descWords = proj.shortDesc.split(' ');
    let descLine = '';
    let descY = 300;
    for (let n = 0; n < descWords.length; n++) {
      const testLine = descLine + descWords[n] + ' ';
      if (ctx.measureText(testLine).width > 900 && n > 0) {
        ctx.fillText(descLine, 56, descY);
        descLine = descWords[n] + ' ';
        descY += 38;
      } else {
        descLine = testLine;
      }
    }
    ctx.fillText(descLine, 56, descY);

    // Architecture callout
    ctx.fillStyle = 'rgba(6, 15, 25, 0.95)';
    ctx.fillRect(56, 420, 912, 110);
    ctx.strokeStyle = 'rgba(0, 255, 102, 0.25)';
    ctx.strokeRect(56, 420, 912, 110);

    ctx.fillStyle = colors.primary;
    ctx.font = 'bold 20px "Courier New", monospace';
    ctx.fillText('SECURITY ARCHITECTURE BLUEPRINT:', 76, 455);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '22px "Courier New", monospace';
    ctx.fillText(proj.architecture.substring(0, 72) + '...', 76, 495);

    // Tags at bottom
    ctx.font = 'bold 22px "Courier New", monospace';
    let tagX = 56;
    proj.tags.slice(0, 3).forEach((tag) => {
      const tagWidth = ctx.measureText(`[${tag}]`).width + 24;
      ctx.fillStyle = 'rgba(0, 255, 102, 0.12)';
      ctx.fillRect(tagX, 580, tagWidth, 42);
      ctx.strokeStyle = colors.primary;
      ctx.strokeRect(tagX, 580, tagWidth, 42);
      ctx.fillStyle = colors.primary;
      ctx.fillText(`[${tag}]`, tagX + 12, 610);
      tagX += tagWidth + 16;
    });

    // Interactive callout
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px "Courier New", monospace';
    ctx.fillText('[ CLICK TO INSPECT DIVISION ]', 560, 610);

    return new THREE.CanvasTexture(canvas);
  };

  // INITIALIZE 3D STAGE
  useEffect(() => {
    if (viewMode !== '3d') return;
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 1000;
    let height = container.clientHeight || 580;
    const colors = getThemeColors();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 14);

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(colors.primaryHex, 3.5, 30);
    mainLight.position.set(0, 5, 10);
    scene.add(mainLight);

    const floorLight = new THREE.PointLight(0x00f0ff, 2.0, 20);
    floorLight.position.set(0, -6, 5);
    scene.add(floorLight);

    // 3D Carousel Group
    const carouselGroup = new THREE.Group();
    scene.add(carouselGroup);

    // Build 3D Project Divisions positioned on a cylindrical ring
    const divisionRadius = 8.5;
    const divisionMeshes = [];

    projects.forEach((proj, i) => {
      const divisionGroup = new THREE.Group();

      const cardGeo = new THREE.BoxGeometry(6.4, 4.25, 0.2);
      const texture = createCardTexture(proj, i === activeIndex);

      const materials = [
        new THREE.MeshStandardMaterial({ color: 0x050c18, metalness: 0.9, roughness: 0.15 }),
        new THREE.MeshStandardMaterial({ color: 0x050c18, metalness: 0.9, roughness: 0.15 }),
        new THREE.MeshStandardMaterial({ color: 0x050c18, metalness: 0.9, roughness: 0.15 }),
        new THREE.MeshStandardMaterial({ color: 0x050c18, metalness: 0.9, roughness: 0.15 }),
        new THREE.MeshBasicMaterial({ map: texture }),
        new THREE.MeshStandardMaterial({ color: 0x02050a, metalness: 0.95, roughness: 0.1 })
      ];

      const cardMesh = new THREE.Mesh(cardGeo, materials);
      divisionGroup.add(cardMesh);

      const borderGeo = new THREE.WireframeGeometry(cardGeo);
      const borderMat = new THREE.LineBasicMaterial({
        color: i === activeIndex ? colors.primaryHex : 0x1e3a2b,
        transparent: true,
        opacity: i === activeIndex ? 0.9 : 0.4
      });
      const borderLines = new THREE.LineSegments(borderGeo, borderMat);
      divisionGroup.add(borderLines);

      // 3D Holographic Quantum Core on top of division
      const holoGeo = new THREE.IcosahedronGeometry(0.5, 1);
      const holoMat = new THREE.MeshBasicMaterial({
        color: colors.primaryHex,
        wireframe: true,
        transparent: true,
        opacity: 0.85
      });
      const holoMesh = new THREE.Mesh(holoGeo, holoMat);
      holoMesh.position.set(0, 2.7, 0);
      divisionGroup.add(holoMesh);

      // Position on cylindrical ring
      const angle = (i / projects.length) * Math.PI * 2;
      divisionGroup.position.x = Math.sin(angle) * divisionRadius;
      divisionGroup.position.z = Math.cos(angle) * divisionRadius - divisionRadius;
      divisionGroup.rotation.y = angle;

      divisionGroup.userData = {
        index: i,
        project: proj,
        holoMesh,
        borderLines,
        materials,
        angle
      };

      carouselGroup.add(divisionGroup);
      divisionMeshes.push(divisionGroup);
    });

    // 3D Cyber Floor Pedestal Ring
    const floorPedestalGeo = new THREE.RingGeometry(divisionRadius - 1.5, divisionRadius + 1.5, 64);
    const floorPedestalMat = new THREE.MeshBasicMaterial({
      color: colors.primaryHex,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide
    });
    const floorPedestal = new THREE.Mesh(floorPedestalGeo, floorPedestalMat);
    floorPedestal.rotation.x = Math.PI / 2;
    floorPedestal.position.y = -2.5;
    scene.add(floorPedestal);

    threeRef.current = {
      scene,
      camera,
      renderer,
      divisions: divisionMeshes,
      carouselGroup,
      targetRotation: -(activeIndex / projects.length) * Math.PI * 2,
      currentRotation: -(activeIndex / projects.length) * Math.PI * 2,
      isDragging: false,
      prevMouseX: 0
    };

    // RAYCASTING FOR INTERACTION
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleCanvasClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(carouselGroup.children, true);

      if (intersects.length > 0) {
        let hit = intersects[0].object;
        while (hit.parent && hit.parent !== carouselGroup) {
          hit = hit.parent;
        }
        if (hit.userData && typeof hit.userData.index === 'number') {
          const clickedIdx = hit.userData.index;
          if (clickedIdx === activeIndex) {
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

    // MOUSE DRAG CAROUSEL ROTATION
    const handleMouseDown = (e) => {
      threeRef.current.isDragging = true;
      threeRef.current.prevMouseX = e.clientX;
    };

    const handleMouseMove = (e) => {
      if (!threeRef.current.isDragging) return;
      const deltaX = e.clientX - threeRef.current.prevMouseX;
      threeRef.current.targetRotation += deltaX * 0.005;
      threeRef.current.prevMouseX = e.clientX;
    };

    const handleMouseUp = () => {
      if (!threeRef.current.isDragging) return;
      threeRef.current.isDragging = false;
      const step = (Math.PI * 2) / projects.length;
      const normalized = -threeRef.current.targetRotation / step;
      let nearest = Math.round(normalized) % projects.length;
      if (nearest < 0) nearest += projects.length;
      setActiveIndex(nearest);
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (document.hidden) return;

      const elapsed = clock.getElapsedTime();

      threeRef.current.currentRotation +=
        (threeRef.current.targetRotation - threeRef.current.currentRotation) * 0.08;
      carouselGroup.rotation.y = threeRef.current.currentRotation;

      divisionMeshes.forEach((div, i) => {
        div.userData.holoMesh.rotation.y = elapsed * 1.5;
        div.userData.holoMesh.rotation.x = Math.sin(elapsed * 2 + i) * 0.4;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.domElement.removeEventListener('click', handleCanvasClick);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.innerHTML = '';
      }
      renderer.dispose();
    };
  }, [viewMode, theme]);

  // Update target rotation when activeIndex changes
  useEffect(() => {
    if (threeRef.current && threeRef.current.carouselGroup) {
      const target = -(activeIndex / projects.length) * Math.PI * 2;
      threeRef.current.targetRotation = target;

      threeRef.current.divisions.forEach((div, i) => {
        const isCur = i === activeIndex;
        div.userData.borderLines.material.color.setHex(
          isCur ? getThemeColors().primaryHex : 0x1e3a2b
        );
        div.userData.borderLines.material.opacity = isCur ? 0.9 : 0.4;
        div.userData.materials[4].map = createCardTexture(div.userData.project, isCur);
        div.userData.materials[4].needsUpdate = true;
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
            <span>Cyber Armory // 3D Interactive Divisions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-tactical text-white tracking-wide">
            CLASSIFIED CYBER PROJECTS
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-1 font-mono max-w-2xl">
            Each project is rendered within a dedicated 3D interactive division. Rotate, inspect, and execute simulated incident response playbooks.
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
          <div className="relative w-full h-[580px] bg-slate-950/90 rounded-xl border border-emerald-500/40 glow-green overflow-hidden backdrop-blur-md shadow-2xl">
            {/* Tactical HUD Header */}
            <div className="absolute top-0 inset-x-0 h-10 bg-slate-950/95 border-b border-emerald-500/20 px-4 flex items-center justify-between text-xs font-mono text-gray-400 z-10 pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-bold">CYBER 3D STAGE</span>
                <span>// DIVISION {activeIndex + 1} OF {projects.length}</span>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-gray-400">
                <span>DRAG TO ROTATE 3D CAROUSEL</span>
                <span>CLICK CARD TO EXPAND</span>
              </div>
            </div>

            <div
              ref={containerRef}
              className="w-full h-full cursor-grab active:cursor-grabbing"
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
                  className="flex items-center gap-2 px-4 py-2 rounded bg-emerald-500 text-slate-950 font-tactical font-bold text-sm hover:bg-emerald-400 transition glow-green"
                >
                  <Eye className="w-4 h-4" />
                  <span>Inspect Division</span>
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
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition flex items-center gap-2 ${
                  activeIndex === idx
                    ? 'bg-emerald-500 text-slate-950 font-bold glow-green border border-emerald-300'
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
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
