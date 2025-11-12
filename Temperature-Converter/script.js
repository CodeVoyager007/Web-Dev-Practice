const inputType = document.querySelector('#input-type');
const outputType = document.querySelector('#output-type');
const inputValue = document.querySelector('#input-value');
const outputValue = document.querySelector('#output-value');

const roundToTwoDP = (num) => {
  return num.toFixed(2);
};

const convertTemperature = () => {
  const from = inputType.value;
  const to = outputType.value;
  const value = parseFloat(inputValue.value);

  if (isNaN(value)) {
    outputValue.value = 'Invalid input';
    outputValue.style.borderColor = 'red';
    return;
  }

  outputValue.style.borderColor = 'green';

  let result;

  if (from === 'celsius') {
    if (to === 'fahrenheit') {
      result = (value * 1.8) + 32;
    } else if (to === 'kelvin') {
      result = value + 273.15;
    } else {
      result = value;
    }
  } else if (from === 'fahrenheit') {
    if (to === 'celsius') {
      result = (value - 32) * (5 / 9);
    } else if (to === 'kelvin') {
      result = (value + 459.67) * (5 / 9);
    } else {
      result = value;
    }
  } else if (from === 'kelvin') {
    if (to === 'celsius') {
      result = value - 273.15;
    } else if (to === 'fahrenheit') {
      result = 1.8 * (value - 273.15) + 32;
    } else {
      result = value;
    }
  }

  outputValue.value = roundToTwoDP(result);
};

const resetFields = () => {
  inputValue.value = '';
  outputValue.value = '';
  outputValue.style.borderColor = ''; // Reset border color
};

const main = () => {
  inputType.addEventListener('change', convertTemperature);
  outputType.addEventListener('change', convertTemperature);
};

main();