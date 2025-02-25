// I am going to use this Header component to set up the authentication interface for the user

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default function Header() {
  const { userId } = auth();
  return (
    <>
      <h1>Header</h1>
      <p>{userId}</p>

      <SignedIn>
        {/* this will show when the user is signed-in */}

        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* this will show when the user is signed-out or they don't have an account yet*/}
        <h2>If you have an account, please sign in</h2>
        <SignInButton />
        <h2>If you don't have an account, please sign up </h2>
        <SignUpButton />
      </SignedOut>
    </>
  );
}
