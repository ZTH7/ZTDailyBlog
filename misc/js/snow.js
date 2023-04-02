; (function () {
    const Config = {
        snow: ['☘️'],
        // snow: ['❄', '', '※', '⛄', '☃', '🎄',],
        color: '#d9e2e7', 
        speed: 8,
        dom: document.getElementsByTagName('body')[0],
        interval: 600
    }
    if (!Config.dom) {
        throw Error('Snow js error')
    }
    const $canvas = document.createElement('div')

    useStyle($canvas, {
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 100
    })

    setInterval(() => {
        const $snow = document.createElement('div')
        $snow.innerText = Config.snow[rand(0, Config.snow.length - 1)]
        useStyle($snow, {
            display: 'inline-block',
            color: Config.color,
            fontSize: rand(14, 25) + 'px',
            position: 'absolute',
            top: 0,
            left: rand(0, 100) + '%',
            transition: 'transform ' + Config.speed + 's linear' + ',opacity ' + Config.speed + 's linear',
            transform: 'translateY(-100%)',
            opacity: Math.random() + 0.3
        })
        setTimeout(() => {
            useStyle($snow, {
                transform: 'translate(0, ' + getComputedStyle($canvas).height + ') rotate(480deg)',
                opacity: 0
            })
            $snow.addEventListener('transitionend', () => {
                $snow.remove()
            })
        }, 100)
        $canvas.appendChild($snow)
    }, Config.interval)

    function rand(from, to) {
        return from + Math.floor(Math.random() * (to - from + 1))
    }
    function useStyle(dom, style) {
        for (let sKey in style) {
            dom.style[sKey] = style[sKey]
        }
    }

    Config.dom.appendChild($canvas)
})()
