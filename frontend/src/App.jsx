import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import { Search, Home, Heart, User, MessageSquareText, SlidersHorizontal } from 'lucide-react';

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

function Sidebar({ activeMenu, setActiveMenu }) {
  const menus = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Search },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'reviews', label: 'My Reviews', icon: MessageSquareText },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="fixed left-0 top-0 z-[700] hidden h-screen w-[230px] shrink-0 flex-col border-r border-zinc-200/80 bg-white/90 px-4 py-5 shadow-xl backdrop-blur-xl lg:flex">
      <div className="mb-8 px-2 text-2xl font-black tracking-tight text-orange-600">Fork & Cup</div>

      <nav className="space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;
          const active = activeMenu === menu.id;

          return (
            <button
              key={menu.id}
              onClick={() => setActiveMenu(menu.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                active
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'text-zinc-500 hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              <Icon size={18} />
              {menu.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl bg-zinc-100 p-3">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-orange-100 text-sm font-black text-orange-700">
            AE
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-zinc-800">Alex Explorer</p>
            <p className="text-xs text-zinc-500">Gold Member</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
function TopSearch({ query, setQuery, onOpenResults }) {
  return (
    <div className="absolute left-4 right-4 top-4 z-[450] flex items-center gap-3 lg:left-[260px] lg:right-[420px]">
      <div className="flex h-12 flex-1 items-center gap-3 rounded-full bg-white/95 px-5 shadow-xl backdrop-blur">
        <Search size={19} className="text-zinc-400" />
        <input
          value={query}
          onFocus={onOpenResults}
          onChange={(event) => {
            setQuery(event.target.value);
            onOpenResults();
          }}
          placeholder="Search places..."
          className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-zinc-400"
        />
      </div>
      <button
        onClick={onOpenResults}
        className="grid h-12 w-12 place-items-center rounded-full bg-white/95 text-orange-600 shadow-xl backdrop-blur transition hover:scale-105"
        aria-label="Open search results"
      >
        <SlidersHorizontal size={19} />
      </button>
    </div>
  );
}

const DEFAULT_CENTER = [37.5234, 127.0469];

function App() {
  const [query, setQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(PLACES[0] ?? null);
  const [activeMenu, setActiveMenu] = useState('home');
  const mapCenter = selectedPlace?.position ?? DEFAULT_CENTER;
  const [showResultsPanel, setShowResultsPanel] = useState(false);

  return (
    <main className="map-page">
      <TopSearch query={query} setQuery={setQuery} onOpenResults={() => setShowResultsPanel(true)}/>
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <MapContainer center={mapCenter} zoom={14} zoomControl={false} className="map-container">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FlyToPlace place={selectedPlace} />
        {showResultsPanel && (
        <SearchPanel
          places={filteredPlaces}
          selectedPlace={selectedPlace}
          setSelectedPlace={setSelectedPlace}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          onClose={() => setShowResultsPanel(false)}
        />
      )}
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
