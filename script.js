let timeoutId;
let time = 100;
let i = 1;
let loadingCount = 4;
function updateTimer() {
  time -= 0.2;
  const targetImg = document.querySelectorAll(".container img");
  const fullScreenImage = document.querySelector(".fullScreenImage img");
  const author = document.querySelector(".authorName p");
  if (i >= 4) {
    i = 0;
  }
  if (time <= 0) {
    time = 100;
    for (let i = 0; i < 4; i++) {
      targetImg[i].classList.remove("imgTarget");
    }
    targetImg[i].classList.add("imgTarget");
    fullScreenImage.src = targetImg[i].getAttribute("src");
    author.innerHTML = targetImg[i].textContent;
    i++;
  }
  document.querySelector(".progress").style.width = time + "%";
  startTimer();
}
function timerButton(event) {
  if (event.target.textContent === "STOP") {
    stopTimer();
    event.target.textContent = "PLAY";
  } else {
    startTimer();
    event.target.textContent = "STOP";
  }
}
function stopTimer() {
  time = 100;
  document.querySelector(".progress").style.width = time + "%";
  clearTimeout(timeoutId);
}
function startTimer() {
  timeoutId = setTimeout(updateTimer, 10);
}
function reload() {
  loadingCount = 5;
  stopTimer();
  targetReset();
  const page = Math.floor(Math.random() * 200);
    fetch("https://api.unsplash.com/photos/random?client_id=XEGrcasO-R3h596M07TDL9V4uD8cmgAkTOYmWw1FOvU&count=4")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const fullScreenImage = document.querySelector(".fullScreenImage img");
        const author = document.querySelector(".authorName p");
        const targetImg = document.querySelectorAll("img");
        targetImg[0].classList.add("imgTarget");
        fullScreenImage.classList.add("loadingImg");
        fullScreenImage.src = data[0].urls.regular;
        console.log(data[0].author);
        author.innerHTML = data[0].user.name;
        document.querySelectorAll("img").forEach((images, i) => {
          images.src = data[i].urls.regular;
          images.classList.add("loadingImg");
          images.innerHTML = data[i].user.name;
        });
      });
}

function target(event) {
  const targetImg = document.querySelectorAll("img");
  const fullScreenImage = document.querySelector(".fullScreenImage img");
  if (event.target.tagName === "IMG") {
    for (let i = 0; i < 4; i++) {
      targetImg[i].classList.remove("imgTarget");
    }
    event.target.classList.add("imgTarget");
    i = event.target.getAttribute("id");
    stopTimer();
    document.querySelector(".loadingButton").textContent = "PLAY";
    authorName(event);
    fullScreen(event);
  }
}
function fullScreen(event) {
  if (event.target.tagName === "IMG") {
    const fullScreenImage = document.querySelector(".fullScreenImage img");
    const targetImg = event.target.getAttribute("src");
    fullScreenImage.src = targetImg;
    fullScreenImage.classList.add("loadingImg");
  }
}
function authorName(event) {
  if (event.target.tagName === "IMG") {
    const author = document.querySelector(".authorName p");
    const targetImg = event.target.textContent;
    author.innerHTML = targetImg;
  }
}
function targetReset() {
  const test = document.querySelectorAll(".container img");
  for (let i = 0; i < 4; i++) {
    test[i].classList.remove("imgTarget");
  }
}
function loaded(event) {
  loadingCount -= 1;
  if (loadingCount === 0) {
    updateTimer();
  }
  event.target.classList.remove("loadingImg");
}
function init() {
  reload();
  document.querySelectorAll("img").forEach((images) => {
    images.onload = loaded;
  });
  document.querySelector(".container").addEventListener("click", target);
  const reloadButton = document.querySelector(".reloadButton");
  reloadButton.addEventListener("click", reload);
  const loadingButton = document.querySelector(".loadingButton");
  loadingButton.addEventListener("click", timerButton);
}
window.addEventListener("DOMContentLoaded", init);