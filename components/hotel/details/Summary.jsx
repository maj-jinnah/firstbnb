import HotelSummaryInfo from "../HotelSummaryInfo";

const Summary = ({ hotel, checkin, checkout }) => {
    return (
        <section className="py-4 mt-[100px] ">
            <div className="flex max-w-7xl mx-auto w-full px-4">
                <HotelSummaryInfo
                    hotel={hotel}
                    source="details"
                    checkin={checkin}
                    checkout={checkout}
                />
            </div>
        </section>
    );
};

export default Summary;
