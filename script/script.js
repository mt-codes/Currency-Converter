// CREATING VARIABLES

let amountType;
let amount;
let from = 'EUR';
let to = 'EUR';


let allRates;

let inputRate = 1;
let outputRate = 1;

let result;

let inputField = document.getElementById('currency-input-amount');
let outputField = document.getElementById('currency-output-amount');
let inputCurrency = document.getElementById('currency-input');
let outputCurrency = document.getElementById('currency-output');


// ACCESING EXCHANGE RATES DATA

var request = new XMLHttpRequest();
request.open('GET', 'https://api.exchangeratesapi.io/latest', true);
request.onload = function () {
	if (request.status >= 200 && request.status < 400) {
		let data = JSON.parse(request.responseText);
		allRates = data.rates;
		allRates['EUR'] = 1;
	};
};

request.send();



//GET ENTERED DATA

// get input amount
inputField.onkeyup = function () {
	amount = inputField.value;
	type = isNaN(amount);

	if (amount !== '' && type === false) {
		outputField.value = convert();
	} else {
		outputField.value = '';
	}
};


outputField.onkeyup = function () {
	amount = outputField.value;
	type = isNaN(amount);

	if (amount !== '' && type === false) {
		inputField.value = reverseConvert();
	} else {
		inputField.value = '';
	}
};

// get input currency
inputCurrency.onchange = function () {
	amount = inputField.value;
	from = inputCurrency.value;
	inputRate = allRates[from];

	if (inputField.value !== '') {
		outputField.value = convert();
	} else {
		outputField.value = '';
	};
};


// get output currency
outputCurrency.onchange = function () {
	to = outputCurrency.value;
	outputRate = allRates[to];

	if (outputField.value !== '') {
		outputField.value = convert();
	} else {
		outputField.value = '';
	};
};


function convert() {
	return Math.round((amount / inputRate * outputRate) * 100) / 100;
};

function reverseConvert() {
	return Math.round((amount / outputRate * inputRate) * 100) / 100;
}
