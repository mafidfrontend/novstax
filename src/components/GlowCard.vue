<script setup>
defineProps({
  elevated: { type: Boolean, default: false },
});
</script>

<template>
  <article class="glow-card" :class="{ 'glow-card--hi': elevated }">
    <div class="glow-card__shine" aria-hidden="true" />
    <div class="glow-card__body">
      <slot />
    </div>
  </article>
</template>
