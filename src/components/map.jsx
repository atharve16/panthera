import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const MapView = ({ properties }) => {
  const validProperties = properties
    .filter((home) => home.Latitude && home.Longitude)
    .map((home) => ({
      ...home,
      coordinates: {
        lat: parseFloat(home.Latitude),
        lng: parseFloat(home.Longitude),
      },
    }));

  const center = validProperties.length
    ? [validProperties[0].coordinates.lat, validProperties[0].coordinates.lng]
    : [33.749, -84.388];

  return (
    <MapContainer
      center={center}
      zoom={10}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", borderRadius: "1rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {validProperties.map((home, index) => (
        <Marker
          key={index}
          position={[home.coordinates.lat, home.coordinates.lng]}
        >
          <Popup>
            <div className="text-sm">
              <strong>{home.MPC || "Plan"}</strong>
              <br />
              {home.City}, {home.State}
              <br />
              <span className="text-blue-600 font-semibold">
                ${home["Homesite Price"] || "N/A"}
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
