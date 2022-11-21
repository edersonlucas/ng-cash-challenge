import Image from 'next/image';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import CashInIcon from '../assets/img/CashIn.svg';
import CashOutIcon from '../assets/img/CashOut.svg';

interface IProps {
  transaction: {
    cashOut: string;
    cashIn: string;
    value: string;
    createAt: string
  },
  user: string,
}

export default function TransactionCard(props: IProps) {
  const { transaction, user } = props;

  const transferDateFormatted = format(new Date(transaction.createAt), "' 'd' de 'MMMM' de 'Y'", {
    locale: ptBR,
  });

  return (
    <div className="flex text text-sm justify-between p-4 text-black-900 h-full w-full py-8 items-center min-w-[230px] max-w-[320px] min-h-[110px] max-h-[110px] shadow-lg bg-zinc-500 border-black-900 min:grow lg:border-r-4 lg:border-b-8 lg:text-base">
      <Image
        src={transaction.cashIn === user ? CashInIcon : CashOutIcon}
        alt="Icone Cash"
        width={50}
        height={40}
      />
      <div className="flex flex-col relative">
        <span className="text-sm font-bold">{transferDateFormatted}</span>
        <h2>{transaction.cashIn === user ? 'Transferência recebida.' : 'Transferência enviada.'}</h2>
        <p>{transaction.cashIn === user ? transaction.cashOut : transaction.cashIn}</p>
        <p>{Number(transaction.value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
      </div>
    </div>
  );
}
