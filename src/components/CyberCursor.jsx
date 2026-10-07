import React, { useEffect, useState, useRef } from 'react';

export default function CyberCursor({ theme = 'emerald' }) {
  const [coords, setCoords] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const ringPos = useRef({ x: -100, y: -100 });
  const ringRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect touch-only devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    let animId;

    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('.cursor-pointer') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth trailing ring animation loop
    const animateRing = () => {
      animId = requestAnimationFrame(animateRing);
      ringPos.current.x += (coords.x - ringPos.current.x) * 0.22;
      ringPos.current.y += (coords.y - ringPos.current.y) * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
    };

    animateRing();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [coords.x, coords.y]);

  if (isTouchDevice || !isVisible) return null;

  const colorHex = theme === 'cyan' ? '#00f0ff' : theme === 'crimson' ? '#ff0055' : theme === 'amber' ? '#f59e0b' : '#00ff66';

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Outer trailing tactical ring */}
      <div
        ref={ringRef}
        style={{
          width: isHovered ? '42px' : isClicked ? '20px' : '30px',
          height: isHovered ? '42px' : isClicked ? '20px' : '30px',
          borderColor: colorHex,
          marginLeft: isHovered ? '-21px' : isClicked ? '-10px' : '-15px',
          marginTop: isHovered ? '-21px' : isClicked ? '-10px' : '-15px',
          boxShadow: isHovered ? `0 0 15px ${colorHex}` : `0 0 8px ${colorHex}`,
          transition: 'width 0.15s ease-out, height 0.15s ease-out, margin 0.15s ease-out, border-color 0.2s',
        }}
        className="fixed top-0 left-0 rounded-full border border-dashed opacity-80"
      />

      {/* Center sharp pointer dot */}
      <div
        style={{
          transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`,
          backgroundColor: colorHex,
          boxShadow: `0 0 8px ${colorHex}`,
          marginLeft: '-3px',
          marginTop: '-3px',
        }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full"
      />
    </div>
  );
}
