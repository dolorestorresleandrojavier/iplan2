
document.addEventListener("DOMContentLoaded", () => {
  const dniInput = document.getElementById("edit-usuario");
  const passInput = document.getElementById("edit-password");
  const form = document.getElementById("formL1");
  const loader = document.getElementById("loaderLogin");
  const btn = document.getElementById("btnIngresar");

  dniInput.addEventListener("input", () => {
    passInput.disabled = dniInput.value.trim() === "";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    btn.style.display = "none";
    loader.style.display = "block";
    setTimeout(() => {
      alert("Simulando login correcto");
      loader.style.display = "none";
      btn.style.display = "block";
    }, 2000);
  });

  const helpToggles = [
    ["CGP-ref", "myZDCMod1"],
    ["Pas-ref", "myZDCMod2"]
  ];
  helpToggles.forEach(([triggerId, modalId]) => {
    const trigger = document.querySelector(`#${triggerId} span`);
    const modal = document.getElementById(modalId);
    if (trigger && modal) {
      trigger.addEventListener("click", () => {
        modal.style.display = modal.style.display === "block" ? "none" : "block";
      });
    }
  });
});
