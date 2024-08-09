import React, { useEffect, useState } from 'react';
import '../Components/TempApp.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStreetView, fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas);

const TempApp = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Karachi");

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=0c69f81a9552ab8238c15f20bbc90e05`;
      const response = await fetch(url);
      const resJson = await response.json();
      setCity(resJson.main);
    };

    fetchApi();
  }, [search]);

  return (
    <>
      <div className='Box'>
        <div className="inputData">
          <input
            type="search"
            className='inputField'
            value={search}
            placeholder='Enter City Name'
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
        {!city ? (
          <p>Enter Valid City Name</p>
        ) : (
          <div>
            <div className="info">
              <h2>
                <FontAwesomeIcon icon={faStreetView} className='icon' />
                {search}
              </h2>
              <h1 className='temp'>{city.temp}° Cel</h1>
              <h3 className='tempmin-max'>Min : {city.temp_min}° Cel | Max : {city.temp_max}° Cel</h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TempApp;