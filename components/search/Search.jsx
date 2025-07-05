"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Search = ({ fromList, destination, checkin, checkout }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [searchTerm, setSearchTerm] = useState({
        // destination: destination || "Puglia",
        destination: destination || "",
        checkin: checkin || "",
        checkout: checkout || "",
    });

    const [allowSearch, setAllowSearch] = useState(true);

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        const state = { ...searchTerm, [name]: value };

        if (
            new Date(state.checkin).getTime() >
            new Date(state.checkout).getTime()
        ) {
            setAllowSearch(false);
        } else {
            setAllowSearch(true);
        }
        setSearchTerm(state);
    };

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams);
        params.set("destination", searchTerm?.destination || 'all');

        if (searchTerm?.checkin && searchTerm?.checkout) {
            params.set("checkin", searchTerm?.checkin);
            params.set("checkout", searchTerm?.checkout);
        }

        if (pathname.includes("hotels")) {
            replace(`${pathname}?${params.toString()}`);
        } else {
            replace(`${pathname}hotels?${params.toString()}`);
        }
    };

    return (
        <>
            <div className="lg:max-h-[250px] mt-6">
                <div
                    className={`bg-white w-full h-full py-10 lg:py-12 px-6 lg:px-8 rounded-xl border border-black/10 shadow-lg lg:flex items-center [&>*]:flex-1 [&>*]:px-4 [&>div>span]:mb-3 space-y-5 lg:space-y-0 ${
                        fromList ? "!shadow-none" : ""
                    }`}
                >
                    <div>
                        <span className="font-bold">Destination</span>
                        <h4 className="mt-2">
                            <select
                                onChange={handleInputChange}
                                // defaultValue={searchTerm?.destination}
                                className="w-full px-4 py-2 rounded-md border border-black/20 bg-transparent"
                                name="destination"
                                id="destination"
                            >
                                <option value="">All hotels</option>
                                <option value="Puglia">Puglia</option>
                                <option value="Catania">Catania</option>
                                <option value="Palermo">Palermo</option>
                                <option value="Frejus">Frejus</option>
                                <option value="Paris">Paris</option>
                            </select>
                        </h4>
                    </div>

                    <div>
                        <span className="font-bold">Check in</span>
                        <h4 className="mt-2">
                            <input
                                onChange={handleInputChange}
                                defaultValue={searchTerm?.checkin}
                                className="w-full px-4 py-2 rounded-md border border-black/20 bg-transparent"
                                type="date"
                                name="checkin"
                                id="checkin"
                            />
                        </h4>
                    </div>

                    <div>
                        <span className="font-bold">Checkout</span>
                        <h4 className="mt-2">
                            <input
                                onChange={handleInputChange}
                                defaultValue={searchTerm?.checkout}
                                className="w-full px-4 py-2 rounded-md border border-black/20 bg-transparent"
                                type="date"
                                name="checkout"
                                id="checkout"
                            />
                        </h4>
                    </div>
                </div>
            </div>

            <button
                onClick={handleSearch}
                disabled={!allowSearch}
                className="bg-[#FF6A28] px-8 py-3 rounded-md block mx-auto text-white font-bold -translate-y-1/2 shadow-lg hover:shadow-primary/50 active:scale-95 transition-all disabled:bg-gray-500 disabled:text-gray-200 disabled:cursor-not-allowed "
            >
                🔍️ {fromList ? "Modify Search" : "Search"}
            </button>
        </>
    );
};

export default Search;

// #FF6A28
