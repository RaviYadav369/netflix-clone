import React from "react";
import { useNavigate } from "react-router-dom";
import netflixLogo from "../assets/Netflix-Logo.png";
import { useAuth } from "../common/auth";

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  async function authenticateSignIn(event: React.SyntheticEvent) {
    const { email, password } = event.target as typeof event.target & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };

    event.preventDefault();
    const user = await signIn(email.value, password.value);
    if (user) {
      navigate("/");
    }
    // console.log(email.value, password.value);
  }
  return (
    <>
      <header className="w-56 z-[1] relative">
        <img src={netflixLogo} className="h-full w-full" alt="Netflix logo" />
      </header>
      <main>
        <section
          className={`w-full absolute top-0  min-h-screen bg-cover bg-[url('https://www.reliancedigital.in/wp-content/uploads/2019/02/netflix_movies_cover.jpg')] `}
        ></section>
        <section className="absolute inset-0 bg-gradient-to-b from-zinc-900">
          {" "}
        </section>
        <form
          onSubmit={authenticateSignIn}
          className="relative mx-auto min-h-[70vh] w-[400px] bg-black/75 p-10 rounded-r-lg"
        >
          <article>
            <h1 className="text-2xl font-semibold">Sign In</h1>
            <section className="mt-4">
              <input
                type="email"
                name="email"
                id="email"
                className="p-1 rounded-sm w-full bg-zinc-400 mt-2"
                placeholder="Email or Phone Number"
              />
              <input
                type="password"
                name="password"
                id="password"
                className="p-1 rounded-sm w-full bg-zinc-400 mt-3"
                placeholder="Email or Phone Number"
              />
            </section>
            <button className="bg-red-600 text-white w-full px-2 mt-8 font-semibold rounded-md py-2">
              Sign In
            </button>
            <p className="text-xs mt-4">New to Netflix? Sign up Now</p>
          </article>
        </form>
      </main>
    </>
  );
}
