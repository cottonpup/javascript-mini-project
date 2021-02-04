// Exporting module
console.log('Exporting module');

// variables declared inside a module are scoped this module
// the module itself is like top level scope.
// 뭔 소리래? 그니까!!! 모듈안에 있는 변수들은 모두 Private 변수
const shoppingCost = 10;
const cart = [];

// export는 항상 happen in top level
// if(export 블라블라) 이렇게 다른 블럭 안에서는 일어나지 않음.
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

// exporting multiple items at the same time
export { totalPrice, totalQuantity as tq, cart };
// export default; use when we want to use one value from a module
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
