import { useEffect, useMemo, useState } from 'react';
import 'leaflet/dist/leaflet.css';

import { PLACES } from './data/places';
import { CATEGORY_STYLE } from './constants/categories';

import SignupModal from "./components/SignupModal";
import Sidebar from './components/Sidebar';
import TopSearch from './components/TopSearch';
import MapView from './components/MapView';
import SearchPanel from './components/SearchPanel';
import DetailPanel from './components/DetailPanel';
import ReviewModal from './components/ReviewModal';
import LoginModal from './components/LoginModal';
import LoginRequiredPopup from './components/LoginRequiredPopup';
import UserPanel from './components/UserPanel';

export default function App() {
  const [query, setQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState('explore');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginRequiredOpen, setLoginRequiredOpen] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedPlace, setSelectedPlace] = useState(PLACES[0]);
  const [showResultsPanel, setShowResultsPanel] = useState(false);

  const [reviewOpen, setReviewOpen] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    console.log('여기 실행됨');

    fetch('https://opensource-sw.onrender.com/restaurants')
      .then((res) => {
        console.log('응답 도착:', res);
        return res.json();
      })
      .then((data) => {
        console.log('식당 목록:', data);
      })
      .catch((err) => {
        console.error('서버 통신 오류:', err);
      });
  }, []);

  const filteredPlaces = useMemo(() => {
    return PLACES.filter((place) => {
      const q = query.trim().toLowerCase();

      const matchQuery =
        !q ||
        place.name.toLowerCase().includes(q) ||
        place.description.toLowerCase().includes(q) ||
        CATEGORY_STYLE[place.category].label.toLowerCase().includes(q) ||
        place.tags.join(' ').toLowerCase().includes(q);

      const matchCategory =
        categoryFilter === 'all' || place.category === categoryFilter;

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

  console.log('App 렌더링');

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
        setActiveMenu("home");
      }}
        onOpenSignup={() => {
        setLoginOpen(false);
        setSignupOpen(true);
      }}
      />

      <SignupModal
  open={signupOpen}
  onClose={() => setSignupOpen(false)}
  onSignup={() => {
    setIsLoggedIn(true);
    setSignupOpen(false);
    setActiveMenu("home");
  }}
  onOpenLogin={() => {
    setSignupOpen(false);
    setLoginOpen(true);
  }}
/>

      {activeMenu !== 'explore' && (
        <UserPanel
          activeMenu={activeMenu}
          places={PLACES}
          favoriteIds={favoriteIds}
          myReviews={myReviews}
          isLoggedIn={isLoggedIn}
          onSelectPlace={(place) => {
            setSelectedPlace(place);
            setActiveMenu('explore');
          }}
          onOpenExplore={() => setActiveMenu('explore')}
          onOpenLogin={() => setLoginOpen(true)}
          onLogout={() => {
            setIsLoggedIn(false);
            setActiveMenu('explore');
          }}
        />
      )}
    </main>
  );
}