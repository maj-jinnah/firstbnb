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

        const hotel = await hotelModel.findById(hotelId);

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

export async function getAllHotels(destination, checkin, checkout, category, priceRange, rate, amenities) {
    try {
        await dbConnect();

        // Build MongoDB aggregation pipeline for better performance
        const pipeline = [];

        // Stage 1: Match destination
        if (destination && destination !== 'all') {
            pipeline.push({
                $match: {
                    city: { $regex: new RegExp(destination, 'i') }
                }
            });
        }

        // Stage 2: Filter by category at database level
        if (category) {
            const categoriesToMatch = category.split(',').map(cat => parseInt(cat));
            pipeline.push({
                $match: {
                    propertyCategory: { $in: categoriesToMatch }
                }
            });
        }

        // Stage 3: Filter by price range at database level
        if (priceRange) {
            const priceRanges = typeof priceRange === "string" ? priceRange.split(",") : priceRange;
            const priceConditions = [];
            
            priceRanges.forEach(range => {
                switch (range) {
                    case "range1":
                        priceConditions.push({ lowRate: { $gte: 500, $lte: 1000 } });
                        break;
                    case "range2":
                        priceConditions.push({ lowRate: { $gt: 1000, $lte: 2000 } });
                        break;
                    case "range3":
                        priceConditions.push({ lowRate: { $gt: 2000, $lte: 3000 } });
                        break;
                    case "range4":
                        priceConditions.push({ lowRate: { $gt: 3000, $lte: 4000 } });
                        break;
                    case "range5":
                        priceConditions.push({ lowRate: { $gt: 4000, $lte: 5000 } });
                        break;
                    case "range6":
                        priceConditions.push({ lowRate: { $gt: 5000 } });
                        break;
                }
            });

            if (priceConditions.length > 0) {
                pipeline.push({
                    $match: {
                        $or: priceConditions
                    }
                });
            }
        }

        // Stage 4: Populate amenities
        pipeline.push({
            $lookup: {
                from: amenityModel.collection.name,
                localField: 'amenities',
                foreignField: '_id',
                as: 'amenities'
            }
        });

        // Stage 5: Filter by amenities at database level
        if (amenities) {
            const amenitiesToMatch = amenities.split(",");
            const amenityRegexes = amenitiesToMatch.map(amenity => 
                new RegExp(`^${amenity.replace(/-/g, '\\s+')}$`, 'i')
            );

            pipeline.push({
                $match: {
                    'amenities.name': {
                        $all: amenityRegexes.map(regex => ({ $regex: regex }))
                    }
                }
            });
        }

        // Stage 6: Sort at database level
        if (rate) {
            const sortOrder = rate === "highToLow" ? -1 : rate === "lowToHigh" ? 1 : null;
            if (sortOrder) {
                pipeline.push({
                    $sort: { lowRate: sortOrder }
                });
            }
        }

        // Execute aggregation pipeline
        let allHotels = await hotelModel.aggregate(pipeline);

        // Handle booking status check more efficiently
        if (checkin && checkout && allHotels.length > 0) {
            // Get all hotel IDs for batch booking check
            const hotelIds = allHotels.map(hotel => hotel._id);
            
            // Batch check bookings instead of individual calls
            const bookedHotelIds = await findMultipleBookings(hotelIds, checkin, checkout);
            const bookedHotelIdsSet = new Set(bookedHotelIds.map(id => id.toString()));

            // Add booking status to hotels
            allHotels = allHotels.map(hotel => ({
                ...hotel,
                isBooked: bookedHotelIdsSet.has(hotel._id.toString())
            }));
        }

        return allHotels;

    } catch (error) {
        console.log('Error in getAllHotels query', error);
        throw error; // Re-throw to handle upstream
    }
}

// New helper function for batch booking checks
async function findMultipleBookings(hotelIds, checkin, checkout) {
    try {
        // Replace this with your actual booking model and logic
        // This should return an array of hotel IDs that have bookings in the date range
        const bookings = await bookingModel.find({
            hotelId: { $in: hotelIds },
            $or: [
                {
                    checkin: { $lte: new Date(checkout) },
                    checkout: { $gte: new Date(checkin) }
                }
            ]
        }).distinct('hotelId');

        return bookings;
    } catch (error) {
        console.log('Error in findMultipleBookings', error);
        return [];
    }
}

// Alternative optimized version with caching (if you can implement caching)
export async function getAllHotelsWithCache(destination, checkin, checkout, category, priceRange, rate, amenities) {
    const cacheKey = `hotels_${destination}_${category}_${priceRange}_${rate}_${amenities}`;
    
    // Check cache first (implement your caching solution)
    // const cachedResult = await getCachedData(cacheKey);
    // if (cachedResult && !checkin && !checkout) {
    //     return cachedResult;
    // }

    const result = await getAllHotels(destination, checkin, checkout, category, priceRange, rate, amenities);
    
    // Cache the result if no date filtering (implement your caching solution)
    // if (!checkin && !checkout) {
    //     await setCachedData(cacheKey, result, 300); // 5 minutes cache
    // }

    return result;
}