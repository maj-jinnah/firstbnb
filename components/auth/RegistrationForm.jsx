"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const RegistrationForm = () => {
    // const [error, setError] = useState("");
    const router = useRouter();

    const handelSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.currentTarget);
            const fname = formData.get("fname");
            const lname = formData.get("lname");
            const email = formData.get("email");
            const password = formData.get("password");

            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fname, lname, email, password }),
            });

            const responseData = await response.json();

            if (response.status === 201) {
                toast.success(
                    responseData.message || "Registration successful."
                );
                router.push("/login");
            } else {
                // console.log(responseData);
                toast.error(responseData.message);
                // setError(responseData.message || "Something went wrong.");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            {/* {error && (
                <div className="text-red-500 text-md text-center">{error}</div>
            )} */}

            <form onSubmit={handelSubmit} className="flex flex-col my-6">
                <div className="flex flex-col gap-2 my-2">
                    <label htmlFor="fname">First Name</label>
                    <input
                        className="border border-black/20 rounded-md px-4 py-2"
                        type="text"
                        name="fname"
                        id="fname"
                        required
                    />
                </div>

                <div className="flex flex-col gap-2 my-2">
                    <label htmlFor="lname">Last Name</label>
                    <input
                        className="border border-black/20 rounded-md px-4 py-2"
                        type="text"
                        name="lname"
                        id="lname"
                    />
                </div>

                <div className="flex flex-col gap-2 my-2">
                    <label htmlFor="email">Email Address</label>
                    <input
                        className="border border-black/20 rounded-md px-4 py-2"
                        type="email"
                        name="email"
                        id="email"
                        required
                    />
                </div>

                <div className="flex flex-col gap-2 my-2">
                    <label htmlFor="password">Password</label>
                    <input
                        className="border border-black/20 rounded-md px-4 py-2"
                        type="password"
                        name="password"
                        id="password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-[#FF6A28] px-8 py-2 rounded-md block text-white font-bold shadow-lg hover:shadow-primary/50 active:scale-95 transition-all w-full mt-4"
                >
                    Create account
                </button>
            </form>
        </>
    );
};

export default RegistrationForm;
