import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import {
  FormEvent, useState, useContext, useEffect,
} from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';
import Illustration from '../assets/img/IllustrationPurple.svg';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const { push } = useRouter();

  useEffect(() => {
    const { 'ngcash.token': token } = parseCookies();
    if (token) {
      push('/');
    }
  }, [push]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await login({ username, password });
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="mt-[93px] p-2 w-full bg-white-900 lg:bg-black-900 grow p-none flex items-center justify-between max-w-[900px] mx-auto">
        <div className="flex w-full rounded-lg bg-white-900 lg:flex-row mx-auto">
          <div className="w-full rounded-tl-lg rounded-bl-lg hidden bg-pink-900 lg:flex lg:flex-col">
            <div className="p-3">
              <h1 className="text-2xl font-bold">A CARTEIRA DA NOVA GERAÇÃO.</h1>
              <h2 className="text-lg">É para todas as idades!</h2>
            </div>
            <Image
              className="mt-9"
              src={Illustration}
              alt="Ilustração NGCASH"
              width={328}
              height={264}
            />
          </div>
          <div className="w-full flex items-center rounded-br-lg rounded-tr-lg flex-col bg-white-900 border-0 rounded-none lg:p-8 lg:m-auto">
            <strong className="text-black-900 text-4xl mb-4 block">LOGIN</strong>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full p-2">
              <input
                className="bg-black-900 rounded px-5 h-14"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <input
                className="bg-black-900 rounded px-5 h-14"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <span className="text-black-900">
                Não tem conta?
                {' '}
                <Link className="font-semibold" href="/register">Cadastre-se</Link>
              </span>
              <button
                className="w-full mt-2 bg-purple-900 uppercase py-4 rounded font-bold text-sm enabled:hover:bg-purple-800 transition-colors disabled:opacity-50"
                type="submit"
              >
                ENTRAR
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
