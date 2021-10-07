"use strict";
// DOM elements,
const guideDisplay = document.querySelector("h1");
const inputDisplay = document.querySelector("h2");
const buttons = document.querySelectorAll("button");
const valueBtn = document.querySelectorAll(".value");
const resetBtn = document.querySelector(".reset-btn");
const nextBtn = document.querySelector(".next");
const calculateBtn = document.querySelector(".gpa-btn");

// Gloabel variable
let pointsArray = [];
let creditsArray = [];
let numOfCourses = 1;
let point = 0,
  credit = 0;

// Functions
function sendNumberValue(value) {
  //If current display value is 0, replace, if not add number
  const displayValue = inputDisplay.textContent;
  inputDisplay.textContent =
    displayValue === "0.00" ? value : displayValue + value;

  if (guideDisplay.textContent.endsWith("grade")) {
    point = inputDisplay.textContent;
    // console.log("point", point);
  } else {
    credit = inputDisplay.textContent;
    // console.log("credit", credit);
  }
}

function addDecimal() {
  inputDisplay.textContent = `${inputDisplay.textContent}.`;
}

function callResetBtn() {
  numOfCourses = 0;
  inputDisplay.textContent = "0.00";
  guideDisplay.textContent = "Enter credit hours for course No.1";
  pointsArray = [];
  creditsArray = [];
}

function callNext() {
  let sum = 0;
  inputDisplay.textContent = "0.00";
  if (guideDisplay.textContent.includes("credit")) {
    guideDisplay.textContent = `Enter the point of your letter grade`;
    creditsArray.push(credit);
    // console.log("credit", credit);
    console.log("creditsArray", creditsArray);
  } else {
    guideDisplay.textContent = `Enter credit hours for course No.${++numOfCourses}`;
    pointsArray.push(point);
    // console.log("point", point);
    console.log("pointsArray", pointsArray);
  }
}

function sumCreditHours() {
  let sum = 0;
  for (let i = 0; i < creditsArray.length; i++) {
    sum += Number(creditsArray[i]);
  }
  return sum;
}

function calculateGpa() {
  pointsArray.push(point);
  let sum = 0;
  for (let i = 0; i < creditsArray.length; i++) {
    sum += creditsArray[i] * pointsArray[i];
    console.log(sum);
  }

  const creditHrsSum = sumCreditHours();
  console.log(creditHrsSum);
  if (creditHrsSum) {
    const gpa = (sum / creditHrsSum).toFixed(2);
    inputDisplay.textContent = `GPA: ${gpa}`;
    guideDisplay.textContent = "";
    console.log("gpa", gpa);
  }
}

// Event listeners
buttons.forEach((button) => {
  if (button.classList.contains("value")) {
    button.addEventListener("click", () => {
      sendNumberValue(button.value);
    });
  } else if (button.classList.contains("decimal")) {
    button.addEventListener("click", () => {
      addDecimal();
    });
  } else if (button.classList.contains("reset-btn")) {
    button.addEventListener("click", () => callResetBtn());
  } else if (button.classList.contains("gpa-btn")) {
    button.addEventListener("click", () => {
      calculateGpa();
    });
  } else if (button.classList.contains("next-btn")) {
    button.addEventListener("click", () => {
      callNext();
    });
  }
});
