import { RolesEnum } from 'src/base/enums/RolesEnum.enum';
import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
    roles: [],
    children: [
      {
        displayName: 'Dashboard',
        iconName: 'solar:widget-add-line-duotone',
        route: '/dashboard',
        roles: []
      },
    ],
  },
  {
    navCap: 'Categories',
    roles: [],
    children: [
      {
        displayName: 'Categories',
        iconName: 'solar:widget-add-line-duotone',
        route: '/categories',
        roles: []
      },
    ],
  },
  {
    navCap: 'Products',
    roles: [],
    children: [
      {
        displayName: 'Products',
        iconName: 'solar:widget-add-line-duotone',
        route: '/products',
        roles: []
      },
    ],
  },
];
