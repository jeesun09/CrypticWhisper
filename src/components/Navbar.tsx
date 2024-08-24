"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import { Bungee } from "next/font/google";

const bungee = Bungee({ weight: "400", subsets: ["latin"] });

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  return (
    <nav className="p-4 md:p-4 shadow-md bg-gray-900 text-white w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className={`text-xl md:text-3xl  font-bold hover:text-gray-300 ${bungee.className}`}>
          M4You
        </Link>
        <div className="flex items-center mt-4 md:mt-0">
          {session ? (
            <>
              <span className="mr-4 text-sm md:text-base">
                Welcome,
                <Link href="/dashboard" className="font-bold">
                  {" "}
                  {user?.username || user?.email}
                </Link>
              </span>
              <Button
                onClick={() => signOut()}
                className="w-full md:w-auto bg-slate-100 text-black hover:bg-gray-200"
                variant="outline"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button
                className="w-full md:w-auto bg-slate-100 text-black hover:bg-gray-200"
                variant={"outline"}
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
