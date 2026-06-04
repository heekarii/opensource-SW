import {
  Heart,
  MessageSquareText,
  User,
  MapPin,
  Search,
  LogOut,
  Coffee,
  Utensils,
} from "lucide-react";

import { CATEGORY_STYLE } from "../constants/categories";
import RatingStars from "./RatingStars";

export default function UserPanel({
  activeMenu,
  places,
  favoriteIds,
  myReviews,
  isLoggedIn,
  onSelectPlace,
  onOpenExplore,
  onOpenLogin,
  onLogout,
}) {
  const favoritePlaces = places.filter((place) => favoriteIds.includes(place.id));
  const popularPlaces = [...places].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <section className="absolute left-[260px] top-20 z-[460] hidden max-h-[calc(100vh-110px)] w-[440px] overflow-y-auto rounded-[2rem] bg-white/95 p-6 shadow-2xl backdrop-blur-xl lg:block">
      {activeMenu === "home" && (
        <HomePanel
          places={popularPlaces}
          isLoggedIn={isLoggedIn}
          onSelectPlace={onSelectPlace}
          onOpenExplore={onOpenExplore}
          onOpenLogin={onOpenLogin}
        />
      )}

      {activeMenu === "favorites" && (
        <FavoritesPanel
          favoritePlaces={favoritePlaces}
          onSelectPlace={onSelectPlace}
          onOpenExplore={onOpenExplore}
        />
      )}

      {activeMenu === "reviews" && (
        <MyReviewsPanel myReviews={myReviews} onOpenExplore={onOpenExplore} />
      )}

      {activeMenu === "profile" && (
        <ProfilePanel
          favoriteCount={favoriteIds.length}
          reviewCount={myReviews.length}
          onLogout={onLogout}
        />
      )}
    </section>
  );
}

function HomePanel({ places, isLoggedIn, onSelectPlace, onOpenExplore, onOpenLogin }) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-black uppercase tracking-widest text-orange-500">
          Welcome
        </p>
        <h2 className="mt-1 text-3xl font-black text-zinc-900">Home</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-500">
          지도에서 주변 식당과 카페를 탐색하고, 마음에 드는 장소를 저장하거나 리뷰를 남겨보세요.
        </p>
      </div>

      {!isLoggedIn && (
        <div className="mb-6 rounded-3xl bg-orange-50 p-5 ring-1 ring-orange-100">
          <h3 className="text-base font-black text-zinc-900">
            로그인 후 더 많은 기능을 사용할 수 있어요.
          </h3>
          <p className="mt-2 text-sm leading-6 text-zinc-500">
            즐겨찾기, 리뷰 작성, 내 리뷰 관리는 로그인 후 이용 가능합니다.
          </p>
          <button
            onClick={onOpenLogin}
            className="mt-4 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
          >
            로그인하기
          </button>
        </div>
      )}

      <div className="mb-6 grid grid-cols-2 gap-3">
        <button
          onClick={onOpenExplore}
          className="rounded-3xl bg-zinc-50 p-5 text-left transition hover:bg-orange-50"
        >
          <Search className="mb-3 text-orange-500" size={24} />
          <p className="font-black text-zinc-900">Explore</p>
          <p className="mt-1 text-xs leading-5 text-zinc-500">
            지도에서 장소 찾기
          </p>
        </button>

        <div className="rounded-3xl bg-zinc-50 p-5">
          <Heart className="mb-3 text-orange-500" size={24} />
          <p className="font-black text-zinc-900">Favorites</p>
          <p className="mt-1 text-xs leading-5 text-zinc-500">
            저장한 장소 관리
          </p>
        </div>
      </div>

      <h3 className="mb-3 text-xl font-black text-zinc-900">Popular Places</h3>

      <div className="space-y-3">
        {places.map((place) => (
          <PlaceMiniCard key={place.id} place={place} onClick={() => onSelectPlace(place)} />
        ))}
      </div>
    </div>
  );
}

