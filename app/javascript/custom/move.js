let it = document.getElementsByClassName("tech-grid")
let cont = document.getElementsByClassName("container")[0]
let btnLeft = document.getElementById("left")
let slideControls = Array.from(document.getElementsByClassName("controler"));
let midPoint = Math.floor(it.length/2);
let startPoint = 5 - midPoint
let endPoint = it.length - 1 - midPoint + 5;
let matchClass = ""

let items = {
    slides: {},

    length: 3,

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
                return
            } else if (screenWidth < 640) {
                start = 4
                items.length = 3
                items.slides = {
                    'item4': { order: 4 },
                    'item5': { order: 5 },
                    'item6': { order: 6 },
                }
                return
            } else {
                start = 4
                items.length = 2
                items.slides = {
                    'item4': { order: 4 },
                    'item5': { order: 5 },
                }
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
                }, 1000)
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
            console.log("Can't dispatch action while moving")
        }
    },

    changeStateTo: function(item = stateMachine,newState) {
        item.currentState = newState;
    },
}

setInterval(() => {
    slideControls = Array.from(document.getElementsByClassName("controler"));
    it = document.getElementsByClassName("tech-grid")
    midPoint = Math.floor(it.length/2);
    startPoint = 5 - midPoint
    endPoint = it.length - 1 - midPoint + 5;
    stateMachine.dispatch('moveRight', 1)

    moveSlidesToposition(slideControls, it, midPoint, startPoint, endPoint, items)
}, 6000);



const moveSlidesToposition = (slideControls, it, midPoint, startPoint, endPoint, items, cont = false) => {
    Array.from(it).forEach((item, i) => {
        classList = item.classList

        matchClass = (items.length === 2) ? 'order5' : item.classList[1].match(/order\d+/)[0]
        item.classList.remove('goBehind')
        
        if (items.length === 2) {
            if (classList.contains('order5')) {
                item.classList.remove('order5')
                item.classList.add('order6')

                setTimeout(() => {
                    item.classList.add('goBehind2')
                    item.classList.add('order4')
                    item.classList.remove('order6')
                }, 500);
            } else {
                item.classList.remove('goBehind2')
                item.classList.add('order5')
                item.classList.remove('order4')
            }
        } else {
            if (classList[1].includes(`${endPoint}`)) {
                item.classList.remove(matchClass)
                item.classList.add('order' + (startPoint + items.slides['item'+(i+startPoint)].order))
    
                setTimeout(() => {
                    item.classList.add('goBehind')
                },100)
            } else {
                item.classList.remove(matchClass)
                item.classList.add('order' + (startPoint + items.slides['item'+(i+startPoint)].order))
            }
        }


            if (item.classList.contains(`order${5}`)) {
                slideControls[i].classList.add('controler-on')
            } else {
                slideControls[i].classList.add(i)
                slideControls[i].classList.remove('controler-on')
            }

    })
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


    mySlideControls[0].addEventListener('click', e => {
        /*
        if (!e.target.classList.contains('controler-on')) {
            let goTo = (endPoint +1  - parseInt(it[it.length - parseInt(e.target.classList[1])].classList[1].slice(-1)))
            stateMachine.dispatch('moveRight', goTo)
            console.log(goTo)

            moveSlidesToposition(slideControls, it, midPoint, startPoint, endPoint, items, true)
        }
        */
       console.log(it[0])
    })
}, 250);

exports.getStates = () => {
    return {
        'items': items,
        'stateMachine': stateMachine
    }
}

window.addEventListener('resize', e => {
    it = document.getElementsByClassName("tech-grid")
    cont = document.getElementsByClassName("container")[0]
    btnLeft = document.getElementById("left")
    midPoint = Math.floor(it.length/2);
    startPoint = 5 - midPoint
    endPoint = it.length - 1 - midPoint + 5;
    items.getItems(document.getElementsByClassName("tech-grid")) 
    stateMachine.dispatch('moveRight', 1)   
    mySlideControls = document.getElementsByClassName("controler");


    mySlideControls[0].addEventListener('click', e => {
        if (!e.target.classList.contains('controler-on')) {
            let goTo = (endPoint +1  - parseInt(it[it.length - parseInt(e.target.classList[1])].classList[1].slice(-1)))
            stateMachine.dispatch('moveRight', goTo)
            console.log(goTo)

            moveSlidesToposition(slideControls, it, midPoint, startPoint, endPoint, items, true)
        }
    })
});