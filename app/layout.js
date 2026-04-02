import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// No JS, a gente tira o ": Metadata"
export const metadata = {
  title: "Pintura no CAPS",
  description: "Projeto de pintura e terapia no CAPS de Nova Andradina.",
};

// Aqui a gente tira toda aquela definição de types do children
export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}