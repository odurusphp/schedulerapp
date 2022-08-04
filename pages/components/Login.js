import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="grid grid-rows-1 mx-auto my-20 w-1/3 bg-gray-200 p-4">
      <div className="grid grid-rows-1 mt-4 place-items-center">
        <h1 className="text-2xl font-bold text-cip-blue ">SCHECULER APP</h1>
      </div>
      <div className="grid grid-rows-1 mt-4">
        <input
          type="text"
          placeholder="Email"
          className="p-1.5 rounded w-full border-2 border-gray-200 border-b-gray-300 bg-gray-200"
        />
      </div>
      <div className="grid grid-rows-1 my-2">
        <input
          type="password"
          placeholder="Password"
          className="p-1.5 rounded w-full border-2 border-gray-200 border-b-gray-300 bg-gray-200"
        />
      </div>

      <div className="grid grid-rows-1 mt-4">
        <button className="bg-cip-orange w-full font-bold rounded text-base text-white p-2 uppercase ">
          Login
        </button>
      </div>

      <div className="grid grid-rows-1 mt-2 mb-4">
        <p className="text-center">
          Don't have an account?
          <Link href={"/signup"}> Sign up</Link>
        </p>
      </div>
    </div>
  );
}
