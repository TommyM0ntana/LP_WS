//window.onload = () => {
  let nav = document.getElementById("navbar");
  let navLinks = Array.from(nav.getElementsByClassName("same-page"));

  // Hides nav bar on scroll down and shows on scroll up
  let prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    let offsetTop = nav.offsetTop;
    if (prevScrollpos > currentScrollPos || currentScrollPos < 50) {
      document.getElementById("navbar").style.top = "0";
    } else {
      document.getElementById("navbar").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;

    navLinks.forEach(link => {
      link.firstChild.addEventListener("click", ev => {
        console.log(ev.target.classList[0])
      })
    });
  } 

  // Scroll to section with same id as clicked li > a class
  navLinks.forEach(link => {
    link.addEventListener("click", ev => {
      let clas = link.firstChild.classList[0];
      window.scrollTo(0, document.getElementById(clas).offsetTop - 20); 
    })
  });

  // Menu expanding navbar for narrow devices
let menuBtn = document.getElementById("nav-menu");
let closeMenuBtn = document.getElementById("close");
let mobileMenu = document.getElementById("mobile")

menuBtn.addEventListener("click", e => {
  mobileMenu.classList.remove("mobile-off")
  mobileMenu.classList.add("mobile-on")
})

closeMenuBtn.addEventListener("click", e => {
  mobileMenu.classList.remove("mobile-on")
  mobileMenu.classList.add("mobile-off")
})

//}
