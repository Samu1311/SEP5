// Progress Bar 1
const inputField1 = document.getElementById("numberInput1");
const addButton1 = document.getElementById("addButton1");
const counterDisplay1 = document.getElementById("counter1");
const progressBar1 = document.getElementById("progressBar1");

let counter1 = 0;

addButton1.addEventListener("click", function () {
  const value = parseInt(inputField1.value);
  if (!isNaN(value) && counter1 < 100) {
    counter1 += value;
    if (counter1 > 100) {
      counter1 = 100;
    }
    counterDisplay1.textContent = "Counter: " + counter1;
    progressBar1.value = counter1;
  }
});

// Progress Bar 2
const inputField2 = document.getElementById("numberInput2");
const addButton2 = document.getElementById("addButton2");
const counterDisplay2 = document.getElementById("counter2");
const progressBar2 = document.getElementById("progressBar2");

let counter2 = 0;

addButton2.addEventListener("click", function () {
  const value = parseInt(inputField2.value);
  if (!isNaN(value) && counter2 < 100) {
    counter2 += value;
    if (counter2 > 100) {
      counter2 = 100;
    }
    counterDisplay2.textContent = "Counter: " + counter2;
    progressBar2.value = counter2;
  }
});

// Progress Bar 3
const inputField3 = document.getElementById("numberInput3");
const addButton3 = document.getElementById("addButton3");
const counterDisplay3 = document.getElementById("counter3");
const progressBar3 = document.getElementById("progressBar3");

let counter3 = 0;

addButton3.addEventListener("click", function () {
  const value = parseInt(inputField3.value);
  if (!isNaN(value) && counter3 < 100) {
    counter3 += value;
    if (counter3 > 100) {
      counter3 = 100;
    }
    counterDisplay3.textContent = "Counter: " + counter3;
    progressBar3.value = counter3;
  }
});
