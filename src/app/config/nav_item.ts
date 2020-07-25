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
    name: 'Product'
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
];
