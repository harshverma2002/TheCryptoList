import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='container flex-row bg-black mx-auto max-w-full space-x-10 py-3 px-3 font-semibold'>
      <button className='text-white'>
        <Link to="/">Home</Link>
      </button>
      <button className='text-white'>
        <Link to="/coins">Coins</Link>
      </button>
      <button className='text-white'>
        <Link to="/exchanges">Exchanges</Link>
      </button>
    </div>
  )
}

export default Header