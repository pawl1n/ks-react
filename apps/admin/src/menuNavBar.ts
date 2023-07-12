import { mdiAccount, mdiLogout, mdiThemeLightDark } from '@mdi/js';
import { MenuNavBarItem } from 'types/style';

const menuNavBar: MenuNavBarItem[] = [
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: 'Профіль',
        href: '/profile',
      },
      // {
      //   icon: mdiCogOutline,
      //   label: 'Налаштування',
      // },
      {
        isDivider: true,
      },
      {
        icon: mdiLogout,
        label: 'Вихід',
        isLogout: true,
      },
    ],
  },
  {
    icon: mdiThemeLightDark,
    label: 'Світла/Темна тема',
    isDesktopNoLabel: true,
    isToggleLightDark: true,
  },
  // {
  //   icon: mdiLogout,
  //   label: 'Вихід',
  //   isDesktopNoLabel: true,
  //   isLogout: true,
  // },
];

export default menuNavBar;
