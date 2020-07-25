import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Jenis'
  },
  {
    name: 'Jenis',
    url: '/jenis',
    icon: 'fa fa-list'
  },
  {
    title: true,
    name: 'Transaksi'
  },
  {
    name: 'Pemasukan',
    url: '/pemasukan',
    icon: 'fa fa-sign-in'
  },
  {
    name: 'Pengeluaran',
    url: '/pengeluaran',
    icon: 'fa fa-shopping-cart'
  },
];
