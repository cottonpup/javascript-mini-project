//  1. User can enter up to 8 binary digits in one input field ✅
//  2. User must be notified if anything other than a 0 or 1 was entered ✅
//  3. User views the results in a single output field containing the decimal (base 10) equivalent of the binary number that was entered
//  4. User can enter a variable number of binary digits. ✅
//  5. When User enter wrong, then show a warning modal. ✅

// <<problem>>
// * input type='text'에서 숫자만 받기

const binaryNumber = document.querySelector('#bin');
const decimalNumber = document.querySelector('#dec');
const modal = document.querySelector('.modal');
const times = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

function showModal(text) {
    const warning = document.querySelector('.warning');
    binaryNumber.setAttribute('readonly', 'readonly');
    decimalNumber.setAttribute('readonly', 'readonly');
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    warning.innerText = text;
}

function closeModal() {
    binaryNumber.value = '';
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    binaryNumber.removeAttribute('readonly', 'readonly');
    decimalNumber.removeAttribute('readonly', 'readonly');
}

function validation() {
    let check = /^[0-1]+$/;
    if (!binaryNumber.value.match(check)) {
        showModal('⚠️ 0과 1 두 개의 숫자만 가능합니다.');
    } else if (binaryNumber.value.length >= 9) {
        showModal('⚠️ 최대 8숫자까지만 가능합니다.');
    }
}

binaryNumber.addEventListener('input', validation);
binaryNumber.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        console.log('값을 제출합니다.');
    }
});
times.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});
