// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import WeatherApp from './component/weatherapp';


function App() {
  return (
    <div className="App">
      {/* <BrowserRouter>
      <Routes>
        <Route path='/' element={<WeatherApp />}></Route>
      </Routes>
      </BrowserRouter>  */}

       <WeatherApp />
      
      
    </div>
  );
}

export default App;
