"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const savedCity = localStorage.getItem("savedCity") || "";
  const [city, setCity] = useState(savedCity.replace('"', ""));

  useEffect(() => {
    localStorage.setItem("savedCity", city);

    // Sistema api clima
  }, [city]);

  const [coordinates, setCoordinates] = useState<any>({});
  const [weather, setWeather] = useState<any>({});

  const API_KEY = "4e210f2d8d38eb0d142a7352ef4c5c80";
  const geocoding_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit={limit}&appid=${API_KEY}`;
  const openWeather_URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${API_KEY}`;

  const geocodeAddress = async (adress: string) => {
    try {
      const response = await axios.get(geocoding_URL, {
        params: {
          adress: adress,
          key: API_KEY,
        },
      });

      return response.data.results;
    } catch (error) {
      throw error;
    }
  };

  const fetchWeatherData = async (lat: any, lng: any) => {
    try {
      const response = await axios.get(openWeather_URL, {
        params: {
          lat: lat,
          lon: lng,
          units: "metric",
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const getAdress = async () => {
      try {
        const results = await geocodeAddress(city);
        if (results.length > 0) {
          const { lat, lng } = results[0].geometry.location;
          setCoordinates({ latitude: lat, longitude: lng });

          const data = await fetchWeatherData(lat, lng);
          setWeather(data);
        }
      } catch (error) {
        console.error("Erro ao geocodificar o endereço:", error);
      }
    };

    getAdress();
  });

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
                {weather.current.temp}º
              </h1>
              <h2 className="text-4xl font-extralight text-slate-600">
                mostly cloudy
              </h2>
            </div>

            <div className="flex flex-row justify-around rounded-2xl border-2 border-slate-500 px-4 py-2 text-lg font-light text-slate-700">
              <p>16º max</p>
              <p>32º min</p>
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
