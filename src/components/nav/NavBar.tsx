"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "~/components/ui/navigation-menu";

import { UserAvatar } from "./UserAvatar";

export default function NavBar() {
  return (
    <div className="flex h-20 w-full flex-row items-center justify-end space-x-6 border border px-5">
      <div className="mr-auto">
        <img
          src="https://cdn4.iconfinder.com/data/icons/176-material-design-outline-core/24/check-box-blank-512.png"
          width={50}
          height={50}
          alt="logo"
        ></img>
      </div>
      <NavigationMenu className="border">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <UserAvatar />
    </div>
  );
}
