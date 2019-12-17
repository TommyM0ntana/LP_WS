
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
<div class="controler controler-on">
</div>
<div class="controler">
</div>
</div>`

// window.onload = () => {
setTimeout(() => {
    let slideControls = document.getElementsByClassName("controler");
    let onController = slideControls[0];
    let slides = document.getElementsByClassName("tech-grid");
    let currentSlide = 0;
    let techSection = document.getElementById("technologies");
    countTechPerPage(techSection);

    Array.from(slideControls).forEach((control, i, arr) => {
        control.addEventListener("click", e => {
            onController = control;
            onController = slideControls[i]

            arr.forEach((c, j) => {
                if (i == j && !c.classList.contains("controler-on")) {
                    c.classList.add("controler-on");
                } else if (i != j) {
                    c.classList.remove("controler-on");
                }
            })
            changeSlide(currentSlide, i);
            currentSlide = i;
        })
    })

    const changeSlide = async (from = 0, to = 1) => {
        slides[to].classList.value = "tech-grid";
        slides[from].classList.value = "tech-grid";

        if (from < to) {
            slides[from].classList.add("slide-left")
            slides[to].classList.add("slide-in")
        } else if (from > to) {
            slides[from].classList.add("slide-right")
            slides[to].classList.add("slide-in")
        }        
    }
window.addEventListener('resize', e => {
    countTechPerPage(techSection);
    applyScriptToSlider();
    
})
}, 200)

const countTechPerPage = (techSection) => {
    if (document.body.clientWidth < 490) {
        fillTechnologies(2, techSection);        
    } else if (document.body.clientWidth <= 624) {
        fillTechnologies(4, techSection);
    } else {
        fillTechnologies(6, techSection);
    }
}

const fillTechnologies = (col = 6, techSection) => {
    let columns = col;
        let slidesNum = Math.ceil(techArticles.length / columns);
        let insertSlides = [];
        let inSlide = 0;
        let slideNum = 0;
        techEnd = `<div class="slide-controller"> 
        <div class="controler controler-on">
        </div>
        ${'<div class="controler"></div>'.repeat(slidesNum - 1)}
        </div>`

        techArticles.forEach((article, i) => {
            if (!insertSlides[slideNum]) {
                if (i === 0) {
                    insertSlides[slideNum] = `<div class="tech-grid slide-in">`
                } else {
                    insertSlides[slideNum] = `<div class="tech-grid slide-right">`
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

        techSection.innerHTML = techStart + insertSlides.join(" ") + techEnd;
}


const applyScriptToSlider = () => {
    let slideControls = document.getElementsByClassName("controler");
    let onController = slideControls[0];
    let slides = document.getElementsByClassName("tech-grid");
    let currentSlide = 0;
    let techSection = document.getElementById("technologies");

    Array.from(slideControls).forEach((control, i, arr) => {
    control.addEventListener("click", e => {
        onController = control;
        onController = slideControls[i]

        arr.forEach((c, j) => {
            if (i == j && !c.classList.contains("controler-on")) {
                c.classList.add("controler-on");
            } else if (i != j) {
                c.classList.remove("controler-on");
            }
        })
        changeSlide(currentSlide, i);
        currentSlide = i;
    })
    })

    const changeSlide = async (from = 0, to = 1) => {
    slides[to].classList.value = "tech-grid";
    slides[from].classList.value = "tech-grid";

    if (from < to) {
        slides[from].classList.add("slide-left")
        slides[to].classList.add("slide-in")
    } else if (from > to) {
        slides[from].classList.add("slide-right")
        slides[to].classList.add("slide-in")
    }        
    }
}