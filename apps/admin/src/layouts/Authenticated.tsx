import React, { type ReactNode, useEffect, useState } from "react";
import { mdiBackburger, mdiForwardburger, mdiMenu } from "@mdi/js";
import menuAside from "../menuAside";
import menuNavBar from "../menuNavBar";
import BaseIcon from "../components/BaseIcon";
import NavBar from "../components/NavBar";
import NavBarItemPlain from "../components/NavBarItemPlain";
import AsideMenu from "../components/AsideMenu";
import FooterBar from "../components/FooterBar";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { useRouter } from "next/router";
import { setDarkMode } from "../stores/styleSlice";
import { useGetMeQuery } from "../services/users";
import ToastContainer from "../components/ToastContainer";

type Props = {
  children: ReactNode;
};

export default function LayoutAuthenticated({ children }: Props) {
  const dispatch = useAppDispatch();

  const { isLoading, data } = useGetMeQuery();

  const darkMode = useAppSelector((state) => state.style.darkMode);

  const [isAsideMobileExpanded, setIsAsideMobileExpanded] = useState(false);
  const [isAsideLgActive, setIsAsideLgActive] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const preferredColorScheme = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );

    const handleDarkModeChange = () => {
      dispatch(setDarkMode(preferredColorScheme.matches));
    };

    handleDarkModeChange();

    preferredColorScheme.addEventListener("change", handleDarkModeChange);

    const handleRouteChangeStart = () => {
      setIsAsideMobileExpanded(false);
      setIsAsideLgActive(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      preferredColorScheme.removeEventListener("change", handleDarkModeChange);
    };
  }, [router.events, dispatch]);

  const layoutAsidePadding = "xl:pl-60";

  return (
    <div
      className={`${darkMode ? "dark" : ""
        } overflow-hidden lg:overflow-visible`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <BaseIcon path={mdiBackburger} className="animate-spin" />
        </div>
      ) : data?.role !== "ADMIN" ? (
        <div
          className={`${layoutAsidePadding} min-h-screen w-screen bg-gray-50 transition-position dark:bg-slate-800 dark:text-slate-100`}
        />
      ) : (
        <div
          className={`${layoutAsidePadding} ${isAsideMobileExpanded ? "ml-60 lg:ml-0" : ""
            } min-h-screen w-screen bg-gray-50 transition-position dark:bg-slate-800 dark:text-slate-100 lg:w-auto`}
        >
          <NavBar
            menu={menuNavBar}
            className={`${layoutAsidePadding} ${isAsideMobileExpanded ? "lg:ml-0" : ""
              }`}
          >
            <NavBarItemPlain
              display="flex lg:hidden"
              onClick={() => setIsAsideMobileExpanded(!isAsideMobileExpanded)}
            >
              <BaseIcon
                path={isAsideMobileExpanded ? mdiBackburger : mdiForwardburger}
                size="24"
              />
            </NavBarItemPlain>
            <NavBarItemPlain
              display="hidden lg:flex xl:hidden"
              onClick={() => setIsAsideLgActive(true)}
            >
              <BaseIcon path={mdiMenu} size="24" />
            </NavBarItemPlain>
          </NavBar>
          <AsideMenu
            isAsideMobileExpanded={isAsideMobileExpanded}
            isAsideLgActive={isAsideLgActive}
            menu={menuAside}
            onAsideLgClose={() => setIsAsideLgActive(false)}
          />
          {children}
          <FooterBar />
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
