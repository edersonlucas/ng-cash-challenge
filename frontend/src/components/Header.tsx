import { useState, useContext } from 'react';
import { List, X, SignOut } from 'phosphor-react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../assets/img/Logo.svg';
import { AuthContext } from '../contexts/AuthContext';

export default function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  function openMenu() {
    if (isOpenMenu) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
    setIsOpenMenu(!isOpenMenu);
  }
  return (
    isAuthenticated ? (
      <header
        className="fixed z-50 bg-black-900 w-full"
      >
        <div className="p-5 flex justify-between items-center w-full max-w-[1300px] mx-auto text-white-900">
          <Link href="/" className="flex items-center">
            <Image
              src={Logo}
              alt="Logo NGCASH"
              width={80}
              height={80}
            />
          </Link>
          <button
            type="button"
            name="menu-sandwich"
            className="block hover:text-zinc-700 lg:hidden"
            onClick={openMenu}
          >
            {isOpenMenu ? <X size={35} /> : <List size={35} />}
          </button>
          <nav className="hidden items-center gap-6 lg:flex">
            <Link href="/" className="hover:opacity-90">
              Início
            </Link>
            <Link href="/transfer" className="hover:opacity-90">
              Transferir
            </Link>
            <Link href="/history" className="hover:opacity-90">
              Histórico
            </Link>
            <button type="button" onClick={logout} className="flex items-center gap-1 hover:opacity-90">
              Sair
              <SignOut size={32} />
            </button>
          </nav>
          <div
            className={`fixed left-0 bottom-[-71px] h-full w-full z-30 bg-black-900 bg-opacity-[99%] transform-gpu transition-all lg:hidden ${
              isOpenMenu ? '-translate-y-0' : 'translate-y-full'
            }`}
          >
            <nav className="h-full flex flex-col items-center justify-center gap-8 text-white-900 text-2xl">
              <Link href="/" className="hover:font-medium">
                Início
              </Link>
              <Link href="/transfer" className="hover:opacity-90">
                Transferir
              </Link>
              <Link href="/history" className="hover:opacity-90">
                Histórico
              </Link>
              <button type="button" onClick={logout} className="flex items-center gap-1 hover:opacity-90">
                Sair
                <SignOut size={32} />
              </button>
            </nav>
          </div>
        </div>
        <hr className="border-zinc-900 w-4/5 mx-auto opacity-30" />
      </header>
    ) : (
      <header
        className="fixed z-50 bg-black-900 w-full"
      >
        <div className="p-5 flex justify-between items-center w-full max-w-[1300px] mx-auto text-white-900">
          <div className="flex items-center">
            <Image
              src={Logo}
              alt="Logo NGCASH"
              width={80}
              height={80}
            />
          </div>
        </div>
        <hr className="border-zinc-900 w-4/5 mx-auto opacity-30" />
      </header>
    )
  );
}
