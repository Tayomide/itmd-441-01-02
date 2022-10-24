let data // Variable to store amount and tip data in

if(localStorage["data"]){ // Make data persistent on reload
  data = JSON.parse(localStorage["data"]) // Use localstorage data if data exists
}else{//Create data and store in localstorage if data does not exist
  data = {
    tip:50,
    amount: 0
  }
  localStorage["data"] = JSON.stringify(data)
}

const form = document.querySelector("form.form") // Get form
const tipPercentage = document.querySelector("#tip-percentage") // Get tipPercentage paragraph individually since it is not a form element
const formElements = {} // Create object to hold all form elements

for(let element of form){
  formElements[element.id] = element // Store form elements in object with id as the key
}
formElements[tipPercentage.id] = tipPercentage // Add the tip percentage to the form element object

const format = (num) => { //Create a function to format output
  return num.toFixed(2)
}

const updateBill = () => { // Create function to update the bill
  formElements["bill"].value = format(data.amount);
}

const updateTip = () => { // Create function to update the tip slider
  formElements["tip"].value = data.tip
}

const update = () => { // Create a function to update every other form element
  formElements["tip-amount"].value = format((data.amount * data.tip) / 100)
  formElements["total"].value = format(data.amount * (100 + data.tip) / 100)
  formElements["tip-total"].value = format((data.amount * data.tip) / 100)
  formElements["tip-percentage"].innerHTML = data.tip+"%"
}

update() // Update form elements on reload
updateBill() // Update bill on reload
updateTip() // Update tip slider on reload

const recalculateTip = (e) => { // Create function for recalculating tip on change
  data.tip = parseFloat(e.target.value) // store new tip value in data object
  localStorage["data"] = JSON.stringify(data) // Update localstorage data
  update() // Call update to update all form elements
}

const recalculateBill = (e) => { // Create function for recalcualting bill on change
  data.amount = e.target.value? parseFloat(e.target.value) : 0 // Store new amount value in data object
  if(data.amount < 0)data.amount = 0
  localStorage["data"] = JSON.stringify(data) // Update localstorage data
  update() // Call update to update all form elements
}

formElements["tip"].addEventListener("input", recalculateTip) // Add eventlistener to listen to change in tip input
formElements["bill"].addEventListener("input", recalculateBill) // Add eventlistener to listen to change in bill input
formElements["bill"].addEventListener('focusout', updateBill); // Format bill input value once the user is done typing
