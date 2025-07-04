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

    return (
        <div>
            <h3 className="font-bold text-lg">Star Category</h3>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-2 mt-2"
            >
                {[5, 4, 3, 2, 1].map((star) => (
                    <label htmlFor={`${star}Star`} key={star}>
                        <input
                            className="mx-1"
                            type="checkbox"
                            name={`${star}`}
                            id={`${star}Star`}
                            checked={query.includes(`${star}`)}
                            onChange={handleChange}
                        />
                        {star} Star
                    </label>
                ))}
            </form>
        </div>
    );
};

export default SortByStar;
