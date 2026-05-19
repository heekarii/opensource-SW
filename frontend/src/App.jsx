import { useEffect, useState, useMemo } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import {
  Search,
  Home,
  Heart,
  User,
  Star,
  SlidersHorizontal,
  Utensils,
  Coffee,
  MessageSquareText,
  Navigation,
  Send,
  X,
  Camera,
  ChevronLeft,
  MapPin,
  Bookmark,
  Share2,
} from 'lucide-react';

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
    name: '테스트셑스ㅡㅌ트텟',
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
function RatingStars({ value = 5, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={size}
          className={index < Math.round(value) ? "fill-orange-500 text-orange-500" : "text-zinc-300"}
        />
      ))}
    </div>
  );
}
function CategoryPill({ category, active, onClick }) {
  const style = CATEGORY_STYLE[category];
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        active ? 'shadow-md' : 'hover:bg-zinc-100'
      }`}
      style={{
        background: active ? style.color : 'white',
        color: active ? 'white' : style.text,
        border: `1px solid ${active ? style.color : '#e7e5e4'}`,
      }}
    >
      {style.label}
    </button>
  );
}

function SearchPanel({
  places,
  selectedPlace,
  setSelectedPlace,
  categoryFilter,
  setCategoryFilter,
  onClose,
}) {
  return (
    <section className="absolute bottom-0 left-0 top-[72px] z-[430] w-full overflow-y-auto bg-white/95 px-7 py-6 shadow-2xl backdrop-blur-xl md:w-[430px] lg:left-[230px]">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-zinc-900">Search results</h2>
          <p className="mt-1 text-sm text-zinc-500">{places.length} places found nearby</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-500">
            Live
          </span>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-zinc-100 text-zinc-500 transition hover:bg-orange-50 hover:text-orange-600"
            aria-label="Close search results"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
            categoryFilter === 'all'
              ? 'border-orange-500 bg-orange-500 text-white'
              : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100'
          }`}
        >
          전체
        </button>
        {Object.keys(CATEGORY_STYLE).map((category) => (
          <CategoryPill
            key={category}
            category={category}
            active={categoryFilter === category}
            onClick={() => setCategoryFilter(category)}
          />
        ))}
      </div>

      <div className="space-y-4">
        {places.map((place) => {
          const active = selectedPlace?.id === place.id;
          const style = CATEGORY_STYLE[place.category];
          return (
            <button
              key={place.id}
              onClick={() => setSelectedPlace(place)}
              className={`w-full overflow-hidden rounded-3xl bg-white text-left shadow-lg ring-1 transition hover:-translate-y-1 hover:shadow-xl ${
                active ? 'ring-orange-500' : 'ring-zinc-100'
              }`}
            >
              <div className="relative h-36">
                <img src={place.image} alt={place.name} className="h-full w-full object-cover" />
                <div
                  className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold"
                  style={{ background: style.light, color: style.text }}
                >
                  {style.label}
                </div>
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-sm font-bold text-zinc-700">
                  <Star size={14} className="fill-orange-500 text-orange-500" />
                  {place.rating}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-black text-zinc-900">{place.name}</h3>
                    <p className="mt-1 text-sm leading-6 text-zinc-500">{place.description}</p>
                  </div>
                  <span className="text-xs font-bold text-zinc-400">{place.distance} mi</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {place.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-semibold text-zinc-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function ReviewModal({ place, open, onClose }) {
  const [rating, setRating] = useState(4);
  if (!open) return null;

  const style = CATEGORY_STYLE[place.category];

  return (
    <div className="absolute inset-0 z-[600] grid place-items-center bg-zinc-900/20 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[2rem] bg-white/95 p-7 shadow-2xl ring-1 ring-white/60 backdrop-blur-xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={place.image} alt={place.name} className="h-14 w-14 rounded-2xl object-cover" />
            <div>
              <h2 className="text-xl font-black text-zinc-900">{place.name}</h2>
              <div className="mt-1 flex items-center gap-2 text-xs font-bold text-zinc-500">
                <span className="rounded-full px-2 py-1" style={{ background: style.light, color: style.text }}>
                  {style.label}
                </span>
                <span>•</span>
                <span>{place.address}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full text-zinc-500 transition hover:bg-zinc-100">
            <X size={20} />
          </button>
        </div>

        <div className="mb-8">
          <p className="mb-4 text-sm font-black uppercase tracking-widest text-zinc-500">How was your experience?</p>
          <div className="flex gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <button key={index} onClick={() => setRating(index + 1)} className="transition hover:scale-110">
                <Star size={32} className={index < rating ? "fill-orange-500 text-orange-500" : "text-zinc-300"} />
              </button>
            ))}
          </div>
        </div>

        <label className="mb-8 block">
          <span className="mb-3 block text-sm font-black uppercase tracking-widest text-zinc-500">Share your thoughts</span>
          <textarea
            rows={5}
            placeholder="분위기, 서비스, 대표 메뉴 등 좋았던 점을 적어주세요."
            className="w-full resize-none rounded-2xl border border-orange-200 bg-zinc-50 p-4 text-sm font-medium outline-none transition placeholder:text-zinc-400 focus:border-orange-500 focus:bg-white"
          />
        </label>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-widest text-zinc-500">Add Photos</p>
            <div className="flex items-center gap-3">
              <button className="grid h-20 w-24 place-items-center rounded-2xl border border-dashed border-orange-300 bg-orange-50 text-orange-600">
                <div className="text-center">
                  <Camera className="mx-auto mb-1" size={20} />
                  <p className="text-xs font-black">UPLOAD</p>
                </div>
              </button>
              <img src={place.image} alt="preview" className="h-20 w-24 rounded-2xl object-cover" />
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-widest text-zinc-500">Category Tag</p>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-orange-500 px-4 py-2 text-sm font-black text-white">{style.label}</span>
              <span className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-bold text-zinc-400">Automatic</span>
            </div>
            <p className="mt-3 text-xs italic leading-5 text-zinc-500">태그는 식당 타입과 카테고리에 따라 자동으로 적용됩니다.</p>
          </div>
        </div>

        <div className="mt-9 flex items-center justify-end gap-3">
          <button onClick={onClose} className="rounded-2xl px-6 py-3 text-sm font-black text-zinc-500 transition hover:bg-zinc-100">
            Cancel
          </button>
          <button onClick={onClose} className="flex items-center gap-2 rounded-2xl bg-orange-500 px-7 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/25 transition hover:bg-orange-600">
            Submit Review
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailPanel({ place, onReview }) {
  const style = CATEGORY_STYLE[place.category];

  return (
    <aside className="absolute bottom-0 right-0 top-0 z-[440] hidden w-[380px] overflow-y-auto bg-white shadow-2xl lg:block">
      <div className="relative h-56">
        <img src={place.image} alt={place.name} className="h-full w-full object-cover" />
        <button className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-zinc-600 shadow-lg backdrop-blur">
          <ChevronLeft size={22} />
        </button>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />
      </div>

      <div className="px-6 py-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-zinc-900">{place.name}</h1>
            <div className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
              <MapPin size={15} />
              {place.address}
            </div>
          </div>
          <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: style.light, color: style.text }}>
            {style.label}
          </span>
        </div>

        <div className="mb-5 flex items-center gap-2">
          <RatingStars value={place.rating} size={15} />
          <span className="text-sm font-bold text-zinc-900">{place.rating}</span>
          <span className="text-sm font-semibold text-zinc-500">({place.reviews} reviews)</span>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-2">
          <button onClick={onReview} className="col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-4 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/25 transition hover:bg-orange-600">
            <MessageSquareText size={17} />
            Write Review
          </button>
          <div className="flex gap-2">
            <button className="grid flex-1 place-items-center rounded-2xl border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-50">
              <Bookmark size={18} />
            </button>
            <button className="grid flex-1 place-items-center rounded-2xl border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-50">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        <section className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-black text-zinc-900">Menu Highlights</h2>
            <button className="text-sm font-black text-orange-600">Full Menu</button>
          </div>
          <div className="space-y-3">
            {place.menu.map((item) => (
              <div key={item.name} className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-white shadow-sm">
                  {place.type === "cafe" ? <Coffee size={21} className="text-orange-600" /> : <Utensils size={21} className="text-orange-600" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-zinc-900">{item.name}</p>
                  <p className="truncate text-xs font-medium text-zinc-500">{item.desc}</p>
                </div>
                <span className="text-sm font-black text-orange-800">{item.price}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-black text-zinc-900">Recent Reviews</h2>
          <div className="space-y-5">
            {place.reviewsList.map((review) => (
              <article key={`${review.user}-${review.date}`} className="border-b border-zinc-100 pb-4 last:border-none">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-orange-100 text-xs font-black text-orange-700">
                      {review.user.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-black text-zinc-900">{review.user}</p>
                      <p className="text-xs font-semibold text-zinc-400">{review.date}</p>
                    </div>
                  </div>
                  <RatingStars value={review.rating} size={12} />
                </div>
                <p className="text-sm italic leading-6 text-zinc-600">“{review.text}”</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}

const DEFAULT_CENTER = [37.5234, 127.0469];

function App() {
  const [query, setQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(PLACES[0] ?? null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [activeMenu, setActiveMenu] = useState('home');
  const mapCenter = selectedPlace?.position ?? DEFAULT_CENTER;
  const [showResultsPanel, setShowResultsPanel] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  const filteredPlaces = useMemo(() => {
    return PLACES.filter((place) => {
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        place.name.toLowerCase().includes(q) ||
        place.description.toLowerCase().includes(q) ||
        CATEGORY_STYLE[place.category].label.toLowerCase().includes(q) ||
        place.tags.join(' ').toLowerCase().includes(q);
      const matchCategory = categoryFilter === 'all' || place.category === categoryFilter;
      return matchQuery && matchCategory;
    });
  }, [query, categoryFilter]);

  useEffect(() => {
    if (
      filteredPlaces.length > 0 &&
      !filteredPlaces.some((place) => place.id === selectedPlace?.id)
    ) {
      setSelectedPlace(filteredPlaces[0]);
    }
  }, [filteredPlaces, selectedPlace]);

  return (
    <main className="map-page">
      <TopSearch
        query={query}
        setQuery={setQuery}
        onOpenResults={() => setShowResultsPanel(true)}
      />

      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <MapContainer center={mapCenter} zoom={14} zoomControl={false} className="map-container">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FlyToPlace place={selectedPlace} />

        {filteredPlaces.map((place) => (
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

      <DetailPanel place={selectedPlace} onReview={() => setReviewOpen(true)} />
      <ReviewModal place={selectedPlace} open={reviewOpen} onClose={() => setReviewOpen(false)} />

    </main>
  );
}

export default App;
