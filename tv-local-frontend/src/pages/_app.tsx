import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { IntlProvider } from "next-intl"

export default function App({ Component, pageProps }: AppProps) {
  return (
     <IntlProvider messages={pageProps.messages} locale={pageProps.locale} >
      <Component {...pageProps} />
    </IntlProvider>
  )
}
