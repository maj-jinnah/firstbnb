const Search = ({ fromList }) => {
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
                                className="w-full px-4 py-2 rounded-md border border-black/20 bg-transparent"
                                name="destination"
                                id="destination"
                            >
                                <option value="Bali">Bali</option>
                                <option value="Bali">Cox's Bazar</option>
                                <option value="Bali">Sylhet</option>
                                <option value="Bali">Saint Martin</option>
                                <option value="Bali">Bali</option>
                            </select>
                        </h4>
                    </div>

                    <div>
                        <span className="font-bold">Check in</span>
                        <h4 className="mt-2">
                            <input
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
                                className="w-full px-4 py-2 rounded-md border border-black/20 bg-transparent"
                                type="date"
                                name="checkout"
                                id="checkout"
                            />
                        </h4>
                    </div>
                </div>
            </div>

            <button className="bg-[#FF6A28] px-8 py-3 rounded-md block mx-auto text-white font-bold -translate-y-1/2 shadow-lg hover:shadow-primary/50 active:scale-95 transition-all">
                🔍️ {fromList ? "Modify Search" : "Search"}
            </button>
        </>
    );
};

export default Search;

// #FF6A28
