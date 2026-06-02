import { useMemo, useState } from 'react';
import 'leaflet/dist/leaflet.css';

import { PLACES } from './data/places';
import { CATEGORY_STYLE } from './constants/categories';

import Sidebar from './components/Sidebar';
import TopSearch from './components/TopSearch';
import MapView from './components/MapView';
import SearchPanel from './components/SearchPanel';
import DetailPanel from './components/DetailPanel';
import ReviewModal from './components/ReviewModal';
import LoginModal from './components/LoginModal';
import LoginRequiredPopup from './components/LoginRequiredPopup';

export default function App() {
  const [query, setQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState('explore');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginRequiredOpen, setLoginRequiredOpen] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedPlace, setSelectedPlace] = useState(PLACES[0]);
  const [showResultsPanel, setShowResultsPanel] = useState(false);

  const [reviewOpen, setReviewOpen] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [myReviews, setMyReviews] = useState([]);

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

  const requireLogin = () => {
    setLoginRequiredOpen(true);
  };

  const handleOpenReview = () => {
    if (!isLoggedIn) {
      requireLogin();
      return;
    }

    setReviewOpen(true);
  };

  const handleToggleFavorite = () => {
    if (!isLoggedIn) {
      requireLogin();
      return;
    }

    setFavoriteIds((prev) =>
      prev.includes(selectedPlace.id)
        ? prev.filter((id) => id !== selectedPlace.id)
        : [...prev, selectedPlace.id]
    );
  };

  const handleSubmitReview = (review) => {
    const newReview = {
      id: Date.now(),
      ...review,
      createdAt: new Date().toLocaleDateString(),
    };

    setMyReviews((prev) => [newReview, ...prev]);
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-zinc-100 font-sans text-zinc-900">
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        isLoggedIn={isLoggedIn}
        onRequireLogin={requireLogin}
        onOpenLogin={() => setLoginOpen(true)}
        onLogout={() => {
          setIsLoggedIn(false);
          setActiveMenu('explore');
        }}
      />

      <TopSearch
        query={query}
        setQuery={setQuery}
        onOpenResults={() => setShowResultsPanel(true)}
      />

      <MapView
        places={filteredPlaces}
        selectedPlace={selectedPlace}
        setSelectedPlace={setSelectedPlace}
      />

      <div className="pointer-events-none absolute inset-0 z-[300] bg-gradient-to-r from-white/55 via-transparent to-white/35" />

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

      <DetailPanel
        place={selectedPlace}
        isFavorite={favoriteIds.includes(selectedPlace.id)}
        onToggleFavorite={handleToggleFavorite}
        onReview={handleOpenReview}
      />

      <ReviewModal
        place={selectedPlace}
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        onSubmit={handleSubmitReview}
      />

      <LoginRequiredPopup
        open={loginRequiredOpen}
        onClose={() => setLoginRequiredOpen(false)}
        onOpenLogin={() => setLoginOpen(true)}
      />

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={() => {
          setIsLoggedIn(true);
          setLoginOpen(false);
          setActiveMenu('home');
        }}
      />

      {activeMenu !== 'explore' && (
        <div className="absolute left-[260px] top-20 z-[460] hidden w-[420px] rounded-[2rem] bg-white/95 p-6 shadow-2xl backdrop-blur-xl lg:block">
          <h2 className="text-2xl font-black text-zinc-900">
            {activeMenu === 'home' && 'Home'}
            {activeMenu === 'favorites' && 'Favorites'}
            {activeMenu === 'reviews' && 'My Reviews'}
            {activeMenu === 'profile' && 'Profile'}
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            {activeMenu === 'home' && '지도에서 주변 식당과 카페를 탐색하고 리뷰를 확인해보세요.'}

            {activeMenu === 'favorites' && `현재 즐겨찾기한 장소는 ${favoriteIds.length}개입니다.`}

            {activeMenu === 'reviews' && `현재 작성한 리뷰는 ${myReviews.length}개입니다.`}

            {activeMenu === 'profile' && '사용자 프로필 정보가 표시되는 영역입니다.'}
          </p>

          {activeMenu === 'reviews' && myReviews.length > 0 && (
            <div className="mt-5 space-y-3">
              {myReviews.map((review) => (
                <div key={review.id} className="rounded-2xl bg-zinc-50 p-4">
                  <p className="text-sm font-black text-zinc-900">{review.placeName}</p>
                  <p className="mt-1 text-xs text-orange-600">Rating: {review.rating} / 5</p>
                  <p className="mt-2 text-sm text-zinc-600">{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
