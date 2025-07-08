import Navbar from "@/components/Navbar";
import { dbConnect } from "@/db/dbConnection";
import "../globals.css";

export default async function RootLayout({ children }) {

  await dbConnect();

  return (
    <>
      <Navbar login={true} />
      <div>
        {children}
      </div>
    </>
  );
}
