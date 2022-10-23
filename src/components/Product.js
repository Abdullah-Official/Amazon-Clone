import Image from "next/image";
import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from 'react-currency-formatter'
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const Product = ({ id, title, price, description, category, image }) => {
  const [rating] = useState(Math.floor(Math.random() * 5 - 1 + 1) + 1);

  const [hasPrime] = useState(Math.random() < 0.5);
  const dispatch = useDispatch()
  const addItemToBasket = () => {
    dispatch(addToBasket({
      id, title, price, description, category, image, hasPrime, rating
    }))
  }

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 r-2 text-xs text-gray-400 italic">{category}</p> 
      <Image src={image} width={200} height={200} objectFit={"contain"} />

      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="text-yellow-500" key={i} style={{ height: 20 }} />
          ))}
      </div>
      {hasPrime && <p>Has prime del</p>}

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <Currency quantity={price} currency='GBP' />
      </div>

        {
            hasPrime && (
                <div className="flex items-center space-x-2 -mt-5">
                    <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
                    <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                </div>
            )
        }    
        <button onClick={addItemToBasket} className="mt-auto button">Add to basket</button>
    </div>
  );
};

export default Product;
