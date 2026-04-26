import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Lerp ring position
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf: number;
    const lerp = () => {
      setRingPos(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.15,
        y: prev.y + (pos.y - prev.y) * 0.15,
      }));
      raf = requestAnimationFrame(lerp);
    };
    raf = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(raf);
  }, [pos]);

  // Detect hovering over interactive elements
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const check = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(!!el.closest("a, button, [role='button'], input, select, textarea, label"));
    };
    window.addEventListener("mouseover", check);
    return () => window.removeEventListener("mouseover", check);
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      {/* Dot */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          width: 8,
          height: 8,
          backgroundColor: "hsl(41, 52%, 54%)",
          left: pos.x - 4,
          top: pos.y - 4,
          opacity: visible ? (hovering ? 0 : 1) : 0,
          transform: hovering ? "scale(0)" : "scale(1)",
          transition: "transform 0.15s ease, opacity 0.15s ease",
        }}
      />
      {/* Ring */}
      <div
        className="fixed pointer-events-none z-[9998] rounded-full"
        style={{
          width: 28,
          height: 28,
          border: "1px solid hsla(41, 52%, 54%, 0.6)",
          left: ringPos.x - 14,
          top: ringPos.y - 14,
          opacity: visible ? 0.6 : 0,
          transform: hovering ? "scale(1.6)" : "scale(1)",
          transition: "transform 0.15s ease, opacity 0.15s ease",
        }}
      />
    </>
  );
};

export default CustomCursor;
