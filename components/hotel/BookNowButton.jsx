'use client';

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const BookNowButton = ({ hotelId, params, checkin, checkout }) => {
    
    const router = useRouter();

    return (
        <button
            onClick={() => {
                if (!checkin || !checkout) {
                    toast.error(
                        "Please select check-in and check-out dates to book a hotel."
                    );
                    return;
                }

                router.push(`/hotels/${hotelId}/payment${params}`);
            }}
            className="bg-[#FF6A28] px-8 py-2 rounded-md block text-white font-bold shadow-lg hover:shadow-primary/50 active:scale-95 transition-all"
        >
            Book Now
        </button>
    );
};

export default BookNowButton;
