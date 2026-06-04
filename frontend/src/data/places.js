export const PLACES = [
  {
    id: 1,
    name: '청담 한식당',
    type: 'restaurant',
    category: 'korean',
    rating: 4.8,
    reviews: 124,
    distance: 0.4,
    position: [37.5234, 127.0469],
    address: 'Gangnam, Seoul',
    image:
      'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80',
    description: '정갈한 반찬과 숯불 향이 살아있는 한식 다이닝입니다.',
    tags: ['가족 모임', '조용한 분위기'],
    menu: [
      { name: 'Premium Bibimbap', desc: "Chef's special recipe", price: '$18.50' },
      { name: 'Cheong-dam Galbi', desc: 'Top-grade prime beef', price: '$32.00' },
    ],
    reviewsList: [
      {
        user: 'Ji-won Kang',
        date: '2 days ago',
        text: '갈비 양념이 과하지 않고 밸런스가 좋았어요. 서비스도 깔끔했습니다.',
        rating: 5,
      },
    ],
  },
  {
    id: 2,
    name: '홍등 중화요리',
    type: 'restaurant',
    category: 'chinese',
    rating: 4.6,
    reviews: 88,
    distance: 0.8,
    position: [37.5268, 127.0382],
    address: 'Apgujeong, Seoul',
    image:
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=80',
    description: '매콤한 사천식 요리와 바삭한 탕수육이 인기입니다.',
    tags: ['매운맛', '단체석'],
    menu: [
      { name: 'Mala Noodles', desc: 'Spicy Sichuan broth', price: '$14.00' },
      { name: 'Crispy Pork', desc: 'Sweet sour sauce', price: '$21.00' },
    ],
    reviewsList: [
      {
        user: 'Hana Lee',
        date: '3 days ago',
        text: '마라 향이 진하고 양도 많아서 만족했습니다.',
        rating: 5,
      },
    ],
  },
  {
    id: 3,
    name: 'Ichiraku Artisan Ramen',
    type: 'restaurant',
    category: 'japanese',
    rating: 4.8,
    reviews: 216,
    distance: 1.1,
    position: [37.5201, 127.0314],
    address: 'Sinsa, Seoul',
    image:
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80',
    description: '24시간 우려낸 돈코츠 육수와 직접 뽑은 면을 사용합니다.',
    tags: ['Outdoor Seating', 'Spicy Options'],
    menu: [
      { name: 'Tonkotsu Ramen', desc: 'Rich pork broth', price: '$13.50' },
      { name: 'Tsukemen', desc: 'Dipping noodles', price: '$15.00' },
    ],
    reviewsList: [
      {
        user: 'Ken Park',
        date: '5 days ago',
        text: '국물이 진하고 면 식감이 좋았습니다. 웨이팅은 조금 있어요.',
        rating: 5,
      },
    ],
  },
  {
    id: 4,
    name: 'Fork & Bean Cafe',
    type: 'cafe',
    category: 'cafe',
    rating: 4.7,
    reviews: 52,
    distance: 0.6,
    position: [37.5167, 127.0448],
    address: 'Cheongdam, Seoul',
    image:
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80',
    description: '브런치와 싱글 오리진 커피를 함께 즐길 수 있는 카페입니다.',
    tags: ['디저트', '노트북 가능'],
    menu: [
      { name: 'Einspanner', desc: 'Cream coffee', price: '$6.00' },
      { name: 'Croissant Plate', desc: 'Butter croissant', price: '$11.00' },
    ],
    reviewsList: [
      {
        user: 'Soo Kim',
        date: 'yesterday',
        text: '커피 산미가 좋고 내부가 밝아서 작업하기 좋았습니다.',
        rating: 5,
      },
    ],
  },
  {
    id: 5,
    name: 'Pasta North',
    type: 'restaurant',
    category: 'western',
    rating: 4.5,
    reviews: 67,
    distance: 1.4,
    position: [37.5292, 127.052],
    address: 'Samseong, Seoul',
    image:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80',
    description: '크림 파스타와 스테이크가 좋은 캐주얼 이탈리안입니다.',
    tags: ['데이트', '와인'],
    menu: [
      { name: 'Truffle Pasta', desc: 'Cream sauce', price: '$19.00' },
      { name: 'Ribeye Steak', desc: 'Char-grilled', price: '$39.00' },
    ],
    reviewsList: [
      {
        user: 'Alex R.',
        date: '2 weeks ago',
        text: '파스타 소스가 진하고 분위기가 좋았습니다.',
        rating: 4,
      },
    ],
  },
];
