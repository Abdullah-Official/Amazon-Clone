import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import Currency from "react-currency-formatter";
import {useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key)

const checkout = () => {
  const items = useSelector(selectItems);
  const { data: session } = useSession();

  const total = useSelector(selectTotal);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post('/api/create-checkout-session', {
      items,
      email:session.user.email,
    })

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession?.data.id 
    })

    if(result?.error){
      alert(result.error.message)
  }

  }

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-xl mx-auto">
        {/* Left  */}

        <div className="flex-grow m-5 shadow-sm">
          <Image
            width={1020}
            height={250}
            src="https://links.papareact.com/ikj"
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-2xl border-b pb-4">
              {items.length == 0
                ? "Your Amazon Basket is empty"
                : "Shopping Basket"}
            </h1>

            {items.map(
              (
                {
                  hasPrime,
                  rating,
                  id,
                  title,
                  price,
                  description,
                  category,
                  image,
                },
                i
              ) => (
                <CheckoutProduct
                  hasPrime={hasPrime}
                  rating={rating}
                  id={id}
                  key={id}
                  title={title}
                  price={price}
                  description={description}
                  category={category}
                  image={image}
                />
              )
            )}
          </div>
        </div>

        {/* Right */}

        <div className="flex flex-col bg-white p-10 shadow-md">
          {items?.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal {items?.length} items:{" "}
                <span className="font-bold ml-3">
                  <Currency quantity={total} currency="GBP" />
                </span>
              </h2>
              <button
              role={'link'}
              onClick={createCheckoutSession}
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  `cursor-not-allowed from-gray-300 to-gray-500 border-gray-200 text-gray-300`
                }`}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default checkout;
