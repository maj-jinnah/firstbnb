import { amenityModel } from "@/models/amenity-model";
import { bookingModel } from "@/models/booking-model";
import { hotelModel } from "@/models/hotel-model";
import { ratingModel } from "@/models/rating-model";
import { reviewModel } from "@/models/review-model";
import { userModel } from "@/models/user-model";
import { isDateInBetween } from "@/utilis";
import { dbConnect } from "../dbConnection";

// export async function getAllHotels(destination, checkin, checkout, category, priceRange, rate, amenities) {
//     try {
//         await dbConnect();

//         const destinationRegex = new RegExp(destination, 'i')

//         const hotelsByDestination = await hotelModel
//             .find({ city: { $regex: destinationRegex } })
//             .populate({
//                 path: "amenities",
//                 model: amenityModel,
//             }).lean();

//         let allHotels = hotelsByDestination;

//         // console.log('destination --- ', destination)
//         // console.log('allhotels --- ', allHotels)

//         if (destination === 'all') {
//             allHotels = await hotelModel
//                 .find({})
//                 .populate({
//                     path: "amenities",
//                     model: amenityModel,
//                 }).lean();
//         }

//         if (category) {
//             const categoriesToMatch = category.split(',');
//             allHotels = allHotels.filter(hotel => categoriesToMatch.includes(hotel.propertyCategory.toString()));
//         }

//         if (rate) {
//             allHotels = allHotels.sort((a, b) => {
//                 if (rate === "highToLow") {
//                     return b.lowRate - a.lowRate;
//                 } else if (rate === "lowToHigh") {
//                     return a.lowRate - b.lowRate;
//                 } else {
//                     return 0; // No sorting applied
//                 }
//             });
//         }

//         const priceRanges =
//             typeof priceRange === "string" ? priceRange.split(",") : priceRange;

//         if (priceRanges && priceRanges.length > 0) {
//             allHotels = allHotels.filter((hotel) => {
//                 const rate = hotel.lowRate;
//                 return priceRanges.some((range) => {
//                     switch (range) {
//                         case "range1":
//                             return rate >= 500 && rate <= 1000;
//                         case "range2":
//                             return rate > 1000 && rate <= 2000;
//                         case "range3":
//                             return rate > 2000 && rate <= 3000;
//                         case "range4":
//                             return rate > 3000 && rate <= 4000;
//                         case "range5":
//                             return rate > 4000 && rate <= 5000;
//                         case "range6":
//                             return rate > 5000;
//                         default:
//                             return false;
//                     }
//                 });
//             });
//         }

//         const allAmenities = allHotels.flatMap((hotel) => {
//             return hotel.amenities.map((amenity) =>
//                 amenity.name.toLowerCase().replace(/\s+/g, "-")
//             );
//         });

//         if (amenities) {
//             const amenitiesToMatch = amenities.split(",");

//             allHotels = allHotels.filter((hotel) => {
//                 const hotelAmenities = hotel.amenities.map((amenity) =>
//                     amenity.name.toLowerCase().replace(/\s+/g, "-")
//                 );

//                 return amenitiesToMatch.every((amenity) =>
//                     hotelAmenities.includes(amenity)
//                 );
//             });
//         }

//         if (checkin && checkout) {
//             allHotels = await Promise.all(
//                 allHotels.map(async (hotel) => {
//                     const found = await findBooking(hotel._id, checkin, checkout);

//                     if (found) {
//                         hotel['isBooked'] = true;
//                     } else {
//                         hotel['isBooked'] = false;
//                     }

//                     return hotel;
//                 })
//             )
//         }

//         return allHotels;

//     } catch (error) {
//         console.log('Error in getAllHotels query', error)
//     }
// }

const findBooking = async (hotelId, checkin, checkout) => {
    try {
        await dbConnect();
        const booking = await bookingModel.find({
            hotelId: hotelId.toString(),
        });

        const found = booking.find((match) => {
            return (
                isDateInBetween(checkin, match.checkin, match.checkout) ||
                isDateInBetween(checkout, match.checkin, match.checkout)
            );
        });

        return found;
    } catch (error) {
        console.log('Error in findBooking query', error)
    }
};

export async function getHotelById(hotelId, checkin, checkout) {
    try {
        await dbConnect();

        const hotel = await hotelModel.findById(hotelId).lean();

        if (checkin && checkout) {

            const found = await findBooking(hotel._id, checkin, checkout);
            if (found) {
                hotel['isBooked'] = true
            } else {
                hotel['isBooked'] = false
            }
        }

        return hotel;
    } catch (error) {
        console.log('Error in getHotelById query', error)
    }
}

export async function getRatingsByHotelId(hotelId) {
    try {
        await dbConnect();

        const rating = await ratingModel.find({ hotelId: hotelId });
        return rating;
    } catch (error) {
        console.log('Error in getRatingsByHotelId query', error)
    }
}

