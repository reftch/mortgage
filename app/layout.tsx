import './styles/index.scss'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mortage calculator',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/euro.svg"/>
      </head>
      <body>{children}</body>
    </html>
  )
}