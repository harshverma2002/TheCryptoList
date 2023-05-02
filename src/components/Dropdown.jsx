// import { useState } from "react";

export default function Dropdown({ currency, setCurrency }) {
  
  // const [activeButton, setActiveButton] = useState(1);

  // const handleClick = (button) => {
  //   if (activeButton === button) {
  //     setActiveButton(null);
  //   } else {
  //     setActiveButton(button);
  //   }
  // };

  return (
    <div className="flex flex-row">

      <select name="currency"  className='border-2 p-1 border-gray cursor-pointer hover:border-blue-300 focus:border-gray' onChange={e=>{setCurrency(e.target.value);}} id="currency">
        <option value="inr"
             className="border-1 rounded-none w-1/2"
          // className={
          //   activeButton === 1
          //     ? "bg-white text-black border-black border-2 rounded-2xl py-1 px-3"
          //     : "transition-all duration-300 border-2 rounded-2xl border-white py-1 px-3 text-white bg-black hover:bg-white hover:text-black hover:border-black "
          // }
        >
          INR
        </option>

        <option value="usd"
          // className={
          //   activeButton === 2
          //     ? "bg-white text-black border-black border-2 rounded-2xl py-1 px-3"
          //     : "transition-all duration-300 border-2 rounded-2xl border-white py-1 px-3 text-white bg-black hover:bg-white hover:text-black hover:border-black "
          // }
        >
          USD
        </option>

        <option value="eur"
          // className={
          //   activeButton === 3
          //     ? "bg-white text-black border-black border-2 rounded-2xl py-1 px-3"
          //     : "transition-all duration-300 border-2 rounded-2xl border-white py-1 px-3 text-white bg-black hover:bg-white hover:text-black hover:border-black "
          // }
        >
          EUR
        </option>

      </select>

                                          {/***** Switch currency with buttons code ******/}
      {/* <button
        className={
          activeButton === 1
            ? "bg-white text-black border-black border-2 rounded-2xl py-1 px-3"
            : "transition-all duration-300 border-2 rounded-2xl border-white py-1 px-3 text-white bg-black hover:bg-white hover:text-black hover:border-black "
        }
        onClick={() => {
          handleClick(1);
          setCurrency("inr");
        }}
      >
        INR
      </button>
      <button
        className={
          activeButton === 2
            ? "bg-white text-black border-black border-2 rounded-2xl py-1 px-3"
            : "transition-all duration-300 border-2 rounded-2xl border-white py-1 px-3 text-white bg-black hover:bg-white hover:text-black hover:border-black "
        }
        onClick={() => {
          handleClick(2);
          setCurrency("usd");
        }}
      >
        USD
      </button>
      <button
        className={
          activeButton === 3
            ? "bg-white text-black border-black border-2 rounded-2xl py-1 px-3"
            : "transition-all duration-300 border-2 rounded-2xl border-white py-1 px-3 text-white bg-black hover:bg-white hover:text-black hover:border-black "
        }
        onClick={() => {
          handleClick(3);
          setCurrency("eur");
        }}
      >
        EUR
      </button> */}
    </div>
  );
}
