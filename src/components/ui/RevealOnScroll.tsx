import { useEffect } from "react";

/**
 * Reveal 0kb — IntersectionObserver nativo (cero dependencias).
 * main > section (excepto el hero, above-the-fold) entra con fade-up.
 * Los grids dentro de secciones revelan sus hijos con stagger.
 * Excluye overlays fixed (modales) y respeta prefers-reduced-motion via CSS.
 */
export function RevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section")
    ).slice(1);

    const firstSection = document.querySelector<HTMLElement>("main > section");

    const grids = Array.from(
      document.querySelectorAll<HTMLElement>("main section .grid")
    ).filter(
      (g) =>
        (!firstSection || !firstSection.contains(g)) &&
        !g.closest(".fixed")
    );

    sections.forEach((s) => s.classList.add("reveal"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("revealed");
          if (el.classList.contains("grid")) {
            Array.from(el.children).forEach((child, i) => {
              (child as HTMLElement).style.transitionDelay = `${i * 90}ms`;
              child.classList.add("revealed");
            });
          }
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );

    sections.forEach((s) => io.observe(s));
    grids.forEach((g) => io.observe(g));

    return () => {
      io.disconnect();
      sections.forEach((s) => s.classList.remove("reveal", "revealed"));
      grids.forEach((g) => {
        g.classList.remove("reveal", "revealed");
        Array.from(g.children).forEach((c) => {
          (c as HTMLElement).style.transitionDelay = "";
          c.classList.remove("revealed");
        });
      });
    };
  }, []);

  return null;
}
