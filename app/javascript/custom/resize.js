const move = require('./move.js');

let items = move['items'];
let stateMachine = move['stateMachine'];

let techArticles =  [
    `<article class="tech">
<h3>HTML5 & CSS3</h3>
<i class="fab fa-html5"></i>
<p>Details about the technology above</p>
</article>`,
`<article class="tech">
<h3>React & Redux</h3>
<i class="fab fa-react"></i>
<p>Details about the technology above</p>
</article>`,
`<article class="tech">
<h3>Ruby on Rails</h3>
<i class="fas fa-gem"></i>
<p>Details about the technology above</p>
</article>`,
`<article class="tech">
<h3>Javascript</h3>
<i class="fab fa-js"></i>
<p>Details about the technology above</p>
</article>`,
`<article class="tech">
<h3>Databases & APIS</h3>
<i class="fas fa-database"></i>
<p>Details about the technology above</p>
</article>`,
`<article class="tech">
<h3>Hosting & AWS</h3>
<i class="fab fa-aws"></i>
<p>Details about the technology above</p>
</article>`,
`<article class="tech">
<h3>Shopfy && Wordpress</h3>
<i class="fab fa-wordpress"></i>
<p>Details about the technology above</p>
</article>`,
`<article class="tech">
<h3>Web Plugins</h3>
<i class="fas fa-puzzle-piece"></i>
<p>Details about the technology above</p>
</article>`,
`<article class="tech">
<h3>Django</h3>
<i class="fab fa-python"></i>
<p>Details about the technology above</p>
</article>`
]

let techStart = `<h2 class="tech-header">Implemented Technologies</h2>`

let techEnd = `<div class="slide-controller">
<div class="controler">
</div>
<div class="controler">
</div>
</div>`

setTimeout(async() => {
    let slideControls = document.getElementsByClassName("controler");
    let onController = slideControls[0];
    let slides = document.getElementsByClassName("tech-grid");
    let currentSlide = 0;
    let techSection = document.getElementById("technologies");
    let slideI = 0

    countTechPerPage(techSection, slideI);
 
    window.addEventListener('resize', e => {
        countTechPerPage(techSection, slideI);
    });

}, 200)

const countTechPerPage = (techSection, slideI) => {
    if (document.body.clientWidth < 490) {
        fillTechnologies(2, techSection, slideI);        
    } else if (document.body.clientWidth <= 624) {
        fillTechnologies(4, techSection, slideI);
    } else {
        fillTechnologies(6, techSection, slideI);
    }
}

const fillTechnologies = (col = 6, techSection, slideI) => {
    let columns = col;
        let slidesNum = Math.ceil(techArticles.length / columns);
        let midSlide = Math.floor(techArticles.length/2)
        let insertSlides = [];
        let inSlide = 0;
        let slideNum = 0;
        techEnd = `<div class="slide-controller">`

        techArticles.forEach((article, i) => {
            if (!insertSlides[slideNum]) {
                insertSlides[slideNum] = `<div class="tech-grid order${5 - Math.floor(slidesNum/2) + Math.floor(i/4)}">`
                if (i === midSlide) {
                    techEnd += `<div class="controler controler-on"></div>`
                } else {
                    techEnd += `<div class="controler"></div>`
                }
            }

            insertSlides[slideNum] += techArticles[i]

            inSlide++


            if (inSlide === columns || i == techArticles.length - 1) {
                insertSlides[slideNum] += `</div>`;
                slideNum++;
                inSlide = 0;
                console.log(insertSlides[slideNum])
            }
        })

        techSection.innerHTML = techStart + insertSlides.join(" ") + techEnd + '</div>';
}

exports.getContent = () => {
    return techArticles
}