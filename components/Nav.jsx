"use client";

import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);
  return (
    <nav className="w-full flex justify-between border p-4">
      <Link href="/" className="flex">
        <Image src="/assets/logo.png" width={35} height={35} alt="logo" />
        <p className="hidden sm:flex">Developia</p>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-4">
            <Link
              href="/create-post"
              className="rounded-full text-white bg-gray-500 px-4"
            >
              Create Post
            </Link>
            <button
              className="rounded-full border border-gray-500 px-4 pb-0.5"
              type="button"
              onClick={signOut}
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                className="rounded-full border object-fit"
                src={session?.user.image}
                alt="user"
                width={35}
                height={35}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  type="button"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      <div className="sm:hidden">
        {session?.user ? (
          <div
            className="flex flex-col relative"
            onClick={() => setToggleMenu((prev) => !prev)}
          >
            <Image
              className="rounded-full border object-fit cursor-pointer"
              src={session?.user.image}
              alt="user"
              width={35}
              height={35}
            />
            {toggleMenu && (
              <div className="flex flex-col gap-4 absolute right-0 top-full border min-w-[180px] mt-2 p-2">
                <Link
                  href="/profile"
                  className="rounded-full px-4 text-end"
                  onClick={() => setToggleMenu(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-post"
                  className="rounded-full px-4 text-end"
                  onClick={() => setToggleMenu(false)}
                >
                  Create Post
                </Link>
                <button
                  className="w-full mt-5 rounded-full bg-gray-700 text-white px-4 pb-0.5 "
                  type="button"
                  onClick={() => {
                    signOut();
                    setToggleMenu(false);
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  type="button"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