export async function getReviewsByHotelId(hotelId) {
    try {
        await dbConnect();

        const review = await reviewModel.find({ hotelId: hotelId });
        return review;
    } catch (error) {
        console.log('Error in getReviewsByHotelId query', error)
    }
}

export async function getUserByEmail(email) {
    try {
        await dbConnect();
        const user = await userModel.findOne({ email: email });
        return user;
    } catch (error) {
        console.log('Error in getUserByEmail query', error)
    }
}

export async function getAllBookingsByUser(userId) {
    try {
        await dbConnect();
        const bookings = await bookingModel.find({ userId: userId });
        return bookings;
    } catch (error) {
        console.log('Error in getAllBookingsByUser query', error)
    }
}

// trying to optimize this query

// export async function getAllHotels(destination, checkin, checkout, category, priceRange, rate, amenities) {
//     try {
//         await dbConnect();

//         const destinationRegex = new RegExp(destination, 'i');
//         let allHotels;

//         // Optimize initial query - combine both conditions into single query
//         if (destination === 'all') {
//             allHotels = await hotelModel
//                 .find({})
//                 .populate({
//                     path: "amenities",
//                     model: amenityModel,
//                 }).lean();
//         } else {
//             allHotels = await hotelModel
//                 .find({ city: { $regex: destinationRegex } })
//                 .populate({
//                     path: "amenities",
//                     model: amenityModel,
//                 }).lean();
//         }

//         // console.log('destination --- ', destination)
//         // console.log('allhotels --- ', allHotels)

//         // Filter by category - optimize by converting to numbers once
//         if (category) {
//             const categoriesToMatch = category.split(',').map(cat => parseInt(cat));
//             allHotels = allHotels.filter(hotel => categoriesToMatch.includes(parseInt(hotel.propertyCategory)));
//         }

//         // Sort early to avoid unnecessary sorting of filtered arrays later
//         if (rate) {
//             allHotels = allHotels.sort((a, b) => {
//                 if (rate === "highToLow") {
//                     return b.lowRate - a.lowRate;
//                 } else if (rate === "lowToHigh") {
//                     return a.lowRate - b.lowRate;
//                 } else {
//                     return 0; // No sorting applied
//                 }
//             });
//         }

//         // Optimize price range filtering - parse ranges once and use lookup table
//         const priceRanges = typeof priceRange === "string" ? priceRange.split(",") : priceRange;

//         if (priceRanges && priceRanges.length > 0) {
//             // Create lookup table for better performance
//             const rangeCheckers = {
//                 "range1": (rate) => rate >= 500 && rate <= 1000,
//                 "range2": (rate) => rate > 1000 && rate <= 2000,
//                 "range3": (rate) => rate > 2000 && rate <= 3000,
//                 "range4": (rate) => rate > 3000 && rate <= 4000,
//                 "range5": (rate) => rate > 4000 && rate <= 5000,
//                 "range6": (rate) => rate > 5000
//             };

//             allHotels = allHotels.filter((hotel) => {
//                 const hotelRate = hotel.lowRate;
//                 return priceRanges.some((range) => {
//                     const checker = rangeCheckers[range];
//                     return checker ? checker(hotelRate) : false;
//                 });
//             });
//         }

//         // Keep original allAmenities logic (even though it's not used)
//         const allAmenities = allHotels.flatMap((hotel) => {
//             return hotel.amenities.map((amenity) =>
//                 amenity.name.toLowerCase().replace(/\s+/g, "-")
//             );
//         });

//         // Optimize amenity filtering - pre-process amenity names once per hotel
//         if (amenities) {
//             const amenitiesToMatch = amenities.split(",");

//             // Pre-process hotel amenities to avoid repeated processing
//             const hotelsWithProcessedAmenities = allHotels.map(hotel => ({
//                 ...hotel,
//                 processedAmenities: hotel.amenities.map((amenity) =>
//                     amenity.name.toLowerCase().replace(/\s+/g, "-")
//                 )
//             }));

//             allHotels = hotelsWithProcessedAmenities.filter((hotel) => {
//                 return amenitiesToMatch.every((amenity) =>
//                     hotel.processedAmenities.includes(amenity)
//                 );
//             }).map(hotel => {
//                 // Remove the temporary processed amenities field
//                 const { processedAmenities, ...cleanHotel } = hotel;
//                 return cleanHotel;
//             });
//         }

//         // Optimize booking check - batch process instead of individual promises
//         if (checkin && checkout) {
//             // Process in smaller batches to avoid overwhelming the database
//             const batchSize = 10;
//             const batches = [];
            
//             for (let i = 0; i < allHotels.length; i += batchSize) {
//                 batches.push(allHotels.slice(i, i + batchSize));
//             }

//             // Process batches sequentially to control database load
//             for (let batch of batches) {
//                 const batchPromises = batch.map(async (hotel) => {
//                     const found = await findBooking(hotel._id, checkin, checkout);
//                     hotel['isBooked'] = found ? true : false;
//                     return hotel;
//                 });

//                 // Wait for current batch to complete before processing next
//                 await Promise.all(batchPromises);
//             }
//         }

