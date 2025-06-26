"use client";

import { signOut } from "next-auth/react";

const Logout = () => {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className=" px-1 py-2 rounded-md text-[#FF6A28] font-bold active:scale-95 transition-all"
        >
            Logout
        </button>
    );
};

export default Logout;
