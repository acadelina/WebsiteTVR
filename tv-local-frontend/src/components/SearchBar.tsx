import { useTranslations } from 'next-intl'
interface Props {
  query: string;
  setQuery: (value: string) => void;
}

export default function SearchBar({ query, setQuery }: Props) {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
  };
  const t = useTranslations()

  return (
    <form onSubmit={handleSearch} className="mb-6">
      <input
        type="text"
        placeholder={t('searchnews')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border px-4 py-2 rounded-md"
      />
    </form>
  );
}
