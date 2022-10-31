import React from "react";
import Image from "next/image";
import {
  MenuIcon,
  ShoppingCartIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import {signIn, signOut, useSession} from 'next-auth/react'
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

const Header = () => {
  const {data: session}= useSession()
  const router = useRouter()
  const items = useSelector(selectItems)
  return (
    <header>
      {/* Top Nav */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push('/')}
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>

        {/* Search */}

        <div className="hidden h-10 flex-grow items-center rounded-md sm:flex bg-yellow-400 hover:bg-yellow-500 cursor-pointer">
          <input
            className="p-2 focus:outline-none h-full w-6 flex-grow flex-shrink rounded-l-md"
            type="text"
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        {/* Right  */}

        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div onClick={session ? signOut : signIn} className="link">
            <p>{session ? `Hello ${session.user.name}` : 'Sign in'}</p>
            <p className="font-extrabold md:text-sm">Account & List</p>
          </div>
          <div onClick={() => session && router.push('/orders')} className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& orders</p>
          </div>
          <div onClick={() => router.push('/checkout')} className="relative link flex items-center">
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              {items?.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="space-x-3 pl-6 p-2 flex item-center bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:flex">Electronic</p>
        <p className="link hidden lg:flex">Food & Grocery</p>
        <p className="link hidden lg:flex">Prime</p>
        <p className="link hidden lg:flex">Buy Again</p>
        <p className="link hidden lg:flex">Shopper Toolkit</p>
        <p className="link hidden lg:flex">Health & Personal Care</p>
      </div>
    </header>
  );
};

export default Header;
