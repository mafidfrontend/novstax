import { onMounted, onUnmounted, ref } from "vue";

export function useActiveSection(sectionIds = []) {
  const activeSection = ref(sectionIds[0] || "top");
  const isScrolled = ref(false);
  let observer;
  let rafId = 0;

  function updateFromHash() {
    const hash = window.location.hash.replace("#", "");
    if (hash && sectionIds.includes(hash)) activeSection.value = hash;
  }

  function onScroll() {
    if (rafId) return;
    rafId = window.requestAnimationFrame(() => {
      isScrolled.value = window.scrollY > 8;
      rafId = 0;
    });
  }

  onMounted(() => {
    updateFromHash();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", updateFromHash, { passive: true });

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id;
          }
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0.1 },
    );

    for (const id of sectionIds) {
      const target = document.getElementById(id);
      if (target) observer.observe(target);
    }
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("hashchange", updateFromHash);
    window.cancelAnimationFrame(rafId);
    observer?.disconnect();
  });

  return { activeSection, isScrolled };
}
