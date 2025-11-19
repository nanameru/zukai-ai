"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div className="h-screen flex items-center justify-center flex-col gap-y-4">
      <h1 className="text-xl font-semibold">ようこそ！</h1>
      <div className="flex gap-4">
        {isSignedIn ? (
          <>
            <Link
              href="/dashboard"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              ダッシュボード
            </Link>
            <UserButton />
          </>
        ) : (
          <SignInButton mode="modal">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              ログイン
            </button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}
