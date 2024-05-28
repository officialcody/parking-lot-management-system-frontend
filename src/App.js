// App.js
import React, { useEffect, useState } from "react";
import "./App.css";
import carParkingImage from "./assets/carParking.jpeg";
import ParkingLotForm from "./components/ParkingLotForm";
import ShowParkingLots from "./components/ShowParkingLots";
import axios from "axios";
import { apiURL } from "./app.constants";

function App() {
  const [parkingLots, setParkingLots] = useState([]);

  const fetchParkingSpaces = async () => {
    const data = await axios.get(apiURL + "getParkingLots");
    setParkingLots(data.data.parkingLots);
  };

  useEffect(() => {
    fetchParkingSpaces();
  }, []);

  return (
    <section className="text-gray-800 body-font">
      <div className="text-center p-10">
        <div className="text-4xl">Parking Lot Management System</div>
      </div>
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
          <img
            alt="feature"
            className="object-cover object-center h-full w-full"
            src={carParkingImage}
          />
        </div>
        <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
          <ParkingLotForm fetchParkingSpaces={fetchParkingSpaces} />
          <ShowParkingLots parkingLots={parkingLots} />
        </div>
      </div>
    </section>
  );
}

export default App;
