import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {server} from '../index'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'

const Exchanges = () => {

  const [exchanges,setExchanges] = useState([])
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(false)

  useEffect(() => {
    const fetchExchanges = async()=>{

      try {
        const {data} = await axios.get(`${server}/exchanges`)
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true)
        setLoading(false)
      }
     
    }
    fetchExchanges()
  }, [])

  if(error) return<ErrorComponent message={"Bad API request"}/>
  
  return (
    <div className=''>
      {loading ? <Loader/> :
      <div className='container flex flex-row content-center justify-center flex-wrap pt-10 px-10 '>
        {   
          exchanges.map((i)=>(
             <Exchangecard key={i.id} name={i.name} image={i.image} rank={i.trust_score_rank} url={i.url}/>
          ))
        }
      </div>}
    </div>
  )
}

//A component for a exchange card 
const Exchangecard=({name,image,url,rank})=>{
    return(
    
        <a href={url} className='flex flex-col w-44 h-48 flex-wrap items-center justify-center space-y-4 m-10 border-2 border-slate-600 rounded-lg p-4'>
          <img src={image} alt="" className=''/>
          <div className=''>{rank}</div>
          <div className='font-robotoMono'>{name}</div>
        </a>

    )
}

export default Exchanges