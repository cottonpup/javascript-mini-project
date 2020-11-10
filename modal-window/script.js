'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

// console.log(btnsOpenModal);
/*
0: button.show-modal
1: button.show-modal
2: button.show-modal
length: 3
__proto__: NodeList
*/

const closeModal = function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

const openModal = function(){
    // 여러개의 클래스를 지울 수 있음. 
    // classList에는 '.' 닷을 사용하지 않는다. 
    // modal.classList.remove('hidden', 'extra');
    modal.classList.remove('hidden');
    // modal.style.display = 'block'; 
    // class 로 style을 manipulate하는 것이 직관적이고 더 바람직.  
    overlay.classList.remove('hidden');
}

// 한 줄일 경우 컬리 브라켓을 사용하지 않아도 된다. 
for(let i = 0; i < btnsOpenModal.length; i++)
    btnsOpenModal[i].addEventListener('click', openModal);

// close 버튼을 클릭하면 모달이 닫히게 하기. 
btnCloseModal.addEventListener('click', closeModal);
// modal 밖 윈도우를 클릭하면 모달이 닫히게 하기 .
overlay.addEventListener('click', closeModal);

// keyboard event is called global-event. They do not happen in specific object.   
// 
document.addEventListener('keydown', function(e){
    // console.log(e);
    // KeyboardEvent {isTrusted: true, key: "Escape", code: "Escape", location: 0, ctrlKey: false, …}
   if (e.key === 'Escape' && !modal.classList.contains('hidden')){
       closeModal();
   }
});