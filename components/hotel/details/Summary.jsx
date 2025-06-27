import HotelSummaryInfo from "../HotelSummaryInfo";

const Summary = ({hotel}) => {
  return (
    <section className="py-4 mt-[100px] ">
      <div className="flex max-w-7xl mx-auto w-full px-4">
        <HotelSummaryInfo hotel={hotel} source="details"/>
      </div>
    </section>
  );
};

export default Summary;

