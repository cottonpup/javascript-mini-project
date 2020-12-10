//  User can press a button to start and stop the display ✅
//  User can change the interval of time controlling the change in intensity ✅
//  User can select the color used to fill each circle ✅
//  User can specify the intensity value ✅
//  User can change the size of any circle in the row ✅ Yes but not each
//  User can specify the number of rows to be included in the display. From one to seven rows can be chosen ⚠️ i dont think i can do it lol

'strict mode';

const circles = document.querySelectorAll('.circle');
const startButton = document.querySelector('[data-start-button]');
const stopButton = document.querySelector('[data-stop-button]');
const speedValue = document.querySelector('#speed-number-value');
const speedChangeButton = document.querySelector('#speed-change-button');
const colorValue = document.querySelector('#color-value');
const colorChange = document.querySelector('#color-change-button');
const sizeChangeRange = document.querySelector('[name="size-change-range"]');
const warning = document.querySelector('.warning');
const text = document.querySelector('h4');
const selectAll = document.querySelector('#select-all');

selectAll.addEventListener('click', function () {
    circles.forEach((circle) => circle.classList.add('selected'));
});

stopButton.addEventListener('click', function () {
    circles.forEach((circle) => {
        circle.classList.remove('glow');
        circle.classList.remove('selected');
        circle.classList.add('off');
    });
});

startButton.addEventListener('click', function () {
    circles.forEach((circle) => {
        circle.classList.add('glow');
        circle.classList.remove('off');
    });
});

speedChangeButton.addEventListener('click', function () {
    circles.forEach((circle) => {
        if (circle.classList.contains('selected')) {
            circle.style.animationDuration = `${speedValue.value}s`;
            circle.classList.remove('selected');
        }
    });
});

circles.forEach((circle) => {
    circle.addEventListener('click', function () {
        circle.classList.toggle('selected');
    });
});

colorChange.addEventListener('click', function () {
    circles.forEach((circle) => {
        if (circle.classList.contains('selected')) {
            circle.style.backgroundColor = circle.style.setProperty('--circle-color', colorValue.value);
            circle.style.color = circle.style.setProperty('--circle-color', colorValue.value);
            circle.classList.remove('selected');
        }
    });
});

sizeChangeRange.addEventListener('change', function () {
    circles.forEach((circle) => {
        if (circle.classList.contains('selected')) {
            circle.style.height = 2 * sizeChangeRange.value + 'em';
            circle.style.width = 2 * sizeChangeRange.value + 'em';
            circle.classList.remove('selected');
        }
    });
});
