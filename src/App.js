import React, {useEffect, useState} from "react";
import './App.css';
import axios from "axios";
import Transactions from "./components/Transactions";
import Buttons from "./components/Buttons";
import Chart from "./components/Chart";



function App() {

  const [price, setPrice] = useState(0);
  const [moscow, setMoscow] = useState(0);
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState(null);
  
  //() => {};
  //callback function: call it and pass in another function
  const getPrice = () => {
    //axios is way to create async (create http requests, )
    axios
      .get("https://api.coinbase.com/v2/prices/BTC-USD/spot")
      //.then is a promise that will run when the API call is successful
      .then((res) => {
        setPrice(res.data.data.amount);
        setMoscow(Math.floor(1/(res.data.data.amount*0.00000001)));
        updateChartData(res.data.data.amount);
      })
      //.catch is a promise that will run if the API call fails (handle async)
      .catch((err) => {
        console.log(err);
      });
  }
  
  const getWalletBalance = () => {
  // ToDo: Lookup how to move the X-API-Key to a .env file to keep it secret for when we push to Github
    const headers = {
      "X-Api-Key": "25621ccd59de4d50b22f953136de8477",
    };
    axios
      .get("https://legend.lnbits.com/api/v1/wallet", { headers })
      .then((res) => {
        // Divide our balance by 1000 since it is denominated in millisats
        setBalance(Math.floor(res.data.balance / 1000));
      })
      .catch((err) => console.log(err));
  };

  const getTransactions = () => {
      // ToDo: Lookup how to move the X-API-Key to a .env file to keep it secret for when we push to Github
    const headers = {
      "X-Api-Key": "25621ccd59de4d50b22f953136de8477",
    };
    axios
      .get("https://legend.lnbits.com/api/v1/payments", { headers })
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => console.log(err));
  };

  const updateChartData = (currentPrice) => {
    const timestamp = Date.now();
        // We are able to grab the previous state to look at it and do logic before adding new data to it
    setChartData((prevState) => {
      // If we have no previous state, create a new array with the new price data
      if (!prevState)
        return [
          {
            x: timestamp,
            y: Number(currentPrice),
          },
        ];
      // If the timestamp or price has not changed, we don't want to add a new point
      if (
        prevState[prevState.length - 1].x === timestamp ||
        prevState[prevState.length - 1].y === Number(currentPrice)
      )
        return prevState;
      // If we have previous state than keep it and add the new price data to the end of the array
      return [
        // Here we use the "spread operator" to copy the previous state
        ...prevState,
        {
          x: timestamp,
          y: Number(currentPrice),
        },
      ];
    });
  };


  useEffect(() => {
    getPrice();
    getWalletBalance();
    getTransactions();
  }, []);
 
  // Run these functions every 5 seconds after initial page load
  useEffect(() => {
    const interval = setInterval(() => {
      getPrice();
      getWalletBalance();
      getTransactions();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
 

 return (
   <div className="App">
     <header>
       <h1>pleb wallet</h1>
     </header>
     <Buttons />
     <div className="row">
       <div className="balance-card">
         <h2>Balance</h2>
         <p>{balance} sats</p>
       </div>
       <div className="balance-card">
         <h2>Price</h2>
          {<p>${price} | {moscow} sat/USD</p>}
       </div>
     </div>
     <div className="row">
      <div className="row-item">
        <Transactions transactions = { transactions }/>
      </div>
      <div className="row-item">{
        <Chart chartData={chartData} />
      }</div>
     </div>
     <footer>
       <p>Made by plebs, for plebs.</p>
     </footer>
   </div>
 );
}

export default App;

//url: https://legend.lnbits.com/wallet?usr=12d2c4b44cd545b1aedaf92f0f0159fd&wal=c832e05d08e44ca9beb864a2cb209ed0
//id: c832e05d08e44ca9beb864a2cb209ed0
//priv: 002ff7815edf4bedb1d1589935217f7c
//apix: 25621ccd59de4d50b22f953136de8477
//GET https://legend.lnbits.com/api/v1/wallet -H "X-Api-Key: 25621ccd59de4d50b22f953136de8477"