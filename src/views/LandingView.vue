<script setup>
import { computed, defineAsyncComponent, ref } from "vue";

const HERO_CREST_BG =
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1440&q=70&fm=webp";
const GlowCard = defineAsyncComponent(() => import("@/components/GlowCard.vue"));
import { ranks } from "@/data/ranks";
import { tokenPacks } from "@/data/tokens";
import { donateKeys, banRemoval } from "@/data/extras";
import { useI18n } from "@/composables/useI18n";
import { useTelegramBuy } from "@/composables/useTelegramBuy";
import { useReveal } from "@/composables/useReveal";
import { formatMoney, formatTokens } from "@/utils/format";

const { t, locale } = useI18n();
const { rankHref, tokenHref, keyHref, unbanHref, contactHref } = useTelegramBuy(t);
const ip = "Novstax.gomc.uz";
const copied = ref(false);
const isSending = ref(false);
const crestPills = computed(() =>
  t("heroCrest.pills")
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean),
);
const name = ref("");
const message = ref("");
const isContactDisabled = computed(() => !name.value.trim() || !message.value.trim());

useReveal(".landing-root");

async function copyIp() {
  try {
    await navigator.clipboard.writeText(ip);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1600);
  } catch {
    copied.value = false;
  }
}

function sendContact() {
  if (isContactDisabled.value || isSending.value) return;
  isSending.value = true;
  window.open(contactHref(name.value.trim(), message.value.trim()), "_blank", "noopener,noreferrer");
  window.setTimeout(() => {
    isSending.value = false;
  }, 1000);
}
</script>

