const sectionResult = document.querySelector("#result")
const form = document.querySelector("#form")

window.onload = waitResult()

function clearForm() {
   form.reset()
   waitResult()
}

form.onsubmit = (event) => {
   event.preventDefault()
   console.log("Submit")

   let mortgageAmount = document.querySelector("#amount").value
   let mortgageTerm = document.querySelector("#term").value
   let interestRate = document.querySelector("#rate").value

   let mortgageTypes = document.getElementsByName("type")
   let mortgageType = whatMortgageType(mortgageTypes)

   console.log(mortgageAmount, mortgageTerm, interestRate, mortgageType)

   calculateRepayments(mortgageAmount, mortgageTerm, interestRate, mortgageType)
}

function whatMortgageType(radios) {
   let valueRadio

   radios.forEach(radio => {
      valueRadio = radio.checked ? radio.value : valueRadio
   })

   return valueRadio
}

function calculateRepayments(amount, term, rate, type) {
   let monthlyRepayments
   let totalRepayments

   term = term * 12
   rate = (rate / 100) / 12

   if (type === "repayment") {
      monthlyRepayments = amount * ((rate * Math.pow((1 + rate), term)) / (Math.pow((1 + rate), term) - 1))
      totalRepayments = monthlyRepayments * term 
   } else {
      monthlyRepayments = amount * rate
      totalRepayments = monthlyRepayments * term 
   }

   monthlyRepayments = formatCurrency(Number(monthlyRepayments.toFixed(2)))
   totalRepayments = formatCurrency(Number(totalRepayments.toFixed(2)))

   showResult(monthlyRepayments, totalRepayments)

   console.log("resultado: " + monthlyRepayments)
}

function formatCurrency(value) {
   return new Intl.NumberFormat("pt-Br", {
      style: "currency",
      currency: "BRL"
   }).format(value)
}

function showResult(monthly, total) {
   sectionResult.innerHTML = `
      <h2 class="text--2 text--white">Your results</h2>
      <p class="result__text text--slate-300">Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.</p>
      <article class="result__box">
         <p class="text--slate-300">Your monthly repayments</p>
         <span class="text--1 text--lime">${monthly}</span>
         <div></div>
         <p class="text--slate-300">Total you'll repay over the term</p>
         <span class="text--2 text--white">${total}</span>
      </article>`
}

function waitResult() {
   sectionResult.innerHTML = `
      <img src="src/img/calculator-mortgage.svg" alt="">
      <h2 class="text--2 text--white text--center">Results shown here</h2>
      <p class="text--slate-300 text--center">Complete the form and click “calculate repayments” to see what your monthly repayments would be.</p>`
}