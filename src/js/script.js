const bgContainer = document.getElementById("bg-container");
const btnMorning = document.getElementById("btn-morning");
const btnAfternoon = document.getElementById("btn-afternoon");
const btnEvening = document.getElementById("btn-evening");
const btnNight = document.getElementById("btn-night");

const themeButtons = [btnMorning, btnAfternoon, btnEvening, btnNight];

const themes = {
  morning: "./src/assets/img/bg-morning-ground.png",
  afternoon: "./src/assets/img/bg-afternoon-ground.png",
  evening: "./src/assets/img/bg-evening-ground.png",
  night: "./src/assets/img/bg-night-ground.png",
};

function changeTheme(themeName, activeButton) {
  const bgUrl = themes[themeName];
  if (!bgUrl) {
    console.error(`Tema "${themeName}" tidak ditemukan!`);
    return;
  }

  bgContainer.style.backgroundImage = `url('${bgUrl}')`;

  themeButtons.forEach((btn) => {
    if (btn) btn.classList.remove("glass");
  });

  if (activeButton) {
    activeButton.classList.add("glass");
  }
}

btnMorning.addEventListener("click", (e) => changeTheme("morning", e.currentTarget));
btnAfternoon.addEventListener("click", (e) => changeTheme("afternoon", e.currentTarget));
btnEvening.addEventListener("click", (e) => changeTheme("evening", e.currentTarget));
btnNight.addEventListener("click", (e) => changeTheme("night", e.currentTarget));
changeTheme("morning", btnMorning);
