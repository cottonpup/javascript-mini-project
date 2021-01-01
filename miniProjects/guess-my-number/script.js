'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

// 메세지를 보이는 함수
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// check 버튼을 눌러 클릭 이벤트가 일어났을 때
document.querySelector('.check').addEventListener('click', function () {
  // 변수를 통해 입력한 guess 넘버 값을 가져오기
  const guess = Number(document.querySelector('.guess').value);
  // console.log(guess, typeof guess);

  // 인풋 값이 없을 때
  if (!guess) {
    displayMessage('⚠️ No number!');
  }
  // 플레이어가 틀린 범위의 숫자를 입력했을 때
  // guess 가 1보다 작거나 20보다 크거나
  else if (1 > guess || guess > 20) {
    displayMessage("It's wrong number.");
  }
  // 플레이어가 이겼을 때, 'guess'와 'secretNumber' 같을 때
  else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    document.querySelector('.number').textContent = secretNumber;

    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    // 플레이어 스코어가 하이스코어보다 크다면, 플레이어 스코어를 하이스코어로 업데이트하기
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }
  // 플레이어의 인풋이  secretNumber 와 같지 않을 때
  else if (guess !== secretNumber) {
    // 플레이어 스코어가 1보다 클 때
    if (score > 1) {
      displayMessage(guess > secretNumber ? '😭 Too high!' : '😅 Too low!');
      document.querySelector('.highscore').textContent = score;
      score--;
    }
    // 플레이어 스코어가 1보다 작을 때, 플레이어가 졌을 때
    else {
      displayMessage('😱 You lost the game!');
      document.querySelector('.score').textContent = 0;
    }
  }
});

// Again 버튼을 눌러 reset 했을 때
document.querySelector('.again').addEventListener('click', function () {
  // css 초기화
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';

  score = 20;
  // secretNumber 초기화
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  displayMessage('Start guessing...');
});
