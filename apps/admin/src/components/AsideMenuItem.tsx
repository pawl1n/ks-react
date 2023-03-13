import { useEffect, useState } from 'react';
import { mdiMinus, mdiPlus } from '@mdi/js';
import BaseIcon from './BaseIcon';
import Link from 'next/link';
import { getButtonColor } from '../colors';
import AsideMenuList from './AsideMenuList';
import { MenuAsideItem } from '../interfaces';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { useRouter } from 'next/router';
import { setToken } from '../stores/tokenSlice';

type Props = {
  item: MenuAsideItem;
  isDropdownList?: boolean;
};

const AsideMenuItem = ({ item, isDropdownList = false }: Props) => {
  const [isLinkActive, setIsLinkActive] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const dispatch = useAppDispatch();

  const asideMenuItemStyle = useAppSelector(
    (state) => state.style.asideMenuItemStyle,
  );
  const asideMenuDropdownStyle = useAppSelector(
    (state) => state.style.asideMenuDropdownStyle,
  );
  const asideMenuItemActiveStyle = useAppSelector(
    (state) => state.style.asideMenuItemActiveStyle,
  );

  const activeClassAddon =
    !item.color && isLinkActive ? asideMenuItemActiveStyle : '';

  const { asPath, isReady } = useRouter();

  useEffect(() => {
    if (item.href && isReady) {
      const linkPathName = new URL(item.href, location.href).pathname;

      const activePathname = new URL(asPath, location.href).pathname;

      setIsLinkActive(linkPathName === activePathname);
    }
  }, [item.href, isReady, asPath]);

  const asideMenuItemInnerContents = (
    <>
      {item.icon && (
        <BaseIcon
          path={item.icon}
          className={`flex-none ${activeClassAddon}`}
          w="w-16"
          size="18"
        />
      )}
      <span
        className={`grow text-ellipsis line-clamp-1 ${
          item.menu ? '' : 'pr-12'
        } ${activeClassAddon}`}
      >
        {item.label}
      </span>
    </>
  );

  const componentClass = [
    'flex cursor-pointer w-full',
    isDropdownList ? 'py-3 px-6 text-sm' : 'py-3',
    item.color
      ? getButtonColor(item.color, false, true)
      : `${asideMenuItemStyle} dark:text-slate-300 dark:hover:text-white`,
  ].join(' ');

  return (
    <li>
      {item.isLogout && (
        <div
          className={componentClass}
          onClick={() => {
            dispatch(setToken({ token: '' }));
          }}
        >
          {asideMenuItemInnerContents}
        </div>
      )}
      {item.href && !item.menu && (
        <Link href={item.href} target={item.target} className={componentClass}>
          {asideMenuItemInnerContents}
        </Link>
      )}
      {item.href && item.menu && (
        <div className={componentClass}>
          <Link href={item.href} target={item.target} className="flex-1 flex">
            {asideMenuItemInnerContents}
          </Link>
          <BaseIcon
            onClick={() => setIsDropdownActive(!isDropdownActive)}
            path={isDropdownActive ? mdiMinus : mdiPlus}
            className={`flex-none mr-0 ml-auto ${activeClassAddon}`}
            w="w-12"
          />
        </div>
      )}
      {!item.href && item.menu && (
        <div onClick={() => setIsDropdownActive(!isDropdownActive)}>
          {asideMenuItemInnerContents}
          <BaseIcon
            path={isDropdownActive ? mdiMinus : mdiPlus}
            className={`flex-none ${activeClassAddon}`}
            w="w-12"
          />
        </div>
      )}
      {item.menu && (
        <AsideMenuList
          menu={item.menu}
          className={`${asideMenuDropdownStyle} ${
            isDropdownActive ? 'block dark:bg-slate-800/50' : 'hidden'
          }`}
          isDropdownList
        />
      )}
    </li>
  );
};

export default AsideMenuItem;
