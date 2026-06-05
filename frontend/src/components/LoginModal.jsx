import { useState } from "react";
import { X, LogIn, Lock, Mail } from "lucide-react";

export default function LoginModal({ open, onClose, onLogin, onOpenSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-[800] grid place-items-center bg-zinc-900/25 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-7 shadow-2xl">
        <div className="mb-7 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-zinc-900">로그인</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Fork & Cup 서비스를 이용해보세요.
            </p>
          </div>

          <button
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full text-zinc-500 transition hover:bg-zinc-100"
          >
            <X size={20} />
          </button>
        </div>

        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-black text-zinc-700">
            이메일
          </span>

          <div className="flex h-12 items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 focus-within:border-orange-500 focus-within:bg-white">
            <Mail size={18} className="text-zinc-400" />
            <input
              type="email"
              placeholder="forkcup@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-zinc-400"
            />
          </div>
        </label>

        <label className="mb-6 block">
          <span className="mb-2 block text-sm font-black text-zinc-700">
            비밀번호
          </span>

          <div className="flex h-12 items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 focus-within:border-orange-500 focus-within:bg-white">
            <Lock size={18} className="text-zinc-400" />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-zinc-400"
            />
          </div>
        </label>

        <button
          onClick={() => onLogin({ email, password })}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 text-sm font-black text-white shadow-lg shadow-orange-500/25 transition hover:bg-orange-600"
        >
          <LogIn size={17} />
          로그인
        </button>

        <div className="mt-5 flex items-center justify-center gap-1 text-sm">
          <span className="text-zinc-400">아직 계정이 없으신가요?</span>
          <button
            onClick={onOpenSignup}
            className="font-black text-orange-600 hover:text-orange-700"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}