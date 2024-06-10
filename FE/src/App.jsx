import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000/");
function App() {
  const [logs, setLogs] = useState([]);
  const [data,setData]=useState([]);

  const fetchData = () => {
    fetch('https://realtimemon-1.onrender.com')
        .then(res => res.json())
        .then(result => {
            setData(result);
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        })
}
useEffect(() => {
    fetchData();
}, []);

  useEffect(() => {
    socket.on("logs", (data) => {
      setLogs([...logs, data])
    })

    return()=>{
      socket.disconnect();
    }
  });

  return (
    <>
     <h1>LOG Dashboard</h1>
     {data.map((ele)=>{
       return(
        <div>
          <h5 >{ele.name}</h5>
          <h5 >{ele.score}</h5>
          <h5 >{ele.age}</h5>
          <h5 >{ele.city}</h5>
          <h5>{ele.gender}</h5>
        </div>
         
       )
     })}
     <ul>
      {logs.map((log,index)=>{
        return(
          <li key={index}>{log}</li>
        )
      })}
     </ul>
    </>
  )
}

export default App
