'use strict';

//  1. User can enter up to 8 binary digits in one input field ✅
//  2. User must be notified if anything other than a 0 or 1 was entered ✅
//  3. User views the results in a single output field containing the decimal (base 10) equivalent of the binary number that was entered ✅
//  4. User can enter a variable number of binary digits. ✅
//  5. When User's input can't be validated, show a warning modal. ✅

// <<problem>>
// * input type='text'에서 숫자만 받기 => validation 추가 (replace 혹은 match 이용)

const binaryNumber = document.querySelector('#bin');
const decimalNumber = document.querySelector('#dec');
const modal = document.querySelector('.modal');
const times = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');
const button = document.querySelector('input[type="button"]');
decimalNumber.setAttribute('readonly', 'readonly');

const showModal = (text) => {
    // Disable input when modal shows
    binaryNumber.setAttribute('readonly', 'readonly');
    const warning = document.querySelector('.warning');
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    warning.innerText = text;
};

const closeModal = () => {
    // Enable input when modal shows
    binaryNumber.removeAttribute('readonly', 'readonly');
    binaryNumber.value = '';
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

const validateBinary = () => {
    let check = /^[01]+$/;
    if (!binaryNumber.value.match(check)) {
        showModal('⚠️ 0과 1 두 개의 숫자만 가능합니다.');
    } else if (binaryNumber.value.length >= 9) {
        showModal('⚠️ 최대 8숫자까지만 가능합니다.');
    }
};

const bin_to_dec = () => {
    let decResult = parseInt((binaryNumber.value + '').replace(/[^01]/, ''), 2);
    decimalNumber.value = decResult;
    if (!decResult) {
        decimalNumber.value = '숫자를 입력하시오.';
    }
};

const init = () => {
    binaryNumber.addEventListener('input', validateBinary);
    binaryNumber.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            bin_to_dec();
        }
    });
    times.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    button.addEventListener('click', bin_to_dec);
    document.addEventListener('keydown', function (e) {
        if ((e.key === 'Escape' && !modal.classList.contains('hidden')) || (e.key === 'Enter' && !modal.classList.contains('hidden'))) {
            closeModal();
        }
    });
};

init();
