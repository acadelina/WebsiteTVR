import Link from 'next/link'
import { useRouter } from 'next/router'

export default function LanguageSwitcher() {
  const { locale, asPath } = useRouter()

  return (
    <div className="flex gap-4">
      <Link href={asPath} locale="ro">Română</Link>
      <Link href={asPath} locale="en">English</Link>
      <Link href={asPath} locale="hu">Magyar</Link>
    </div>
  )
}
