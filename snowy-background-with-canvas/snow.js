window.onload = function snow() {
    // 변수에 캔버스 할당하기
    let canvas = document.querySelector('#sky');
    // 변수에 캔버스 랜더링 컨텍스트 할당하기
    let ctx = canvas.getContext('2d');

    // 캔버스 높이와 너비를 윈도우 높이와 너비로 설정하기
    // [MDN Canvas API Default Size](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
    // canvas는 300px과 같은 디폴트 값이 정해져 있기 때문에 canvas의 사이즈와 window의 사이즈를 같게 해야한다.
    let W = window.innerWidth;
    let H = window.innerHeight;

    canvas.width = W;
    canvas.height = H;

    // 눈송이의 갯수, 눈송이를 담을 빈 배열 변수 생성
    let mf = 300;
    let flakes = [];

    // 스크린 윈도우 사이즈 별로 눈송이의 갯수 할당 조절하기
    if (innerHeight <= 500 && innerWidth <= 500) {
        mf = 100;
    } else if (innerHeight <= 800 && innerWidth <= 800) {
        mf = 200;
    }

    // 반복문을 통해 flakes 빈 배열에 Push 메서드를 통해 눈송이 담아주기
    for (let i = 0; i < mf; i++) {
        flakes.push({
            x: Math.random() * W, // X 축의 랜덤 시작 지점
            y: Math.random() * H, // Y 축  랜덤 높이 지점
            r: Math.random() * 2 + 1, // 최소 1px 최대 2px 지름
            d: Math.random() + 1 // 눈송이의 무게
        });
    }

    // 캔버스에 눈송이 그리기
    function drawFlakes() {
        // clearRect는 투명한 검정색으로 설정하여 직사각형 화면 픽셀들을 지우는 2D API이다.
        ctx.clearRect(0, 0, W, H);
        // clearRect 후 beginPath 사용 가능
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 5;
        for (let i = 0; i < mf; i++) {
            // f 변수에 반복문을 통한 눈송이 할당하기
            let f = flakes[i];
            ctx.moveTo(f.x, f.y); // 모든 눈송이에 위에서 할당한 x, y 축의 위치 값을 주기

            // 시계방향으로 원을 그려라
            // start point at 0 degree at the top or
            // x axis, y axis, radius, degree(start angle), 360 degrees(end angle), clockwise
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        moveFlakes();
    }

    let angle = 0;
    function moveFlakes() {
        angle += 0.01;
        for (let i = 0; i < mf; i++) {
            // f 변수에 반복문을 통한 눈송이 할당하기
            let f = flakes[i];
            // 눈송이의 다음 위치 업데이트
            f.y += Math.pow(f.d, 2) + 1; // y coordinate / power function / square density / y축의 위치 업데이트
            f.x += Math.sin(angle) * 2; // x coordinate / sine wave down the page 눈이 떨어질 때 만드는 웨이브를 결정

            // 눈송이가 바닥까지 닿으면 다시 새로 눈송이 생성하기 gg
            if (f.y > H) {
                flakes[i] = { x: Math.random() * W, y: 0, r: f.r, d: f.d };
            }
        }
    }
    // 25ms delay를 주어 계속 호출하기
    setInterval(drawFlakes, 25);
};

function init() {
    // resize 될 때마다 refresh 하기
    window.addEventListener('resize', function () {
        window.location.reload();
    });
}

init();
