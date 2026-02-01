import Link from "next/link";
import Profile from "@/components/ProfileDropdown";
import CartButton from "../app/(commerce)/cart/components/CartButton";
import Image from "next/image";
import shopBanner from "../../public/ShopLocal.png";
import SearchBar from "./SearchBar";

export default async function NavBar({ user }) {
  return (
    <>
      <div className="p-2 grid grid-cols-[auto_1fr_auto]  items-center bg-[#232f3e] shadow-md ">
        <Link href="/shop" className="h-20">
          <Image
            src={shopBanner}
            alt="shop local"
            className="h-full w-auto object-contain"
            priority
          />
        </Link>

        <div
          className="
          col-span-3 row-start-2 pt-2
          sm:col-start-2 sm:col-span-1 sm:row-start-1 sm:p-4
          
        "
        >
          <SearchBar />
        </div>

        <div className="flex items-center gap-4 col-start-3 row-start-1">
          <CartButton />
          <Profile user={user} />
        </div>
      </div>
    </>
  );
}