function FavoritesPanel({ favoritePlaces, onSelectPlace, onOpenExplore }) {
  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase tracking-widest text-orange-500">
            Saved
          </p>
          <h2 className="mt-1 text-3xl font-black text-zinc-900">Favorites</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-500">
            내가 저장한 식당과 카페를 확인할 수 있습니다.
          </p>
        </div>
      </div>

      {favoritePlaces.length === 0 ? (
        <EmptyState
          icon={<Heart size={30} />}
          title="아직 즐겨찾기한 장소가 없습니다."
          description="마음에 드는 식당의 북마크 버튼을 눌러 저장해보세요."
          buttonText="장소 둘러보기"
          onClick={onOpenExplore}
        />
      ) : (
        <div className="space-y-3">
          {favoritePlaces.map((place) => (
            <PlaceMiniCard
              key={place.id}
              place={place}
              onClick={() => onSelectPlace(place)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function MyReviewsPanel({ myReviews, onOpenExplore }) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-black uppercase tracking-widest text-orange-500">
          Reviews
        </p>
        <h2 className="mt-1 text-3xl font-black text-zinc-900">My Reviews</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-500">
          내가 작성한 리뷰를 모아볼 수 있습니다.
        </p>
      </div>

      {myReviews.length === 0 ? (
        <EmptyState
          icon={<MessageSquareText size={30} />}
          title="아직 작성한 리뷰가 없습니다."
          description="방문한 장소를 선택하고 첫 리뷰를 남겨보세요."
          buttonText="리뷰 남기러 가기"
          onClick={onOpenExplore}
        />
      ) : (
        <div className="space-y-4">
          {myReviews.map((review) => (
            <article key={review.id} className="rounded-3xl bg-zinc-50 p-5">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-black text-zinc-900">{review.placeName}</h3>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-black text-orange-700">
                  {review.rating} / 5
                </span>
              </div>

              <p className="text-sm leading-6 text-zinc-600">{review.text}</p>

              <p className="mt-3 text-xs font-semibold text-zinc-400">
                작성일: {review.createdAt}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function ProfilePanel({ favoriteCount, reviewCount, onLogout }) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-black uppercase tracking-widest text-orange-500">
          Account
        </p>
        <h2 className="mt-1 text-3xl font-black text-zinc-900">Profile</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-500">
          사용자 정보와 활동 내역을 확인할 수 있습니다.
        </p>
      </div>

      <div className="mb-6 rounded-3xl bg-orange-50 p-5 ring-1 ring-orange-100">
        <div className="mb-4 flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-orange-500 text-xl font-black text-white">
            AE
          </div>

          <div>
            <h3 className="text-xl font-black text-zinc-900">Alex Explorer</h3>
            <p className="text-sm font-semibold text-zinc-500">Gold Member</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white p-4 text-center">
            <p className="text-2xl font-black text-orange-600">{favoriteCount}</p>
            <p className="mt-1 text-xs font-bold text-zinc-500">Favorites</p>
          </div>

          <div className="rounded-2xl bg-white p-4 text-center">
            <p className="text-2xl font-black text-orange-600">{reviewCount}</p>
            <p className="mt-1 text-xs font-bold text-zinc-500">Reviews</p>
          </div>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-100 px-5 py-3 text-sm font-black text-zinc-600 transition hover:bg-orange-50 hover:text-orange-600"
      >
        <LogOut size={17} />
        로그아웃
      </button>
    </div>
  );
}

function PlaceMiniCard({ place, onClick }) {
  const style = CATEGORY_STYLE[place.category];

  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-3xl bg-zinc-50 p-3 text-left transition hover:bg-orange-50"
    >
      <img
        src={place.image}
        alt={place.name}
        className="h-20 w-24 rounded-2xl object-cover"
      />

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span
            className="rounded-full px-2 py-1 text-[11px] font-black"
            style={{ background: style.light, color: style.text }}
          >
            {style.label}
          </span>

          {place.type === "cafe" ? (
            <Coffee size={14} className="text-zinc-400" />
          ) : (
            <Utensils size={14} className="text-zinc-400" />
          )}
        </div>

        <h3 className="truncate text-sm font-black text-zinc-900">{place.name}</h3>

        <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
          <RatingStars value={place.rating} size={12} />
          <span>{place.rating}</span>
          <span>·</span>
          <MapPin size={12} />
          <span>{place.distance} mi</span>
        </div>
      </div>
    </button>
  );
}

function EmptyState({ icon, title, description, buttonText, onClick }) {
  return (
    <div className="rounded-3xl bg-zinc-50 p-8 text-center">
      <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-white text-orange-500 shadow-sm">
        {icon}
      </div>

      <h3 className="text-base font-black text-zinc-900">{title}</h3>

      <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-zinc-500">
        {description}
      </p>

      <button
        onClick={onClick}
        className="mt-5 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
      >
        {buttonText}
      </button>
    </div>
  );
}