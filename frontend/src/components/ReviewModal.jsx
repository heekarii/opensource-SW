import { useState } from 'react';
import { X, Star, Camera, Send } from 'lucide-react';
import { CATEGORY_STYLE } from '../constants/categories';

export default function ReviewModal({ place, open, onClose, onSubmit }) {
  const [rating, setRating] = useState(4);
  const [text, setText] = useState('');

  if (!open) return null;

  const style = CATEGORY_STYLE[place.category];

  const handleSubmit = () => {
    onSubmit({
      placeId: place.id,
      placeName: place.name,
      rating,
      text: text.trim() || '아직 리뷰 내용을 입력하지 않았습니다.',
    });

    setText('');
    setRating(4);
    onClose();
  };

  return (
    <div className="absolute inset-0 z-[600] grid place-items-center bg-zinc-900/20 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[2rem] bg-white/95 p-7 shadow-2xl ring-1 ring-white/60 backdrop-blur-xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={place.image}
              alt={place.name}
              className="h-14 w-14 rounded-2xl object-cover"
            />

            <div>
              <h2 className="text-xl font-black text-zinc-900">{place.name}</h2>
              <div className="mt-1 flex items-center gap-2 text-xs font-bold text-zinc-500">
                <span
                  className="rounded-full px-2 py-1"
                  style={{ background: style.light, color: style.text }}
                >
                  {style.label}
                </span>
                <span>•</span>
                <span>{place.address}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full text-zinc-500 transition hover:bg-zinc-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-8">
          <p className="mb-4 text-sm font-black uppercase tracking-widest text-zinc-500">
            How was your experience?
          </p>

          <div className="flex gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setRating(index + 1)}
                className="transition hover:scale-110"
              >
                <Star
                  size={32}
                  className={index < rating ? 'fill-orange-500 text-orange-500' : 'text-zinc-300'}
                />
              </button>
            ))}
          </div>
        </div>

        <label className="mb-8 block">
          <span className="mb-3 block text-sm font-black uppercase tracking-widest text-zinc-500">
            Share your thoughts
          </span>

          <textarea
            rows={5}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="분위기, 서비스, 대표 메뉴 등 좋았던 점을 적어주세요."
            className="w-full resize-none rounded-2xl border border-orange-200 bg-zinc-50 p-4 text-sm font-medium outline-none transition placeholder:text-zinc-400 focus:border-orange-500 focus:bg-white"
          />
        </label>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-widest text-zinc-500">
              Add Photos
            </p>

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
        </div>

        <div className="mt-9 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-2xl px-6 py-3 text-sm font-black text-zinc-500 transition hover:bg-zinc-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 rounded-2xl bg-orange-500 px-7 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/25 transition hover:bg-orange-600"
          >
            Submit Review
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
