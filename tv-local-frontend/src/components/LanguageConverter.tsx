'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const languages = [
  { code: 'ro', name: 'Română', flag: 'ro' },
  { code: 'en', name: 'English', flag: 'gb' },
  { code: 'hu', name: 'Magyar', flag: 'hu' },
];

export default function LanguageSwitcher() {
  const { locale, asPath } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((lang) => lang.code === locale) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-100 transition"
      >
        <Image
          src={`https://flagcdn.com/w20/${currentLang.flag}.png`}
          alt={`${currentLang.name} flag`}
          width={20}
          height={15}
          className="rounded-sm"
        />
        <span className="text-sm">{currentLang.name}</span>
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
          {languages
            .filter((lang) => lang.code !== locale)
            .map(({ code, name, flag }) => (
              <Link
                key={code}
                href={asPath}
                locale={code}
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 transition"
                onClick={() => setIsOpen(false)}
              >
                <Image
                  src={`https://flagcdn.com/w20/${flag}.png`}
                  alt={`${name} flag`}
                  width={20}
                  height={15}
                  className="rounded-sm"
                />
                <span>{name}</span>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
