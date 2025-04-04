"use strict";
//hämtar element

let openBtn = document.getElementById("openMenu");

let closeBtn = document.getElementById("closeMenu");

//skapar händelselyssnare

openBtn.addEventListener("click", toggleMenu);
closeBtn.addEventListener("click", toggleMenu);

//skapar funktion

/**Döljer och visar menyn när man klickar på knappen
 * 
 * function toggleMenu
 * @param void
 * @return void
 */

function toggleMenu() {
    let navMenuEl = document.getElementById("navMenu");

    let style = window.getComputedStyle(navMenuEl);

    if (style.display === "none") {
        navMenuEl.style.display = "block";
    } else {
        navMenuEl.style.display = "none";
    }
}