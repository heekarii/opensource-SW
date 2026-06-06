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

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:7000';

export default function App() {
  const [query, setQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState('explore');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
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
    const token = localStorage.getItem('accessToken');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setActiveMenu('explore');
  };

  const handleLogin = async ({ email, password }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.message || '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      }

      const data = await res.json();
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('user', JSON.stringify({
        userId: data.userId,
        email: data.email,
        nickname: data.nickname
      }));
      setIsLoggedIn(true);
      setUser({
        userId: data.userId,
        email: data.email,
        nickname: data.nickname
      });
      setLoginOpen(false);
      setActiveMenu('home');
    } catch (err) {
      console.error('로그인 에러:', err);
      alert(err.message);
    }
  };

  const handleSignup = async ({ nickname, email, password }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname,
          email,
          password,
          profileImageUrl: ''
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.message || '회원가입에 실패했습니다.');
      }

      alert('회원가입이 완료되었습니다! 로그인해주세요.');
      setSignupOpen(false);
      setLoginOpen(true);
    } catch (err) {
      console.error('회원가입 에러:', err);
      alert(err.message);
    }
  };

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
        user={user}
        onRequireLogin={requireLogin}
        onOpenLogin={() => setLoginOpen(true)}
        onLogout={handleLogout}
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
        onLogin={handleLogin}
        onOpenSignup={() => {
          setLoginOpen(false);
          setSignupOpen(true);
        }}
      />

      <SignupModal
        open={signupOpen}
        onClose={() => setSignupOpen(false)}
        onSignup={handleSignup}
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
          user={user}
          onSelectPlace={(place) => {
            setSelectedPlace(place);
            setActiveMenu('explore');
          }}
          onOpenExplore={() => setActiveMenu('explore')}
          onOpenLogin={() => setLoginOpen(true)}
          onLogout={handleLogout}
        />
      )}
    </main>
  );
}