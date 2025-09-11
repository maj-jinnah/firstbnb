import { getAllHotels } from "@/db/queries";
import HotelCard from "./HotelCard";
import NoHotels from "./NoHotels";

const HotelList = async ({ destination, checkin, checkout, category, priceRange, rate, amenities }) => {
    
    const allHotels = await getAllHotels(
        destination,
        checkin,
        checkout,
        category,
        priceRange,
        rate,
        amenities
    );

    return (
        <div className="col-span-9">
            {allHotels.length > 0 && (
                <p className="mb-5 font-bold text-center">
                    Number of hotels: {allHotels.length}
                </p>
            )}
            <div className="space-y-4">
                {allHotels.length > 0 ? (
                    allHotels.map((hotel) => (
                        <HotelCard
                            key={hotel._id}
                            hotel={hotel}
                            checkin={checkin}
                            checkout={checkout}
                        />
                    ))
                ) : (
                    <NoHotels />
                )}
            </div>
        </div>
    );
};

export default HotelList;
