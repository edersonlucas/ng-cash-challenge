import Head from 'next/head';
import { parseCookies } from 'nookies';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import BalanceCard from '../components/BalanceCard';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';

type BalanceType = number | string;

export default function Home() {
  const [balance, setBalance] = useState<BalanceType>(0);
  const { push } = useRouter();

  const { logout, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const { 'ngcash.token': token } = parseCookies();
    if (!token) {
      push('/login');
    }
    api.get('/balance', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => setBalance(response.data.balance)).catch(() => logout());
  }, [logout, push]);

  const { 'ngcash.user': user } = parseCookies();

  return (
    <>
      <Head>
        <title>Início</title>
      </Head>
      { isAuthenticated && (
      <div className="mt-[93px] w-full h-full grow p-none flex flex-col items-center justify-center bg-zinc-200">
        <BalanceCard balance={balance} username={user} />
      </div>
      )}
    </>
  );
}
