import Image from "next/image";
import Link from "next/link";

export default function Menu() {
  return (
    <>
      <div className="grid grid-cols-5 flow-col w-full p-8 border-t-white sticky shadow-lg">
        <div className="col-span-1 ml-10">
          <span className="text-xl font-black text-cip-blue">SCHEDULAR</span>
        </div>

        <div className="col-span-4 ml-10 flex justify-end mr-20 mt-2">
          <p>
            {" "}
            <Link href={"/dashboard/accounts"}>
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
            <Link href={"/booking/"}>
              <a
                href="#"
                className=" pl-10 cursor-pointer hover:text-cip-orange hover:underline hover:underline-offset-8 
   "
              >
                Meetings
              </a>
            </Link>
          </p>

          <p>
            <Link href={"/admin/accounts"}>
              <a
                href="#"
                className=" pl-10 cursor-pointer hover:text-cip-orange hover:underline hover:underline-offset-8"
              >
                Users
              </a>
            </Link>
          </p>

          <p>
            {" "}
            <Link href={"/admin/rooms"}>
              <a
                href="#"
                className=" pl-10 cursor-pointer hover:text-cip-orange hover:underline hover:underline-offset-8 
               "
              >
                Rooms
              </a>
            </Link>
          </p>

          <p>
            {" "}
            <Link href={"/"}>
              <a
                href="#"
                className="ml-10 py-2 bg-cip-blue text-white rounded-md px-4 cursor-pointer hover:bg-cip-dark-orange hover:underline hover:underline-offset-8
               "
              >
                Logout
              </a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
