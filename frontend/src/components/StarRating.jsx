import { Star } from 'lucide-react';

export default function RatingStars({ value = 5, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={size}
          className={
            index < Math.round(value) ? 'fill-orange-500 text-orange-500' : 'text-zinc-300'
          }
        />
      ))}
    </div>
  );
}
