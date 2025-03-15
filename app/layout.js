import { Poppins } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata = {
  title: "XploraCancun - Plataforma de Turismo",
  description: "Conectando viajantes a experiências autênticas em Cancún",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}

