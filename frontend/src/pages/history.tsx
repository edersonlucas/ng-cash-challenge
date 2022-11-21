import Head from 'next/head';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import {
  FormEvent, useContext, useEffect, useState,
} from 'react';
import TransactionCard from '../components/TransactionCard';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';

interface ITransaction {
  cashOut: string;
  cashIn: string;
  value: string;
  createAt: string
}

export default function History() {
  const [date, setDate] = useState('');
  const [selectType, setSelectType] = useState('');
  const [transactions, setTransactions] = useState<ITransaction[] | null>(null);

  const { logout } = useContext(AuthContext);

  const { push } = useRouter();

  useEffect(() => {
    const { 'ngcash.token': token } = parseCookies();
    if (!token) {
      push('/login');
    }
    api.get('/transactions', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => setTransactions(response.data)).catch((err) => logout());
  }, [push, logout]);

  const { 'ngcash.user': user } = parseCookies();

  const handleClearFilter = () => {
    console.log('aqui');
    setDate('');
    setSelectType('');
  };

  const handleFilter = async (event: FormEvent) => {
    event.preventDefault();
    const { 'ngcash.token': token } = parseCookies();
    let query;
    if (selectType) {
      query = `cashType=${selectType}`;
    }
    if (date) {
      query = `date=${date}`;
    }
    if (selectType && date) {
      query = `cashType=${selectType}&date=${date}`;
    }
    api.get(`/transactions?${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => setTransactions(response.data)).catch((err) => logout());
  };

  return (
    <>
      <Head>
        <title>Histórico</title>
      </Head>
      <div className="mt-[93px] p-2 lg:p-10 w-full grow p-none flex flex-col items-center justify-center bg-zinc-600">
        <div className="w-full h-full grow bg-zinc-100 max-w-[1000px]">
          <form onSubmit={handleFilter} className="flex flex-col items-center justify-center p-4 gap-1 lg:gap-2 text-black-900 lg:flex-row">
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
            <label htmlFor="checkboxCashIn" className="flex items-center">
              Recebidas
              <input id="checkboxCashIn" type="checkbox" checked={selectType === 'cashIn'} value="cashIn" onChange={(event) => setSelectType(event.target.value)} className="accent-black-900 text" />
            </label>
            <label htmlFor="checkboxCashOut" className="flex items-center">
              Envidas
              <input id="checkboxCashOut" type="checkbox" value="cashOut" checked={selectType === 'cashOut'} onChange={(event) => setSelectType(event.target.value)} className="accent-black-900" />
            </label>
            <button
              className=" text-white-900 bg-black-900 uppercase py-2 px-4 rounded font-bold text-sm hover:bg-zinc-900 transition-colors disabled:opacity-50 disabled:pointer-events-none"
              type="submit"
            >
              FILTRAR
            </button>
            <button
              className=" text-white-900 bg-black-900 uppercase py-2 px-4 rounded font-bold text-sm hover:bg-zinc-900 transition-colors disabled:opacity-50 disabled:pointer-events-none"
              type="button"
              onClick={() => handleClearFilter()}
            >
              LIMPAR
            </button>
          </form>
          <div className="flex items-center justify-center gap-3 w-10/12 mx-auto h-full grow flex-wrap">
            {
            transactions && (
              transactions
                .map((transaction) => (
                  <TransactionCard
                    key={user}
                    transaction={transaction}
                    user={user}
                  />
                ))
            )
          }
          </div>
        </div>
      </div>
    </>
  );
}
