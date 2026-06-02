import L from 'leaflet';
import { CATEGORY_STYLE } from '../constants/categories';

export function createPlaceIcon(place, selected) {
  const category = CATEGORY_STYLE[place.category];
  const icon = place.type === 'cafe' ? '☕' : '🍴';

  return L.divIcon({
    className: 'forkcup-marker',
    html: `
      <div style="
        position: relative;
        width: ${selected ? 54 : 46}px;
        height: ${selected ? 54 : 46}px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        background: ${category.color};
        box-shadow: 0 14px 30px rgba(15, 23, 42, 0.24);
        border: 3px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <span style="
          transform: rotate(45deg);
          color: white;
          font-size: ${selected ? 22 : 18}px;
          line-height: 1;
        ">${icon}</span>
      </div>
    `,
    iconSize: [selected ? 54 : 46, selected ? 54 : 46],
    iconAnchor: [23, 46],
    popupAnchor: [0, -42],
  });
}
