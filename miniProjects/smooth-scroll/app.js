const section1 = document.querySelector('.section1');
const section2 = document.querySelector('.section2');

function smoothScroll(target, duration){
    let targetPosition = target.getBoundingClientRect().top;
    let startPosition = window.pageYOffset;
    let distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime){

        if(startTime === null) startTime = currentTime;

        let timeElapsed = currentTime - startTime;

        let run = ease(timeElapsed, startPosition, distance, duration);

        window.scrollTo(0, run);

        if(timeElapsed < duration) requestAnimationFrame(animation); 
    }  
    
    // easing Function
    function ease (t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    }

    requestAnimationFrame(animation);
}

section1.addEventListener('click', function(){
    smoothScroll(section2, 5000);
});

section2.addEventListener('click', function(){
    smoothScroll(section1, 5000);
});

 