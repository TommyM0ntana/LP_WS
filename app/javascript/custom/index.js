window.onload = () => {
window.scrollTo({top: parseInt(localStorage.getItem('scrollUpTo'))})

const resize = require('./resize.js');

const nav = require('./nav.js');

const move = require('./move.js')

module.exports = {nav, resize, move}
}