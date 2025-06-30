
import HotelList from "@/components/hotel/HotelList";
import Filter from "@/components/search/Filter";
import Search from "@/components/search/Search";



const HotelListPage = async ({ searchParams }) => {

    const { destination, checkin, checkout } = await searchParams;

    return (
        <>
            <section className="bg-[url('/hero-bg.jpg')] bg-cover bg-no-repeat bg-center pt-[100px] pb-[60px]">
                <div className="max-w-7xl mx-auto w-full px-4 items-center py-12 ">
                    <Search
                        fromList={true}
                        destination={destination}
                        checkin={checkin}
                        checkout={checkout} />
                </div>
            </section>
            <section className="py-12">
                <div className="max-w-7xl mx-auto w-full px-4 grid grid-cols-12">
                    <Filter />
                    <HotelList
                        destination={destination}
                        checkin={checkin}
                        checkout={checkout} />
                </div>
            </section>
        </>
    );
};

export default HotelListPage;