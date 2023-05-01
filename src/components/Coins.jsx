import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {server} from '../index'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'
import { Link } from 'react-router-dom'

const Coins = () => {

  const [coins,setCoins] = useState([])
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(false)
  const [page,setPage] = useState(1);
  const [currency,setCurrency] = useState("inr")
  const currencySymbol = currency==="inr"?"₹":currency==="eur"?"€":"$";


  const changePage = (page)=>{
    setPage(page);
    setLoading(true);
  };

  const btn = new Array(132).fill(1)

  useEffect(() => {
    const fetchCoins = async()=>{

      try {
        const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
        setCoins(data);
        setLoading(false);
        console.log(data)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
     
    }
    fetchCoins()
  }, [currency,page])

  if(error) return<ErrorComponent message={"Bad API request"}/>
  
  return (
    <div>
      {loading ? <Loader/> :
      <div className='px-16'>

        <div className='flex flex-row space-x-8 pt-4'>
          <button className='transition-all duration-300 border-2 rounded-2xl border-white py-1 px-4 text-white bg-black hover:bg-white hover:text-black hover:border-black focus:bg-white focus:text-black focus:border-black' onClick={()=>{setCurrency('inr')}}>INR</button>
          <button className='transition-all duration-300 border-2 rounded-2xl border-white py-1 px-4 text-white bg-black hover:bg-white hover:text-black hover:border-black focus:bg-white focus:text-black focus:border-black' onClick={()=>{setCurrency('usd')}}>USD</button>
          <button className='transition-all duration-300 border-2 rounded-2xl border-white py-1 px-4 text-white bg-black hover:bg-white hover:text-black hover:border-black focus:bg-white focus:text-black focus:border-black' onClick={()=>{setCurrency('eur')}}>EUR</button>
        </div>

        <div className='container flex flex-row content-center justify-center flex-wrap mt-10 px-10 '>
        {   
          coins.map((i)=>(
             <CoinCard key={i.id} id={i.id} price={i.current_price} name={i.name} image={i.image} symbol={i.symbol} currencySymbol={currencySymbol}/>
          ))
        }
        </div>

        <div className='container max-w-full flex flex-row overflow-auto py-8'>
          {
            btn.map((item,index)=>(
              <button className ='p-2 border-2 m-2' onClick={()=>changePage(index+1)}>{index+1}</button>
            ))
          }
        </div>
      
      </div>
      }
    </div>
  )
}

const CoinCard=({id,name,price,symbol,image,currencySymbol="₹"})=>{
        return(
          
          <div>
            <Link to={`/coin/${id}`}  className='border-2 transition-all duration-300 flex flex-col w-56 flex-wrap items-center m-8 space-y-2 rounded-xl p-4 hover:-translate-y-3 hover:drop-shadow-md'>
              <img src={image} alt="" className='h-32 w-32'/>
              <div className='font-robotoMono'>{symbol}</div>
              <div className='font-robotoMono'>{name}</div>
              <div className='font-robotoMono'>{price?`${currencySymbol}${price}`:"NA"}</div>
            </Link>
          </div>
        )
}

export default Coins