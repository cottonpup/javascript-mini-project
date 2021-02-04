// Importing Module

// 'use strict' 왜 안해요? All modules are executed in strict mode by default
// import는 순서랑 상관없이 호이스팅 된다.
// import method {} inside curly braces
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js'; // Actually, ES modules work without extension
// console.log('Importing module');
// addToCart('bread', 5);
// console.log(price, tq);

// 전체 import 컨벤션: 클래스 이름처럼 주기
// .js 확장자명을 적는 건 필수, 어떤 경우에서만 생략.
// import shoppingCart, * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// From export default
// You can mix as well (BUT NOT GOOD PATTERN🤮)
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// add('pizza', 2);
// console.log(price);

// import shoppingCart from './shoppingCart.js';
import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 3);
console.log(cart);
/*
Module is live connection, not copy 
(3) [{…}, {…}, {…}]
0: {product: "pizza", quantity: 2}
1: {product: "bread", quantity: 5}
2: {product: "apples", quantity: 3}
*/

// // IIFE
// const ShoppingCart2 = (function () {
//   const cart = [];
//   const shippingCost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(
//       // shippingCost 가 10으로 아주 잘 출력된다 칭찬해! ㅋㅋ => 클로저! birthplace기억, 안에서 접근가능
//       `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
//     );
//   };

//   const orderStock = function (product, quantity) {
//     console.log(`${quantity} ${product} ordered from supplier`);
//   };

//   // 이게 왜 가능할까? => 😍 바로 Closure 때문이다!😍
//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     orderStock,
//     totalQuantity
//   };
// })();

// ShoppingCart2.addToCart('apple', 4);
// ShoppingCart2.addToCart('pizza', 2);
// console.log(ShoppingCart2);
// // 프로퍼티는 Private 하기 때문에 접근이 불가능하다.
// // console.log(ShoppingCart2.shippingCost); // undefined

/////////////////////////////////////////////////////////////////////////////

// Common.js - Node.js에서 사용함

// Export
// export.addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(
//         `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
//     );
// };

// // Import
// const {addToCart} = require('./shoppingCart.js')

/////////////////////////////////////////////////////////////////
// cloneDeep.js 파일 임포트하기!

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
// 사실 Path를 이렇게 구체적으로 적을 필요가 없다
// 아래와 같이 간단하게 라이브러리 명만 적어도 된다.☺️
// This works with all kind of assets (HTML, CSS, SASS, IMG..)
import cloneDeep from 'lodash-es';

// 더 간단하게 lodash 도 가능..
// import cloneDeep from 'lodash';
// parcel works with all the CommonJS modules

// state remains here!!
const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 4 }
  ],
  user: { loggedIn: true }
};

const stateClone = Object.assign({}, state);
console.log(stateClone);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;
console.log(stateClone); // stateClone도 변경된다.. ㅠ ㅠ

// 그래서 Lodash를 쓰는게 좋다!!
// lodash로 deepClone한 객체의 프로퍼티는 변경되지 않았다!
console.log(stateDeepClone);
/////////////////////////////////////////////////////////////////////

// hot module replacement (HMR)
// without whole page loading, module injection
if (module.hot) {
  module.hot.accept();
}

/*
Hot Module Replacement (HMR) exchanges, adds, or removes modules 
while an application is running, without a full reload. 
This can significantly speed up development in a few ways: 
Retain application state which is lost during a full reload.
*/

// preset-env에 포함되지 않는 코드 적어보자.
class Person {
  greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}`);
  }
}
