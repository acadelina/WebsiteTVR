import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GetStaticPropsContext } from 'next'


export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
      locale
    }
  }
}

export default function ContactPage() {
  const t = useTranslations('Contact');
  const locale=useLocale();
  return (
    
    <div className='bg-gray-100 text-black'>
      <Navbar/>
      <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-justify-left">
        <h1 className="text-3xl font-bold text-black-900 mb-2">{t('title')}</h1>
        <div className="flex justify-left items-center space-x-4">
          
          <p className="text-black-600 italic">{t('updated')}: {new Date().toLocaleDateString(locale, { 
            weekday: 'long', 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric' 
          })}</p>
        </div>
      </div>

      {/* Grid cu informații */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Adresa principală */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-black-800 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            {t('headquarters')}
          </h2>
          <address className="not-italic">
            <p className="mb-2">{t('address.line1')}</p>
            <p className="mb-2">{t('address.line2')}</p>
            <p>{t('address.line3')}</p>
          </address>
        </div>

        {/* Date de contact */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-black-800 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            {t('contact_data')}
          </h2>
          <ul className="space-y-2">
            <li><strong>Secretariat:</strong><a href= "tel:0264420723"  className="text-black-600 hover:underline"> +0264 420 723</a></li>
            <li><strong>{t('redactie')}:</strong><a href= "tel:0264420724"  className="text-black-600 hover:underline"> +0264 420 724</a></li>
            <li><strong>Youtube:</strong><a href= "https://www.youtube.com/@ErdelyiFigyelo"  className="text-blue-600 hover:underline"> youtube.com/@ErdelyiFigyelo</a></li>
            <li><strong>Instagram:</strong><a href="https://www.instagram.com/erdelyifigyelo" className="text-blue-600 hover:underline"> instagram.com/erdelyifigyelo</a> </li>
            <li><strong>Email: </strong> 
                <a href="mailto:erdelyifigyeloktv@gmail.com" className="text-black-600 hover:underline">erdelyifigyeloktv@gmail.com</a>  
            </li>
          </ul>
        </div>

        {/* Program */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-black-800 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {t('schedule')}
          </h2>
          <ul className="space-y-2">
            <li><strong>{t('program.luni_vineri')}:</strong> 08:00 - 20:00</li>
            <li><strong>{t('program.sambata')}:</strong> 09:00 - 14:00</li>
            <li><strong>{t('program.duminica')}</strong></li>
          </ul>
        </div>
      </div>

      {/* Harta interactiva */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black-900 mb-4">{t('location_on_map')}</h2>
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
          <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2732.803880308728!2d23.545124276180683!3d46.768762071125224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490ef646566279%3A0x57e137c97855a53b!2sTVR%20Cluj%20%C8%99i%20Radio%20Cluj!5e0!3m2!1sro!2sro!4v1753616622537!5m2!1sro!2sro" 
          width="1120" 
          height="600" 
          loading="lazy" 
          ></iframe>
        </div>
        <p className="mt-2 text-sm text-gray-500 text-center">
          {t('map_footer')} © {new Date().getFullYear()}
        </p>
      </div>
    </div>
    <Footer/>
    </div>
  )
}