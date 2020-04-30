//dom elements
const rulesButton = document.querySelector(".rules-btn")
const closeButton = document.querySelector(".close-btn")
const rules = document.querySelector(".rules")


//rules
rulesButton.addEventListener("click", () => {
    rules.classList.add("show")
})
closeButton.addEventListener("click", () => {
    rules.classList.remove("show")
})