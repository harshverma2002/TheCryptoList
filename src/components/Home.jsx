import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div className='container max-w-full flex flex-col'>

      <div className='flex flex-col items-center bg-home_bg bg-no-repeat bg-cover'>
        <div className='text-white font-bold text-[130px] mt-40 cursor-default font-robotoMono '>
          TheCryptoList
        </div>
        <div className='text-white font-semibold text-3xl mt-20 mb-32 cursor-default'>
          Your one stop solution to all the cryptocurrency data LIVE
        </div>
      </div>

      <div className='bg-coins_bg bg-no-repeat bg-cover'>
        <div className='mt-24 mb-60 ml-12'>
          <button className='text-black bg-white py-4 px-12 hover:bg-black hover:text-white transition-all duration-300 animate-bounce'>
          <Link to="/coins"><div className='text-lg font-semibold'>Explore all Coins now !</div></Link>
          </button>
        </div>
      </div>

      <div className='bg-exchanges_bg bg-no-repeat bg-cover'>
        <div className='mb-80 ml-[1100px] pt-10'>
          <button className='text-black bg-white py-4 px-12 hover:bg-black hover:text-white transition-all duration-300 animate-bounce'>
          <Link to="/exchanges"><div className='text-lg font-semibold'>View all exchanges here !</div></Link>
          </button>
        </div>
      </div>

    </div>
  )
}

export default Home