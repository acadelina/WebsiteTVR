'use client';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { GetStaticPropsContext } from 'next';
import { useRef, useEffect, useState } from 'react';
import Footer from '@/components/Footer'

const teamMembers = [
  {
    name: 'Orban Katalin',
    role: 'rol Adelina',
    image: '/team/OrbanKatalin.jpg',
    description: 'descriere Adelina',
  },
  {
    name: 'Pakai Eniko',
    role: 'rol Andrei',
    image: '/team/PakaiEniko.jpg',
    description: 'descriere Andrei',
  },
  {
    name: 'Spitzer Judit',
    role: 'rol Ioana',
    image: '/team/SpitzerJudit.jpg',
    description: 'Ioana descriere',
  },
  {
    name: 'Feketelaki Tibor',
    role: 'rol Ioana',
    image: '/team/FeketelakiTibor.jpg',
    description: 'Ioana descriere',
  },
  {
    name: 'Forrai Szerenke',
    role: 'rol Ioana',
    image: '/team/ForraiSzerenke.jpg',
    description: 'Ioana descriere',
  },
  {
    name: 'Varga-Mihály Márton',
    role: 'rol Ioana',
    image: '/team/Varga-MihályMárton.jpg',
    description: 'Ioana descriere',
  },
];

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
      locale,
    },
  };
}

export default function AboutUsPage() {
  const t = useTranslations('Common');
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const width = el.offsetWidth;
      const index = Math.round(scrollLeft / (width * 0.7)); 
      setCurrent(index);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gray-100 text-black flex flex-col min-h-screen">
      <Navbar/>
      <div className="max-w-6xl mx-auto px-4 py-12 flex-grow">
        <h1 className="text-4xl font-bold text-center mb-8">{t('about')}</h1>
        <p className="text-center text-gray-600 mb-12">
        {t('description')}
        </p>

        <div
          ref={containerRef}
          className="flex overflow-x-auto gap-6 pb-4 px-4 snap-x snap-mandatory scroll-smooth"
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`flex-shrink-0 snap-center transition-transform duration-300 ease-in-out 
              ${
                current === index
                  ? 'scale-105 shadow-xl bg-white'
                  : 'scale-95 opacity-80 bg-gray-50'
              } rounded-xl p-6 text-center w-[70%] mx-auto`}
            >
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={128}
                  height={128}
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{t('presenter')}</p>
              {/* <p className="text-gray-600 text-sm">{member.description}</p> */}
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
