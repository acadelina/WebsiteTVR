'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

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
    imagine?: {
      data?: {
        attributes?: {
          url: string;
        };
      };
    };
  };
}

export default function NewsFeed({ query }: NewsFeedProps) {
  const [stiri, setStiri] = useState<Stire[]>([]);
  const locale = useLocale();
  const t = useTranslations('Common');

  useEffect(() => {
    fetch(`http://localhost:1337/api/stires?locale=${locale}&populate=imagine`)
      .then((res) => res.json())
      .then((data) => setStiri(data.data))
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
    <div className="space-y-6">
      {filtrate.map((item) => {
        const { titlu, descriere, data, link, imagine } = item.attributes;
        const primulParagraf = descriere?.[0]?.children?.[0]?.text || '';
        const imageUrl = imagine?.data?.attributes?.url
          ? `http://localhost:1337${imagine.data.attributes.url}`
          : null;

        return (
          <div key={item.id} className="bg-white p-6 rounded shadow space-y-4">
            {/* Titlu și dată sus */}
            <div>
              <h2 className="text-xl font-bold">{titlu}</h2>
              <p className="text-sm text-gray-600">
                {new Date(data).toLocaleDateString('ro-RO')}
              </p>
            </div>

            {/* Imagine + Descriere pe un rând */}
            <div className="flex gap-6 items-start">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={titlu}
                  className="w-55 h-40 object-cover rounded-md flex-shrink-0"
                />
              )}

              <div className="flex-1">
                <p className="text-gray-700">{primulParagraf}</p>
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm mt-2 inline-block"
                  >
                    {t('youtube')}
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
