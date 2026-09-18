import { useEffect, useState } from "react";

/**
 * Barra de progreso de lectura — 1px, fixed top, z maximo.
 * Gradiente cobalt->emerald. scaleX para smooth (GPU, sin reflow).
 */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[200] h-[2px] w-full bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500"
        style={{ transform: `scaleX(${progress})`, transition: "transform 80ms linear" }}
      />
    </div>
  );
}
