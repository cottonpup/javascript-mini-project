'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0; 

const displayMessage = function(message){
  document.querySelector('.message').textContent = message;
};


document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);


  //console.log(guess, typeof guess);

    // When there is no input 
  if (!guess) {
    displayMessage('⚠️ No number!');

    // when player wins
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    document.querySelector('.number').textContent = secretNumber;

    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    
    if(score > highscore){
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    // when guess is wrong
  } else if(guess !== secretNumber){
    if(score > 1){
      // refactor code by a turnery operator
      displayMessage(guess > secretNumber ? '😭 Too high!' : '😅 Too low!');
      document.querySelector('.highscore').textContent = score;
      score--;
    } else {
      displayMessage('😱 You lost the game!');
      document.querySelector('.score').textContent = 0;
    }
  }
});

// Again reset button 
document.querySelector('.again').addEventListener('click', function(){
  
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';

  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  displayMessage ('Start guessing...');

});





