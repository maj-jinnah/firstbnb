import HotelSummaryInfo from "../HotelSummaryInfo";

const Summary = () => {
  return (
    <section className="py-4 mt-[100px] ">
      <div className="flex max-w-7xl mx-auto w-full px-4">
        <HotelSummaryInfo source="details"/>
      </div>
    </section>
  );
};

export default Summary;

