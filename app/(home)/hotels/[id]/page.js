import Gallery from "@/components/hotel/details/Gallery";
import Overview from "@/components/hotel/details/Overview";
import Summary from "@/components/hotel/details/Summary";
import { getHotelById } from "@/db/queries";

const HotelDetailsPage = async ({ params, searchParams }) => {

  const { id } = await params;
  const { checkin, checkout } = await searchParams;

  const hotel = await getHotelById(id, checkin, checkout);

  return (
    <>
      <Summary hotel={hotel} />
      <Gallery gallery={hotel?.gallery} />
      <Overview overview={hotel?.overview} />
    </>
  )
}

export default HotelDetailsPage;