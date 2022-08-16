import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Usermenu() {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <>
      <div className="grid grid-cols-5 flow-col w-full p-8 border-t-white sticky shadow-lg">
        <div className="col-span-1 ml-10">
          <span className="text-xl font-black text-cip-blue">SCHEDULAR</span>
        </div>

        <div className="col-span-4 ml-10 flex justify-end mr-20 mt-2">
          <p>
            {" "}
            <Link href={"/user"}>
              <a
                href="#"
                className=" pl-10 cursor-pointer hover:text-cip-orange hover:underline hover:underline-offset-8 
               "
              >
                Dashboard
              </a>
            </Link>
          </p>

          <p className="">
            {" "}
            <Link href={"/user/booking/"}>
              <a
                href="#"
                className=" pl-10 cursor-pointer hover:text-cip-orange hover:underline hover:underline-offset-8"
              >
                Bookings
              </a>
            </Link>
          </p>

          <p>
            {" "}
            <a
              href="#"
              className="ml-10 py-2 bg-cip-blue text-white rounded-md px-4 cursor-pointer hover:bg-cip-dark-orange 
              hover:underline hover:underline-offset-8"
              onClick={logout}
            >
              Logout
            </a>
          </p>
        </div>
      </div>
    </>
  );
}