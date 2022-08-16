import Link from "next/link";
import { useEffect, useState } from "react";
import Menu from "../../../components/Menu.js";
import axios from "axios";
import Checkroute from "../../../components/helpers/Checkroute.js";

export default function Bookings() {
  const [bookings, setBookingdata] = useState([]);

  const getBookings = async () => {
    const url = process.env.API_URL + "/bookings/today";
    const header = {
      headers: {
        x_auth_token: localStorage.getItem("token"),
      },
    };
    try {
      const result = await axios.get(url, header);
      console.log("book result", result.data);
      setBookingdata(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // Checkroute(token);
    getBookings();
  }, []);

  return (
    <div className="grid">
      {/* Menu imported here  */}
      <Menu />

      <div className="grid grid-cols-1 flow-col  w-3/4 mx-auto my-8">
        <div className="flex flex-row">
          <div className="basis-4/6 mt-2">
            <h1 className="text-2xl font-normal underline underline-offset-8   decoration-cip-orange text-start">
              List of Bookings
            </h1>
          </div>

          <div className=" flex">
            <div className="mt-2 mx-2">
              <input
                type={"text"}
                placeholder={"Search"}
                className={
                  "border border-gray-300 border-2 rounded-md p-2 w-full"
                }
              />
            </div>

            <div className="mt-4">
              <Link href={"/user/booking"}>
                <a className="bg-cip-deep-green p-2.5 text-white  rounded-md w-full text-sm">
                  {" "}
                  Book a room{" "}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-rows-1 flow-col w-3/4 mt-4 mx-auto">
        <table className="">
          <thead>
            <tr className="border border-gray-300 border-2 font-bold bg-cip-green text-white">
              <td className="text-start p-2">#</td>
              <td className="text-start p-2">Room</td>
              <td className="text-start p-2">Booked By</td>
              <td className="text-start p-2">From</td>
              <td className="text-start p-2">To</td>
              <td className="text-start p-2">Status</td>
              <td className="text-start p-2"> Created at </td>
            </tr>
          </thead>
          <tbody>
            {bookings.map((item, index) => (
              <tr
                key={item.id}
                className="border border-gray-300 border-2  even:bg-cip-light-green  odd:bg-white"
              >
                <td className={"text-start p-2 text-sm"}>{index + 1}</td>
                <td className="text-start p-2 text-sm">{item.room}</td>
                <td className="text-start p-2 text-sm">{item.user}</td>
                <td className="text-start p-2 text-sm">{item.from_date}</td>
                <td className="text-start p-2 text-sm">{item.to_date}</td>
                <td className="text-start p-2 text-sm">{item.status}</td>
                <td className="text-start p-2 text-sm">{item.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
