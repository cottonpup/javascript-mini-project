'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const displayMovements = function(movements){
  containerMovements.innerHTML = '';
  movements.forEach(function(mov, i){
    const type = mov > 0? 'deposit':'withdrawal';
    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}
        </div>
        <div class="movements__value">${mov}</div>
      </div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

displayMovements(account1.movements);

const calcPrintBalance = function(movements){
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} EUR`;
}

calcPrintBalance(account1.movements);

const createUserName = function(accs){
  accs.forEach(function(acc){
    acc.userName = acc.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  })
}

createUserName(accounts);
console.log(accounts);


const eurToUsd = 1.1;
// const movementsUSD = movements.map(function(mov){
//     return mov * eurToUsd;
// });
// // 화살표 함수로 변경하기 🏹 
// // 한 줄이면 return 키워드 불필요
// const movementsUSD = movements.map(mov => mov * eurToUsd);
// console.log(movements);
// console.log(movementsUSD);

// const movementUSDfor = [];
// for(const mov of movements){
//   movementUSDfor.push(mov * eurToUsd);
// }
// console.log(movementUSDfor);

// Map으로 새로운 배열로 출력하기 🗺
// movements.map(function(mov, i){
//   if(mov > 0){
//     console.log(`Movement ${i + 1}: You deposited ${mov}`)
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
//   }
// })

movements.map((mov, i) => console.log(`Movement ${i + 1}: You ${mov > 0? 'deposited' : 'withdrew'} ${Math.abs(mov)}`))

// Lectures 👩🏻‍💻👨🏻‍💻

const deposit = movements.filter(function(mov){
  return mov > 0;
})
console.log(deposit);

const depositFor = [];
for(const mov of movements) if(mov > 0) depositFor.push(mov);
console.log(depositFor);

const withdrawals = movements.filter((mov) => mov < 0)
console.log(withdrawals);

// REDUCE METHOD
// accumulator -> SNOWBALL ☃️
const balance = movements.reduce(function(acc, cur, i, arr){ // acc = accumulator
  console.log(`acc: ${acc} // cur: ${cur}`);
  return acc + cur;
}, 0);
console.log(balance);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//  acc: 0 // cur: 200
//  acc: 200 // cur: 450
//  acc: 650 // cur: -400
//  acc: 250 // cur: 3000
//  acc: 3250 // cur: -650
//  acc: 2600 // cur: -130
//  acc: 2470 // cur: 70
//  acc: 2540 // cur: 1300


// FOR OF 활용하기 - 초기값(쌓이는 값)은 유동적으로 계속 변하니까 let으로 설정해두어야 함! 
let balance2 = 0;
for(const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum value
// const max = movements.reduce((acc, mov) => {
//   if(acc > mov) return acc;
//   else return mov;
// }, movements[0]);


// Maximum value
console.log(movements);
const max = movements.reduce((acc, mov) => {
  if(acc > mov) {
    console.log(`${acc} > ${mov}`);
    return acc
  } else {
    console.log(`${acc} < ${mov}`);
    return mov
  };
}, movements[0]); // initialValue에 0하지 않기! 만약 값들이 다 마이너스면 어떡해..ㅎㅎ

console.log(`최후의 승자..👑: ${max}`);

