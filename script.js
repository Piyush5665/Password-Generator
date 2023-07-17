const slider = document.getElementById("slider");
const sliderValue = document.getElementById("slider_value");
const genPass = document.querySelector(".generate button");
const pref = document.querySelector(".preferences");
const display = document.querySelector(".password h1");
const copy = document.querySelector(".copy");

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "~!@#$%^&*()_+=|/";

let upperCase_Pswd = "";
let checkboxes = Array.from(document.querySelectorAll("input"));
checkboxes = checkboxes.splice(1);

const uppercase_checkbox = document.getElementById("uppercase");
const lowercase_checkbox = document.getElementById("lowercase");
const numbers_checkbox = document.getElementById("numbers");
const symbols_checkbox = document.getElementById("symbols");

genPass.addEventListener("click", () => {
  if (slider.value === "0") {
    alert("Select a Valid Length");
    return;
  }

  anyChecked = checkboxes.some((checkbox) => checkbox.checked);

  if (!anyChecked) {
    alert("Select at-least one checkbox");
    return;
  }

  display.textContent = generate_pass(slider.value);
});

for (let i = 0; i < 8; i++) {
  randomIndex = Math.floor(Math.random() * upperCase.length);
  upperCase_Pswd += upperCase[randomIndex];
}

slider.addEventListener("input", () => {
  sliderValue.textContent = slider.value;
});

function generate_pass(length) {
  const pref = [];
  if (uppercase_checkbox.checked) {
    pref.push(upperCase);
  }
  if (lowercase_checkbox.checked) {
    pref.push(lowerCase);
  }
  if (numbers_checkbox.checked) {
    pref.push(numbers);
  }
  if (symbols_checkbox.checked) {
    pref.push(symbols);
  }
  return shuffle(pref, length);
}

function shuffle(arr, length) {
  let pass = "";
  for (let i = 0; i < length; i++) {
    const rand1 = Math.floor(Math.random() * arr.length);
    const rand2 = Math.floor(Math.random() * arr[rand1].length);
    pass += arr[rand1][rand2];
  }
  return pass;
}

let lastCopied = "";
copy.addEventListener("click", () => {
  let textCopy = display.textContent;
  if (!textCopy) return;
  if (textCopy === "Password will appear here") return;
  if (textCopy && textCopy !== lastCopied) {
    
    navigator.clipboard.writeText(textCopy)
  .then(() => {
    console.log("Text copied successfully!");
  })
  .catch((error) => {
    console.error("Failed to copy text: ", error);
  });

    lastCopied=textCopy;
  }
});
