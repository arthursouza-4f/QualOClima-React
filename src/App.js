import React, { Fragment, useState, useEffect } from "react";
import { Card, Button, Image } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
  const [weather, setWeather] = useState(false);
  const [location, setLocation] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    });
  }, []);

  let getWeather = async (lat, long) => {
    let res = await axios.get(
      "http://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat: lat,
          lon: long,
          appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
          lang: "pt",
          units: "metric",
        },
      }
    );
    setWeather(res.data);
  };

  if (location === false) {
    return (
      <Fragment>
        Você precisa habilitar a localização no browser 😢😢o/
      </Fragment>
    );
  } else if (weather === false) {
    return <Fragment>Carregando o clima...</Fragment>;
  } else {
    return (
      <Fragment>
        <div className="App">
          <div className="container mx-auto">
            <Card
              style={{ width: "18rem" }}
              className="bg-secondary"
              border="dark"
              bg="Secondary"
            >
              <Card.Body>
                <Card.Text>
                  <ul className="textWeather">
                    <li>
                      <Image
                        className=""
                        src={`..//img/icons/${weather.weather[0].icon}.png`}
                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                        alt={weather.weather[0].description}
                        rounded
                      />{" "}
                    </li>
                    <li>Clima: {weather.weather[0].description}</li>
                    <br />
                    <li>Temperatura atual: {weather.main.temp}°</li>
                    <li>Temperatura máxima: {weather.main.temp_max}°</li>
                    <li>Temperatura minima: {weather.main.temp_min}°</li>

                    <li>Humidade: {weather.main.humidity}%</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default App;
