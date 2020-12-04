'use strict';

// User can see a box which has a border-radius property applied to it
// User can change the 4 border-radius values that are applied to the box (top-left, top-right, bottom-left, bottom-right)
// User can copy the resulting CSS to the clipboard
// User can change all 8 possible values of the border-radius in order to create a complex shape

const previewBox = document.querySelector('.preview-box');
const horizontalTopLeft = document.querySelector('#horizontal-top-left');
const horizontalTopRight = document.querySelector('#horizontal-top-right');
const horizontalBottomRight = document.querySelector('#horizontal-bottom-right');
const horizontalBottomLeft = document.querySelector('#horizontal-bottom-left');

const verticalLeftTop = document.querySelector('#vertical-left-top');
const verticalRightTop = document.querySelector('#vertical-right-top');
const verticalRightBottom = document.querySelector('#vertical-right-bottom');
const verticalLeftBottom = document.querySelector('#vertical-left-bottom');

const result = document.querySelector('input[type="text"]');
const copy = document.querySelector('input[type="button"]');
const modal = document.querySelector('.modal');

let $horizontalTopLeft;
let $horizontalTopRight;
let $horizontalBottomRight;
let $horizontalBottomLeft;

let $verticalLeftTop;
let $verticalRightTop;
let $verticalRightBottom;
let $verticalLeftBottom;

copy.addEventListener('click', function () {
    modal.classList.remove('hidden');

    result.select();
    result.setSelectionRange(0, 99999);

    document.execCommand('copy');

    if (!modal.classList.contains('hidden')) {
        window.setTimeout(() => {
            modal.classList.add('hidden');
        }, 1000);
    }
});

function oninputSet() {
    horizontalTopLeft.oninput = valueSet;
    horizontalTopRight.oninput = valueSet;
    horizontalBottomRight.oninput = valueSet;
    horizontalBottomLeft.oninput = valueSet;

    verticalLeftTop.oninput = valueSet;
    verticalRightTop.oninput = valueSet;
    verticalRightBottom.oninput = valueSet;
    verticalLeftBottom.oninput = valueSet;
}

function valueSet() {
    oninputSet();
    $horizontalTopLeft = horizontalTopLeft.value;
    $horizontalTopRight = horizontalTopRight.value;
    $horizontalBottomRight = horizontalBottomRight.value;
    $horizontalBottomLeft = horizontalBottomLeft.value;

    $verticalLeftTop = verticalLeftTop.value;
    $verticalRightTop = verticalRightTop.value;
    $verticalRightBottom = verticalRightBottom.value;
    $verticalLeftBottom = verticalLeftBottom.value;

    previewBox.style.borderRadius = `${$horizontalTopLeft}% ${$horizontalTopRight}% ${$horizontalBottomRight}% ${$horizontalBottomLeft}%  
                                    / ${$verticalLeftTop}% ${$verticalRightTop}% ${$verticalRightBottom}% ${$verticalLeftBottom}%`;
    result.value = previewBox.style.borderRadius;
}

valueSet();
