import { auth } from "@/auth";
import { redirect } from "next/navigation";

import GoogleSignIn from "@/app/(components)/google-signin";
import LoginOrRegister from "@/app/(components)/login-form";

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect('/dashboard')
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Kundanaa&apos;s Website</h1>
      <p className="text-orange-500/30">under construction...</p>
      <div>
        <h2>Signin:</h2>
        <LoginOrRegister />
        <GoogleSignIn />
      </div>
    </section>
  );
}
