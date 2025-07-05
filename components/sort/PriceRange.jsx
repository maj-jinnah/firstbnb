// "use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// const PriceRange = () => {
//     const [query, setQuery] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const searchParams = useSearchParams();
//     const pathName = usePathname();
//     const { replace } = useRouter();

//     const params = new URLSearchParams(searchParams);

//     const handleChange = (e) => {
//         const { name, checked } = e.target;

//         if (checked) {
//             setQuery((prev) => [...prev, name]);
//         } else {
//             setQuery((prev) => prev.filter((item) => item !== name));
//         }
//     };

//     useEffect(() => {
//         const priceRange = params.get("priceRange");
//         if (priceRange) {
//             const priceRanges = decodeURI(priceRange).split(",");
//             setQuery(priceRanges);
//         }
//     }, []);

//     useEffect(() => {
//         if (query.length > 0) {
//             params.set("priceRange", encodeURI(query.join(",")));
//         } else {
//             params.delete("priceRange");
//         }
//         replace(`${pathName}?${params.toString()}`, { scroll: false });
//     }, [query]);

//     return (
//         <div>
//             <h3 className="font-bold text-lg">Price Range</h3>
//             <form className="flex flex-col gap-2 mt-2">
//                 {[
//                     "range1",
//                     "range2",
//                     "range3",
//                     "range4",
//                     "range5",
//                     "range6",
//                 ].map((range, idx) => (
//                     <label key={range} htmlFor={range}>
//                         <input
//                             type="checkbox"
//                             name={range}
//                             id={range}
//                             onChange={handleChange}
//                             checked={query.includes(range)}
//                         />{" "}
//                         ৳
//                         {
//                             [
//                                 "500 - 1000",
//                                 "1000 - 2000",
//                                 "2000 - 3000",
//                                 " 3000 - 4000",
//                                 "4000 - 5000",
//                                 "5000 +",
//                             ][idx]
//                         }
//                     </label>
//                 ))}
//             </form>
//         </div>
//     );
// };

// export default PriceRange;

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PriceRange = () => {
    const [query, setQuery] = useState([]);
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);

    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            setQuery((prev) => [...prev, name]);
        } else {
            setQuery((prev) => prev.filter((item) => item !== name));
        }
    };

    useEffect(() => {
        const priceRange = params.get("priceRange");
        if (priceRange) {
            const priceRanges = decodeURI(priceRange).split(",");
            setQuery(priceRanges);
        }
    }, []);

    useEffect(() => {
        if (query.length > 0) {
            params.set("priceRange", encodeURI(query.join(",")));
        } else {
            params.delete("priceRange");
        }
        replace(`${pathName}?${params.toString()}`, { scroll: false });
    }, [query]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                <h3 className="font-bold text-xl text-gray-800">Price Range</h3>
            </div>

            <form className="space-y-2">
                {[
                    "range1",
                    "range2",
                    "range3",
                    "range4",
                    "range5",
                    "range6",
                ].map((range, idx) => (
                    <label
                        key={range}
                        htmlFor={range}
                        className="group flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer border border-gray-200 hover:border-[#3b82f6]"
                    >
                        <div className="relative">
                            <input
                                type="checkbox"
                                name={range}
                                id={range}
                                onChange={handleChange}
                                checked={query.includes(range)}
                                className="sr-only"
                            />
                            <div
                                className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                                    query.includes(range)
                                        ? "bg-gradient-to-r from-blue-500 to-purple-600 border-blue-500"
                                        : "border-gray-300 group-hover:border-blue-400"
                                }`}
                            >
                                {query.includes(range) && (
                                    <svg
                                        className="w-3 h-3 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-lg font-medium text-gray-600">
                                ৳
                            </span>
                            <span
                                className={`font-semibold transition-colors duration-200 ${
                                    query.includes(range)
                                        ? "text-blue-600"
                                        : "text-gray-700 group-hover:text-gray-900"
                                }`}
                            >
                                {
                                    [
                                        "500 - 1000",
                                        "1000 - 2000",
                                        "2000 - 3000",
                                        "3000 - 4000",
                                        "4000 - 5000",
                                        "5000 +",
                                    ][idx]
                                }
                            </span>
                        </div>
                    </label>
                ))}
            </form>
{/* 
            {query.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>
                            {query.length} range{query.length > 1 ? "s" : ""}{" "}
                            selected
                        </span>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default PriceRange;
