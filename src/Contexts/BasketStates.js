import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const BasketProvider = (props) => {
  const [basketData, setBasketData] = useState([]);
  const [betsData, setBetsData] = useState([]);

  const getBetsData = async () => {
    try {
      const response = await fetch(
        "https://nesine-case-study.onrender.com/bets"
      );
      const data = await response.json();

      setBetsData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBetsData();
  }, []);

  const addRemoveBasketData = (newItem) => {
    const checkExistData = basketData.filter(
      (item) => item.NID === newItem.NID
    );

    if (checkExistData.length === 0) {
      setBasketData((prevState) => [newItem, ...prevState]);
    } else if (checkExistData.length > 0) {
      setBasketData(basketData.filter((item) => item.NID !== newItem.NID));
      if (
        checkExistData.length > 0 &&
        checkExistData[0]?.Oran !== newItem?.Oran
      ) {
        setBasketData((prevState) => [newItem, ...prevState]);
      }
    }
  };

  return (
    <GlobalContext.Provider
      value={{ basketData, setBasketData, addRemoveBasketData, betsData }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
