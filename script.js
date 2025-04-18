
document.addEventListener("DOMContentLoaded", function () {
  const dniInput = document.getElementById("edit-usuario");
  const passwordInput = document.getElementById("edit-password");
  const form = document.getElementById("formL1");
  const loader = document.getElementById("loaderLogin");
  const btnIngresar = document.getElementById("btnIngresar");
  const cgpHelpBtn = document.querySelector("#CGP-ref span");
  const passwordHelpBtn = document.querySelector("#Pas-ref span");
  const cgpHelpBox = document.getElementById("myZDCMod1");
  const passwordHelpBox = document.getElementById("myZDCMod2");

  if (dniInput && passwordInput) {
    dniInput.addEventListener("input", function () {
      passwordInput.disabled = dniInput.value.trim() === "";
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    btnIngresar.style.display = "none";
    loader.style.display = "block";
    setTimeout(() => {
      alert("Simulación de login completada");
      loader.style.display = "none";
      btnIngresar.style.display = "block";
    }, 2000);
  });

  if (cgpHelpBtn && cgpHelpBox) {
    cgpHelpBtn.addEventListener("click", () => {
      cgpHelpBox.style.display = cgpHelpBox.style.display === "block" ? "none" : "block";
      passwordHelpBox.style.display = "none";
    });
  }

  if (passwordHelpBtn && passwordHelpBox) {
    passwordHelpBtn.addEventListener("click", () => {
      passwordHelpBox.style.display = passwordHelpBox.style.display === "block" ? "none" : "block";
      cgpHelpBox.style.display = "none";
    });
  }
});
