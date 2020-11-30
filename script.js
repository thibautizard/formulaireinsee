import { changeInput, checkAll, replaceInput } from './controls.js'
import { switchLangage } from './language.js'

const formGroups = document.querySelectorAll(".form-group")

const boxValues =  document.querySelectorAll(".box-value")
const selects = document.querySelectorAll(".custom-select")
const textarea = document.querySelector("textarea")
const inputs = document.querySelectorAll("input")



// SELECTION MENUS

selects.forEach(select => {

    const boxValue = select.querySelector(".box-value")
    const modalities = select.querySelectorAll("li")
    const boxValueMessage = select.querySelector(".box-value span")

    
    modalities.forEach(modality => modality.addEventListener("click", () => {

        

        // Replace text by modality selected
        boxValueMessage.textContent = modality.textContent
        boxValue.classList.toggle("expand")

        // Check telephone field related to department
        if(select.id === "departement") {
            let input = document.querySelector("input#telephone")
            changeInput(input)
        }

        // Switch current modality to selected
        modalities.forEach(modality => modality.classList.remove("selected"))
        modality.classList.add("selected")

        boxValue.classList.add("valid")
        boxValue.classList.remove("invalid")
        

        displayFields(select, modality)

        checkAll()
        
    }))
})

// INPUTS

inputs.forEach(input => {

    input.addEventListener("change", () => {

        changeInput(input)

        if(input.classList.contains("email")) {

            const emails = Array.from(inputs).filter(input => input.classList.contains("email"))

            if(emails[0].value !== emails[1].value && emails[0].value && emails[1].value) {
                emails[1].classList.remove("valid")
                emails[1].classList.add("invalid")
            } else if(emails[0].value === emails[1].value && emails[1].value) {
                emails[1].classList.remove("invalid")
                emails[1].classList.add("valid")
            } else if(!emails[1].value) {
                emails[1].classList.remove("invalid")
                emails[1].classList.remove("valid")
            }
        }

        checkAll()
    })

    input.addEventListener("keypress", (e) => {
        e.preventDefault()
        replaceInput(input, e.key)
    })

})

// TEXT AREA

textarea.addEventListener("input", e => {
    e.target.parentNode.dataset.replicatedValue = e.target.value
    const remaining = e.target.parentNode.querySelector(".remaining")
    const newCount = e.target.value.length
    remaining.textContent = `${newCount} caractère${Math.abs(newCount) === 1 || newCount === 0 ? "" : "s"} sur 2 000 caractères autorisés`
    if(remaining.classList.contains("remaining--en")) remaining.textContent = `${newCount} character${Math.abs(newCount) === 1 || newCount === 0 ? "" : "s"} out of 2 000 characters allowed`
    if(newCount >= 2000) remaining.style.color = "red"
    else remaining.style.color = "black"

    if(newCount > 0) e.target.classList.add("valid")

    checkAll()
})

textarea.addEventListener("change", e => {
    checkAll()
})


// BOX VALUES

boxValues.forEach(boxValue => boxValue.addEventListener("click", _ => boxValue.classList.toggle('expand')))



// FUNCTIONS

const displayFields = (select, modality) => {

    if(select.id === "categorie") {

        switch(modality.getAttribute("filter")) {
            case "informations" :
            Array.from(formGroups).filter(formGroup => formGroup.classList.contains("form-group--informations"))
                                  .forEach(formGroup => formGroup.style.display = "flex")
            
            Array.from(formGroups).filter(formGroup => formGroup.classList.contains("form-group--dysfonctionnement"))
                                  .forEach(formGroup => formGroup.style.display = "none")
            
            return

            case "dysfonctionnement" : 
            Array.from(formGroups).filter(formGroup => formGroup.classList.contains("form-group--dysfonctionnement"))
                                  .forEach(formGroup => formGroup.style.display = "flex")

            Array.from(formGroups).filter(formGroup => formGroup.classList.contains("form-group--informations"))
                                  .forEach(formGroup => formGroup.style.display = "none")
            return

            default :
            Array.from(formGroups).filter(formGroup => formGroup.classList.contains("subfilter"))
                                  .forEach(formGroup => formGroup.style.display = "none") 

        }
    }
}