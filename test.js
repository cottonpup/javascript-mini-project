// const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// const openingHours = {
//   [weekdays[3]]: {
//     open: 12,
//     close: 22
//   },
//   [weekdays[4]]: {
//     open: 11,
//     close: 23
//   },
//   [weekdays[5]]: {
//     open: 0, // Open 24 hours
//     close: 24
//   }
// };

// const restaurant = {
//   // ES6
//   openingHours
// };

// 🐿 Optional Chaining (.?)
// console.log(restaurant.openingHours.mon?.open); // undefined

// // 번거로움 !
// // if (restaurant.openingHours && restaurant.openingHours.mon) {
// //   console.log(restaurant.openingHours.mon.open);
// // }

// // 🐿 null 병합 연산자 - Nullish Coalescing Operator (??) 을 이용하면 효과적으로 이용가능!
// console.log(restaurant.openingHours.mon?.open ?? 'closed');

// // --------------------------------------------------------------------------------------------------------------

const menu = ['미역국', '케이크', '스테이크'];
const drink = ['식혜', '콜라', '사이다'];

// // 🐿 for of 구문
// for (food of menu) {
//   console.log(food + ' 먹고싶다');
// }

// // // 🐿 스프레드 연산자
// const meals = [...menu, ...drink];
// // console.log(meals);

// // const [select, , , , ...others] = meals;
// // console.log(select, others);

// // 🐿 Object.entries()
// const mealMenu = Object.entries(meals);

// for (const [i, food] of mealMenu) {
//   console.log(`${parseInt(i) + 1}번째 음식은 ${food} 입니다.`);
// }

// 🐿 Set
let person = new Set(['김철수', '김지영', '김철수', '이지은']);
// console.log(typeof person);
// length는 존재하지 않는다.
// console.log(person.size);
// console.log(person.add('홍길동'));
// console.log(person.add('세종대왕'));
// console.log(person.delete('세종대왕')); // true
// console.log(person.delete('이순신')); // false
// console.log(person.has('홍길동')); // true
// person.clear;
// console.log(person + '완료');

// // // 🐿 Map
// const rest = new Map();
// rest.set('name', 'Classico Italiano').set(1, 'Firenze, Italy');
// console.log(rest);

function test(a = 1) {
  console.log(a);
}

test();
