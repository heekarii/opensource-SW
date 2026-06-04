import { Home, Search, Heart, User, MessageSquareText, LogIn, LogOut, Lock } from 'lucide-react';

export default function Sidebar({
  activeMenu,
  setActiveMenu,
  isLoggedIn,
  onRequireLogin,
  onOpenLogin,
  onLogout,
}) {
  const menus = [
    { id: 'home', label: 'Home', icon: Home, protected: false },
    { id: 'explore', label: 'Explore', icon: Search, protected: false },
    { id: 'favorites', label: 'Favorites', icon: Heart, protected: true },
    {
      id: 'reviews',
      label: 'My Reviews',
      icon: MessageSquareText,
      protected: true,
    },
    { id: 'profile', label: 'Profile', icon: User, protected: true },
  ];

  const handleMenuClick = (menu) => {
    if (!isLoggedIn && menu.protected) {
      onRequireLogin();
      return;
    }

    setActiveMenu(menu.id);
  };

  return (
    <aside className="fixed left-0 top-0 z-[700] hidden h-screen w-[230px] shrink-0 flex-col border-r border-zinc-200/80 bg-white/90 px-4 py-5 shadow-xl backdrop-blur-xl lg:flex">
      <div className="mb-8 px-2 text-2xl font-black tracking-tight text-orange-600">Fork & Cup</div>

      <nav className="space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;
          const active = activeMenu === menu.id;
          const locked = !isLoggedIn && menu.protected;

          return (
            <button
              key={menu.id}
              onClick={() => handleMenuClick(menu)}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                active
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : locked
                    ? 'text-zinc-300 hover:bg-orange-50 hover:text-orange-500'
                    : 'text-zinc-500 hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon size={18} />
                {menu.label}
              </span>

              {locked && <Lock size={14} />}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl bg-zinc-100 p-3">
        {isLoggedIn ? (
          <>
            <div className="mb-3 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-orange-100 text-sm font-black text-orange-700">
                AE
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-zinc-800">Alex Explorer</p>
                <p className="text-xs text-zinc-500">Gold Member</p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-black text-zinc-500 transition hover:text-orange-600"
            >
              <LogOut size={14} />
              로그아웃
            </button>
          </>
        ) : (
          <>
            <div className="mb-3 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-orange-600 shadow-sm">
                <User size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-zinc-800">로그인을 해주세요.</p>
                <p className="text-xs text-zinc-500">리뷰와 즐겨찾기 이용 가능</p>
              </div>
            </div>

            <button
              onClick={onOpenLogin}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-3 py-2.5 text-xs font-black text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
            >
              <LogIn size={14} />
              로그인하기
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
