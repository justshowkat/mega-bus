// global variables
let finalPrice
// global variables

// this fucntion helps to get id from the html file
let getId = (id) =>{
    let getIt = document.getElementById(id)
    if (document.getElementById(id).value === String) {
        return getIt
    } else if(document.getElementById(id).value === undefined){
        return getIt
    }
    else {
        return getIt.value
    }
}

// this function calculate all the final maths 
subTotalHandler = () => {
        const fclassPrice = parseFloat(getId('fclass-total').innerText)
        const ecoClassPrice = parseFloat(getId('eco-class-total').innerText)
        
        let subTotalPrice = fclassPrice + ecoClassPrice
        getId('sub-total-price').innerText = subTotalPrice

        let vat = (subTotalPrice * 10) / 100 
        getId('vat-price').innerText = vat 
        finalPrice = subTotalPrice + vat //global variable
        getId('total-price').innerText = finalPrice 
}

// this fucntion execute when any plus or minus button get clicked and calculate each prices
ticketModifier = (decrease, button, field, priceId, classTotal) => {
    getId(button).addEventListener('click', () => {
        const fieldValue = getId(field)
        let getNumber = parseFloat(fieldValue)

        const classPrice = getId(priceId).innerText
        let classPriceNumber = parseFloat(classPrice)

        let counterTemp
        let totalClassPrice
        if (!decrease) {
             counterTemp = getNumber + 1
             totalClassPrice = classPriceNumber * counterTemp
        } else if(decrease){
             if (getNumber >= 1 ) {
                counterTemp = getNumber - 1
                totalClassPrice = classPriceNumber * counterTemp
             } else{
                counterTemp = getNumber
                parseFloat(getId(classTotal).innerText)
                 confirm('ticket value cannot be less than Zero!')
             }
        }
        
        document.getElementById(field).value = counterTemp
        getId(classTotal).innerText = totalClassPrice
        subTotalHandler()
    })
}

ticketModifier(false, 'f-plus', 'fclass-ticket-number', 'fclass-price', 'fclass-total')
ticketModifier(true, 'f-minus', 'fclass-ticket-number', 'fclass-price', 'fclass-total')
ticketModifier(false, 'e-plus', 'eco-class-ticket-number', 'eco-class-price', "eco-class-total")
ticketModifier(true, 'e-minus', 'eco-class-ticket-number', 'eco-class-price', "eco-class-total")

// when clicked on the book now button this will execute

//this fucntion prevent repeatation
ticketCreator = (putTo, takeFrom) => {
    getId(putTo).innerText = getId(takeFrom)
}
// evenlistener for book now button 
getId('book-now').addEventListener('click', () => {
    if (getId('starting-from') === '' || getId('going-to') === '' || getId('name') === '' || getId('phone') === '' || getId('departure') === '') {
        if (getId('departure') === '') {
            alert("departure date cannot be empty")
        } else {
            alert("destination's cannot be empty")
        }
    } else{
        //visibility area
        getId('primary-area').style.display = "none"
        getId('secondary-area').style.display = "block"

        ticketCreator('ticket-date', 'departure')
        ticketCreator('return-date', 'return')
        ticketCreator('psngr-name', 'name')
        ticketCreator('psngr-phone', 'phone')

        ticketCreator('start-point', 'starting-from')
        ticketCreator('end-point', 'going-to')

        ticketCreator('f-class-seats', 'fclass-ticket-number')
        ticketCreator('eco-class-seats', 'eco-class-ticket-number')
        getId('final-price').innerText = finalPrice //global variable
        getId('ticket-no').innerText = Math.floor((Math.random() * 10000000) + 1);
        
    }
})

getId('another').addEventListener('click', () => {
    location.reload()
})
