const button = document.querySelector(".submit-button")

const changeInput = input => {

    switch(input.id) {

        case "siren" :
            input.value = input.value.replace(/\D/g,'')

            if(/^[0-9]{9}$/.test(input.value)) {input.classList.remove("invalid"); input.classList.add("valid")}
            else {input.classList.remove("valid"); input.classList.add("invalid")}
            if(input.value.length > 9) {input.value = input.value.slice(0, input.value.length - 1); input.classList.remove("invalid"); input.classList.add("valid")}
        break;

        case "email" :
            input.value = input.value.replace(/[\s]/g,'')

            if(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/.test(input.value)) {input.classList.remove("invalid"); input.classList.add("valid")}
            else {input.classList.remove("valid"); input.classList.add("invalid")}
            changeInput(document.querySelector("input#email-confirmation"))
            break;
        
        case "email-confirmation" :
            input.value = input.value.replace(/[\s]/g,'')

            if(input.value === document.querySelector("input#email").value) {input.classList.remove("invalid"); input.classList.add("valid")}
            else {input.classList.remove("valid"); input.classList.add("invalid")}
            break;

        case "telephone" : 
        // alert("test")
            const etranger = document.querySelector("#departement span").textContent === "Étranger" || document.querySelector("#departement span").textContent === "Foreign"
            input.value = input.value.replace(/\D/g,'')

            if(/^0[0-9]{9}$/.test(input.value) && !etranger) {input.classList.remove("invalid"); input.classList.add("valid")}
            else if(etranger && /\d+/.test(input.value)) {input.classList.remove("invalid"); input.classList.add("valid")}
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

const controlInput = (input, e) => {

    e.preventDefault()
    switch (input.id) {
        case "telephone" :
            if(/[0-9]/.test(e.key) && input.value.length < 10) input.value += e.key
            break;
        
        case "siren" :
            if(/[0-9]/.test(e.key) && input.value.length < 9) input.value += e.key
            break;
    
        default:
            input.value += e.key
            break;
    }

    checkAll()
    
}

const checkAll = () => {

    let fieldsToCheck = Array.from(document.querySelectorAll(".form-group"))

    const fieldsMandatory = fieldsToCheck
                            .filter(field => getComputedStyle(field).display !== "none" && !field.classList.contains("optional"))
                            .map(field => field.querySelector(".box-value, input, textarea"))
    
    fieldsToCheck = fieldsToCheck
                    .map(field => field.querySelector(".box-value, input, textarea"))

    if(fieldsToCheck.every(field => !field.classList.contains("invalid")) && fieldsMandatory.every(field => field.classList.contains("valid"))) button.classList.add("active")
    else button.classList.remove("active")
    
}


button.addEventListener("click", () => {

    const lang = document.querySelector("html").getAttribute("lang")

    if(button.classList.contains("active")) {

        const fieldsToCheck = Array.from(document.querySelectorAll(".form-group"))
                               .filter(field => getComputedStyle(field).display !== "none" && !field.classList.contains("optional"))
                               .map(field => field.querySelector(".box-value, input, textarea"))
        
        const alert = document.querySelector('.alert-validation')
        document.querySelector('.alert-validation__mail').textContent = document.querySelector('input#email').value
        alert.style.display = 'block'

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
                                  .filter(field => !field.classList.contains("valid"))
                                  

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
    controlInput
}
