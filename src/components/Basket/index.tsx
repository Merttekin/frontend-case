import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../Contexts/BasketStates';
import "./Basket.css";

const Basket = () => {
  const { basketData } = useContext(GlobalContext);
  const [betMultiplier, setBetMultiplier] = useState(1);
  let totalPrice: number = 0;

  const beautyTotalPrice = () => {
    return Number(totalPrice).toFixed(2);
  };

  return(
    <div className="basket-card">
      {basketData.map((item) => {
        if (totalPrice !== 0) {
          totalPrice = totalPrice * item.Oran;
        } else {
          totalPrice = item.Oran * betMultiplier;
        }
        return (
          <div className="basket-item" key={item.C}>
            {`${item.MBS} Kod: ${item.C} Maç: ${item.N}`}{" "}
            <b>{`Oran : ${item.Oran}`}</b>
          </div>
        );
      })}
      <div className="bet-multiplier">
        Bahis tutari :  
        <input
          value={betMultiplier}
          onChange={(e) => setBetMultiplier(Number(e.target.value))}
        />
        TL
      </div>
      <div className="total-price">
        Toplam : {beautyTotalPrice()} TL
      </div>
    </div>
  )
};

export default Basket;