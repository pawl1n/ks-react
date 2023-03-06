import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import CardBox from '../components/CardBox';
import LayoutGuest from '../layouts/Guest';
import SectionMain from '../components/SectionMain';
import { StyleKey } from '../interfaces';
import { gradientBgPurplePink } from '../colors';
import { appTitle } from '../config';
import { useAppDispatch } from '../stores/hooks';
import { setDarkMode, setStyle } from '../stores/styleSlice';

const StyleSelect = () => {
  const dispatch = useAppDispatch();

  dispatch(setDarkMode(false));

  const styles: StyleKey[] = ['white', 'basic'];

  const router = useRouter();

  const handleStylePick = (e: React.MouseEvent, style: StyleKey) => {
    e.preventDefault();

    dispatch(setStyle(style));

    router.push('/dashboard');
  };

  return (
    <>
      <Head>
        <title>{appTitle}</title>
      </Head>
      <div
        className={`flex min-h-screen items-center justify-center ${gradientBgPurplePink}`}
      >
        <SectionMain>
          <h1 className="mt-12 mb-3 text-center text-4xl font-bold text-white md:text-5xl lg:mt-0">
            Pick a style&hellip;
          </h1>
          <h2 className="mb-12 text-center text-xl text-white md:text-xl">
            Style switching with a single{' '}
            <code className="rounded bg-white bg-opacity-20 px-1.5 py-0.5">
              action()
            </code>
          </h2>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 lg:grid-cols-2">
            {styles.map((style) => (
              <CardBox
                key={style}
                className="cursor-pointer bg-gray-50"
                isHoverable
                onClick={(e) => handleStylePick(e, style)}
              >
                <div className="mb-3 md:mb-6">
                  <Image
                    src={`https://static.justboil.me/templates/one/small/${style}-v3.png`}
                    width={1280}
                    height={720}
                    alt={style}
                  />
                </div>
                <h1 className="text-xl font-black capitalize md:text-2xl">
                  {style}
                </h1>
                <h2 className="text-lg md:text-xl">& Dark mode</h2>
              </CardBox>
            ))}
          </div>
        </SectionMain>
      </div>
    </>
  );
};

StyleSelect.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};

export default StyleSelect;
