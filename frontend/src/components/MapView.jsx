import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { CATEGORY_STYLE } from '../constants/categories';
import { createPlaceIcon } from '../utils/createPlaceIcon';

function FlyToPlace({ place }) {
  const map = useMap();

  useEffect(() => {
    if (!place || !place.position) return;

    map.flyTo(place.position, 15, {
      duration: 0.9,
    });
  }, [place, map]);

  return null;
}

export default function MapView({ places, selectedPlace, setSelectedPlace }) {
  if (!selectedPlace || !selectedPlace.position) {
    return (
      <div className="absolute inset-0 grid place-items-center bg-zinc-100 text-zinc-500">
        장소 데이터를 불러오지 못했습니다.
      </div>
    );
  }

  return (
    <MapContainer
      center={selectedPlace.position}
      zoom={14}
      zoomControl={false}
      className="absolute inset-0 z-0 h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FlyToPlace place={selectedPlace} />

      {places.map((place) => (
        <Marker
          key={place.id}
          position={place.position}
          icon={createPlaceIcon(place, selectedPlace?.id === place.id)}
          eventHandlers={{
            click: () => setSelectedPlace(place),
          }}
        >
          <Popup>
            <div className="w-48">
              <p className="font-bold">{place.name}</p>
              <p className="text-xs text-zinc-500">
                {CATEGORY_STYLE[place.category]?.label} · ⭐ {place.rating}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
