export const SETTINGS_MENUS = {
  SETTINGS: {
    href: '/settings',
    title: 'Geral',
    name: 'settings' as const,
    description: 'Ajuste moeda e preferências da conta.',
  },
  CATEGORIES: {
    href: '/settings/categories',
    title: 'Categorias',
    name: 'categories' as const,
    description: 'Crie categorias para organizar suas finanças.',
  },
  ACCOUNTS: {
    href: '/settings/accounts',
    title: 'Contas',
    name: 'accounts' as const,
    description: 'Vincule contas bancárias e carteiras digitais.',
  },
  LOCATIONS: {
    href: '/settings/locations',
    title: 'Locais',
    name: 'locations' as const,
    description: 'Cadastre locais de compra ou fornecedores para analisar seus gastos.',
  },
};

export const MAIN_MENUS = {
  DASHBOARD: {
    href: '/dashboard',
    title: 'Dashboard',
    name: 'dashboard' as const,
    description: 'Visão geral com gráficos e indicadores financeiros.',
    icon: 'chart-pie',
  },
  TRANSACTIONS: {
    href: '/transactions',
    title: 'Transações',
    name: 'transactions' as const,
    description: 'Veja, adicione e edite suas rendas e despesas.',
    icon: 'arrow-right-left',
  },
  INCOMES: {
    href: '/incomes',
    title: 'Rendas',
    name: 'incomes' as const,
    description: 'Registre e acompanhe suas fontes de renda.',
    icon: 'hand-coins', //'piggy-bank',
  },
  EXPENSES: {
    href: '/expenses',
    title: 'Despesas',
    name: 'expenses' as const,
    description: 'Controle seus gastos e categorize suas despesas.',
    icon: 'circle-dollar-sign', //'coins',
  },
  WALLET: {
    href: '/wallet',
    title: 'Carteira',
    name: 'wallet' as const,
    description: 'Gerencie saldos de várias carteiras e moedas.',
    icon: 'wallet',
  },
  WISHLIST: {
    href: '/wishlist',
    title: 'Lista de Desejos',
    name: 'wishlist' as const,
    description: 'Planeje compras e metas de economia futuras.',
    icon: 'clipboard-list',
  },
};
