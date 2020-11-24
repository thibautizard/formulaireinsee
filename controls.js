const button = document.querySelector(".submit-button")

const testInput = input => {

    switch(input.id) {
        case "email" :
            if(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/.test(input.value)) {input.classList.remove("invalid"); input.classList.add("valid")}
            else {input.classList.remove("valid"); input.classList.add("invalid")}
            break;

        case "email-confirmation" :
            if(input.value.length > 0 && /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/.test(input.value)) {input.classList.remove("invalid"); input.classList.add("valid")}
            else {input.classList.remove("valid"); input.classList.add("invalid")}
            break;
        
        case "telephone" : 
            if(/^0[0-9]{9}$/.test(input.value.replace(/\s/g,''))) {input.classList.remove("invalid"); input.classList.add("valid")}
            else {input.classList.remove("valid"); input.classList.add("invalid")}
            break;
        
        case "informations-enquete" : 
            if(input.value.replace(/\s/g,'').length > 3) {input.classList.remove("invalid"); input.classList.add("valid")}
            else {input.classList.remove("valid"); input.classList.add("invalid")}
            break;
        
        case "informations-identifiant" : 
            if(input.value.replace(/\s/g,'').length > 3) {input.classList.remove("invalid"); input.classList.add("valid")}
            else {input.classList.remove("valid"); input.classList.add("invalid")}
            break;

        case "dysfonctionnement" : 
            if(input.value.startsWith("https://www.insee.fr/")) {input.classList.remove("invalid"); input.classList.add("valid")}
            else {input.classList.remove("valid"); input.classList.add("invalid")}
            break;
    }

    checkAll()

}

const checkAll = () => {
    const fieldsToCheck = Array.from(document.querySelectorAll(".form-group"))
                               .filter(field => getComputedStyle(field).display !== "none" && !field.classList.contains("optional"))
                               .map(field => field.querySelector(".box-value, input, textarea"))
    if(fieldsToCheck.every(field => field.classList.contains("valid"))) button.classList.add("active")
    else button.classList.remove("active")
}


button.addEventListener("click", () => {

    if(button.classList.contains("active")) {

        const fieldsToCheck = Array.from(document.querySelectorAll(".form-group"))
                               .filter(field => getComputedStyle(field).display !== "none" && !field.classList.contains("optional"))
                               .map(field => field.querySelector(".box-value, input, textarea"))
        
        const inputsToEmpty = Array.from(document.querySelectorAll("input"))
        const boxValuesToEmpty = Array.from(document.querySelectorAll(".box-value"))
        const textAreaToEmpty = Array.from(document.querySelectorAll("textarea"))

        inputsToEmpty.forEach(input => {
            input.value=""
            input.classList.remove("valid")
            input.classList.remove("invalid")
        })
        boxValuesToEmpty.forEach(boxValue => {
            boxValue.querySelector("span").textContent="Choisissez"
            boxValue.classList.remove("valid")
            boxValue.classList.remove("invalid")
        })
        textAreaToEmpty.forEach(textArea => {
            textArea.value=""
            textArea.classList.remove("valid")
            textArea.classList.remove("invalid")
            textArea.parentNode.querySelector(".remaining").textContent = "0 caractère sur 2 000 caractères autorisés"
            console.log(textArea.parentNode.querySelector(".remaning"))
        })

        alert("Votre demande a bien été envoyée ! Vous recevrez une réponse à votre demande d'information dans un délai de quelques jours ouvrés.")
    }

    else {
        const fieldsToHighlight = Array.from(document.querySelectorAll(".form-group"))
                                  .filter(field => !field.classList.contains("optional"))


        alert("Merci de remplir tous les champs obligatoires pour que nous puissions traiter votre demande")
        
    }

    checkAll()
})

export {
    checkAll,
    testInput
}
