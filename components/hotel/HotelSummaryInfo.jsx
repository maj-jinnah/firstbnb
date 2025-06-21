const HotelSummaryInfo = ({fromListPage}) => {
  return (
    <>
      <div className={fromListPage ? "flex-1" : "flex-1 max-w-7xl mx-auto w-full px-4"}>
        <h2 className={fromListPage ? "font-bold text-lg" : "font-bold text-2xl"}>Effotel By Sayaji Jaipur</h2>
        <p>📍 Kolkata</p>
        <div className="flex gap-2 items-center my-4">
          <div className="bg-[#FF6A28] w-[35px] h-[35px] rounded-sm text-white grid place-items-center font-bold">
            5.3
          </div>
          <span className="font-medium">Very Good</span>
          <span>232 Reviews</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-end justify-center">
        <h2 className="text-2xl font-bold text-right">$124/night</h2>
        <p className=" text-right">Per Night for 4 Rooms</p>
        {
          fromListPage ? (<button className="bg-[#FF6A28] px-8 py-2 rounded-md block text-white font-bold shadow-lg hover:shadow-primary/50 active:scale-95 transition-all">Details</button>) : (<button className="bg-[#FF6A28] px-8 py-2 rounded-md block text-white font-bold shadow-lg hover:shadow-primary/50 active:scale-95 transition-all ">Book</button>)
        }
      </div>
    </>
  );
};

export default HotelSummaryInfo;
