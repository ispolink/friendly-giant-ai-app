import './globals.css'

export const metadata = {
  title: 'Friendly Giant AI Agent',
  description: 'Friendly Giant AI Agent',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
