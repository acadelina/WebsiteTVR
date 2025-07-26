'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl'



interface NewsFeedProps {
  query: string;
}

interface Stire {
  id: number;
  attributes: {
    titlu: string;
    descriere: {
      type: string;
      children: { type: string; text: string }[];
    }[];
    data: string;
    link?: string;
  };
}

export default function NewsFeed({ query }: NewsFeedProps) {
  const [stiri, setStiri] = useState<Stire[]>([]);
  const locale = useLocale();
  const t = useTranslations();
  console.log('Locale folosit la fetch:', locale)

useEffect(() => {

    console.log('Locale folosit la fetch:', locale)
  fetch(`http://localhost:1337/api/stires?locale=${locale}`)
    .then((res) => res.json())
    .then((data) => {
      console.log('Știri din Strapi:', data)
      setStiri(data.data)
    })
    .catch((err) => console.error('Eroare la fetch știri:', err));
}, [locale]);


  const filtrate = stiri.filter(({ attributes }) => {
    const titlu = attributes.titlu?.toLowerCase() || '';
    const descriereText =
      attributes.descriere?.[0]?.children?.[0]?.text?.toLowerCase() || '';
    const termen = query.toLowerCase();
    return titlu.includes(termen) || descriereText.includes(termen);
  });

  return (
    <div className="space-y-4">
      {filtrate.map((item) => {
        const { titlu, descriere, data, link } = item.attributes;
        const primulParagraf = descriere?.[0]?.children?.[0]?.text || '';

        return (
          <div key={item.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{titlu}</h2>
            <p className="text-sm text-gray-600">
              {new Date(data).toLocaleDateString('ro-RO')}
            </p>
            <p className="mt-2">{primulParagraf}</p>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm mt-2 block"
              >
                {t('youtube')}
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}
