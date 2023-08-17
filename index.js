// https://www.thecolorapi.com/scheme?

document.getElementById("select-btn").addEventListener("click", function () {
  const seedColor = document.getElementById("seed-color").value.substring(1);
  const mode = document.getElementById("color-scheme").value.toLowerCase();

  fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${mode}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.mode);
      let html = "";
      data.colors.forEach(function (color) {
        console.log(color.hex.value);
        html += `
        <div class="color-column">
        <div class="color" style="background-color:${color.hex.value}"></div>
        <p class="hex">${color.hex.value}</p>
      </div>
        `;
      });

      document.getElementById("scheme-container").innerHTML = html;
    });
});
