import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000/");
function App() {
  const [logs, setLogs] = useState([]);
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch('https://mocki.io/v1/7a779bae-2eca-41fb-b7cb-85e095a068de', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
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

    return () => {
      socket.disconnect();
    }
  });

  return (
    <>
      <h1>LOG Dashboard</h1>
      {data.map((ele) => {
        return (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: "1rem" }}>
            <div>
              <h5>Name: {ele.name}</h5>
            </div>
            <div>
              <h5>Score: {ele.score}</h5>
            </div>
            <div>
              <h5>Age: {ele.age}</h5>
            </div>
            <div>
              <h5>City: {ele.city}</h5>
            </div>
            <div style={{ gridColumn: "span 4" }}>
              <h5>{ele.gender}</h5>
            </div>
          </div>
        );
      })}
      <ul>
        {logs.map((log, index) => {
          return (
            <li key={index}>{log}</li>
          )
        })}
      </ul>
    </>
  )
}

export default App
