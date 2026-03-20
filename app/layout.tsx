import '@/app/global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Libre_Baskerville, Manrope, Roboto_Mono } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

const libreBaskerville = Libre_Baskerville({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-libre-baskerville',
});

const robotoMono = Roboto_Mono({
  weight: ['300', '400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${manrope.className} ${manrope.variable} ${libreBaskerville.variable} ${robotoMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <RootProvider
          theme={{
            defaultTheme: "dark",
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
