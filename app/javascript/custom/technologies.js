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

window.onload = () => {
    let slideControls = document.getElementsByClassName("controler")
    let onController = slideControls[0]
    let slides = document.getElementsByClassName("tech-grid")
    let currentSlide = 0;

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

window.addEventListener('resize', e => {
    console.log("resize!")
})