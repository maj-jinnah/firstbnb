// "use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// const SortByStar = () => {
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
//         const category = params.get("category");
//         if (category) {
//             const categories = decodeURI(category).split(",");
//             setQuery(categories);
//         }
//     }, []);

//     useEffect(() => {
//         if (query.length > 0) {
//             params.set("category", encodeURI(query.join(",")));
//         } else {
//             params.delete("category");
//         }

//         replace(`${pathName}?${params.toString()}`, { scroll: false });
//     }, [query]);

//     return (
//         <div>
//             <h3 className="font-bold text-lg">Star Category</h3>
//             <form
//                 onSubmit={(e) => e.preventDefault()}
//                 className="flex flex-col gap-2 mt-2"
//             >
//                 {[5, 4, 3, 2, 1].map((star) => (
//                     <label htmlFor={`${star}Star`} key={star}>
//                         <input
//                             className="mx-1"
//                             type="checkbox"
//                             name={`${star}`}
//                             id={`${star}Star`}
//                             checked={query.includes(`${star}`)}
//                             onChange={handleChange}
//                         />
//                         {star} Star
//                     </label>
//                 ))}
//             </form>
//         </div>
//     );
// };

// export default SortByStar;

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SortByStar = () => {
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
        const category = params.get("category");
        if (category) {
            const categories = decodeURI(category).split(",");
            setQuery(categories);
        }
    }, []);

    useEffect(() => {
        if (query.length > 0) {
            params.set("category", encodeURI(query.join(",")));
        } else {
            params.delete("category");
        }
        replace(`${pathName}?${params.toString()}`, { scroll: false });
    }, [query]);

    const renderStars = (count) => {
        return "★".repeat(count) + "☆".repeat(5 - count);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 max-w-sm">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                <h3 className="font-bold text-xl text-gray-800">Star Rating</h3>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                {[5, 4, 3, 2, 1].map((star) => (
                    <label
                        htmlFor={`${star}Star`}
                        key={star}
                        className="group flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 transition-all duration-200 cursor-pointer"
                    >
                        <div className="relative">
                            <input
                                className="sr-only peer"
                                type="checkbox"
                                name={`${star}`}
                                id={`${star}Star`}
                                checked={query.includes(`${star}`)}
                                onChange={handleChange}
                            />
                            <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-gradient-to-r peer-checked:from-yellow-400 peer-checked:to-orange-500 peer-checked:border-yellow-400 transition-all duration-200 flex items-center justify-center">
                                <svg
                                    className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 flex-1">
                            <span className="text-2xl text-yellow-400 group-hover:text-yellow-500 transition-colors duration-200">
                                {renderStars(star)}
                            </span>
                            <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                                {star} Star{star !== 1 ? "s" : ""}
                            </span>
                        </div>

                        {/* <div className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors duration-200">
                            & up
                        </div> */}
                    </label>
                ))}
            </form>

            {query.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                            {query.length} filter{query.length !== 1 ? "s" : ""}{" "}
                            applied
                        </span>
                        <button
                            onClick={() => setQuery([])}
                            className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors duration-200"
                        >
                            Clear all
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SortByStar;
