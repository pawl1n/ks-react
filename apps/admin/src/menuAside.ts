import {
  mdiImage,
  mdiMonitor,
  mdiPlus,
  mdiTshirtCrew,
  mdiTshirtCrewOutline,
  mdiVariable,
} from '@mdi/js';
import { MenuAsideItem } from 'types/style';

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: mdiMonitor,
    label: 'Огляд',
  },
  {
    href: '/products',
    label: 'Речі',
    icon: mdiTshirtCrew,
    menu: [
      {
        href: '/products/create',
        label: 'Створити',
        icon: mdiPlus,
      },
    ],
  },
  {
    href: '/categories',
    label: 'Категорії',
    icon: mdiTshirtCrewOutline,
    menu: [
      {
        href: '/categories/create',
        label: 'Створити',
        icon: mdiPlus,
      },
    ],
  },
  {
    href: '/images',
    label: 'Зображення',
    icon: mdiImage,
    menu: [
      {
        href: '/images/create',
        label: 'Створити',
        icon: mdiPlus,
      },
    ],
  },
  {
    href: '/variations',
    label: 'Варіації',
    icon: mdiVariable,
    menu: [
      {
        href: '/variations/create',
        label: 'Створити',
        icon: mdiPlus,
      },
    ],
  },
  // {
  //   href: '/tables',
  //   label: 'Tables',
  //   icon: mdiTable,
  // },
  // {
  //   href: '/forms',
  //   label: 'Forms',
  //   icon: mdiSquareEditOutline,
  // },
  // {
  //   href: '/ui',
  //   label: 'UI',
  //   icon: mdiTelevisionGuide,
  // },
  // {
  //   href: '/responsive',
  //   label: 'Responsive',
  //   icon: mdiResponsive,
  // },
  // {
  //   href: '/',
  //   label: 'Styles',
  //   icon: mdiPalette,
  // },
  // {
  //   href: '/profile',
  //   label: 'Profile',
  //   icon: mdiAccountCircle,
  // },
  // {
  //   href: '/login',
  //   label: 'Login',
  //   icon: mdiLock,
  // },
  // {
  //   href: '/error',
  //   label: 'Error',
  //   icon: mdiAlertCircle,
  // },
];

export default menuAside;
