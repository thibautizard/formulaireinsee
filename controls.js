const button = document.querySelector(".submit-button")

const changeInput = input => {

    switch(input.id) {

        case "siren" :
            if(/^[0-9]{9}$/.test(input.value)) {input.classList.remove("invalid"); input.classList.add("valid")}
            else {input.classList.remove("valid"); input.classList.add("invalid")}
        break;

        case "email" :
            if(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/.test(input.value)) {input.classList.remove("invalid"); input.classList.add("valid")}
            else {input.classList.remove("valid"); input.classList.add("invalid")}
            break;
        
        case "email-confirmation" :
            if(input.value === document.querySelector("input#email").value) {input.classList.remove("invalid"); input.classList.add("valid")}
            else {input.classList.remove("valid"); input.classList.add("invalid")}
            break;

        
        case "telephone" : 

            const etranger = document.querySelector("#departement span").textContent === "Étranger"
            if(/^0[0-9]{9}$/.test(input.value.replace(/[\s\.]/g,'')) && !etranger) {input.classList.remove("invalid"); input.classList.add("valid")}
            else if(etranger && /\d+/.test(input.value.replace(/[\s\.]/g,''))) {input.classList.remove("invalid"); input.classList.add("valid")}
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

    if(!input.value) {input.classList.remove("valid"); input.classList.remove("invalid")}

    checkAll()

}

const replaceInput = (input, key) => {

    switch (input.id) {
        case "telephone" :
            if(/[0-9]/.test(key) && input.value.length < 10) input.value += key
            break;
        
        case "siren" :
            if(/[0-9]/.test(key) && input.value.length < 9) input.value += key
            break;
    
        default:
            input.value += key
            break;
    }

    changeInput(input)
}

const checkAll = () => {
    const fieldsToCheck = Array.from(document.querySelectorAll(".form-group"))
                               .filter(field => getComputedStyle(field).display !== "none" && !field.classList.contains("optional"))
                               .map(field => field.querySelector(".box-value, input, textarea"))
    if(fieldsToCheck.every(field => field.classList.contains("valid"))) button.classList.add("active")
    else button.classList.remove("active")
}


button.addEventListener("click", () => {

    const lang = document.querySelector("html").getAttribute("lang")

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

        switch (lang) {
            case "fr":
                alert("Votre demande a bien été envoyée ! Vous recevrez une réponse à votre demande d'information dans un délai de quelques jours ouvrés.")
                break;
        
            case "en":
                alert("Your request has been sent ! You will receive a response to your request for information within a few working days.")
                break;
        }

    }

    else {
        const fieldsToHighlight = Array.from(document.querySelectorAll(".form-group"))
                                  .filter(field => !field.classList.contains("optional"))
                                  .map(field => field.querySelector("textarea, input[type=email], input[type=text], .box-value"))
                                  

        switch (lang) {
            case "fr":
                alert("Merci de remplir tous les champs obligatoires pour que nous puissions traiter votre demande.")
                break;
        
            case "en":
                alert("Please fill in all the required fields so that we can process your request.")
                break;
        }
        

        fieldsToHighlight.forEach(field => {

            field.classList.add("invalid")

        })
        
    }

    checkAll()
})

export {
    checkAll,
    changeInput, 
    replaceInput
}
