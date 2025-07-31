import { MdAttachMoney, MdFormatListBulleted, MdTrendingDown, MdTrendingUp } from 'react-icons/md';

export const statisticsCardsData = [
  {
    color: 'blue',
    icon: MdAttachMoney,
    title: 'Saldo total',
    value: '10 000,00 Kz',
    footer: {
      color: 'text-green-500',
      value: '+55%',
      label: 'último mês',
    },
  },
  {
    color: 'red',
    icon: MdTrendingDown,
    title: 'Total de Despesas',
    value: '10 000,00 Kz',
    footer: {
      color: 'text-green-500',
      value: '+3%',
      label: 'último mês',
    },
  },
  {
    color: 'green',
    icon: MdTrendingUp,
    title: 'Total de Rendas',
    value: '10 000,00 Kz',
    footer: {
      color: 'text-red-500',
      value: '-2%',
      label: 'último mês',
    },
  },
  {
    color: 'orange',
    icon: MdFormatListBulleted,
    title: 'Total de Necessidades',
    value: '55 666',
    footer: {
      color: 'text-green-500',
      value: '+5%',
      label: 'último mês',
    },
  },
];
