import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

date = new Date();
dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button');
// console.log(startBtn);
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectDate.selectedDates[0] > date) {
      startBtn.disabled = false;
    } else {
      startBtn.disabled = true;
      Notiflix.Notify.failure(
        'Вибраний час вже в минулому. Введіть дату з майбутнього!',
        { position: 'center-center', backoverlay: true }
      );
    }
  },
};
const selectDate = flatpickr(dateInput, options);
console.log(selectDate.selectedDates[0]);

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const reverseTime = Date.parse(selectDate.selectedDates[0]) - Date.now();

      if (reverseTime > 0) {
        const { days, hours, minutes, seconds } = convertMs(reverseTime);

        dataHours.textContent = `${pad(hours)}`;
        dataDays.textContent = `${pad(days)}`;
        dataMinutes.textContent = `${pad(minutes)}`;
        dataSeconds.textContent = `${pad(seconds)}`;
      } else {
        window.alert('The time is up');
        window.location.reload();
        clearInterval(this.intervalId);
      }
    }, 1000);
  },
};

startBtn.setAttribute('disabled', true);
startBtn.addEventListener('click', onStartBtn);

function onStartBtn() {
  startBtn.setAttribute('disabled', true);
  dateInput.setAttribute('disabled', true);
  timer.start();
}

function pad(value) {
  return String(value).padStart(2, '0');
}
