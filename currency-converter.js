const axios = require("axios");

// get exchange rate
const getExchangeRate = async (from, to) => {
  const response = await axios.get(
    `https://open.er-api.com/v6/latest/${from.toUpperCase()}`
  );
  const rates = response.data.rates;
  const exchangeRate = rates[to.toUpperCase()];

  if (!Number(exchangeRate)) {
    throw new Error(
      `Unable to get exchange rate for ${from.toUpperCase()} to ${to.toUpperCase()}`
    );
  }

  return exchangeRate;
};

// get countries
const getCountries = async (currncy) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/currency/${currncy}`
    );
    return response.data.map((country) => country.name.common);
  } catch (error) {
    throw new Error(`Unable to get countries that use ${error.message}`);
  }
};

// convert currency
const convertCurrency = async (from, to, amount) => {
  const countries = await getCountries(to);
  const exchangeRate = await getExchangeRate(from, to);
  const convertedAmount = (exchangeRate * amount).toFixed(2);

  console.info(
    `===============================================================================================================
    \n${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries}
    \n==============================================================================================================`
  );
};

convertCurrency("AED", "LKR", 15000);
