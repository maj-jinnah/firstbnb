// const SortByPrice = () => {
//     return (
//         <>
//             <h3 className="font-bold text-lg">Sort By</h3>
//             <form className="flex flex-col gap-2 mt-2">
//                 <label htmlFor="highToLow">
//                     <input
//                         className="mx-1"
//                         type="radio"
//                         name="highToLow"
//                         id="highToLow"
//                     />
//                     Price High to Low
//                 </label>

//                 <label htmlFor="lowToHigh">
//                     <input
//                         className="mx-1"
//                         type="radio"
//                         name="lowToHigh"
//                         id="lowToHigh"
//                     />
//                     Price Low to high
//                 </label>
//             </form>
//         </>
//     );
// };

// export default SortByPrice;

"use client";

import { ArrowUpDown, TrendingDown, TrendingUp } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SortByPrice = () => {
    const [selectedSort, setSelectedSort] = useState("");
    const [loading, setLoading] = useState(false);

    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    const params = new URLSearchParams(searchParams);

    const handleSortChange = (value) => {
        setSelectedSort(value);
    };

    useEffect(() => {
        const rate = params.get("rate");
        if (rate) {
            setSelectedSort(rate);
        }
    }, []);

    useEffect(() => {
        if (selectedSort) {
            params.set("rate", selectedSort);
        } else {
            params.delete("rate");
        }
        replace(`${pathName}?${params.toString()}`, { scroll: false });
    }, [selectedSort]);

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
                <ArrowUpDown className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-lg text-gray-900">
                    Sort By Price
                </h3>
            </div>

            <div className="space-y-3">
                <label
                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                        selectedSort === "highToLow"
                            ? "border-blue-500 bg-blue-50 shadow-sm"
                            : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                    <input
                        type="radio"
                        name="priceSort"
                        value="highToLow"
                        checked={selectedSort === "highToLow"}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <div className="ml-3 flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-red-500" />
                        <span className="text-gray-900 font-medium">
                            Price High to Low
                        </span>
                    </div>
                </label>

                <label
                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                        selectedSort === "lowToHigh"
                            ? "border-blue-500 bg-blue-50 shadow-sm"
                            : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                    <input
                        type="radio"
                        name="priceSort"
                        value="lowToHigh"
                        checked={selectedSort === "lowToHigh"}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <div className="ml-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-gray-900 font-medium">
                            Price Low to High
                        </span>
                    </div>
                </label>
            </div>

            {/* {selectedSort && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                        Sorting by:{" "}
                        <span className="font-medium text-gray-900">
                            {selectedSort === "highToLow"
                                ? "Price High to Low"
                                : "Price Low to High"}
                        </span>
                    </p>
                </div>
            )} */}
        </div>
    );
};

export default SortByPrice;
