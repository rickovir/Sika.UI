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
    name: 'Product',
    url: '/product',
    icon: 'fa fa-cube'
  },
  {
    title: true,
    name: 'Category'
  },
  {
    name: 'Category',
    url: '/category',
    icon: 'fa fa-list'
  },
];
