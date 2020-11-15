window.onload = function snow() {
    // 변수에 캔버스 할당하기
    let canvas = document.querySelector('#sky');
    // 변수에 캔버스 랜더링 컨텍스트 할당하기
    let ctx = canvas.getContext('2d');

    // set canvas dimensions to window height and width
    // canvas는 300px 과 같은 디폴트 값이 정해져 있기 때문에 canvas의 사이즈와 window의 사이즈를 같게 해야한다.
    let W = window.innerWidth;
    let H = window.innerHeight;

    canvas.width = W;
    canvas.height = H;

    // generate the snowFlakes and apply attribute
    let mf = 300;
    let flakes = [];

    if (innerHeight <= 500 && innerWidth <= 500) {
        mf = 100;
    } else if (innerHeight <= 800 && innerWidth <= 800) {
        mf = 200;
    }

    // loop through the empty flakes and apply attributes
    for (let i = 0; i < mf; i++) {
        flakes.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 2, // min of 2px and max of 7px radius
            d: Math.random() + 1 // density of the flake // density는 눈이 얼마나 빨리 떨어지는 가에 영향
        });
    }

    // draw flakes onto canvas
    function drawFlakes() {
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 5;
        for (let i = 0; i < mf; i++) {
            let f = flakes[i];
            ctx.moveTo(f.x, f.y); // position point of drawing pen
            // start point at 0 degree at the top or
            // 시계방향으로 원을 그려라
            //go round to 2 PI radius (full circle)
            // f.y? 눈보라가 한쪽만 흐르는게 아니라 골고루 퍼져라! ex) f.y = 5;

            // x axis, y axis, radius, degree, 360 degrees(end angle), clockwise
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        moveFlakes();
    }

    // animate the flakes
    let angle = 0;

    function moveFlakes() {
        angle += 0.01;
        for (let i = 0; i < mf; i++) {
            // store current flake
            let f = flakes[i];

            // update X and Y coordinates of each snowflake
            // 다음 위치 업데이트
            f.y += Math.pow(f.d, 2) + 1; // y coordinate / power function / square density / y축으로 떨어지는 속도
            f.x += Math.sin(angle) * 2; // x coordinate / sine wave down the page 눈이 떨어질 때 만드는 웨이브를 결정

            //if a snowflake reaches the bottom, send a new one to the top
            if (f.y > H) {
                flakes[i] = { x: Math.random() * W, y: 0, r: f.r, d: f.d };
            }
        }
    }
    setInterval(drawFlakes, 25);
};

function init() {
    // resize 될 때마다 refresh 하기
    window.addEventListener('resize', function () {
        window.location.reload();
    });
}

init();
