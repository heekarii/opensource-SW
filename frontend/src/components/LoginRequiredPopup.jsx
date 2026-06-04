import { Lock } from 'lucide-react';

export default function LoginRequiredPopup({ open, onClose, onOpenLogin }) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-[780] grid place-items-center bg-zinc-900/20 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-[2rem] bg-white p-7 text-center shadow-2xl">
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-orange-50 text-orange-600">
          <Lock size={25} />
        </div>

        <h2 className="text-xl font-black text-zinc-900">로그인 후 이용 가능합니다.</h2>

        <p className="mt-3 text-sm leading-6 text-zinc-500">
          즐겨찾기, 내 리뷰, 프로필 기능은 로그인한 사용자만 사용할 수 있습니다.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="rounded-2xl bg-zinc-100 px-4 py-3 text-sm font-black text-zinc-500 transition hover:bg-zinc-200"
          >
            닫기
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenLogin();
            }}
            className="rounded-2xl bg-orange-500 px-4 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
