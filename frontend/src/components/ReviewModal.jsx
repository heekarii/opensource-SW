import { useState } from "react";
import { X, Star, Camera, Send } from "lucide-react";
import { CATEGORY_STYLE } from "../constants/categories";

function RatingInput({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-zinc-50 px-4 py-3">
      <span className="text-sm font-black text-zinc-700">{label}</span>

      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, index) => {
          const score = index + 1;

          return (
            <button
              key={score}
              type="button"
              onClick={() => onChange(score)}
              className="transition hover:scale-110"
            >
              <Star
                size={25}
                className={
                  score <= value
                    ? "fill-orange-500 text-orange-500"
                    : "text-zinc-300"
                }
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ReviewModal({ place, open, onClose, onSubmit }) {
  const [tasteRating, setTasteRating] = useState(4);
  const [serviceRating, setServiceRating] = useState(4);
  const [priceRating, setPriceRating] = useState(4);
  const [text, setText] = useState("");

  if (!open) return null;

  const style = CATEGORY_STYLE[place.category];

  const averageRating = Number(
    ((tasteRating + serviceRating + priceRating) / 3).toFixed(1)
  );

  const handleSubmit = () => {
    onSubmit({
      placeId: place.id,
      placeName: place.name,
      tasteRating,
      serviceRating,
      priceRating,
      averageRating,
      text: text.trim() || "아직 리뷰 내용을 입력하지 않았습니다.",
    });

    setTasteRating(4);
    setServiceRating(4);
    setPriceRating(4);
    setText("");
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
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-zinc-500">
                Rate this place
              </p>
              <h3 className="mt-1 text-xl font-black text-zinc-900">
                맛, 서비스, 가격을 평가해주세요.
              </h3>
            </div>

            <div className="rounded-2xl bg-orange-50 px-4 py-2 text-right">
              <p className="text-xs font-bold text-orange-500">평균 평점</p>
              <p className="text-xl font-black text-orange-600">
                {averageRating}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <RatingInput
              label="맛"
              value={tasteRating}
              onChange={setTasteRating}
            />

            <RatingInput
              label="서비스"
              value={serviceRating}
              onChange={setServiceRating}
            />

            <RatingInput
              label="가격"
              value={priceRating}
              onChange={setPriceRating}
            />
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
            placeholder="맛, 서비스, 가격에 대한 생각을 자유롭게 적어주세요."
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

              <img
                src={place.image}
                alt="preview"
                className="h-20 w-24 rounded-2xl object-cover"
              />
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