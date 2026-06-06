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

const mapCategoryToKey = (categoryName) => {
  switch (categoryName) {
    case '한식': return 'korean';
    case '중식': return 'chinese';
    case '일식': return 'japanese';
    case '양식': return 'western';
    case '카페': return 'cafe';
    default: return 'korean';
  }
};

const getTypeFromCategory = (categoryKey) => {
  return categoryKey === 'cafe' ? 'cafe' : 'restaurant';
};

export default function App() {
  const [query, setQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState('explore');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [places, setPlaces] = useState(PLACES);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginRequiredOpen, setLoginRequiredOpen] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedPlace, setSelectedPlace] = useState(PLACES[0]);
  const [showResultsPanel, setShowResultsPanel] = useState(false);

  const [reviewOpen, setReviewOpen] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [myReviews, setMyReviews] = useState([]);

  const fetchUserFavoritesAndReviews = async (userId) => {
    try {
      const token = localStorage.getItem('accessToken');
      
      const favRes = await fetch(`${API_BASE_URL}/users/${userId}/favorites`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (favRes.ok) {
        const favData = await favRes.json();
        setFavoriteIds(favData.map(f => f.restaurantId));
      }

      const revRes = await fetch(`${API_BASE_URL}/reviews/users/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (revRes.ok) {
        const revData = await revRes.json();
        const mappedMyReviews = revData.map((r) => ({
          id: r.id,
          placeId: r.restaurant?.id,
          placeName: r.restaurant?.name || '알 수 없는 식당',
          tasteRating: r.tasteScore || 0,
          serviceRating: r.serviceScore || 0,
          priceRating: r.priceScore || 0,
          averageRating: Math.round(((r.tasteScore || 0) + (r.priceScore || 0) + (r.serviceScore || 0)) / 3),
          text: r.content,
          createdAt: new Date(r.createdAt).toLocaleDateString(),
        }));
        setMyReviews(mappedMyReviews);
      }
    } catch (err) {
      console.error('사용자 데이터 연동 에러:', err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setIsLoggedIn(true);
      setUser(parsedUser);
      fetchUserFavoritesAndReviews(parsedUser.userId);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setFavoriteIds([]);
    setMyReviews([]);
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
      fetchUserFavoritesAndReviews(data.userId);
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
    fetch(`${API_BASE_URL}/restaurants`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('식당 목록을 불러오는 데 실패했습니다.');
        }
        return res.json();
      })
      .then((data) => {
        const mappedData = data.map((item) => {
          const categoryKey = mapCategoryToKey(item.category);
          return {
            id: item.id,
            name: item.name,
            type: getTypeFromCategory(categoryKey),
            category: categoryKey,
            rating: item.averageRating || 0.0,
            reviews: item.reviewCount || 0,
            distance: 0.5,
            position: [item.latitude, item.longitude],
            address: item.address,
            image: item.imageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
            description: item.description || '',
            tags: [],
            menu: [],
            reviewsList: []
          };
        });

        if (mappedData.length > 0) {
          setPlaces(mappedData);
          setSelectedPlace(mappedData[0]);
        }
      })
      .catch((err) => {
        console.error('식당 목록 로드 오류:', err);
      });
  }, []);

  useEffect(() => {
    if (!selectedPlace || !selectedPlace.id) return;

    fetch(`${API_BASE_URL}/reviews/${selectedPlace.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('식당 리뷰를 불러오는 데 실패했습니다.');
        }
        return res.json();
      })
      .then((data) => {
        const mappedReviews = data.map((r) => ({
          user: r.user?.nickname || '익명',
          date: new Date(r.createdAt || Date.now()).toLocaleDateString(),
          text: r.content,
          rating: Math.round(((r.tasteScore || 0) + (r.priceScore || 0) + (r.serviceScore || 0)) / 3)
        }));

        setSelectedPlace((prev) => {
          if (prev && prev.id === selectedPlace.id) {
            return {
              ...prev,
              reviewsList: mappedReviews
            };
          }
          return prev;
        });
      })
      .catch((err) => {
        console.error('리뷰 불러오기 에러:', err);
      });
  }, [selectedPlace?.id]);

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
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
  }, [query, categoryFilter, places]);

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

  const handleToggleFavorite = async () => {
    if (!isLoggedIn || !user) {
      requireLogin();
      return;
    }

    const isFavorite = favoriteIds.includes(selectedPlace.id);
    const token = localStorage.getItem('accessToken');

    try {
      if (!isFavorite) {
        const res = await fetch(`${API_BASE_URL}/favorites`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            userId: user.userId,
            restaurantId: selectedPlace.id
          })
        });
        if (!res.ok) throw new Error('즐겨찾기 추가에 실패했습니다.');
        setFavoriteIds((prev) => [...prev, selectedPlace.id]);
      } else {
        const res = await fetch(`${API_BASE_URL}/favorites?userId=${user.userId}&restaurantId=${selectedPlace.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error('즐겨찾기 해제에 실패했습니다.');
        setFavoriteIds((prev) => prev.filter((id) => id !== selectedPlace.id));
      }
    } catch (err) {
      console.error('즐겨찾기 토글 에러:', err);
      alert(err.message);
    }
  };

  const handleSubmitReview = async (review) => {
    if (!isLoggedIn || !user) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API_BASE_URL}/reviews/${review.placeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: user.userId,
          tasteScore: review.tasteRating,
          priceScore: review.priceRating,
          serviceScore: review.serviceRating,
          content: review.text,
          imageUrl: ''
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || '리뷰 등록에 실패했습니다.');
      }

      const data = await res.json();
      
      const newReview = {
        id: data.reviewId || Date.now(),
        placeId: review.placeId,
        placeName: review.placeName,
        tasteRating: review.tasteRating,
        serviceRating: review.serviceRating,
        priceRating: review.priceRating,
        averageRating: review.averageRating,
        text: review.text,
        createdAt: new Date().toLocaleDateString(),
      };

      setMyReviews((prev) => [newReview, ...prev]);
      alert('리뷰가 성공적으로 등록되었습니다!');
    } catch (err) {
      console.error('리뷰 등록 에러:', err);
      alert(err.message);
    }
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

      {selectedPlace && (
        <DetailPanel
          place={selectedPlace}
          isFavorite={favoriteIds.includes(selectedPlace.id)}
          onToggleFavorite={handleToggleFavorite}
          onReview={handleOpenReview}
        />
      )}

      {selectedPlace && (
        <ReviewModal
          place={selectedPlace}
          open={reviewOpen}
          onClose={() => setReviewOpen(false)}
          onSubmit={handleSubmitReview}
        />
      )}

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
          places={places}
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