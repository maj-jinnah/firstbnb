import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import Logout from "./auth/Logout";

const Navbar = async ({ login }) => {

    const session = await auth();

    return (
        <nav className="max-w-7xl flex mx-auto justify-between px-4 py-4 absolute top-0 w-full left-0 right-0 z-50">
            <Link href="/">
                <Image
                    src="/stayswift.svg"
                    alt="Stay Swift Logo"
                    width={200}
                    height={200}
                    className="h-[35px] md:h-[40px] lg:h-[50px]"
                />
            </Link>

            {login && (
                <ul className="hidden md:flex items-center gap-6">
                    <li>
                        <Link href="#">About Us</Link>
                    </li>

                    <li>
                        <Link href="#">Contact us</Link>
                    </li>

                    <li>
                        <Link href="/bookings">Bookings</Link>
                    </li>

                    <li>
                        {session?.user ? (
                            <div>
                                <span className="font-bold text-[#FF6A28]">{session?.user?.name}</span>
                                <span> | </span>
                                <Logout />
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="px-6 py-3 text-white font-bold rounded-md bg-[#FF6A28] "
                            >
                                Login
                            </Link>
                        )}
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
