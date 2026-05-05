import { ref } from "vue";

const STORAGE_KEY = "novstax-theme";

function readInitial() {
  if (typeof localStorage === "undefined") return "dark";
  return localStorage.getItem(STORAGE_KEY) || "dark";
}

const theme = ref(readInitial());
applyTheme(theme.value);

function applyTheme(value) {
  if (typeof document !== "undefined") document.documentElement.dataset.theme = value;
  if (typeof localStorage !== "undefined") localStorage.setItem(STORAGE_KEY, value);
}

export function useTheme() {
  function toggleTheme() {
    theme.value = theme.value === "dark" ? "light" : "dark";
    applyTheme(theme.value);
  }
  return { theme, toggleTheme };
}
