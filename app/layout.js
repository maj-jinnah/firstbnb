import { dbConnect } from "@/db/dbConnection";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Firstbnb",
  description: "Vacation rentals, cabins, beach houses, & more",
};

export default async function RootLayout({ children }) {

  await dbConnect();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer position="top-center" theme="dark"/>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}