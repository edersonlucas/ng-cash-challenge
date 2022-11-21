import Head from 'next/head';
import {
  useState, useContext, FormEvent, useEffect,
} from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import MoneyFlyingImage from '../assets/img/MoneyFlying.svg';
import { TransferMessage } from '../enums/returnMessages.enum';

export default function Transfer() {
  const [username, setUsername] = useState('');
  const [isCashFormatValid, setIsCashFormatValid] = useState<boolean>(false);
  const [value, setValue] = useState('');
  const { isAuthenticated } = useContext(AuthContext);

  const { push } = useRouter();

  useEffect(() => {
    const { 'ngcash.token': token } = parseCookies();
    if (!token) {
      push('/login');
    }
  }, [push]);

  useEffect(() => {
    const regexMoney = /^(?:|)[+-]?[0-9]{1,2}(?:[0-9]*(?:[.,][0-9]{2})?|(?:,[0-9]{2})*(?:\.[0-9]{1,2})?)$/;
    if (value.match(regexMoney)) {
      setIsCashFormatValid(true);
    } else {
      setIsCashFormatValid(false);
    }
  }, [value]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { 'ngcash.token': token } = parseCookies();
    const formattedValue = Number(value.replace(',', '.'));
    api
      .post(
        '/transactions',
        { userReceive: username, value: formattedValue },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((response) => {
        const { status } = response;
        toast.success(TransferMessage[status], {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      })
      .catch((err) => {
        const {
          response: { status },
        } = err;
        toast.error(TransferMessage[status], {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      });
  };

  return (
    <>
      <Head>
        <title>Transferir</title>
      </Head>
      {isAuthenticated && (
        <div className="mt-[93px] w-full h-full grow p-none flex flex-col items-center justify-center bg-zinc-200">
          <div className="flex h-full w-full flex-col py-4 px-2 items-center max-w-[340px] shadow-lg bg-zinc-500 border-black-900 min:grow lg:border-r-4 lg:border-b-8">
            <div className="flex flex-col items-center">
              <Image
                src={MoneyFlyingImage}
                alt="Foto de perfil do usuário ederson"
                width={100}
                height={90}
              />
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full p-2"
            >
              <label htmlFor="usernameTransfer">
                <p className="text-black-900">Para:</p>
                <input
                  className="bg-black-900 rounded w-full px-5 h-14"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  id="usernameTransfer"
                />
              </label>
              <label htmlFor="valueTransfer">
                <p className="text-black-900">Valor:</p>
                <input
                  className="bg-black-900 rounded w-full px-5 h-14"
                  type="text"
                  placeholder="00,00"
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  id="valueTransfer"
                />
              </label>
              <div className="text-black-900 text-sm">
                <h3 className="font-medium text-base">O valor deverá:</h3>
                <p
                  className={
                    isCashFormatValid ? 'text-green-900' : 'text-red-600'
                  }
                >
                  Estar no formato correto
                  {' '}
                  <b>Ex: 1000,45</b>
                </p>
              </div>
              <button
                className="w-full mt-2 text-black-900 bg-green-900 uppercase py-4 rounded font-bold text-sm hover:bg-green-800 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                type="submit"
                disabled={!isCashFormatValid}
              >
                ENVIAR DINHEIRO
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
