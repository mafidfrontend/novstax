<script setup>
defineProps({
  navItems: { type: Array, required: true },
  activeSection: { type: String, default: "top" },
});
</script>

<template>
  <nav class="bottom-nav" aria-label="Mobile navigation">
    <a
      v-for="item in navItems"
      :key="item.id"
      class="bottom-nav__item"
      :class="{ 'is-active': activeSection === item.id }"
      :href="`#${item.id}`"
      :aria-current="activeSection === item.id ? 'page' : undefined"
    >
      {{ item.label }}
    </a>
  </nav>
</template>
