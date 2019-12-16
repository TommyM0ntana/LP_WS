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

