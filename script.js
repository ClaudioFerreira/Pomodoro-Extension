// variables

let workTitle = document.getElementById('work')
let breakTitle = document.getElementById('break')

let workTime = 2
let breakTime = 2
let seconds = '00'
let pause = false
let timer

// DISPLAY
window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime
    document.getElementById('seconds').innerHTML = formatNumber(seconds)

    workTitle.classList.add('active')
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);

// START TIMER
function startTimer() {
    pause = false
    changeButtons()


    // change the time
    seconds = seconds === '00' ? 59 : seconds

    let workMinutes = workTime - 1
    let breakMinutes = breakTime - 1

    breakCount = 0

    // countdown
    let timerFunction = () => {
        document.getElementById('minutes').innerHTML = formatNumber(workMinutes)
        document.getElementById('seconds').innerHTML = formatNumber(seconds)

        parseInt(workMinutes)
        parseInt(seconds)

        // start
        if (!pause) {

            seconds -= 1

            if (seconds === 0) {
                workMinutes -= 1
                if (workMinutes === -1) {
                    if (breakCount % 2 === 0) {
                        // start break
                        workMinutes = breakMinutes
                        breakCount++

                        // change panel
                        changePanel()

                    } else {
                        // continue work
                        workMinutes = workTime
                        breakCount++

                        // change panel
                        changePanel()
                    }
                }
                seconds = 59
            }
        }
    }

    // start countdown
    timer = setInterval(timerFunction, 1000); //1000 = 1s
}

function changeButtons() {
    // change button
    document.getElementById('start').style.display = pause ? 'block' : 'none'
    document.getElementById('reset').style.display = pause ? 'none' : 'block'
    document.getElementById('pause').style.display = pause ? 'none' : 'block'
}

function pauseTimer() {
    clearInterval(timer)
    pause = !pause
    changeButtons()
}

function resetTimer() {
    clearInterval(timer)
    workTime = 25
    breakTime = 5
    seconds = '00'
    pause = false
    timer
}

function formatNumber(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

function changePanel() {
    [el] = document.getElementsByClassName('active')
    console.log(el.id)

    if (el.id === 'work') {
        workTitle.classList.remove('active')
        breakTitle.classList.add('active')
    } else {
        workTitle.classList.add('active')
        breakTitle.classList.remove('active')
    }
}