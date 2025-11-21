"use client";

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { faker } from '@faker-js/faker';

import 'leaflet/dist/leaflet.css';

interface Truck {
  id: number;
  lat: number;
  lng: number;
}

const createTruckIcon = () => {
  return L.divIcon({
    html: `<div style="background-color: #f7b733; width: 10px; height: 10px; border-radius: 50%; border: 2px solid #333;"></div>`,
    className: 'truck-icon',
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
};

const FleetTrackerMap = () => {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const initialTrucks: Truck[] = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      lat: faker.number.float({ min: -34, max: -22 }),
      lng: faker.number.float({ min: 18, max: 32 }),
    }));
    setTrucks(initialTrucks);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrucks(currentTrucks =>
        currentTrucks.map(truck => ({
          ...truck,
          lat: truck.lat + faker.number.float({ min: -0.01, max: 0.01 }),
          lng: truck.lng + faker.number.float({ min: -0.01, max: 0.01 }),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="c-tracker__map-container">
      {isClient && (
        <MapContainer
          // CRITICAL FIX: The key forces React to create a new instance when isClient becomes true,
          // guaranteeing a clean DOM element for Leaflet and terminating the error.
          key="client-map-instance" 
          center={[-29.0, 24.0]}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {trucks.map(truck => (
            <Marker
              key={truck.id}
              position={[truck.lat, truck.lng]}
              icon={createTruckIcon()}
            />
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default FleetTrackerMap;