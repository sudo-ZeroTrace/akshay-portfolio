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

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020408, 0.024);

    // CAMERA SETUP
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 24);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // COLOR PALETTE MAP (FUTURISTIC DARK HACKER)
    const colorMap = {
      emerald: {
        primary: 0x00ff66,
        primaryHex: '#00ff66',
        secondary: 0x00f0ff,
        core: 0x051a10,
        particles: 0x00ff66,
        glowLight: 0x00ff88
      },
      cyan: {
        primary: 0x00f0ff,
        primaryHex: '#00f0ff',
        secondary: 0x38bdf8,
        core: 0x041a24,
        particles: 0x00f0ff,
        glowLight: 0x38bdf8
      },
      crimson: {
        primary: 0xff0055,
        primaryHex: '#ff0055',
        secondary: 0xf43f5e,
        core: 0x24040d,
        particles: 0xff0055,
        glowLight: 0xf43f5e
      },
      amber: {
        primary: 0xf59e0b,
        primaryHex: '#f59e0b',
        secondary: 0xfbbf24,
        core: 0x1f1404,
        particles: 0xf59e0b,
        glowLight: 0xfbbf24
      }
    };
    const activeColor = colorMap[theme] || colorMap.emerald;

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0x02050a, 1.8);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(activeColor.glowLight, 5.0, 30);
    coreLight.position.set(0, 0, 4);
    scene.add(coreLight);

    const rimLight = new THREE.PointLight(activeColor.secondary, 2.8, 35);
    rimLight.position.set(-12, 8, 8);
    scene.add(rimLight);

    // 1. QUANTUM CYBER DEFENSE CORE (3D TORUS KNOT + ICOSAHEDRON)
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 0.8, 0);

    // A. Torus Knot Geometry (Quantum Defense Coil)
    const knotGeo = new THREE.TorusKnotGeometry(3.6, 0.85, 128, 24, 2, 3);
    const knotMat = new THREE.MeshStandardMaterial({
      color: activeColor.core,
      metalness: 0.95,
      roughness: 0.15,
      wireframe: false
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    coreGroup.add(knotMesh);

    // B. Wireframe Glowing Cyber Armor
    const knotWireGeo = new THREE.WireframeGeometry(knotGeo);
    const knotWireMat = new THREE.LineBasicMaterial({
      color: activeColor.primary,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const knotWireMesh = new THREE.LineSegments(knotWireGeo, knotWireMat);
    knotMesh.add(knotWireMesh);

    // C. Central Floating Encrypted Data Core (Icosahedron)
    const icoGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: activeColor.secondary,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(icoMesh);

    scene.add(coreGroup);

    // 2. CONCENTRIC CYBER FIREWALL & RADAR GIMBAL RINGS
    const ring1Geo = new THREE.TorusGeometry(8.2, 0.05, 8, 96);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: activeColor.primary,
      transparent: true,
      opacity: 0.4
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(10.2, 0.04, 8, 96);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: activeColor.secondary,
      transparent: true,
      opacity: 0.25
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    coreGroup.add(ring2);

    // 3. SUBTERRANEAN CYBER GRID (HACKER HORIZON PLANE)
    const gridHelper = new THREE.GridHelper(60, 48, activeColor.primary, 0x091420);
    gridHelper.position.y = -8;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.28;
    scene.add(gridHelper);

    // 4. MATRIX CODE RAINFALL & LIVE HACKER STREAM SNIPPETS
    const hackerTelemetry = [
      "0x7FFF9A4B: MEMORY INTEGRITY ZEROIZED",
      "nmap -sS -A -T4 10.0.0.0/8 [STEALTH]",
      "[EDR_CONTAIN]: Host isolated PID 0x48FA",
      "fortigate# set ipsec-ikev2 aes256gcm",
      "snort[4902]: ZERO-DAY BUFFER OVERFLOW PREVENTED",
      "iptables -A INPUT -p tcp --dport 22 -j ACCEPT",
      "splunk --telemetry | eval status='ISOLATED'",
      "ad_hardening.ps1: 1420 enterprise accounts verified",
      "caddy-proxy: strict TLS 1.3 handshake validated",
      "fail2ban[daemon]: banned 14 malicious subnets",
      "root@darknet-sec:~# sudo ./contain_breach.sh",
      "wireshark: packet dissection 0xDEADBEEF clean",
      "docker container: 18 microservices hardened"
    ];

    const telemetryGroup = new THREE.Group();
    const telemetryCards = [];

    hackerTelemetry.forEach((text, i) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 72;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = 'rgba(2, 6, 12, 0.85)';
      ctx.fillRect(0, 0, 512, 72);
      ctx.strokeStyle = `rgba(0, 255, 102, 0.5)`;
      ctx.lineWidth = 2;
      ctx.strokeRect(2, 2, 508, 68);

      // Cyber bracket stamp
      ctx.fillStyle = activeColor.primaryHex;
      ctx.font = 'bold 20px "Courier New", monospace';
      ctx.fillText(`[HACK_OPS] >_ ${text}`, 14, 42);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.45 + Math.random() * 0.25,
        blending: THREE.AdditiveBlending
      });
      const sprite = new THREE.Sprite(spriteMat);

      const angle = (i / hackerTelemetry.length) * Math.PI * 2;
      const radius = 12 + Math.random() * 8;
      sprite.position.x = Math.cos(angle) * radius;
      sprite.position.y = -7 + Math.random() * 14;
      sprite.position.z = Math.sin(angle) * radius - 4;
      sprite.scale.set(7.5, 1.05, 1);

      sprite.userData = {
        speedY: 0.009 + Math.random() * 0.014,
        angle: angle,
        radius: radius,
        rotSpeed: 0.0016 * (Math.random() > 0.5 ? 1 : -1)
      };

      telemetryCards.push(sprite);
      telemetryGroup.add(sprite);
    });

    scene.add(telemetryGroup);

    // 5. MATRIX DATA STREAM RAIN PARTICLES
    const particleCount = 380;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 55;
      particlePositions[i + 1] = (Math.random() - 0.5) * 45;
      particlePositions[i + 2] = (Math.random() - 0.5) * 40;
      particleSpeeds[i / 3] = 0.05 + Math.random() * 0.12;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: activeColor.particles,
      size: 0.18,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // MOUSE PARALLAX & SCROLL INTERACTION
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;

    const handlePointerMove = (e) => {
      mouseX = (e.clientX / width - 0.5) * 2;
      mouseY = (e.clientY / height - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

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

      // Smooth mouse lerping
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate Quantum Cyber Core
      knotMesh.rotation.x = elapsed * 0.25 + targetY * 0.2;
      knotMesh.rotation.y = elapsed * 0.35 + targetX * 0.3;
      icoMesh.rotation.y = -elapsed * 0.6;
      icoMesh.rotation.x = elapsed * 0.4;

      // Pulse Central Light
      coreLight.intensity = 4.0 + Math.sin(elapsed * 2) * 1.5;

      // Gimbals spin
      ring1.rotation.z += delta * 0.2;
      ring2.rotation.y += delta * 0.28;

      // Float Telemetry Strings
      telemetryCards.forEach((card) => {
        card.userData.angle += card.userData.rotSpeed;
        card.position.x = Math.cos(card.userData.angle) * card.userData.radius;
        card.position.z = Math.sin(card.userData.angle) * card.userData.radius - 4;
        card.position.y += card.userData.speedY;

        if (card.position.y > 11) {
          card.position.y = -10;
        }
      });

      // Matrix Rain Effect (Particles falling downward)
      const positions = particleGeo.attributes.position.array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] -= particleSpeeds[Math.floor(i / 3)];
        if (positions[i] < -20) {
          positions[i] = 20;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Camera parallax
      camera.position.x = targetX * 2.2;
      camera.position.y = -targetY * 1.8;
      camera.lookAt(0, -scrollY * 0.002, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      knotGeo.dispose();
      knotMat.dispose();
      knotWireGeo.dispose();
      knotWireMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
      style={{ opacity: intensity }}
      aria-hidden="true"
    />
  );
}
