const sectionResult = document.querySelector("#result")
const form = document.querySelector("#form")

waitResult()

form.onsubmit = (event) => {
   event.preventDefault()

   const mortgageAmount = Number(document.querySelector("#amount").value)
   const mortgageTerm = Number(document.querySelector("#term").value)
   const interestRate = Number(document.querySelector("#rate").value)

   const mortgageTypes = Array.from(document.querySelectorAll(".form__radio"))
   const mortgageType = whatMortgageType(mortgageTypes)

   calculateRepayments(mortgageAmount, mortgageTerm, interestRate, mortgageType)
}

function whatMortgageType(radios) {
   for (const radio of radios) {
      if (radio.checked) {
         return radio.value
      }
   }
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
}

function formatCurrency(value) {
   return new Intl.NumberFormat("pt-Br", {
      style: "currency",
      currency: "BRL"
   }).format(value)
}

function showResult(monthly, total) {
   sectionResult.innerHTML = `
      <h2 class="result__title text--2 text--white">Seus resultados</h2>
      <p class="result__text text--slate-300">Os seus resultados são apresentados abaixo com base nas informações que forneceu. Para ajustar os resultados, edite o formulário e clique novamente em “calcular reembolsos”.</p>
      <article class="result__box">
         <p class="text--slate-300">Seus pagamentos mensais</p>
         <span class="text--1 text--lime">${monthly}</span>
         <hr class="result__div">
         <p class="text--slate-300">Total que você pagará ao longo do prazo</p>
         <span class="text--2 text--white">${total}</span>
      </article>`
}

function waitResult() {
   sectionResult.innerHTML = `
      <img src="src/img/calculator-mortgage.svg" alt="">
      <h2 class="text--2 text--white text--center">Results shown here</h2>
      <p class="text--slate-300 text--center">Complete the form and click “calculate repayments” to see what your monthly repayments would be.</p>`
}