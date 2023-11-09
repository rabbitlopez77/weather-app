import { useState, useEffect } from 'react'
import './App.css'
import Temperatures from './components/tempuatures';
import SunLocation from './components/SunLocation';
import RainInfo from './components/RainInfo';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB80r7ikMrmDBB-wjvPXksY6uD0Nifl7Ls",
  authDomain: "weather-server-4e391.firebaseapp.com",
  projectId: "weather-server-4e391",
  storageBucket: "weather-server-4e391.appspot.com",
  messagingSenderId: "871341248364",
  appId: "1:871341248364:web:dd43d0bc04e3fd245f2d49",
  measurementId: "G-D8HQVXNFP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const dataBase = getFirestore(app)

const cityImageUrlRef = collection(dataBase, 'City')

export async function getCityImageUrl() {
  const snapshot = await getDocs(cityImageUrlRef)
  const city = snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  return city[1].imageUrl
}

function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [cityAdress, setCityAdress] = useState(null)
  const [data, setData] = useState(null);
  const[temperatureUnit, setTemperatureUnit] = useState('Celsius')
  const lattitude = 34.052235
  const longitude = -118.243683
  const apiKey = 'f97680c93227ed7473f6c1c226d2d0c1'
  
 
  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longitude}&appid=${apiKey}`)
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    async function loadApp() {
        setLoading(true)
        try {
            const data = await getCityImageUrl()
            setCityAdress(data)
            document.body.style.backgroundImage= `url(${data})`;
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }
    loadApp()
}, [])

if (loading) {
    return <h1>Loading...</h1>
}
if (error) {
    return <h1>There was an error: {error.message}</h1>
}

  function switchTemperatureUnits() {
    temperatureUnit === 'Celsius' ? setTemperatureUnit('Fahrenheit') : setTemperatureUnit('Celsius')
  }

  return (
    <div>
      <h1>The Weather App</h1>
      <div>
        {data ? <h2>{data.name}</h2> : '...Loading'}
      </div>
      <div className='temperatures' >
        <h3>Current Temperature:</h3>
        {data ? <Temperatures data = {data} temperatureUnit={temperatureUnit}/> : 'Loading...'}
        <button onClick={() => switchTemperatureUnits()} className={`temperature-button ${temperatureUnit}`} >{temperatureUnit}</button>
      </div>
      <div className='more-info-table'>
        <div className='more-info-table-item'>
          <h2>Sunrise/ Sunset</h2>
          {data ? <SunLocation sunrise={data.sys.sunrise} sunset={data.sys.sunset}/> : 'Loading...'}
        </div>
        <div className='more-info-table-item'>
          <h2>Rain Info</h2>
          {data ? <RainInfo rainDescription={data.weather[0].main}/> : 'Loading...'}
        </div>
        <div className='more-info-table-item'>
          <h2>this is a placeholder 2</h2>
        </div>
      </div>
      
    </div>
  );
}

export default App
