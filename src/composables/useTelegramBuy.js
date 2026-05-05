import { telegramUrl } from "@/utils/telegram";
import { formatMoney, formatTokens } from "@/utils/format";

export function useTelegramBuy(t) {
  function rankHref(entry) {
    const rank = t(`ranks.${entry.id}.name`);
    const variant = t(`variant.${entry.variant}`);
    const feats = [];
    for (let i = 0; i < 4; i++) {
      const f = t(`ranks.${entry.id}.features.${i}`);
      if (f && !f.includes("ranks.")) feats.push(`• ${f}`);
    }
    const body =
      t("tg.rank") +
      `${rank} — ${variant}\n` +
      `${formatMoney(entry.price)}\n` +
      feats.join("\n");
    return telegramUrl(body);
  }

  function tokenHref(amount, price) {
    const body = t("tg.token") + `${formatTokens(amount)} token — ${formatMoney(price)}`;
    return telegramUrl(body);
  }

  function keyHref(id, price) {
    const label = t(`keys.${id}`);
    const body = t("tg.key") + `${label}\n${formatMoney(price)}`;
    return telegramUrl(body);
  }

  function unbanHref() {
    return telegramUrl(t("tg.unban") + formatMoney(10000));
  }

  function contactHref(name, message) {
    const body = t("tg.contact") + (name ? `Имя/ник: ${name}\n` : "") + (message || "");
    return telegramUrl(body);
  }

  return { rankHref, tokenHref, keyHref, unbanHref, contactHref };
}
