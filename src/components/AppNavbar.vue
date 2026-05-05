<script setup>
import { RouterLink } from "vue-router";

defineProps({
  navItems: { type: Array, required: true },
  locale: { type: String, required: true },
  locales: { type: Array, required: true },
  theme: { type: String, required: true },
  isScrolled: { type: Boolean, default: false },
});

const emit = defineEmits(["set-locale", "toggle-theme"]);

function onLocale(code) {
  emit("set-locale", code);
}

function onThemeToggle() {
  emit("toggle-theme");
}
</script>

<template>
  <header class="top-nav" :class="{ 'top-nav--scrolled': isScrolled }">
    <RouterLink class="brand" to="/">
      <span class="brand-mark">☄</span>
      <span class="brand-text">NOVSTAX</span>
    </RouterLink>

    <nav class="nav-links" aria-label="Primary">
      <a v-for="item in navItems" :key="item.id" class="nav-a" :href="`#${item.id}`">
        {{ item.label }}
      </a>
    </nav>

    <div class="nav-actions">
      <div class="lang-switch" role="group" aria-label="Language switcher">
        <button
          v-for="l in locales"
          :key="l.code"
          type="button"
          class="lang-btn"
          :class="{ active: locale === l.code }"
          @click="onLocale(l.code)"
        >
          {{ l.short }}
        </button>
      </div>

      <button type="button" class="theme-toggle" @click="onThemeToggle" :aria-pressed="theme === 'dark'">
        <span v-if="theme === 'dark'">☀</span>
        <span v-else>☾</span>
      </button>
    </div>
  </header>
</template>
