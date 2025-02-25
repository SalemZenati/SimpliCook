import { Poppins, Nunito } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "600", "700"], // Include desired weights
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["300", "400", "600", "700"],
});

export const metadata = {
  title: "SimpliCook",
  description: "Experience modern, smooth cooking recipes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${nunito.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
