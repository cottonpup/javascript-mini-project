let fs = require('fs');
let input = fs
  .readFileSync('/dev/stdin')
  .toString()
  .split(' ')
  .map((i) => parseInt(i));
// 파일로부터 input을 받기 때문에, input은 string이다.
const a = input[0];
const b = input[1];
function plus(a, b) {
  return a + b;
}
console.log(plus(a, b));

// echo 'hello'
// > pipe : takes something cf) normal pipe => |
// cat textFile.txt
// / Root directory
// ls ~ My user directory  === ls /Users/Leeyounggyoung
