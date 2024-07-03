document.addEventListener('visibilitychange', function () {
    if (document.visibilityState == 'hidden') {
        normal_title = document.title;
        document.title = '٩(๑´0`๑)۶';
    } else document.title = normal_title;
});