"use client";

import { loginUsingCredentials } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const LoginForm = () => {
    const [error, setError] = useState("");

    const router = useRouter();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const formData = new FormData(e.currentTarget);
    //         const response = await loginUsingCredentials(formData);

    //         if (!response.success) {
    //             toast.error(response.error || "Invalid credentials");
    //             setError("Invalid credentials");
    //         } else {
    //             toast.success("Successfully logged in.");
    //             router.push("/bookings");
    //         }
    //     } catch (error) {
    //         toast.error(error.message || "Something went wrong");
    //     }
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const formData = new FormData(e.currentTarget);
    //         const response = await loginUsingCredentials(formData);

    //         if (!response.success) {
    //             toast.error(
    //                 response.error ||
    //                     "Something went wrong. Please try again later."
    //             );
    //             return;
    //         }

    //         toast.success("Successfully logged in.");
    //         router.push("/bookings");
    //     } catch (error) {
    //         // This is for truly unexpected client-side errors
    //         toast.error(
    //             error.message || "Something went wrong. Please try again."
    //         );
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.currentTarget);
            const response = await loginUsingCredentials(formData);

            if (!response.success) {
                toast.error(
                    response.error ||
                        "Something went wrong. Please try again later."
                );
                return;
            }

            toast.success("Successfully logged in.");
            router.push("/bookings");
        } catch (error) {
            toast.error(
                error.message || "Something went wrong. Please try again."
            );
        }
    };

    return (
        <>
            {error && (
                <div className="text-red-500 text-md text-center">{error}</div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col my-6">
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
                    Login
                </button>
            </form>
        </>
    );
};

export default LoginForm;
