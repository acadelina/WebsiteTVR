import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu } from 'lucide-react' 
import { useTranslations } from 'next-intl'
import LanguageConverter from '@/components/LanguageConverter'
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('Common')

  return (
    <nav className="relative bg-white shadow-md p-4">
      <div className="flex justify-between items-center">
         <div className="flex items-center space-x-2">
          
          <Image src="/logo.jpg" alt="Logo TV" width={40} height={40}  className="rounded-md"/>
          <div className="text-xl font-bold">{t('title')}</div>
        </div>
        

       
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Meniu dropdown */}
      {isOpen && (
        <ul className="fixed absolute right-0 mt-4 space-y-2 bg-gray-100 p-4 rounded-md shadow z-50 flex flex-col items-end">
           <li><Link href="/" onClick={() => setIsOpen(false)}>{t('news')}</Link></li>
          <li><Link href="/aboutus" onClick={() => setIsOpen(false)}>{t('about')}</Link></li>
          <li><Link href="/polls" onClick={() => setIsOpen(false)}>{t('pools')}</Link></li>
          <li><Link href="/contact" onClick={() => setIsOpen(false)}>{t('contact')}</Link></li>
          <li><Link href="/celebrities" onClick={() => setIsOpen(false)}>{t('celebrities')}</Link></li>
          <li><Link href="/sport_news" onClick={() => setIsOpen(false)}>{t('sport')}</Link></li>
          <li><Link href="/education_news" onClick={() => setIsOpen(false)}>{t('education')}</Link></li>
          <li><Link href="/music_news" onClick={() => setIsOpen(false)}>{t('music')}</Link></li>
          <li><Link href="/political_news" onClick={() => setIsOpen(false)}>{t('politic')}</Link></li>
          <li><Link href="/economical_news" onClick={() => setIsOpen(false)}>{t('economic')}</Link></li>
          <LanguageConverter/>
        </ul>
      
      )}
    </nav>
  )
}
