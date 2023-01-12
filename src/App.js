import React, {useEffect, useState} from "react";
import './App.css';
import axios from "axios";

function App() {  
  const [price, setPrice] = useState(0);
  const [moscow, setMoscow] = useState(0);
  //() => {};
  //callback function: call it and pass in another function
  const getPrice = () => {
    //axios is way to create async
    axios
      .get("https://api.coinbase.com/v2/prices/BTC-USD/spot")
      //.then is a promise that will run when the API call is successful
      .then((res) => {
        setPrice(res.data.data.amount);
      })
      //.catch is a promise that will run if the API call fails
      .catch((err) => {
        console.log(err);
      });
  }
  const getMoscow = () => {
    //axios is way to create async
    axios
      .get("https://api.coinbase.com/v2/prices/BTC-USD/spot")
      //.then is a promise that will run when the API call is successful
      .then((res) => {
        setMoscow(Math.floor(1/(res.data.data.amount*0.00000001)));
      })
      //.catch is a promise that will run if the API call fails
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getPrice();
    getMoscow();
  }, []);

  return (
    <div className="App">
      <h1>Bitcoin Price</h1>
      <h3>${price}</h3>

      <h1>Sats per Dollar</h1>
      <h3>{moscow} sats</h3>
    </div>
  );
}

export default App;
