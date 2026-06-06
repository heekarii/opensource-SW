import {
  ChevronLeft,
  MapPin,
  MessageSquareText,
  Bookmark,
  Share2,
  Utensils,
  Coffee,
} from 'lucide-react';
import { CATEGORY_STYLE } from '../constants/categories';
import RatingStars from './StarRating';

export default function DetailPanel({ place, isFavorite, onToggleFavorite, onReview }) {
  const style = CATEGORY_STYLE[place.category] || CATEGORY_STYLE.korean;

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

          <span
            className="rounded-full px-3 py-1 text-xs font-bold"
            style={{ background: style.light, color: style.text }}
          >
            {style.label}
          </span>
        </div>

        <div className="mb-5 flex items-center gap-2">
          <RatingStars value={place.rating} size={15} />
          <span className="text-sm font-bold text-zinc-900">{place.rating}</span>
          <span className="text-sm font-semibold text-zinc-500">({place.reviews} reviews)</span>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-2">
          <button
            onClick={onReview}
            className="col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-4 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/25 transition hover:bg-orange-600"
          >
            <MessageSquareText size={17} />
            Write Review
          </button>

          <div className="flex gap-2">
            <button
              onClick={onToggleFavorite}
              className={`grid flex-1 place-items-center rounded-2xl border transition ${
                isFavorite
                  ? 'border-orange-500 bg-orange-50 text-orange-600'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <Bookmark size={18} className={isFavorite ? 'fill-orange-500' : ''} />
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
            {(place.menu || []).map((item) => (
              <div key={item.name} className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-white shadow-sm">
                  {place.type === 'cafe' ? (
                    <Coffee size={21} className="text-orange-600" />
                  ) : (
                    <Utensils size={21} className="text-orange-600" />
                  )}
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
            {(place.reviewsList || []).map((review) => (
              <article
                key={`${review.user}-${review.date}`}
                className="border-b border-zinc-100 pb-4 last:border-none"
              >
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
