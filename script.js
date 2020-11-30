import { changeInput, checkAll, controlInput } from './controls.js'
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
        if(select.id === "departement") changeInput(document.querySelector("input#telephone"))

        // Switch current modality to selected
        modalities.forEach(modality => modality.classList.remove("selected"))
        modality.classList.add("selected")

        boxValue.addAndRemoveClass("valid", "invalid")
        
        displayFields(select, modality)
        checkAll()      
    }))
})

inputs.forEach(input => {
    input.addEventListener("blur", () => changeInput(input))
    input.addEventListener("keypress", e => controlInput(input, e))
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

if (Array.prototype.slice==null) Array.prototype.slice=function(start,end){ 
    if (start<0) start=this.length+start; //'this' refers to the object to which the prototype is applied 
    if (end==null) end=this.length;
    else if (end<0) end=this.length+end;
    var newArray=[];
    for (var ct=0,i=start;i<end;i++) newArray[ct++]=this[i];
    return newArray;
 }

Object.prototype.addAndRemoveClass=function(classAdd, classRemove){ 
    this.classList.add(classAdd)
    this.classList.remove(classRemove)
 }