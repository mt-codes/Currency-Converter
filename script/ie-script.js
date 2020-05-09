var amountType;
var amount;
var from = "EUR";
var to = "EUR";
var type;


var allRates;

var inputRate = 1;
var outputRate = 1;

var result;

var inputField = document.getElementById("currency-input-amount");
var outputField = document.getElementById("currency-output-amount");
var inputCurrency = document.getElementById("currency-input");
var outputCurrency = document.getElementById("currency-output");


// ACCESING EXCHANGE RATES DATA

var request = new XMLHttpRequest();
request.open("GET", "https://api.exchangeratesapi.io/latest", true);
request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
                var data = JSON.parse(request.responseText);
                allRates = data.rates;
                allRates.EUR = 1;
        }
};

request.send();


inputField.onkeyup = function () {
        amount = inputField.value;
        type = isNaN(amount);

        if (amount !== "" && type === false) {
                outputField.value = convert();
        } else {
                outputField.value = "";
        }
};


outputField.onkeyup = function () {
        amount = outputField.value;
        type = Number.isNaN(amount);

        if (amount !== "" && type === false) {
                inputField.value = reverseConvert();
        } else {
                inputField.value = "";
        }
};

// get input currency
inputCurrency.onchange = function () {
        amount = inputField.value;
        from = inputCurrency.value;
        inputRate = allRates[from];

        if (inputField.value !== "") {
                outputField.value = convert();
        } else {
                outputField.value = "";
        }
};


// get output currency
outputCurrency.onchange = function () {
        to = outputCurrency.value;
        outputRate = allRates[to];

        if (outputField.value !== "") {
                outputField.value = convert();
        } else {
        outputField.value = "";
        }
};


function convert() {
        return Math.round((amount / inputRate * outputRate) * 100) / 100;
}

function reverseConvert() {
        return Math.round((amount / outputRate * inputRate) * 100) / 100;
}
