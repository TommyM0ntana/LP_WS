let it = document.getElementsByClassName("tech-grid")
let cont = document.getElementsByClassName("container")[0]
let btnLeft = document.getElementById("left")
let slideControls = Array.from(document.getElementsByClassName("controler"));
let midPoint = Math.floor(it.length/2);
let startPoint = 5 - midPoint
let endPoint = it.length - 1 - midPoint + 5;
let matchClass = ""
let direction = [1, midPoint, midPoint + 1]

let items = {
    slides: {},

    length: 3,

    order: [4,5,6],

    getItems: function(elements, start =false) {
        if (!start) {
            let screenWidth = document.body.clientWidth

            if (screenWidth < 500) {
                start = 3
                items.length = 5
                items.slides = {
                    'item3': { order: 3 },
                    'item4': { order: 4 },
                    'item5': { order: 5 },
                    'item6': { order: 6 },
                    'item7': { order: 7 },
                }
                items.order = [3,4,5,6,7]
                return
            } else if (screenWidth < 640) {
                start = 4
                items.length = 3
                items.slides = {
                    'item4': { order: 4 },
                    'item5': { order: 5 },
                    'item6': { order: 6 },
                }
                items.order = [4,5,6]
                return
            } else {
                start = 4
                items.length = 2
                items.slides = {
                    'item4': { order: 4 },
                    'item5': { order: 5 },
                }
                items.order = [4,5]
                return
            }
        }
    },

    moveItems: function(num) {
        let slide;
        for (let key in items.slides) {
            slide = items.slides[key].order
            if (slide + num > items.length - 1) {
                items.slides[key].order = slide + num - items.length
            } else if (slide + num < 0) {
                items.slides[key].order = slide + num + items.length
            } else {
                items.slides[key].order += num
            }
        }

    }
}

const stateMachine = {
    currentState: 'idle',

    transitions: {
        'idle': {
            'moveRight': function(item, ...payload) {
                stateMachine.changeStateTo(item, 'moving')
                items.moveItems(payload[0])
                setTimeout(() => {
                    stateMachine.dispatch('done')
                }, payload[1]? 10 : 1000)
            },
            'moveLeft': function(item, ...payload) {
                stateMachine.changeStateTo(item, 'moving')
                items.moveItems(-payload[0])
                setTimeout(() => {
                    stateMachine.dispatch('done')
                }, 1000)
            }
        },
        'moving': {
            done: function(item) {
                stateMachine.changeStateTo(item, 'idle')
            }
        }
    },

    dispatch: function(newAction, ...payload) {
        const actions = this.transitions[this.currentState];
        const action = actions[newAction];

        if (action) {
            this.transitions[this.currentState][newAction](stateMachine, ...payload)
        } else {
            console.log("Can't dispatch action while moving. \n\n action: ", newAction)        }
    },

    changeStateTo: function(item = stateMachine,newState) {
        item.currentState = newState;
    },
}

// Startup items 
setTimeout(() => {
    it = document.getElementsByClassName("tech-grid")
    cont = document.getElementsByClassName("container")[0]
    btnLeft = document.getElementById("left")
    midPoint = Math.floor(it.length/2);
    startPoint = 5 - midPoint
    endPoint = it.length - 1 - midPoint + 5;
    items.getItems(document.getElementsByClassName("tech-grid")) 
    stateMachine.dispatch('moveRight', 1)   
    let mySlideControls = document.getElementsByClassName("controler");
    direction = [1, midPoint, midPoint + 1]

    setControls(mySlideControls)
    mySlideControls[0].click()
}, 250);


window.addEventListener('resize', e => {
    console.log(window.pageYOffset)
    localStorage.setItem('scrollUpTo', window.pageYOffset)
    window.location.href =  window.location.href        
});

let slideTimer = setInterval(autoSlide, 5000)

const setControls = (mySlideControls) => {
    Array.from(mySlideControls).forEach((control, i) => {
        control.addEventListener('click', e => {
            if (!e.target.classList.contains('controler-on')) {
                let d = parseInt(document.getElementsByClassName('controler-on')[0].classList[1])
                direction =  [d - i, i, d];
                console.log(direction)

                // pause auto slide
                //clearInterval(autoScroll)
                clearInterval(slideTimer)

                stateMachine.dispatch('moveRight', direction[0], 'start')

                cleanControls(i, d)
                newSlide(i, d)

                direction[0] = 1;
                direction[2] = direction[1];
                direction[1] = 0.01;

                // resume auto slide
                slideTimer = setInterval(autoSlide, 5000)
            }
        })

    })
}

const autoSlide = () => {
    console.log("Sliding\n\n")
    let size = items.length - 1;
    direction[0] = 1;
    direction[1] = direction[2] + 1 > size ? 0 : direction[2] + 1;

    stateMachine.dispatch('moveRight', direction[0], 'start');

    cleanControls(direction[1], direction[2]);
    newSlide(direction[1], direction[2]);

    direction[2] = direction[1];
}

const newSlide = (i, d) => {
    let slides =  document.getElementsByClassName('tech-grid');
    let size = slides.length;
    let orderClass = slides[i].classList[1].match(/order\d+/)[0];
    let order = 0;
    let start;
    let end;

    slides[i].classList.remove(orderClass);
    slides[i].classList.add("order5");

    let distance = i - d;
    console.log(distance)

    let opop;
    let oshift;

    for (let j = 0; j < Math.abs(distance); j++) {
        if (distance > 0) {
            opop = items.order.pop()
            items.order.unshift(opop)
        } else if (distance < 0) {
            oshift = items.order.shift()
            items.order.push(oshift)
        }
    }

    console.log(items.order)
    start = Math.min(...items.order)
    end = Math.max(...items.order)

    for (let j = 0; j < size; j++) {
        if (j === i) { continue }

        orderClass = slides[j].classList[1].match(/order\d+/)[0];
        order = parseInt(orderClass.slice(-1))

        slides[j].classList.remove(orderClass);
        slides[j].classList.add('order' + items.order[j]);

        if (((order - Math.abs(distance) < start || order + Math.abs(distance) > end)) ||
            (j === d && (d === size - 1 && i === 0 || d === 0 && i === size - 1))) {
            slides[j].classList.add('goBehind3')
            setTimeout(() => {
                slides[j].classList.remove('goBehind3')
            }, 600)
        }
    }
}

const cleanControls = (i, d) => {
    let controls = document.getElementsByClassName('controler')

    controls[i].classList.add('controler-on')
    controls[d].classList.remove('controler-on')
}


exports.getStates = () => {
    return {
        'items': items,
        'stateMachine': stateMachine
    }
}