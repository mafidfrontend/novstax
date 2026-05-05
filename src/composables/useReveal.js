import { onMounted, onUnmounted } from "vue";

export function useReveal(rootSelector = ".landing-root") {
  let io;

  onMounted(() => {
    const root = document.querySelector(rootSelector);
    if (!root) return;
    const els = root.querySelectorAll(".reveal-up");
    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));
  });

  onUnmounted(() => {
    io?.disconnect();
  });
}
