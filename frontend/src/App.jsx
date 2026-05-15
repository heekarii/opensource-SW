import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

const CATEGORY_STYLE = {
  korean: {
    label: '한식',
    color: '#f97316',
    light: '#ffedd5',
    text: '#9a3412',
  },
  chinese: {
    label: '중식',
    color: '#ef4444',
    light: '#fee2e2',
    text: '#991b1b',
  },
  japanese: {
    label: '일식',
    color: '#22c55e',
    light: '#dcfce7',
    text: '#166534',
  },
  cafe: {
    label: '카페',
    color: '#a16207',
    light: '#fef3c7',
    text: '#854d0e',
  },
  western: {
    label: '양식',
    color: '#3b82f6',
    light: '#dbeafe',
    text: '#1d4ed8',
  },
};

const PLACES = [
  {
    id: 1,
    name: '청담 한식당',
    type: 'restaurant',
    category: 'korean',
    rating: 4.8,
    reviews: 124,
    distance: 0.4,
    position: [37.5234, 127.0469],
    address: 'Gangnam, Seoul',
    image:
      'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80',
    description: '정갈한 반찬과 숯불 향이 살아있는 한식 다이닝입니다.',
    tags: ['가족 모임', '조용한 분위기'],
    menu: [],
    reviewsList: [],
  },
];

function createPlaceIcon(place, selected) {
  const category = CATEGORY_STYLE[place.category];
  const icon = place.type === 'cafe' ? '☕' : '🍴';

  return L.divIcon({
    className: 'forkcup-marker',
    html: `
      <div style="
        position: relative;
        width: ${selected ? 54 : 46}px;
        height: ${selected ? 54 : 46}px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        background: ${category.color};
        box-shadow: 0 14px 30px rgba(15, 23, 42, 0.24);
        border: 3px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <span style="
          transform: rotate(45deg);
          color: white;
          font-size: ${selected ? 22 : 18}px;
          line-height: 1;
        ">${icon}</span>
      </div>
    `,
    iconSize: [selected ? 54 : 46, selected ? 54 : 46],
    iconAnchor: [23, 46],
    popupAnchor: [0, -42],
  });
}

function FlyToPlace({ place }) {
  const map = useMap();

  useEffect(() => {
    if (place) {
      map.flyTo(place.position, 15, { duration: 0.9 });
    }
  }, [place, map]);

  return null;
}

const DEFAULT_CENTER = [37.5234, 127.0469];

function App() {
  const [selectedPlace, setSelectedPlace] = useState(PLACES[0] ?? null);
  const mapCenter = selectedPlace?.position ?? DEFAULT_CENTER;

  return (
    <main className="map-page">
      <MapContainer center={mapCenter} zoom={14} zoomControl={false} className="map-container">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FlyToPlace place={selectedPlace} />

        {PLACES.map((place) => (
          <Marker
            key={place.id}
            position={place.position}
            icon={createPlaceIcon(place, selectedPlace?.id === place.id)}
            eventHandlers={{
              click: () => setSelectedPlace(place),
            }}
          >
            <Popup>
              <div>
                <p style={{ fontWeight: 700 }}>{place.name}</p>
                <p style={{ fontSize: '12px', color: '#71717a' }}>
                  {CATEGORY_STYLE[place.category].label} · ⭐ {place.rating}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </main>
  );
}

export default App;