<template>
  <div class="landing-root">
    <div class="hero-crest-wrap reveal-up">
      <section id="top" class="hero-crest">
        <div class="hero-crest__bg" :style="{ backgroundImage: `url('${HERO_CREST_BG}')` }" />
        <div class="hero-crest__veil" aria-hidden="true" />
        <div class="hero-crest__inner">
          <p class="hero-crest__badge">{{ t("heroCrest.badge") }}</p>
          <h1 class="hero-crest__title">
            <span class="hero-crest__title-hi">{{ t("heroCrest.titleHi") }}</span><span class="hero-crest__title-rest">{{ t("heroCrest.titleRest") }}</span>
          </h1>
          <p class="hero-crest__tagline">{{ t("heroCrest.tagline") }}</p>
          <p class="hero-crest__ip-label">{{ t("heroCrest.ipLabel") }}</p>
          <div class="hero-crest__ip-row">
            <span class="hero-crest__ip-text">{{ ip }}</span>
          <button type="button" class="hero-crest__copy btn btn-ghost" @click="copyIp">{{ copied ? t("copied") : t("copy") }}</button>
          </div>
          <div class="hero-crest__cta-row">
            <a class="btn btn-ghost hero-crest__cta-ghost" href="#ranks">{{ t("hero.ctaRanks") }}</a>
            <a class="btn btn-ghost hero-crest__cta-ghost" href="#tokens">{{ t("hero.ctaTokens") }}</a>
          </div>
          <div class="hero-crest__features">
            <article class="hero-crest__feat">
              <span class="hero-crest__feat-ico hero-crest__feat-ico--shield" aria-hidden="true">🛡</span>
              <div class="hero-crest__feat-text">
                <span class="hero-crest__feat-label">{{ t("heroCrest.f1l") }}</span>
                <strong class="hero-crest__feat-title">{{ t("heroCrest.f1t") }}</strong>
              </div>
            </article>
            <article class="hero-crest__feat">
              <span class="hero-crest__feat-ico hero-crest__feat-ico--bolt" aria-hidden="true">⚡</span>
              <div class="hero-crest__feat-text">
                <span class="hero-crest__feat-label">{{ t("heroCrest.f2l") }}</span>
                <strong class="hero-crest__feat-title">{{ t("heroCrest.f2t") }}</strong>
              </div>
            </article>
            <article class="hero-crest__feat">
              <span class="hero-crest__feat-ico hero-crest__feat-ico--inf" aria-hidden="true">∞</span>
              <div class="hero-crest__feat-text">
                <span class="hero-crest__feat-label">{{ t("heroCrest.f3l") }}</span>
                <strong class="hero-crest__feat-title">{{ t("heroCrest.f3t") }}</strong>
              </div>
            </article>
          </div>
          <div class="hero-crest__pills">
            <span v-for="(pill, i) in crestPills" :key="i" class="hero-crest__pill">{{ pill }}</span>
          </div>
          <a class="hero-crest__scroll" href="#about">
            <span>{{ t("heroCrest.scroll") }}</span>
            <span class="hero-crest__chev" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>

    <section id="about" class="section section--band reveal-up">
      <div class="cards-3">
        <article class="mini-card" v-memo="[locale]">
          <h3>{{ t("home.card1t") }}</h3>
          <p>{{ t("home.card1d") }}</p>
        </article>
        <article class="mini-card" v-memo="[locale]">
          <h3>{{ t("home.card2t") }}</h3>
          <p>{{ t("home.card2d") }}</p>
        </article>
        <article class="mini-card" v-memo="[locale]">
          <h3>{{ t("home.card3t") }}</h3>
          <p>{{ t("home.card3d") }}</p>
        </article>
      </div>
    </section>

    <section id="ranks" class="section section--tight reveal-up">
      <header class="section-head">
        <div class="section-kicker">Novstax</div>
        <h2 class="section-title">{{ t("ranksPage.title") }}</h2>
        <p class="section-lead">{{ t("ranksPage.lead") }}</p>
      </header>
      <div class="rank-grid">
        <GlowCard v-for="(r, idx) in ranks" :key="`${r.id}-${r.variant}-${idx}`" v-memo="[r.id, r.variant, locale]" :elevated="r.id === 'prime' && r.variant === 'life'">
          <div class="rank-top">
            <div class="rank-title-row">
              <span class="rank-emoji">{{ r.emoji }}</span>
              <h3 class="rank-name">{{ t(`ranks.${r.id}.name`) }}</h3>
            </div>
            <span class="pill" :class="{ 'pill-hot': r.variant === 'life' }">{{ t(`variant.${r.variant}`) }}</span>
          </div>
          <div class="rank-price">{{ formatMoney(r.price) }}</div>
          <ul class="rank-list">
            <li v-for="i in 4" :key="i">{{ t(`ranks.${r.id}.features.${i - 1}`) }}</li>
          </ul>
          <a class="buy-link" :href="rankHref(r)" target="_blank" rel="noopener noreferrer">{{ t("buy") }}</a>
        </GlowCard>
      </div>
    </section>

    <section id="tokens" class="section section--tight reveal-up">
      <header class="section-head">
        <div class="section-kicker">Novstax</div>
        <h2 class="section-title">{{ t("tokensPage.title") }}</h2>
        <p class="section-lead">{{ t("tokensPage.lead") }}</p>
      </header>
      <div class="bonus-banner">
        <h3>{{ t("tokensPage.bonusTitle") }}</h3>
        <p>{{ t("tokensPage.bonusText") }}</p>
      </div>
      <div class="token-grid">
        <GlowCard v-for="p in tokenPacks" :key="p.amount" v-memo="[p.amount, p.price, locale]">
          <div class="rank-top">
            <h3 class="rank-name">🍀 {{ formatTokens(p.amount) }} token</h3>
          </div>
          <div class="rank-price">{{ formatMoney(p.price) }}</div>
          <a class="buy-link" :href="tokenHref(p.amount, p.price)" target="_blank" rel="noopener noreferrer">{{ t("buy") }}</a>
        </GlowCard>
      </div>
      <header class="section-head section-head--spaced">
        <h2 class="section-title section-title--sub">{{ t("tokensPage.keysTitle") }}</h2>
        <p class="section-lead">{{ t("tokensPage.keysLead") }}</p>
      </header>
      <div class="keys-row">
        <GlowCard v-for="k in donateKeys" :key="k.id" v-memo="[k.id, k.price, locale]" :elevated="k.highlight">
          <div class="rank-top">
            <h3 class="rank-name">🔒 DONATE KEY</h3>
          </div>
          <p class="price-note">{{ t(`keys.${k.id}`) }}</p>
          <div v-if="k.id === 'key20'" class="key-split key-split--push">
            <span class="new">{{ formatMoney(k.price) }}</span>
          </div>
          <div v-else class="key-split key-split--push">
            <span class="old">{{ formatMoney(20000) }}</span>
            <span class="new">{{ formatMoney(k.price) }}</span>
          </div>
          <a class="buy-link buy-link--spaced" :href="keyHref(k.id, k.price)" target="_blank" rel="noopener noreferrer">{{ t("buy") }}</a>
        </GlowCard>
      </div>
      <header class="section-head section-head--spaced">
        <h2 class="section-title section-title--sub">{{ t("tokensPage.extrasTitle") }}</h2>
      </header>
      <div class="keys-row">
        <GlowCard>
          <div class="rank-top">
            <h3 class="rank-name">🚫 {{ t("extras.unban") }}</h3>
          </div>
          <div class="rank-price">{{ formatMoney(banRemoval.price) }}</div>
          <a class="buy-link" :href="unbanHref()" target="_blank" rel="noopener noreferrer">{{ t("buy") }}</a>
        </GlowCard>
      </div>
    </section>

    <section id="contact" class="section section--tight reveal-up">
      <header class="section-head">
        <div class="section-kicker">Novstax</div>
        <h2 class="section-title">{{ t("contactPage.title") }}</h2>
        <p class="section-lead">{{ t("contactPage.lead") }}</p>
      </header>
      <GlowCard elevated>
        <div class="form">
          <div class="field">
            <label for="nm">{{ t("contactPage.name") }}</label>
            <input id="nm" v-model="name" type="text" autocomplete="nickname" />
          </div>
          <div class="field">
            <label for="msg">{{ t("contactPage.message") }}</label>
            <textarea id="msg" v-model="message" />
          </div>
          <p class="price-note">{{ t("contactPage.hint") }}</p>
          <button
            type="button"
            class="btn btn-primary btn--inline"
            :disabled="isContactDisabled || isSending"
            :aria-busy="isSending"
            @click="sendContact"
          >
            {{ isSending ? `${t("contactPage.send")}...` : t("contactPage.send") }}
          </button>
        </div>
      </GlowCard>
    </section>
  </div>
</template>
