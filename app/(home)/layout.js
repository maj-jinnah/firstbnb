import Navbar from "@/components/Navbar";
import { Geist, Geist_Mono } from "next/font/google";
import { dbConnect } from "@/db/dbConnection";
import "../globals.css"
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Firstbnb | Vacation rentals, cabins, beach houses, & more",
  description: "Vacation rentals, cabins, beach houses, & more",
};

export default async function RootLayout({ children }) {

  await dbConnect();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar login={true} />
        <ToastContainer position="top-center" theme="dark" />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
