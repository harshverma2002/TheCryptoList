import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import { useParams } from "react-router-dom";
import Chart from "./Chart";

const CoinDetails = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  const params = useParams();
  const btns = ["24h", "7d", "14d", "30d", "1y", "max"];
  
  const [activeButton, setActiveButton] = useState(1);

  const handleClick = (button) => {
    if (activeButton === button) {
      setActiveButton(null);
    } else {
      setActiveButton(button);
    }
  };

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        break;

      case "7d":
        setDays("7d");
        break;

      case "14d":
        setDays("14d");
        break;
      case "30d":
        setDays("30d");
        break;
      case "1y":
        setDays("365d");
        break;
      case "max":
        setDays("max");
        break;

      default:
        setDays("24h");
        break;
    }
  };

  // chart data
  const [days, setDays] = useState("24h");
  const [charArray, setChartArray] = useState([]);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        //chart API call
        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );

        setCoin(data);
        setLoading(false);
        setChartArray(chartData.prices);
        console.log(data);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id, currency, days]);

  if (error) return <ErrorComponent message={"Bad API request"} />;

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="container flex flex-row justify-around my-12">
          <div className="flex flex-col items-center w-1/2 h-1/2 my-5 ">
            <Chart arr={charArray} days={days} currency={currencySymbol} />

            <div className="flex flex-row my-5">
              {btns.map((i) => (
                <button
                  className="px-5 py-1 border-2 first:rounded-l-md last:rounded-r-md font-semibold hover:bg-rose-300 hover:text-gray-100 active:bg-rose-500 focus:bg-rose-300 focus:text-gray-100 transition-all duration-300"
                  key={i}
                  onClick={() => {
                    switchChartStats(i);
                  }}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-row space-x-8 m-4">
              <button
                className={
                  activeButton === 1
                    ? "bg-white text-black border-black border-2 rounded-2xl py-1 px-3"
                    : "transition-all duration-300 border-2 rounded-2xl border-white py-1 px-3 text-white bg-black hover:bg-white hover:text-black hover:border-black "
                }
                onClick={() => {handleClick(1);setCurrency('inr')}}
              >
                INR
              </button>
              <button
                className={
                  activeButton === 2
                    ? "bg-white text-black border-black border-2 rounded-2xl py-1 px-3"
                    : "transition-all duration-300 border-2 rounded-2xl border-white py-1 px-3 text-white bg-black hover:bg-white hover:text-black hover:border-black "
                }
                onClick={() => {handleClick(2);setCurrency('usd')}}
              >
                USD
              </button>
              <button
                className={
                  activeButton === 3
                    ? "bg-white text-black border-black border-2 rounded-2xl py-1 px-3"
                    : "transition-all duration-300 border-2 rounded-2xl border-white py-1 px-3 text-white bg-black hover:bg-white hover:text-black hover:border-black "
                }
                onClick={() => {handleClick(3);setCurrency('eur')}}
              >
                EUR
              </button>
            </div>

            <div className="container flex flex-col">
              <div className="flex flex-row items-center">
                <div className="flex flex-col items-center">
                  <img
                    className="w-24 h-24 my-3"
                    src={coin.image.large}
                    alt=""
                  />

                  <div className="flex flex-row items-center">
                    <div className="text-white bg-black font-semibold px-2 py-1.5 rounded-full mx-2 text-sm">
                      {`# ${coin.market_cap_rank}`}
                    </div>

                    <div className="font-semibold text-lg">{coin.name}</div>
                  </div>
                </div>

                <div className="ml-5">
                  <div className="font-bold text-3xl">
                    {currencySymbol}
                    {coin.market_data.current_price[currency]}
                  </div>

                  <div>
                    {coin.market_data.price_change_percentage_24h > 0 ? (
                      <div className="flex flex-row items-center">
                        <div className="text-3xl">▴</div>
                        {coin.market_data.price_change_percentage_24h}%
                      </div>
                    ) : (
                      <div className="flex flex-row items-center">
                        <div className="text-3xl">▾</div>
                        {coin.market_data.price_change_percentage_24h}%
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="my-5 flex flex-col space-y-1 text-sm">
                <div className="flex flex-row">
                  <div>24h high</div>
                  <div className="font-semibold ml-4">{`${currencySymbol}${coin.market_data.high_24h[currency]}`}</div>
                </div>
                <div className="flex flex-row">
                  <div>24h low</div>
                  <div className="font-semibold ml-4">{`${currencySymbol}${coin.market_data.low_24h[currency]}`}</div>
                </div>
                <div className="flex flex-row">
                  <div>Max Supply</div>
                  <div className="font-semibold ml-4">
                    {coin.market_data.max_supply}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div>Circulating Supply</div>
                  <div className="font-semibold ml-4">
                    {coin.market_data.circulating_supply}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div>Market Cap</div>
                  <div className="font-semibold ml-4">{`${currencySymbol}${coin.market_data.market_cap[currency]}`}</div>
                </div>
                <div className="flex flex-row">
                  <div>All time high</div>
                  <div className="font-semibold ml-4">{`${currencySymbol}${coin.market_data.ath[currency]}`}</div>
                </div>
                <div className="flex flex-row">
                  <div>All time low</div>
                  <div className="font-semibold ml-4">{`${currencySymbol}${coin.market_data.atl[currency]}`}</div>
                </div>
              </div>
            </div>

            <div className="opacity-75">
              Last updated on{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinDetails;
