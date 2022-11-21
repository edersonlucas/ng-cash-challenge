import Image from 'next/image';
import ProfileImage from '../assets/img/Profile.svg';
import WalletImage from '../assets/img/Wallet.svg';

interface IProps {
  balance: number | string;
  username: string;
}

export default function BalanceCard({ username, balance }: IProps) {
  return (
    <div className="flex h-full w-full flex-col py-8 items-center max-w-[340px] shadow-lg bg-zinc-500 border-black-900 min:grow lg:border-r-4 lg:border-b-8">
      <div className="flex flex-col items-center">
        <Image
          src={ProfileImage}
          alt="Foto de perfil do usuário ederson"
          width={110}
          height={10}
        />
        <p className="text-zinc-800">{username}</p>
      </div>
      <div>
        <Image
          src={WalletImage}
          alt="Imagem de uma carteira de dinheiro"
          width={180}
          height={90}
        />
      </div>
      <div className="flex flex-col items-center">
        <strong className="text-black-900 text-4xl">
          {
          Number(balance).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        }

        </strong>
        <p className="text-zinc-800">SEU SALDO ATUAL</p>
      </div>
    </div>
  );
}
