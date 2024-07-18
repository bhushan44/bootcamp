import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Popup, Marker, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
import './style.css';

const FitBounds = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = locations.map(location => [location.coordinates[1], location.coordinates[0]]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, locations]);

  return null;
};

const Map = ({ locations, startLocation }) => {
  return (
    <div className="map-container">
      <MapContainer
        center={[startLocation[1], startLocation[0]]}
        zoom={6}
        scrollWheelZoom={false}
        style={{ height: '600px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map(loc => (
          <Marker key={loc._id} position={[loc.coordinates[1], loc.coordinates[0]]}>
            <Popup>{loc.description}</Popup>
          </Marker>
        ))}
        <FitBounds locations={locations} />
      </MapContainer>
    </div>
  );
};

export default Map;
