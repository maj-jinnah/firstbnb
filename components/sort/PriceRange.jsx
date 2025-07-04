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
        <div>
            <h3 className="font-bold text-lg">Price Range</h3>
            <form className="flex flex-col gap-2 mt-2">
                {[
                    "range1",
                    "range2",
                    "range3",
                    "range4",
                    "range5",
                    "range6",
                ].map((range, idx) => (
                    <label key={range} htmlFor={range}>
                        <input
                            type="checkbox"
                            name={range}
                            id={range}
                            onChange={handleChange}
                            checked={query.includes(range)}
                        />{" "}
                        ৳
                        {
                            [
                                "500 - 1000",
                                "1000 - 2000",
                                "2000 - 3000",
                                " 3000 - 4000",
                                "4000 - 5000",
                                "5000 +",
                            ][idx]
                        }
                    </label>
                ))}
            </form>
        </div>
    );
};

export default PriceRange;
