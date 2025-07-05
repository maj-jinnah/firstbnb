// "use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";

// import { useEffect, useState } from "react";

// const amenitiesList = [
//     { name: "wifi", label: "Wi-fi" },
//     { name: "swimming-pool", label: "Swimming Pool" },
//     { name: "gym", label: "Gym" },
//     { name: "golf-club", label: "Golf Club" },
// ];

// const SortByAmenities = () => {
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
//         const amenities = params.get("amenities");
//         if (amenities) {
//             const amenityList = decodeURI(amenities).split(",");
//             setQuery(amenityList);
//         }
//     }, []);

//     useEffect(() => {
//         if (query.length > 0) {
//             params.set("amenities", encodeURI(query.join(",")));
//         } else {
//             params.delete("amenities");
//         }
//         replace(`${pathName}?${params.toString()}`, { scroll: false });
//     }, [query]);

//     return (
//         <>
//             <h3 className="font-bold text-lg">Amenities</h3>
//             <form className="flex flex-col gap-2 mt-2">
//                 {amenitiesList.map((amenity) => (
//                     <label
//                         key={amenity.name}
//                         htmlFor={amenity.name}
//                         className="flex items-center"
//                     >
//                         <input
//                             className="mx-1"
//                             type="checkbox"
//                             name={amenity.name}
//                             id={amenity.name}
//                             checked={query.includes(amenity.name)}
//                             onChange={handleChange}
//                         />
//                         {amenity.label}
//                     </label>
//                 ))}
//             </form>
//         </>
//     );
// };

// export default SortByAmenities;

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// const amenitiesList = [
//     { name: "wifi", label: "Wi-fi", icon: "📶" },
//     { name: "swimming-pool", label: "Swimming Pool", icon: "🏊" },
//     { name: "gym", label: "Gym", icon: "💪" },
//     { name: "golf-club", label: "Golf Club", icon: "⛳" },
// ];

const amenitiesList = [
    { name: "wifi", label: "Wi-fi" },
    { name: "swimming-pool", label: "Swimming Pool" },
    { name: "gym", label: "Gym" },
    { name: "golf-club", label: "Golf Club" },
];

const SortByAmenities = () => {
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
        const amenities = params.get("amenities");
        if (amenities) {
            const amenityList = decodeURI(amenities).split(",");
            setQuery(amenityList);
        }
    }, []);

    useEffect(() => {
        if (query.length > 0) {
            params.set("amenities", encodeURI(query.join(",")));
        } else {
            params.delete("amenities");
        }
        replace(`${pathName}?${params.toString()}`, { scroll: false });
    }, [query]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 max-w-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">🏨</span>
                </div>
                <h3 className="font-bold text-xl text-gray-800">Amenities</h3>
            </div>

            <form className="space-y-2">
                {amenitiesList.map((amenity) => (
                    <label
                        key={amenity.name}
                        htmlFor={amenity.name}
                        className="group flex items-center px-3 py-2 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer"
                    >
                        <div className="relative flex items-center">
                            <input
                                className="sr-only"
                                type="checkbox"
                                name={amenity.name}
                                id={amenity.name}
                                checked={query.includes(amenity.name)}
                                onChange={handleChange}
                            />
                            <div
                                className={`
                                w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200
                                ${
                                    query.includes(amenity.name)
                                        ? "bg-gradient-to-br from-blue-500 to-purple-600 border-blue-500"
                                        : "border-gray-300 group-hover:border-blue-400"
                                }
                            `}
                            >
                                {query.includes(amenity.name) && (
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

                        <div className="flex items-center gap-3 ml-4">
                            <span className="text-2xl">{amenity.icon}</span>
                            <span
                                className={`
                                font-medium transition-colors duration-200
                                ${
                                    query.includes(amenity.name)
                                        ? "text-blue-700"
                                        : "text-gray-700 group-hover:text-blue-600"
                                }
                            `}
                            >
                                {amenity.label}
                            </span>
                        </div>
                    </label>
                ))}
            </form>

            {/* {query.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                            {query.length} selected
                        </span>
                        <button
                            onClick={() => setQuery([])}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                        >
                            Clear all
                        </button>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default SortByAmenities;
