'use client';
import Head from 'next/head';
import Footer from '../components/Footer';
import { useLocale, useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
      locale
    }
  };
}


const PersonalitatiPage = () => {
  // Sample data - replace with your actual content
  const t = useTranslations('Celebrities');
  const locale=useLocale();
  const personalities = [
    // Artists
    {
      category: t('artists'),
      items: [
        {
          id: 1,
          name: 'Katlan',
          description: t('description_art.d1'),
          image: '/celebritati/katlan.jpg',
          youtubeLink: 'https://youtu.be/SnZF6gfddo0?si=403aJT2CkijKMW7L'
        },
        {
          id: 2,
          name: 'Emilia Chirilă',
          description: t('description_art.d2'),
          image: '/celebritati/emilia_chirila.jpg',
          youtubeLink: 'https://youtu.be/wdubKbLURAM?si=Kj9tfWyErwsoH8OZ'
        },
        {
          id: 3,
          name: 'Zoltán Majó',
          description: t('description_art.d3'),
          image: '/celebritati/zoltan.jpg',
          youtubeLink: 'https://youtu.be/or_NJhsaOew?si=K3UNkKolnUPMIhmM'
        },
        {
          id: 4,
          name: 'Edina Fodor',
          description: t('description_art.d4'),
          image: '/celebritati/edina.jpg',
          youtubeLink: 'https://youtu.be/OJm-W1mntCY?si=kWWLjB0KcP6E4N1F'
        }
      ]
    },
    // Writers
    {
      category: t('writers'),
      items: [
        {
          id: 5,
          name: 'Katarina Durica',
          description: t('description_wrt.d1'),
          image: '/celebritati/katarina.png',
          youtubeLink: 'https://youtu.be/KHUXX-kQQwE?si=reNEU6w55tErW2JB'
        },
        {
          id: 6,
          name: 'Dragomán György',
          description: t('description_wrt.d2'),
          image: '/celebritati/dragoman.jpg',
          youtubeLink: 'https://youtu.be/RPYZq1cubEw?si=NEMITxpoScQtzRcD'
        }
      ]
    },
    // Scientists
    {
      category: t('scientists'),
      items: [
        {
          id: 9,
          name: 'Dr. László Csaba Dégi',
          description: t('description_sci.d1'),
          image: '/celebritati/laszlo.jpeg',
          youtubeLink: 'https://youtu.be/7pLijIhszMI?si=gDaffDOQCGXncMRZ'
        },
        {
          id: 10,
          name: 'Mátis Jenő',
          description: t('description_sci.d2'),
          image: '/celebritati/matis.webp',
          youtubeLink: 'https://youtu.be/9sTNW-ECCN0?si=Antu0vtbMvg9ZYDX'
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-black">
    <div>
    <Navbar/>
    <div className="min-h-screen bg-gray-50">
      
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center text-black-800 mb-12">{t('title')}</h1>
        
        {personalities.map((section) => (
          <section key={section.category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">{section.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.items.map((person) => (
                <div key={person.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48 bg-gray-200 overflow-hidden -mt-4">
            <img 
              src={person.image} 
              alt={person.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
                 
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{person.name}</h3>
                    <p className="text-gray-600 mb-4">{person.description}</p>
                    {person.youtubeLink && (
                      <a 
                        href={person.youtubeLink} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                        </svg>
                        {t('button')}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
    </div>
    <Footer/>
    </div>
  );
};

export default PersonalitatiPage;