import { redirect } from "next/navigation";

import { auth } from "@/auth";
import LoginOrRegister from "@/components/login-form";

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect('/dashboard')
  }

  return (
    <section>
      <div className="flex w-full justify-center mt-20">
        <LoginOrRegister />
      </div>
    </section>
  );
}
