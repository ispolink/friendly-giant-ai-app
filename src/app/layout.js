import { headers } from 'next/headers';
import ContextProvider from '@/context'
import "./globals.css";

export const metadata = {
  title: "Friendly Giant AI Agent",
  description: "Friendly Giant AI Agent",
};

export default function RootLayout({ children }) {
  const cookies = headers().get('cookie')

  return (
    <html lang="en">
      <body>
        <ContextProvider cookies={cookies}>{children}</ContextProvider>
      </body>
    </html>
  );
}
