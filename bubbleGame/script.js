let seconds = 60;
let hitValue = 0;
let score = 0;

function makeBubbles() {
  let bubbles = "";

  for (let i = 1; i < 120; i++) {
    let value = Math.floor(Math.random() * 10);
    bubbles += `<div class="bubble">${value}</div>`;
  }

  document.querySelector("#bottom-section").innerHTML = bubbles;
}

function runTimer() {
  let timer = setInterval(() => {
    if (seconds > 0) {
      seconds--;
      document.querySelector("#seconds").textContent = seconds;
    } else {
      document.querySelector("#bottom-section").innerHTML =
        "<h1>Game Over</h1>";
      clearInterval(timer);
    }
  }, 1000);
}

function getHitValue() {
  hitValue = Math.floor(Math.random() * 10);
  document.querySelector("#hit-value").textContent = hitValue;
}

function increaseScore() {
  score += 10;
  document.querySelector("#score").textContent = score;
}

document.querySelector("#bottom-section").addEventListener("click", (e) => {
  let hitedval = Number(e.target.textContent);
  if (hitedval == hitValue) {
    increaseScore();
    getHitValue();
    makeBubbles();
  }
});

makeBubbles();
runTimer();
getHitValue();
