"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [city, setCity] = useState("");

  const [coordinates, setCoordinates] = useState<any>({ lat: 0, lon: 0 });
  const [weather, setWeather] = useState<any>({
    temp: 0,
    hum: 0,
    fells: 0,
    desc: "",
  });

  const API_KEY = "4e210f2d8d38eb0d142a7352ef4c5c80";
  const geocoding_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
  const openWeather_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}&units=metric`;

  useEffect(() => {
    async function getCoords() {
      try {
        const response = await axios.get(geocoding_URL);
        const { lat, lon } = response.data[0];
        setCoordinates({ lat, lon });
        console.table(coordinates);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    }

    async function getWeather() {
      try {
        const response = await axios.get(openWeather_URL);
        const { temp, humidity, feels_like } = response.data.main;
        const { description } = response.data.weather[0];

        setWeather({
          temp: temp,
          hum: humidity,
          fells: feels_like,
          desc: description,
        });

        console.table(weather);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    }

    getCoords();
    getWeather();
  }, [city]);

  return (
    <main className="flex h-screen flex-col justify-center">
      <div className="flex flex-row justify-around">
        <div className="flex flex-col justify-between py-8">
          <div className="text-left text-lg text-slate-800">
            <input
              className="bg-transparent text-2xl font-medium text-slate-800 focus:outline-none"
              type="text"
              placeholder="Digite a cidade aqui"
              name="city"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <h3 className="font-medium">21 de Agosto, Segunda-feira</h3>
          </div>

          <div className="flex flex-col gap-4">
            <div className="gap flex flex-row items-end">
              <h1 className="text-9xl font-extralight text-slate-800">
                {weather.temp}º
              </h1>
              <h2 className="text-4xl font-extralight text-slate-600">
                {weather.desc}
              </h2>
            </div>

            <div className="flex flex-row justify-around rounded-2xl border-2 border-slate-500 px-4 py-2 text-lg font-light text-slate-700">
              <p>Feels Like {weather.fells} cº</p>
              <p>{weather.hum}%</p>
            </div>
          </div>
        </div>

        <div>
          <Image
            className="h-fit w-64 rounded-2xl shadow-xl"
            src={"/Sun.png"}
            alt=""
            height={1334}
            width={750}
          />
        </div>
      </div>
    </main>
  );
}
