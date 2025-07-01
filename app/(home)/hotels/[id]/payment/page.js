
import PaymentForm from "@/components/payment/PaymentForm";

import { auth } from "@/auth";
import { getHotelById, getUserByEmail } from "@/db/queries";
import { getDaysDifference } from "@/utilis";
import { redirect } from "next/navigation";

const PaymentPage = async ({ params, searchParams }) => {

  const { id } = await params;
  const { checkin, checkout } = await searchParams;

  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  // const user = await getUserByEmail(session?.user?.email);
  // const hotel = await getHotelById(id, checkin, checkout);

  const userDoc = await getUserByEmail(session?.user?.email);
  const hotelDoc = await getHotelById(id, checkin, checkout);

  // Convert to plain JS objects
  const user = userDoc ? JSON.parse(JSON.stringify(userDoc)) : null;
  const hotel = hotelDoc ? JSON.parse(JSON.stringify(hotelDoc)) : null;

  let cost = hotel?.lowRate;

  if (checkin && checkout) {
    const days = getDaysDifference(checkin, checkout);
    cost = days * cost;
  }

  return (
    <section className="container">
      <div className="p-6 rounded-lg max-w-xl mx-auto my-12 mt-[100px]">
        <h2 className="font-bold text-2xl">Payment Details</h2>
        <p className="text-gray-600 text-sm">You have picked <b>{hotel?.name}</b> and total price is <b>৳ {cost}</b> for <b>{getDaysDifference(checkin, checkout)}</b> day(s).
        </p>
        <PaymentForm
          user={user} hotelId={hotel?._id?.toString()}
          checkin={checkin} checkout={checkout} cost={cost} />
      </div>
    </section>
  )
}

export default PaymentPage
