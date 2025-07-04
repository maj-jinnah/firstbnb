import Image from "next/image";
import HotelSummaryInfo from "./HotelSummaryInfo";

const HotelCard = ({ hotel, checkin, checkout }) => {
    return (
        <div className="flex gap-6 p-4 rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <Image
                src={hotel?.thumbNailUrl}
                alt={hotel?.name}
                width={240}
                height={165}
                className="max-h-[162px] max-w-[240px]"
            />
            <HotelSummaryInfo
                hotel={hotel}
                fromListPage={true}
                checkin={checkin}
                checkout={checkout}
            />
        </div>
    );
};

export default HotelCard;
