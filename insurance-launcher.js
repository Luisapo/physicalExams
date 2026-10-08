(() => {
  const launcher = document.getElementById("insurance-launcher");
  if (!launcher) return;

  
  launcher.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-portal-url]");
    if (!button || !launcher.contains(button)) return;

    
    const portalUrl = button.dataset.portalUrl.trim();
    if (portalUrl) {
  window.open(portalUrl, "_blank", "noopener,noreferrer");

  launcher.classList.remove("active");
  document
    .getElementById("insurance-toggle")
    ?.setAttribute("aria-expanded", "false");
}
  });
})();
