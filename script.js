const buttons = document.querySelectorAll(".button");

// Objek kalkulator
const calculator = {
  displayNumber: "0",
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false,
};

// Mengupdate angka display
function updateDisplay() {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

// Menghapus angka
function clearCalculator() {
  calculator.displayNumber = "0";
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
}

// Memasukkan angka display
function inputDigit(digit) {
  // Memanipulasi angka 0 pada display
  if (calculator.displayNumber === "0") {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
}

// Invers number
function inverseNumber() {
  if (calculator.displayNumber === "0") {
    return; //Stop
  }
  calculator.displayNumber = calculator.displayNumber * -1;
}

// Handle operator
function handleOperator(operator) {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;

    // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
    calculator.displayNumber = "0";
  } else {
    alert("Operator sudah ditetapkan");
  }
}

// Fungsi operasi
function performCalculation() {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert("Anda belum menetapkan operator");
    return;
  }

  let result = 0;
  if (calculator.operator === "+") {
    result =
      parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else if (calculator.operator === "−") {
    result =
      parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  } else if (calculator.operator === "×") {
    result =
      parseInt(calculator.firstNumber) * parseInt(calculator.displayNumber);
  } else if (calculator.operator === "÷") {
    result =
      parseInt(calculator.firstNumber) / parseInt(calculator.displayNumber);
  } else if (calculator.operator === "%") {
    result =
      parseInt(calculator.firstNumber) % parseInt(calculator.displayNumber);
  }

  calculator.displayNumber = result;
}

// Event
// Loop button
for (const button of buttons) {
  button.addEventListener("click", function (event) {
    // mendapatkan objek elemen yang diklik
    const target = event.target;

    // Event clear
    if (target.classList.contains("clear")) {
      clearCalculator();
      updateDisplay();
      return; // Menghentikan code disini jika fungsi ini dijalankan
    }

    // Fungsi fungsi kalkulator
    if (target.classList.contains("negative")) {
      inverseNumber();
      updateDisplay();
      return;
    }

    if (target.classList.contains("equals")) {
      performCalculation();
      updateDisplay();
      return;
    }

    if (target.classList.contains("operator")) {
      handleOperator(target.innerText);
      return;
    }

    inputDigit(target.innerText);
    updateDisplay();
  });
}