//         return allHotels;

//     } catch (error) {
//         console.log('Error in getAllHotels query', error);
//         throw error; // Add throw to properly handle errors upstream
//     }
// }

export async function getAllHotels(destination, checkin, checkout, category, priceRange, rate, amenities) {
    try {
        await dbConnect();

        // Build initial query filter
        const queryFilter = {};
        if (destination && destination !== 'all') {
            queryFilter.city = { $regex: new RegExp(destination, 'i') };
        }

        // Single database query with optimized projection
        let allHotels = await hotelModel
            .find(queryFilter, {
                // Only select fields you actually need
                _id: 1,
                name: 1,
                city: 1,
                propertyCategory: 1,
                lowRate: 1,
                amenities: 1,
                thumbNailUrl: 1,
                overview: 1,
                // Add other fields you need
            })
            .populate({
                path: "amenities",
                model: amenityModel,
                select: 'name' // Only get the name field from amenities
            })
            .lean()
            .exec();

        // Early return if no hotels found
        if (!allHotels || allHotels.length === 0) {
            return [];
        }

        // Filter by category with input validation
        if (category) {
            try {
                const categoriesToMatch = category.split(',')
                    .map(cat => parseInt(cat.trim()))
                    .filter(cat => !isNaN(cat)); // Remove invalid numbers
                
                if (categoriesToMatch.length > 0) {
                    allHotels = allHotels.filter(hotel => 
                        categoriesToMatch.includes(parseInt(hotel.propertyCategory))
                    );
                }
            } catch (error) {
                console.warn('Invalid category format:', category);
            }
        }

        // Optimize price range filtering with consolidated logic
        if (priceRange) {
            try {
                const priceRanges = Array.isArray(priceRange) ? priceRange : priceRange.split(",");
                
                // Simplified range checking with better performance
                const isInPriceRange = (rate, ranges) => {
                    return ranges.some(range => {
                        switch (range.trim()) {
                            case "range1": return rate >= 500 && rate <= 1000;
                            case "range2": return rate > 1000 && rate <= 2000;
                            case "range3": return rate > 2000 && rate <= 3000;
                            case "range4": return rate > 3000 && rate <= 4000;
                            case "range5": return rate > 4000 && rate <= 5000;
                            case "range6": return rate > 5000;
                            default: return false;
                        }
                    });
                };

                allHotels = allHotels.filter(hotel => 
                    isInPriceRange(hotel.lowRate, priceRanges)
                );
            } catch (error) {
                console.warn('Invalid priceRange format:', priceRange);
            }
        }

        // Optimize amenity filtering
        if (amenities) {
            try {
                const amenitiesToMatch = amenities.split(",").map(a => a.trim());
                
                allHotels = allHotels.filter((hotel) => {
                    if (!hotel.amenities || hotel.amenities.length === 0) {
                        return false;
                    }
                    
                    const hotelAmenityNames = hotel.amenities.map((amenity) =>
                        amenity.name.toLowerCase().replace(/\s+/g, "-")
                    );
                    
                    return amenitiesToMatch.every((amenity) =>
                        hotelAmenityNames.includes(amenity)
                    );
                });
            } catch (error) {
                console.warn('Invalid amenities format:', amenities);
            }
        }

        // Sort after filtering to reduce work
        if (rate) {
            allHotels.sort((a, b) => {
                const rateA = a.lowRate || 0;
                const rateB = b.lowRate || 0;
                
                switch (rate) {
                    case "highToLow":
                        return rateB - rateA;
                    case "lowToHigh":
                        return rateA - rateB;
                    default:
                        return 0;
                }
            });
        }

        // Optimize booking check with better error handling and batch processing
        if (checkin && checkout && allHotels.length > 0) {
            const BATCH_SIZE = 10;
            const CONCURRENT_BATCHES = 3; // Process multiple batches concurrently
            
            // Split hotels into batches
            const batches = [];
            for (let i = 0; i < allHotels.length; i += BATCH_SIZE) {
                batches.push(allHotels.slice(i, i + BATCH_SIZE));
            }

            // Process batches with controlled concurrency
            for (let i = 0; i < batches.length; i += CONCURRENT_BATCHES) {
                const currentBatches = batches.slice(i, i + CONCURRENT_BATCHES);
                
                const batchPromises = currentBatches.map(batch => 
                    Promise.all(batch.map(async (hotel) => {
                        try {
                            const found = await findBooking(hotel._id, checkin, checkout);
                            hotel.isBooked = Boolean(found);
                        } catch (error) {
                            console.warn(`Error checking booking for hotel ${hotel._id}:`, error);
                            hotel.isBooked = false; // Default to not booked on error
                        }
                        return hotel;
                    }))
                );

                await Promise.all(batchPromises);
            }
        }

        return allHotels;

    } catch (error) {
        console.error('Error in getAllHotels query:', error);
        throw new Error(`Failed to fetch hotels: ${error.message}`);
    }
}