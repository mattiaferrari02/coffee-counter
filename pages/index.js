import Head from 'next/head'
import {useState} from "react";
import {getData} from './api'
import axios from "axios"


export default function Home({counter}) {
  const [counterUI, setCounter] = useState(counter);
  const [error, setError] = useState("");
  const handleClick = async()=>{
    await axios.get(`https://coffee-counter.vercel.app/api/add?token=${localStorage.getItem("token")}`).then(res=> {
      console.log(res); 
      if(res.data.msg!="Not today") setCounter(counterUI+1) 
      else setError(<div className="item text error" >Non penso che tu sia Mattia</div>);
    }).catch(e=>{
      setError(<div className="item text error" >Non penso che tu sia Mattia</div>);
    })
  }

  return (
    <main className="container">
      <div>
        
        <div className="item text" >Mattia si è bevuto</div>
        <div className="item counter" >{counterUI}☕</div>
        <div className="item text" >Caffè dal primo gennaio 2021</div>
        {error}
        <div className="btn" onClick={handleClick} >+</div>
      </div>
    </main>
    
  )
}


export async function getServerSideProps(){
  const counter = await getData();
  console.log(counter);
  return {
    props: {
      counter
    }
  };
};