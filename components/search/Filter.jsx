import PriceRange from "../sort/PriceRange";
import SortByAmenities from "../sort/SortByAmenities";
import SortByPrice from "../sort/SortByPrice";
import SortByStar from "../sort/SortByStar";

const Filter = () => {
    return (
        <>
            <div className="col-span-3 space-y-4">
                <SortByPrice />

                <PriceRange />

                <SortByStar />

                <SortByAmenities />
            </div>
        </>
    );
};

export default Filter;
