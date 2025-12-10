import { auth } from "@/auth";
import GoogleSignIn from "./(components)/google-signin";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect('/dashboard')
  }
  
  return (
    <section>
      <h1 className="text-2xl font-bold">Kundanaa&apos;s Website</h1>
      <p className="text-red-500/30">under construction...</p>
      <div>
        <h2>Signin:</h2>
        <GoogleSignIn />
      </div>
    </section>
  );
}
