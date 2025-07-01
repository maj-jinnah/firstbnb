"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const PaymentForm = ({ user, hotelId, checkin, checkout, cost }) => {
    const router = useRouter();
    const [error, setError] = useState("");

    const handelSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const userId = user?._id;
        const checkin = formData.get("checkin");
        const checkout = formData.get("checkout");

        try {
            const res = await fetch("/api/auth/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, hotelId, checkin, checkout }),
            });

            const data = await res.json();

            if (res.status === 201) {
                toast.success(
                    data.message || "Congratulation, your payment is successful."
                );
                router.push("/bookings");
            } else {
                console.log(data);
                toast.error(data.message);
                setError(data.message || "Something went wrong.");
            }
        } catch (error) {
            console.log(error.message);
            setError(error.message);
        }
    };

    return (
        <form className="my-8" onSubmit={handelSubmit}>
            <div className="my-4 space-y-2">
                <label htmlFor="name" className="block">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
                    value={user?.name}
                    readOnly
                />
            </div>

            <div className="my-4 space-y-2">
                <label htmlFor="email" className="block">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
                    value={user?.email}
                    readOnly
                />
            </div>

            <div className="my-4 space-y-2">
                <span>Check in</span>
                <h4 className="mt-2">
                    <input
                        className="w-full px-4 py-2 rounded-md border border-black/20 bg-transparent"
                        type="date"
                        name="checkin"
                        id="checkin"
                        value={checkin}
                        readOnly
                    />
                </h4>
            </div>

            <div className="my-4 space-y-2">
                <span>Checkout</span>
                <h4 className="mt-2">
                    <input
                        className="w-full px-4 py-2 rounded-md border border-black/20 bg-transparent"
                        type="date"
                        name="checkout"
                        id="checkout"
                        value={checkout}
                        readOnly
                    />
                </h4>
            </div>

            <div className="my-4 space-y-2">
                <label htmlFor="card" className="block">
                    Card Number
                </label>
                <input
                    type="text"
                    id="card"
                    placeholder="Enter any card number. Ex: xxxx-xxxx-xxxx-xxxx"
                    className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
                />
            </div>

            <div className="my-4 space-y-2">
                <label htmlFor="expiry" className="block">
                    Expiry Date
                </label>
                <input
                    type="text"
                    id="expiry"
                    placeholder="Enter expiry date. Ex: MM/YY"
                    className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
                />
            </div>

            <div className="my-4 space-y-2">
                <label htmlFor="cvv" className="block">
                    CVV
                </label>
                <input
                    type="text"
                    id="cvv"
                    placeholder="Enter CVV number Ex: 123"
                    className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
                />
            </div>

            <button
                type="submit"
                className="bg-[#FF6A28] px-8 py-2 rounded-md block text-white font-bold shadow-lg hover:shadow-primary/50 active:scale-95 transition-all w-full"
            >
                Pay Now ( ৳ {cost} )
            </button>
        </form>
    );
};

export default PaymentForm;
