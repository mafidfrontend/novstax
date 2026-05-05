<script setup>
import { computed, defineAsyncComponent } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useI18n } from "@/composables/useI18n";
import { useTheme } from "@/composables/useTheme";
import { useActiveSection } from "@/composables/useActiveSection";

const AppNavbar = defineAsyncComponent(() => import("@/components/AppNavbar.vue"));
const AppBottomNav = defineAsyncComponent(() => import("@/components/AppBottomNav.vue"));
const AppSkeleton = defineAsyncComponent(() => import("@/components/AppSkeleton.vue"));

const navItems = [
  { id: "top", labelKey: "nav.home" },
  { id: "ranks", labelKey: "nav.ranks" },
  { id: "tokens", labelKey: "nav.tokens" },
  { id: "contact", labelKey: "nav.contact" },
];

const { locale, locales, setLocale, t } = useI18n();
const { theme, toggleTheme } = useTheme();
const { activeSection, isScrolled } = useActiveSection(navItems.map((item) => item.id));

const localizedNavItems = computed(() =>
  navItems.map((item) => ({
    ...item,
    label: t(item.labelKey),
  })),
);
</script>

<template>
  <div class="app-shell" :data-theme="theme">
    <Suspense>
      <AppNavbar
        :nav-items="localizedNavItems"
        :locale="locale"
        :locales="locales"
        :theme="theme"
        :is-scrolled="isScrolled"
        @set-locale="setLocale"
        @toggle-theme="toggleTheme"
      />
      <template #fallback>
        <div class="top-nav top-nav--loading" aria-hidden="true" />
      </template>
    </Suspense>

    <main class="main-stage">
      <RouterView v-slot="{ Component }">
        <Suspense>
          <component :is="Component" />
          <template #fallback>
            <AppSkeleton />
          </template>
        </Suspense>
      </RouterView>
    </main>

    <footer class="site-footer">
      <RouterLink class="footer-link" to="/">Novstax</RouterLink>
      <a class="footer-link" href="https://Novstax.gomc.uz" target="_blank" rel="noopener noreferrer">Novstax.gomc.uz</a>
    </footer>

    <Suspense>
      <AppBottomNav :nav-items="localizedNavItems" :active-section="activeSection" />
      <template #fallback><div /></template>
    </Suspense>
  </div>
</template>
