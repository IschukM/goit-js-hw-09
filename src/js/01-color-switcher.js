function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyColorEl = document.querySelector('body');
let timerId = null;

startBtn.addEventListener('click', e => {
  timerId = setInterval(() => {
    bodyColorEl.style.backgroundColor = getRandomHexColor();
  }, 1000);

  e.currentTarget.disabled = true;
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.disabled = false;
});
