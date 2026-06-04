import { Search, SlidersHorizontal } from 'lucide-react';

export default function TopSearch({ query, setQuery, onOpenResults }) {
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
