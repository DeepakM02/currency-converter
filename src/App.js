import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import currencyList from './currencyList.json';
import { constant } from './constant';
import { Chart } from 'react-charts'

const App = () => {
  const [fromCurrencyValue, setFromCurrency] = useState(1);
  const [toCurrencyValue, setToCurrency] = useState(0);
  const [fromCountry, setFromCountry] = useState('USD');
  const [toCountry, setToCountry] = useState('INR');
  const [convertedText, setText] = useState('');
  const [graphData, setGraphData] = useState('');

  useEffect(() => {
    convertCurrency();
  }, [])

  // currency conversion
  const convertCurrency = () => {
    let url = constant.base_url + '/latest?base=' + fromCountry + '&&symbols=' + toCountry
    fetch(url)
      .then(res => res.json())
      .then(response => {
        let convertedValue = response.rates[toCountry];
        let value = (fromCurrencyValue * convertedValue).toFixed(2)
        setToCurrency(value)
        changeResultText(convertedValue);
        getHistorialRates();
      })
      .catch(err => {
        console.log(err)
      })
  }

  // change result after getting converted value 
  const changeResultText = (convertedValue) => {
    let fromC = currencyList.filter(e => e.abbr === fromCountry)[0].name;
    let toC = currencyList.filter(e => e.abbr === toCountry)[0].name;
    let text = `1 ${fromC} = ${convertedValue.toFixed(2)} ${toC}`;
    setText(text)
  }

  // get historical rates
  const getHistorialRates = () => {
    let today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();
    let start_at = (year - 1) + '-' + month + '-' + day;
    let end_at = year + '-' + month + '-' + day;
    let url = constant.base_url + '/history?start_at=' + start_at + '&end_at=' + end_at + '&symbols=' + fromCountry + '&base=' + toCountry;

    fetch(url)
      .then(res => res.json())
      .then(response => {
        let graphData = [
          {
            specialLabel: 'Historical Rates',
            data: Object.entries(response.rates).map(([key, value]) => [(new Date(key)), value[fromCountry]])
          }
        ]
        setGraphData(graphData)
      });
  }

  // Chart axes config
  const axes = useMemo(
    () => [
      { primary: true, type: 'utc', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )

  // Chart axes series
  const series = React.useMemo(
    () => ({
      type: 'bubble',
      showPoints: false
    }),
    []
  )

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <div className="currency-section">
        <input type="number" name="fromCurrencyValue" value={fromCurrencyValue} onChange={e => setFromCurrency(e.target.value)} />
        <select value={fromCountry} placeholder="Please choose from currency" onChange={e => setFromCountry(e.target.value)}>
          {currencyList.map((currency, index) => (
            <option key={index} value={currency.abbr}>{currency.name}</option>
          ))}
        </select>

        <select value={toCountry} placeholder="Please choose to currency" onChange={e => setToCountry(e.target.value)}>
          {currencyList.map((currency, index) => (
            <option key={index} value={currency.abbr}>{currency.name}</option>
          ))}
        </select>

        <button disabled={!fromCurrencyValue || fromCurrencyValue === 'e'} onClick={convertCurrency}>Convert</button>
      </div>
      <div className="result-section">
        {toCurrencyValue ?
          <h2>{toCurrencyValue} {toCountry}</h2>
          : null
        }
        <h3>{convertedText}</h3>
      </div>

      {/* Historical Rates Chart  */}
      {graphData ?
        <div
          style={{
            width: '800px',
            height: '300px',
            display: 'inline-block',
            textAlign: 'center'
          }}
        >
          <Chart
            data={graphData}
            axes={axes}
            series={series}
            tooltip />
        </div> : null}
    </div>
  );
}

export default App;
