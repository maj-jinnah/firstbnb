"use client";

import { signOut } from "next-auth/react";

const Logout = () => {
    return (
        // <button
        //     onClick={() => signOut({ callbackUrl: "/login" })}
        //     className=" px-1 py-2 rounded-md text-[#FF6A28] font-bold active:scale-95 transition-all"
        // >
        //     Logout
        // </button>

        <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="relative group py-2 rounded-md text-[#FF6A28] font-bold active:scale-95 transition-all"
        >
            Logout
            <span className="absolute top-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#FF6A28] text-white text-xs rounded px-3 py-2 whitespace-nowrap z-10">
                Click to Logout
            </span>
        </button>
    );
};

export default Logout;
