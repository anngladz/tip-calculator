const bill = document.querySelector("#bill");
const tips = document.querySelectorAll(".percent");
const customTip = document.querySelector("#custom-tip");
const people = document.querySelector("#people");
const error = document.querySelector("#error");
const errorBill = document.querySelector("#errorBill");
const resetBtn = document.querySelector("#reset");
const tipAmount = document.querySelector("#tip");
const totalAmount = document.querySelector("#total");
const container = document.querySelector(".container");

container.addEventListener("change", () => {
  let percent = 0;
  if (document.querySelector(".percent.active")) {
    percent = document.querySelector(".percent.active").id;
  } else {
    percent = customTip.value;
  }
  calculateTip(bill.value, percent, people.value);
});

tips.forEach((tip) => {
  tip.addEventListener("click", () => {
    document.querySelector(".active")
      ? document.querySelector(".active").classList.remove("active")
      : "";
    tip.classList.add("active");
    customTip.value = "";
    calculateTip(bill.value, tip.id, people.value);
  });
});

customTip.addEventListener("click", () => {
  tips.forEach((tip) => tip.classList.remove("active"));
});

function calculateTip(billValue, percent, peopleValue) {
  resetBtn.classList.add("active");
  if (peopleValue <= 0) {
    people.classList.add("error");
    error.classList.add("show");
  } else if (billValue < 0) {
    bill.classList.add("error");
    errorBill.classList.add("show");
    people.classList.remove("error");
    error.classList.remove("show");
  } else {
    let tip = (billValue * percent) / 100;
    let total = Number(billValue) + Number(tip);
    tipAmount.textContent = `$${(tip / peopleValue).toFixed(2)}`;
    totalAmount.textContent = `$${(total / peopleValue).toFixed(2)}`;
    people.classList.remove("error");
    bill.classList.remove("error");
    error.classList.remove("show");
    errorBill.classList.remove("show");
  }
}

function reset() {
  bill.value = "";
  tips.forEach((tip) => tip.classList.remove("active"));
  customTip.value = "";
  people.value = "";
  tipAmount.textContent = "$0.00";
  totalAmount.textContent = "$0.00";
  resetBtn.classList.remove("active");
}

resetBtn.addEventListener("click", reset);
