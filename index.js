window.onload = (function () {
    const container = document.querySelector('.container')
    const audio = document.querySelectorAll('audio')
    const score = document.querySelector('.score span')
    let sPart = document.querySelectorAll('.s-part')
    let FoodLocation
    let btnmove = {
        x: 0,
        y: 0
    };

    function sParT() {
        sPart = document.querySelectorAll('.s-part')
    }
    //for buttons
    let lastKey;

    function buttonAct(e) {
        if (e === 'ArrowUp') {
            if (lastKey === 'ArrowDown') return
            lastKey = 'ArrowUp'
            btnmove = {
                x: 0,
                y: -1
            }
        } else if (e === 'ArrowDown') {
            if (lastKey === 'ArrowUp') return
            lastKey = 'ArrowDown'
            btnmove = {
                x: 0,
                y: 1
            }
        } else if (e === 'ArrowLeft') {
            if (lastKey === 'ArrowRight') return
            lastKey = 'ArrowLeft'
            btnmove = {
                x: -1,
                y: 0
            }
        } else if (e === 'ArrowRight') {
            if (lastKey === 'ArrowLeft') return
            lastKey = 'ArrowRight'
            btnmove = {
                x: 1,
                y: 0
            }
        }
    }

    //button end
    let snakePart = [{
        x: 13,
        y: 13
    }]

    function createElm(a) {
        let el = snakePart[a]
        let aa = document.createElement('div')
        aa.classList.add('s-part')
        aa.style.gridColumnStart = el.x
        aa.style.gridRowStart = el.y
        container.appendChild(aa)
    }
    //gridUpdate
    function gridUpdate() {
        for (var i = 0; i < sPart.length; i++) {
            sPart[i].style.gridColumnStart = snakePart[i].x
            sPart[i].style.gridRowStart = snakePart[i].y
        }
    }
    //moveMent
    function moveMent() {
        /*for (var i = 0; i < snakePart.length; i++) {
            snakePart[i].x += btnmove.x;
            snakePart[i].y += btnmove.y;
        }*/
        for (var i = snakePart.length - 2; i >= 0; i--) {
            snakePart[i + 1] = {
                ...snakePart[i]
            }
        }
        snakePart[0].x += btnmove.x;
        snakePart[0].y += btnmove.y;
    }

    function gameOut() {
        let aa = snakePart[0].x,
            bb = snakePart[0].y;
        for (var i = 1; i < sPart.length; i++) {
            if (snakePart[i].x === aa && snakePart[i].y === bb) {
                clearInterval(mainint)
                audio[1].play()
                sPart[i].style = 'background: transparent'
                document.querySelector('.pp').style.display = 'grid'
            }
        }
    }

    function fixEl() {
        for (var i = 0; i < sPart.length; i++) {
            if (snakePart[i].x > 25) {
                snakePart[i].x = snakePart[i].x - 25
            }
            if (snakePart[i].y > 25) {
                snakePart[i].y = snakePart[i].y - 25
            }
            if (snakePart[i].x < 0) {
                snakePart[i].x = snakePart[i].x + 26
            }
            if (snakePart[i].y < 0) {
                snakePart[i].y = snakePart[i].y + 26
            }
        }
    }

    function createFood() {
        let aa = document.createElement('div')
        aa.classList.add('food')
        aa.style.gridColumnStart = FoodLocation[0]
        aa.style.gridRowStart = FoodLocation[1]
        container.appendChild(aa)
    }

    function foodLocation() {
        let XX = [],
            YY = [],
            AA = Math.floor(Math.random() * 25) + 1,
            BB = Math.floor(Math.random() * 25) + 1;
        snakePart.forEach(function (el) {
            XX.push(el.x)
            YY.push(el.y)
        })
        if (XX.length !== 625 && YY.length !== 625) {
            if (!XX.includes(AA) && !YY.includes(BB)) {
                FoodLocation = [AA, BB]
            } else foodLocation()
        } else {
            alert('Game Over')
        }
    }

    function foodEaten() {
        let aaa = FoodLocation
        if (snakePart[0].x === aaa[0] && snakePart[0].y === aaa[1]) {
            foodLocation()
            let food = document.querySelector('.food')
            food.style.gridColumnStart = FoodLocation[0]
            food.style.gridRowStart = FoodLocation[1]
            audio[0].play()
            score.textContent = parseInt(score.textContent) + 1
            nextEl()
        }
    }

    function nextEl() {
        let aa = snakePart.slice(-1)
        let bb = {
            x: aa[0].x + btnmove.x,
            y: aa[0].y + btnmove.y
        }
        snakePart.push(bb)
        createElm(snakePart.length - 1)
    }
    let mainint;

    function mainInt() {
        mainint = setInterval(() => {
            sParT();
            moveMent();
            fixEl();
            gameOut();
            foodEaten();
            gridUpdate();
        }, 100);
    }

    function auto() {
        createElm(0)
        document.querySelector('.s-part').textContent = "👀";
        document.querySelector('.s-part').style = 'display: grid; justify-content:center; align-items:center; width: 100%; height: 100%; font-size: 2vmin; background: blue; grid-column-start: 13; grid-row-start: 13;'
        foodLocation()
        createFood()
        foodEaten()
    }
    auto()
    document.querySelector('.res').addEventListener('click', function () {
        document.addEventListener('keydown', function (e) {
            buttonAct(e.key)
        });
        //for touch phone
        document.addEventListener('swiped', function (e) {
            if (e.detail.dir === 'up') aa = 'ArrowUp'
            if (e.detail.dir === 'down') aa = 'ArrowDown';
            if (e.detail.dir === 'left') aa = 'ArrowLeft';
            if (e.detail.dir === 'right') aa = 'ArrowRight';
            if (!aa) aa = null
            buttonAct(aa)
        });
        document.querySelector('.pp').style.display = 'none'
        if (document.querySelector('.res').textContent === 'Restart') {
            container.innerHTML = ''
            score.textContent = 0
            btnmove = {
                x: 0,
                y: 0
            };
            snakePart = [{
                x: 13,
                y: 13
            }]
            auto()
        } else {
            document.querySelector('.res').textContent = 'Restart'
        }
        mainInt()
    })
})