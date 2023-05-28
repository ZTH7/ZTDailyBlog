function runtime() {
	window.setTimeout("runtime()", 1000);
    let startTime = new Date('03/24/2023 15:00:00');
    let endTime = new Date();
    let usedTime = endTime - startTime;
    let days = Math.floor(usedTime / (24 * 3600 * 1000));
    let leavel = usedTime % (24 * 3600 * 1000);
    let hours = Math.floor(leavel / (3600 * 1000));
    let leavel2 = leavel % (3600 * 1000);
    let minutes = Math.floor(leavel2 / (60 * 1000));
    let leavel3 = leavel2 % (60 * 1000);
    let seconds = Math.floor(leavel3 / (1000));
    let runbox = document.getElementById('run-time');
    runbox.innerHTML = 'Uptime: <i class="far fa-clock fa-fw"></i> '
        + ((days < 10) ? '0' : '') + days + ' day '
        + ((hours < 10) ? '0' : '') + hours + ' hour '
        + ((minutes < 10) ? '0' : '') + minutes + ' min '
        + ((seconds < 10) ? '0' : '') + seconds + ' s ';
}
runtime();
