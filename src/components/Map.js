import React, { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';

export default function Map({ initialPosition, onPositionChange }) {
  const [position, setPosition] = useState(initialPosition);

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    const newPosition = [lat, lng];
    setPosition(newPosition);
    onPositionChange(newPosition);
  };

  return (
    <div style={{ height: '400px', width: '100%' }} className="my-5">
      <MapContainer
        style={{ height: '100%', width: '100%' }}
        center={position}
        zoom={15}
        onClick={handleMapClick}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>Selected Position</Popup>
        </Marker>
        <DetectClick handleMapClick={handleMapClick} />
      </MapContainer>
    </div>
  );
}

function DetectClick({ handleMapClick }) {
  useMapEvents({
    click: (event) => handleMapClick(event),
  });
}
