import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import {
  FormEvent, useState, useContext, useEffect,
} from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';
import Illustration from '../assets/img/IllustrationPink.svg';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameMinimumCharacters, setIsUsernameMinimumCharacters] = useState(false);
  const [isPasswordNumber, setIsPasswordNumber] = useState(false);
  const [isPasswordUppercase, setIsPasswordUppercase] = useState(false);
  const [isPasswordMinimumCharacters, setIsPasswordMinimumCharacters] = useState(false);
  const { register } = useContext(AuthContext);

  const { push } = useRouter();

  useEffect(() => {
    const { 'ngcash.token': token } = parseCookies();
    if (token) {
      push('/');
    }
  }, [push]);

  useEffect(() => {
    const numbers = /[0-9]/g;
    if (password.match(numbers)) {
      setIsPasswordNumber(true);
    } else {
      setIsPasswordNumber(false);
    }

    const passwordMinimumCharacters = 8;
    setIsPasswordMinimumCharacters(password.length >= passwordMinimumCharacters);

    const upperCaseLetters = /[A-Z]/g;
    if (password.match(upperCaseLetters)) {
      setIsPasswordUppercase(true);
    } else {
      setIsPasswordUppercase(false);
    }

    const usernameMinimumCharacters = 3;
    setIsUsernameMinimumCharacters(username.length >= usernameMinimumCharacters);
  }, [
    username,
    password,
    isPasswordNumber,
    isPasswordMinimumCharacters,
    isPasswordUppercase,
    isUsernameMinimumCharacters,
  ]);

  const isInputsValid = () => {
    if (isPasswordNumber
      && isPasswordMinimumCharacters
      && isPasswordUppercase
      && isUsernameMinimumCharacters) {
      return false;
    }
    return true;
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await register({ username, password });
  }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="mt-[93px] p-2 w-full bg-white-900 lg:bg-black-900 grow p-none flex items-center justify-between max-w-[900px] mx-auto">
        <div className="flex w-full rounded-lg bg-white-900 lg:flex-row mx-auto">
          <div className="w-full rounded-tl-lg rounded-bl-lg hidden bg-purple-900 lg:flex lg:flex-col">
            <div className="p-3">
              <h1 className="text-2xl font-bold">A CARTEIRA DA NOVA GERAÇÃO.</h1>
              <h2 className="text-lg">Abra a sua conta independente da sua idade.</h2>
            </div>
            <Image
              className="mt-9"
              src={Illustration}
              alt="Ilustração NGCASH"
              width={428}
              height={264}
            />
          </div>
          <div className="w-full h-full flex items-center rounded-br-lg rounded-tr-lg flex-col bg-white-900 border-0 rounded-none lg:p-8 lg:m-auto">
            <strong className="text-black-900 text-4xl mb-4 block">REGISTER</strong>
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
              <div className="text-black-900 text-sm">
                <h3 className="font-medium text-base">O usuário deverá conter:</h3>
                <p className={isUsernameMinimumCharacters ? 'text-green-900' : 'text-red-600'}>
                  No mínimo
                  {' '}
                  <b>3 caracteres</b>
                </p>
                <h3 className="font-medium text-base">A senha deverá conter:</h3>
                <p className={isPasswordUppercase ? 'text-green-900' : 'text-red-600'}>
                  No mínimo
                  {' '}
                  <b>1 letra maiúscla</b>
                </p>
                <p className={isPasswordNumber ? 'text-green-900' : 'text-red-600'}>
                  No mínimo
                  {' '}
                  <b> 1 número</b>
                </p>
                <p className={isPasswordMinimumCharacters ? 'text-green-900' : 'text-red-600'}>
                  No mínimo
                  {' '}
                  <b>8 caracteres</b>
                </p>
              </div>
              <span className="text-black-900">
                Já tem conta?
                {' '}
                <Link className="font-semibold" href="/login">Entrar</Link>
              </span>
              <button
                className="w-full mt-2 bg-pink-900 uppercase py-4 rounded font-bold text-sm enabled:hover:bg-pink-800 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                type="submit"
                disabled={isInputsValid()}
              >
                CADASTRAR
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
