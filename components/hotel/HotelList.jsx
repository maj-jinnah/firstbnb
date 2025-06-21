import { getAllHotels } from "@/db/queries";
import HotelCard from "./HotelCard";

const HotelList = async() => {

  const allHotels = await getAllHotels();

  return (
    <div className="col-span-9">
      <div className="space-y-4">
       <HotelCard />
      </div>
    </div>
  );
};

export default HotelList;
