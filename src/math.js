// 1. Create new file called math.js
// 2. Define add function that takes two arguments and adds them up
// 3. Defina substract function that takes two arguments and subtracts them
// 4. Set up add as a default export
// 5. Set up subtract as a named export
// 6. Import both functions into index.js
// 7. Use both functions and print the results from each

const add = (num1, num2) => {
  return num1 + num2;
};

const subtracts = (num1, num2) => {
  return num1 + num2;
};

export { add as default, subtracts };
