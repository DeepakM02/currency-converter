import React, { useState, useEffect, useMemo } from "react";
import { Chart } from "react-charts";

import currencyList from "./currencyList.json";
import { constant } from "./constant";

import "./App.css";

const App = () => {
  const [fromCurrency, setFromCurrency] = useState(1);
  const [toCurrency, setToCurrency] = useState("");
  const [fromCountry, setFromCountry] = useState("USD");
  const [toCountry, setToCountry] = useState("INR");
  const [convertedText, setConvertedText] = useState("");
  const [graphData, setGraphData] = useState("");

  // Chart axes config
  const axes = useMemo(
    () => [
      { primary: true, type: "utc", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );

  // Chart axes series
  const series = React.useMemo(
    () => ({
      type: "bubble",
      showPoints: false,
    }),
    []
  );

  useEffect(() => {
    convertCurrency();
  }, []);

  // currency conversion
  const convertCurrency = () => {
    const url = `${constant.base_url}/latest?base=${fromCountry}&&symbols=${toCountry}`;

    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        const toCurrencyValue = response.rates[toCountry];
        const value = (fromCurrency * toCurrencyValue).toFixed(2);
        setToCurrency(`${value} ${toCountry}`);
        changeResultText(toCurrencyValue);
        getHistorialRates();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  // change result after getting converted value
  const changeResultText = (convertedValue) => {
    const fromC = currencyList.filter((e) => e.abbr === fromCountry)[0].name;
    const toC = currencyList.filter((e) => e.abbr === toCountry)[0].name;
    const text = `1 ${fromC} = ${convertedValue.toFixed(2)} ${toC}`;
    setConvertedText(text);
  };

  const getStartAtEndAt = () => {
    const today = new Date();
    const [year, month, day] = [
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    ];
    const start_at = `${year - 1}-${month}-${day}`;
    const end_at = `${year}-${month}-${day}`;

    return { start_at, end_at };
  };

  // get historical rates
  const getHistorialRates = () => {
    const { start_at, end_at } = getStartAtEndAt();
    const url = `${constant.base_url}/history?start_at=${start_at}&end_at=${end_at}&symbols=${fromCountry}&base=${toCountry}`;

    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        const graphData = [
          {
            specialLabel: "Historical Rates",
            data: Object.entries(response.rates).map(([key, value]) => [
              new Date(key),
              value[fromCountry],
            ]),
          },
        ];
        setGraphData(graphData);
      });
  };

  return (
    <div className="App">
      <h1>Currency Converter</h1>

      <div className="currency-section">
        <input
          type="number"
          min={1}
          name="fromCurrency"
          value={fromCurrency}
          onKeyDown={blockInvalidChar}
          onChange={(e) => setFromCurrency(e.target.value)}
        />
        <select
          name="from country"
          value={fromCountry}
          placeholder="Please select from currency"
          onChange={(e) => setFromCountry(e.target.value)}
        >
          {currencyList.map((currency, index) => (
            <option key={index} value={currency.abbr}>
              {currency.name}
            </option>
          ))}
        </select>

        <select
          name="to country"
          value={toCountry}
          placeholder="Please select to currency"
          onChange={(e) => setToCountry(e.target.value)}
        >
          {currencyList.map((currency, index) => (
            <option key={index} value={currency.abbr}>
              {currency.name}
            </option>
          ))}
        </select>

        <button disabled={!fromCurrency} onClick={convertCurrency}>
          Convert
        </button>
      </div>

      <div className="result-section">
        {toCurrency ? <h2>{toCurrency}</h2> : null}
        <h3>{convertedText}</h3>
      </div>

      {/* Historical Rates Chart  */}
      {graphData ? (
        <div
          style={{
            width: "800px",
            height: "300px",
            display: "inline-block",
            textAlign: "center",
          }}
        >
          <Chart data={graphData} axes={axes} series={series} tooltip />
        </div>
      ) : null}
    </div>
  );
};

export default App;
