"use client";

import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import DefaultAvatar from "../../public/DefaultAvatar.png";

import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

export default function ProfileDropdown({ user }) {
  const { signOut } = useClerk();
  async function handleAction(key) {
    if (key === "logout") {
      await signOut({ redirectUrl: "/" });
    }
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <button className="rounded-full overflow-hidden cursor-pointer">
          <Image
            src={DefaultAvatar}
            alt="User"
            width={40}
            height={40}
            priority
            loading="eager"
          />
        </button>
      </DropdownTrigger>

      <DropdownMenu aria-label="Actions" onAction={handleAction}>
        <DropdownItem
          key="header"
          isReadOnly
          className="h-auto cursor-default gap-2 py-3 data-[hover=true]:bg-transparent"
        >
          <div className="flex items-center gap-3">
            <Avatar size="sm" src="/DefaultAvatar.png" />
            <div className="flex flex-col">
              <span className="font-semibold">{user.username}</span>
              <span className="text-sm opacity-70">{user.email}</span>
            </div>
          </div>
        </DropdownItem>
         <DropdownItem key="user-profile" as={Link} href="/user-profile">
         Account Settings
        </DropdownItem>
        <DropdownItem key="orders" as={Link} href="/orders">
          Orders
        </DropdownItem>
       
        <DropdownItem key="logout" color="danger">
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
