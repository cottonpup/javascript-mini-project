// 아코디언 박스의 질문
const accordionItemHeader = document.querySelectorAll('.accordion-item-header');

// 아코디언 박스의 질문 노드를 매개변수로 주기
accordionItemHeader.forEach((accordionItemHeader) => {
    accordionItemHeader.addEventListener('click', (event) => {
        // * 열려있는 채로 한번 더 클릭하면 이미 열린 아코디언 창 닫기 *
        const currentlyActiveAccordionItemHeader = document.querySelector('.accordion-item-header.active');
        // 'active' 클래스를 가진 아코디언 박스의 질문노드와 현재 액티브 상태인 아코디언 박스의 질문노드가 같지 않다면,
        if (currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader !== accordionItemHeader) {
            // 현재 액티브 상태인 아코디언 박스 질문노드의 'active' 클래스를 추가 및 제거해라.
            currentlyActiveAccordionItemHeader.classList.toggle('active');
            // 현재 액티브 상태인 아코디언 박스 답변노드의 maxheight를 0으로 설정하여 답변을 숨겨라.
            currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
        }

        // 'click' 이벤트가 발생한 질문 노드에 'active' 클래스를 추가 및 제거해라.
        accordionItemHeader.classList.toggle('active');
        const accordionItemBody = accordionItemHeader.nextElementSibling;
        if (accordionItemHeader.classList.contains('active')) {
            // 아코디언 박스 답변노드의 maxheight를 스크롤 높이만큼 설정하여 답변을 보여라.
            accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + 'px';
        } else {
            // 아코디언 박스 답변노드의 maxheight를 0으로 설정하여 답변을 숨겨라.
            accordionItemBody.style.maxHeight = 0;
        }
    });
});
