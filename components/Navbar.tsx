"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  Search as SearchIcon,
  ShoppingBag,
  X,
  Package,
} from "lucide-react";
import Image from "next/image";
import { ThemeDropdown } from "./utilities/theme-dropdown";
import { LanguageDropdown } from "./utilities/language-dropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import ProductsDropdown from "./Products-Dropdown";
import CartDropdown from "./cart/Cart-Dropdown";
import { useCart } from "@/context/CartContext";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  const { state, setIsOpen } = useCart();
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[1000] px-4 py-3">
        <nav
          suppressHydrationWarning
          className={`h-16 w-full max-w-screen-2xl mx-auto flex items-center justify-between px-6 shadow-sm backdrop-blur-md transition-all duration-500 rounded-2xl relative overflow-hidden ${
            isDarkMode ? "dark:bg-card" : "bg-card"
          }`}
        >
          {/* LEFT: LOGO */}
          <div className="flex-shrink-0 relative z-10">
            <Link href="/" className="flex items-center group">
              <div className="relative h-12 w-auto aspect-[3/1] transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Oskaz Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>
          </div>
          {/* CENTER: MAIN MENU */}
          <div className="hidden lg:flex items-center justify-center gap-10 relative z-10">
            <Link
              href="/"
              className="px-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
            >
              Home
            </Link>
            <ProductsDropdown />
            <Link
              href="/about"
              className="px-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="px-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="px-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
          {/* RIGHT: SEARCH BAR & UTILITIES */}
          <div className="flex items-center space-x-4 relative z-10">
            <div className="flex-1 max-w-md hidden md:block">
              <div
                className={`relative w-full transition-all duration-300 overflow-hidden ${
                  isSearchFocused ? "scale-102" : ""
                }`}
              >
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={`h-11 pr-10 rounded-full border-none shadow-sm ${
                    isDarkMode ? "bg-muted/60" : "bg-muted"
                  } focus-visible:ring-primary/40 focus-visible:ring-2 transition-all`}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-10 top-1/2 -translate-y-1/2 h-6 w-6"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
                <SearchIcon
                  className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                    isSearchFocused ? "text-primary" : "text-muted-foreground"
                  }`}
                />
              </div>
            </div>

            {/* Desktop Utilities */}
            <div className="hidden lg:flex items-center space-x-3">
              <SignedIn>
                <div className="flex items-center gap-2">
                  {user?.firstName && (
                    <span className="text-sm text-muted-foreground">
                      Hello, {user.firstName}
                    </span>
                  )}
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
              <SignedOut>
                <div className="flex items-center space-x-2">
                  <SignInButton mode="modal">
                    <Button variant="ghost" size="sm" className="text-sm">
                      Login
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button size="sm" className="text-sm">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              </SignedOut>

              {/* Orders Button */}
              <Link href="/user-orders">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 relative hover:bg-muted transition-all duration-300 hover:scale-110 text-muted-foreground hover:text-primary"
                >
                  <Package className="h-5 w-5" />
                </Button>
              </Link>

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 relative hover:bg-muted transition-all duration-300 hover:scale-110"
                onClick={() => {
                  setIsMenuOpen(false); // Close mobile menu
                  setIsOpen(true);
                }}
              >
                <ShoppingBag className="h-4 w-4" />
                {state.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-xs text-destructive-foreground flex items-center justify-center">
                    {state.totalItems > 9 ? "9+" : state.totalItems}
                  </span>
                )}
              </Button>

              <ThemeDropdown />
              <LanguageDropdown />
            </div>

            {/* MOBILE MENU */}
            {!mounted ? (
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-8 w-8 hover:bg-muted transition-all duration-500 hover:scale-110"
              >
                <Menu className="h-4 w-4" />
              </Button>
            ) : (
              <Sheet
                open={isMenuOpen}
                onOpenChange={(open) => {
                  setIsMenuOpen(open);
                  if (open) {
                    setIsOpen(false); // Close cart when mobile menu opens
                  }
                }}
              >
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden h-8 w-8 hover:bg-muted transition-all duration-500 hover:scale-110"
                    onClick={() => {
                      setIsMenuOpen(false); // Close sidebar
                      setIsOpen(true); // Open CartDropdown
                    }}
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className={`${isDarkMode ? "dark:bg-sidebar" : "bg-card"}`}
                >
                  <div className="flex flex-col space-y-4 mt-8">
                    <Link
                      href="/"
                      className="text-muted-foreground hover:text-foreground text-base font-medium transition-all duration-300 py-2 px-3 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Home
                    </Link>

                    {/* Products dropdown removed for mobile sidebar per design preference */}
                    <Link
                      href="/products"
                      className="text-muted-foreground hover:text-foreground text-base font-medium py-2 px-3 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Products
                    </Link>

                    <Link
                      href="/about"
                      className="text-muted-foreground hover:text-foreground text-base font-medium py-2 px-3 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About
                    </Link>

                    <Link
                      href="/blog"
                      className="text-muted-foreground hover:text-foreground text-base font-medium py-2 px-3 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Blog
                    </Link>

                    <Link
                      href="/contact"
                      className="text-muted-foreground hover:text-foreground text-base font-medium py-2 px-3 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact Us
                    </Link>

                    {/* Orders Mobile */}
                    <Link
                      href="/user-orders"
                      className="text-muted-foreground hover:text-primary flex items-center gap-2 py-2 px-3 text-base font-medium transition-colors rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Package className="h-5 w-5" /> My Orders
                    </Link>

                    {/* Mobile Search */}
                    <div className="relative mt-4 p-4">
                      <Input
                        placeholder="Search Product"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pr-10"
                        tabIndex={-1}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                      />
                      {searchQuery && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-10 top-1/2 -translate-y-1/2 h-6 w-6"
                          onClick={() => setSearchQuery("")}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                      <SearchIcon className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>

                    {/* Mobile utilities */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <SignedIn>
                        <div className="flex items-center p-5">
                          <UserButton afterSignOutUrl="/" />
                          {user?.firstName && (
                            <span className="text-sm text-muted-foreground mx-2">
                              Hello, {user.firstName}
                            </span>
                          )}
                        </div>
                      </SignedIn>
                      <SignedOut>
                        <div className="flex items-center p-3">
                          <SignInButton mode="modal">
                            <Button variant="ghost" size="sm">
                              Login
                            </Button>
                          </SignInButton>
                          <SignUpButton mode="modal">
                            <Button size="sm">Sign Up</Button>
                          </SignUpButton>
                        </div>
                      </SignedOut>
                      <div className="flex items-center p-5">
                        {/* Theme toggle - same design as desktop */}
                        <ThemeDropdown className="h-8 w-8" />

                        {/* Cart Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 relative hover:bg-muted transition-all duration-300 hover:scale-110"
                          onClick={() => {
                            setIsMenuOpen(false); // Close sidebar
                            setIsOpen(true); // Open CartDropdown
                          }}
                        >
                          <ShoppingBag className="h-4 w-4" />
                          <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-xs text-destructive-foreground flex items-center justify-center">
                            {state.totalItems > 9 ? "9+" : state.totalItems}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </nav>
      </div>

      {/* CartDropdown component */}
      <CartDropdown />
    </>
  );
};

export default Navbar;
