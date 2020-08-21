const bg = document.querySelector('div.background');
bg.style.backgroundColor = 'rgb(37, 47, 50)';

let matrix = new HtmlMatrixRenderer(bg);

function frame() {
   matrix.update();
   requestAnimationFrame(frame);
}

requestAnimationFrame(frame);