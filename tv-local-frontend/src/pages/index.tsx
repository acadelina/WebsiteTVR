//'use client';
import Image from 'next/image'
import { useState } from 'react';
import Footer from '@/components/Footer'
import NewsFeed from '@/components/NewsFeed';
import SearchBar from '@/components/SearchBar';
import Navbar from '@/components/Navbar';
import { useTranslations } from 'next-intl'
import { GetStaticPropsContext } from 'next'


export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
      locale
    }
  }
}

export default function Home() {
  //const t = useTranslations('Common')
  const [query, setQuery] = useState('');

  return (
    <main className="min-h-screen bg-gray-100 text-black">
      
      <Navbar/>
      <div className='container mx-auto px-4 py-6'>
        <SearchBar query={query} setQuery={setQuery} />
        <NewsFeed query={query} />
      </div>
      <Footer/>
    </main>
    
  );
}
