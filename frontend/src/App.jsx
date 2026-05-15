import './App.css';

const CATEGORY_STYLE = {
  korean: {
    label: '한식',
    color: '#f97316',
    light: '#ffedd5',
    text: '#9a3412',
  },
  chinese: {
    label: '중식',
    color: '#ef4444',
    light: '#fee2e2',
    text: '#991b1b',
  },
  japanese: {
    label: '일식',
    color: '#22c55e',
    light: '#dcfce7',
    text: '#166534',
  },
  cafe: {
    label: '카페',
    color: '#a16207',
    light: '#fef3c7',
    text: '#854d0e',
  },
  western: {
    label: '양식',
    color: '#3b82f6',
    light: '#dbeafe',
    text: '#1d4ed8',
  },
};

const PLACES = [
  // 완성본의 PLACES 배열 전체를 여기에 붙여넣기
];

function App() {
  return (
    <div className="app">
      <h1>Fork Cup</h1>
      <p>{PLACES.length} places loaded</p>
      <p>{Object.keys(CATEGORY_STYLE).length} categories available</p>
    </div>
  );
}

export default App;
