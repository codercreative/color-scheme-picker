const headerContainer = document.getElementById("header-container");
const schemeContainer = document.getElementById("scheme-container");
const toggle = document.getElementById("toggle");

document
  .getElementById("select-btn")
  .addEventListener("click", fetchAndRenderColorScheme);

function fetchAndRenderColorScheme() {
  const seedColor = document.getElementById("seed-color").value.substring(1);
  const mode = document
    .getElementById("color-scheme-selector")
    .value.toLowerCase();
  fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${mode}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.mode);
      let html = "";
      data.colors.forEach(function (color) {
        html += `
        <div class="color-column">
          <div id=${color.hex.value} class="hex-color" data-tooltip="Copied!" style="background-color:${color.hex.value}">${color.name.value}</div>
          <p id=${color.hex.value} class="hex-code hover-effect" data-tooltip="Copied!">${color.hex.value}</p>
        </div>
        `;
      });

      schemeContainer.innerHTML = html;
    });

  schemeContainer.addEventListener("click", function (e) {
    let copiedHexCode = e.target.id;
    if (copiedHexCode) {
      navigator.clipboard.writeText(copiedHexCode).then(() => {
        tippy(e.target, {
          content: "Copied!",
          placement: "bottom",
          theme: "tooltip",
        });
        e.target._tippy.show();
      });
    }
  });
}
fetchAndRenderColorScheme();

toggle.addEventListener("input", function (e) {
  if (e.target.checked) {
    headerContainer.classList.add("dark-mode");
    schemeContainer.classList.add("dark-mode");
  } else {
    headerContainer.classList.remove("dark-mode");
    schemeContainer.classList.remove("dark-mode");
  }
});
