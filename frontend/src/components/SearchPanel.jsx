import { X, Star } from 'lucide-react';
import { CATEGORY_STYLE } from '../constants/categories';

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

export default function SearchPanel({
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
                <h3 className="text-lg font-black text-zinc-900">{place.name}</h3>
                <p className="mt-1 text-sm leading-6 text-zinc-500">{place.description}</p>

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
