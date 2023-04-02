var body = document.getElementsByTagName('body')[0];
var textArr = ["❤️", "🧡", "💛", "💚", "💙", "💜", "💗", "🤍", "❤️‍🔥"];
document.addEventListener('click', (e) => {
    var ev = e || window.event;
    var baseX = ev.pageX;
    var baseY = ev.pageY;
    var new_span = document.createElement('span');
    new_span.innerText = textArr[parseInt(Math.random() * textArr.length)]
    new_span.style.position = 'fixed';
    new_span.style.left = baseX - 10 + 'px';
    new_span.style.top = baseY + 'px';
    new_span.style.color = 'RGB(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')';
    body.appendChild(new_span);
    var timer = window.setInterval(() => {
        new_span.style.top = parseInt(window.getComputedStyle(new_span, null)['top']) - 2 + 'px';
        // console.log(window.getComputedStyle(new_span,null)['fontSize']);
        new_span.style.opacity = window.getComputedStyle(new_span, null)['opacity'] - 0.02;

    }, 30);
    window.setTimeout(() => {
        window.clearInterval(timer);
        body.removeChild(new_span);
    }, 1000);
}, false);