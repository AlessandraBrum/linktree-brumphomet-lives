(function () {
  const STORAGE_KEY = "brumphomet-motion";
  const root = document.documentElement;

  function readPreference() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function savePreference(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (error) {}
  }

  if (readPreference() === "off") {
    root.classList.add("no-motion");
  }

  document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".motion-toggle");
    if (!button) return;

    const label = button.querySelector(".motion-label");
    const systemReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    function render() {
      const lockedBySystem = systemReduce.matches;
      const paused = lockedBySystem || root.classList.contains("no-motion");
      button.classList.toggle("is-paused", paused);
      button.setAttribute("aria-disabled", String(lockedBySystem));
      if (lockedBySystem) {
        label.textContent = "Animações pausadas pelo sistema";
      } else {
        label.textContent = paused ? "Retomar animações" : "Pausar animações";
      }
    }

    systemReduce.addEventListener("change", render);

    button.addEventListener("click", function () {
      if (systemReduce.matches) return;
      root.classList.toggle("no-motion");
      savePreference(root.classList.contains("no-motion") ? "off" : "on");
      render();
    });

    button.hidden = false;
    render();
  });
})();
