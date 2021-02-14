'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444
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
  ['GBP', 'Pound sterling']
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}
        </div>
        <div class="movements__value">${mov}€</div>
      </div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, arr, i) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('');
  });
};

createUserName(accounts);
// console.log(accounts);

const eurToUsd = 1.1;
const totalDepositsUSD = movements
  .filter((mov) => mov > 0)
  .map((mov) => mov * eurToUsd)
  .reduce((acc, cur) => acc + cur, 0);

// console.log(totalDepositsUSD);

let currentAccount;

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('Login!');
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = '100';
    // 왼쪽에서, 오른쪽으로 할당하기 때문에, 이렇게 적는 것이 가능하다.
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.userName === inputTransferTo.value
  );
  // console.log(amount, receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    // doing the transfer
    console.log('Transfer Valid');
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movements
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.userName === currentAccount.userName
    );
    console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// const eurToUsd = 1.1;
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

// movements.map((mov, i) => console.log(`Movement ${i + 1}: You ${mov > 0? 'deposited' : 'withdrew'} ${Math.abs(mov)}`))

// Lectures 👩🏻‍💻👨🏻‍💻

// const deposit = movements.filter(function(mov){
//   return mov > 0;
// })
// console.log(deposit);

// const depositFor = [];
// for(const mov of movements) if(mov > 0) depositFor.push(mov);
// console.log(depositFor);

// const withdrawals = movements.filter((mov) => mov < 0)
// console.log(withdrawals);

// REDUCE METHOD
// accumulator -> SNOWBALL ☃️
// const balance = movements.reduce(function(acc, cur, i, arr){ // acc = accumulator
//   console.log(`acc: ${acc} // cur: ${cur}`);
//   return acc + cur;
// }, 0);
// console.log(balance);

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
// let balance2 = 0;
// for(const mov of movements) balance2 += mov;
// console.log(balance2);

// Maximum value
// const max = movements.reduce((acc, mov) => {
//   if(acc > mov) return acc;
//   else return mov;
// }, movements[0]);

// Maximum value
// console.log(movements);
// const max = movements.reduce((acc, mov) => {
//   if(acc > mov) {
//     console.log(`${acc} > ${mov}`);
//     return acc
//   } else {
//     console.log(`${acc} < ${mov}`);
//     return mov
//   };
// }, movements[0]); // initialValue에 0하지 않기! 만약 값들이 다 마이너스면 어떡해..ㅎㅎ

// console.log(`최후의 승자..👑: ${max}`);

// console.log(movements);

// // EQUALITY
// console.log(movements.includes(-130)); // true

// // SOME: CONDITION
// console.log(movements.some((mov) => mov === -130)); // true

// const anyDeposits = movements.some((mov) => mov > 0); // 조건에 부합하는 any value!!
// console.log(anyDeposits);

// // EVERY
// console.log(movements.every((mov) => mov > 0));
// console.log(account4.movements.every((mov) => mov > 0));

// // Separate callback
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());
// // [1, 2, 3, 4, 5, 6, 7, 8]

// const arrDeep = [[1, [2, 3]], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(2));
// // [1, 2, 3, 4, 5, 6, 7, 8]

// // const accountMovement = accounts.map(acc => acc.movements);
// // console.log(accountMovement);
// // const allMovements = accountMovement.flat();
// // console.log(allMovements);
// // const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// // console.log(overallBalance);

// // flat: chaining
// const overallBalance = accounts
//   .map((acc) => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);
// // 17840

// // flatMap
// const overallBalance = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);
// // 17840

const owners = ['Jonas', 'Zach', 'Adams', 'Martha'];
console.log(owners.sort());
// ["Adams", "Jonas", "Martha", "Zach"]
// ABC 순서대로 정렬 🔤
console.log(owners);
// ["Adams", "Jonas", "Martha", "Zach"]
// 원본 손상 😱😨

// Numbers
console.log(movements);
// console.log(movements.sort());
// 뭔가 이상하게 나온다..😱😨
// 😯? Sort method is based on String
// How to fix!! 😌😇 => callback func을 이용해라!!

// return < 0, A, B (Keep order)
// return > 0, B, A (Switch order)

// ascending
// movements.sort((a, b) => {
//   if(a > b) return 1;
//   if(a < b) return -1;
// });

// movements.sort((a, b) => a - b);
// console.log('ascending', movements);

// descending
// movements.sort((a, b) => {
//   if(a > b) return -1;
//   if(a < b) return 1;
// });

// movements.sort((a, b) => b - a);
// console.log('descending', movements);

// 1. Array.fill() 🎃
console.log([1, 2, 3]);
console.log(new Array(1, 2, 3)); // [1, 2, 3]

const x = new Array(7);
console.log(x); // [empty x 7] array
// console.log(x.map(()=> 5)); // [empty x 7] array : doesn't work

// x.fill(3); // mutate the underlying array
// x.fill(1, 3) // [empty × 3, 1, 1, 1, 1]
x.fill(1, 3, 5); // [empty × 3, 1, 1, empty × 2]
console.log(x);

x.fill(23, 4, 6); // [empty × 3, 1, 23, 23, empty]
console.log(x);

// 2. Array.from() 🎃
const y = Array.from({ length: 7 }, () => 1);
console.log(y); // [1, 1, 1, 1, 1, 1, 1]

const z = Array.from({ length: 7 }, (_, i) => i + 1); // cur => _ 컨벤션에 따라 인자명 바꿔주기
console.log(z); // [1, 2, 3, 4, 5, 6, 7]

/*
querySelectorAll 은 NodeList를 반환하는데, 진짜 Array가 아니다. 
따라서 많은 Array method를 가지고 있지 않는다. 
그럼 어떻게 해야해요??😙 NodeList를 Array로 반환하자! 
For that, `Array.from()`은 PERFECT! 👏
*/

labelBalance.addEventListener('click', function () {
  // movementsUI => Array
  // 두번째 인자에 맵핑한 숫자 넣기
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    (el) => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  // 다른 방법!
  const movementsUI2 = [
    ...document.querySelectorAll('.movements__value')
  ].map((el) => Number(el.textContent.replace('€', '')));
  console.log(movementsUI2);
});
