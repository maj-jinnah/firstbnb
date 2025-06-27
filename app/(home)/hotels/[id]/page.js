import Summary from "@/components/hotel/details/Summary"
import Gallery from "@/components/hotel/details/Gallery"
import Overview from "@/components/hotel/details/Overview"
import { getHotelById } from "@/db/queries";

const HotelDetailsPage = async({params}) => {

  const {id} = await params;

  const hotel = await getHotelById(id);

  // console.log(hotel)

  return (
    <>
        <Summary hotel={hotel} />
        <Gallery gallery={hotel?.gallery} />
        <Overview overview={hotel?.overview} />
    </>
  )
}

export default HotelDetailsPage;