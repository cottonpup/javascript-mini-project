//  1. User can enter up to 8 binary digits in one input field ✅
//  2. User must be notified if anything other than a 0 or 1 was entered ✅
//  3. User views the results in a single output field containing the decimal (base 10) equivalent of the binary number that was entered ✅
//  4. User can enter a variable number of binary digits. ✅
//  5. When User's input can't be validated, show a warning modal. ✅

// <<problem>>
// * input type='text'에서 숫자만 받기

const binaryNumber = document.querySelector('#bin');
const decimalNumber = document.querySelector('#dec');
const modal = document.querySelector('.modal');
const times = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');
const button = document.querySelector('input[type="button"]');

function showModal(text) {
    binaryNumber.setAttribute('readonly', 'readonly');
    decimalNumber.setAttribute('readonly', 'readonly');
    const warning = document.querySelector('.warning');
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    warning.innerText = text;
}

function closeModal() {
    binaryNumber.removeAttribute('readonly', 'readonly');
    decimalNumber.removeAttribute('readonly', 'readonly');
    binaryNumber.value = '';
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

function validation() {
    let check = /^[01]+$/;
    if (!binaryNumber.value.match(check)) {
        showModal('⚠️ 0과 1 두 개의 숫자만 가능합니다.');
    } else if (binaryNumber.value.length >= 9) {
        showModal('⚠️ 최대 8숫자까지만 가능합니다.');
    }
}

function bin_to_dec() {
    let decResult = parseInt((binaryNumber.value + '').replace(/[^01]/gi, ''), 2);
    decimalNumber.value = decResult;
    if (!decResult) {
        decimalNumber.value = '숫자를 입력하시오.';
    }
}

function init() {
    binaryNumber.addEventListener('input', validation);
    binaryNumber.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            bin_to_dec();
        }
    });
    times.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    button.addEventListener('click', bin_to_dec);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        } else if (e.key === 'Enter' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

init();
