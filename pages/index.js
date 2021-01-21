import Head from 'next/head'
import {getData} from './api'



export default function Home({counter}) {
  
  return (
    <main className="container">
      <div>
        
        <div className="item text" >Mattia si è bevuto</div>
        <div className="item counter" >{counter}☕</div>
        <div className="item text" >Caffè dal primo gennaio 2021</div>
        
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