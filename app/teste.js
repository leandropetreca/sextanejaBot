const greeting = (hora) => {
    switch (hora) {
        case 7:

            break;
        case 18:

            break;
        case 21:

            break;

        default:
            break;
    }
}
const politeTime = (greeting) => {
    (function loop() {
        var now = new Date();
        console.log(now.getHours())
        if (now.getHours() === 7 || now.getHours() === 18 || now.getHours() === 21) {
            greeting(now.getHours());
        }
        now = new Date();
        const interval = 60 * 60000
        var delay = interval - (now % interval);        
        setTimeout(loop, delay);
    })();
}

politeTime(greeting)