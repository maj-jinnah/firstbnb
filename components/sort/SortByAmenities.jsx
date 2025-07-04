"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

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
        <div>
            <h3 className="font-bold text-lg">Amenities</h3>
            <form className="flex flex-col gap-2 mt-2">
                {amenitiesList.map((amenity) => (
                    <label
                        key={amenity.name}
                        htmlFor={amenity.name}
                        className="flex items-center"
                    >
                        <input
                            className="mx-1"
                            type="checkbox"
                            name={amenity.name}
                            id={amenity.name}
                            checked={query.includes(amenity.name)}
                            onChange={handleChange}
                        />
                        {amenity.label}
                    </label>
                ))}
            </form>
        </div>
    );
};

export default SortByAmenities;
