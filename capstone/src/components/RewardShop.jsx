import React from "react";

const RewardShop = ({ coins, buyReward }) => {
  const rewards = [
    { name: "Game Break", icon: "🎮", price: 30 },
    { name: "Snack Time", icon: "🍕", price: 20 },
    { name: "Movie Time", icon: "🎬", price: 50 },
    { name: "Music Break", icon: "🎧", price: 25 },
  ];

  return (
    <div className="reward-column">
      <h2>Rewards</h2>
      <p className="coin-text">Your Coins: 🪙 {coins}</p>

      {rewards.map((reward, index) => (
        <div key={index} className="reward-card">
          <span>{reward.icon}</span>
          <p>{reward.name}</p>
          <b>{reward.price} coins</b>
          <button onClick={() => buyReward(reward.price)}>Buy</button>
        </div>
      ))}
    </div>
  );
};

export default RewardShop;