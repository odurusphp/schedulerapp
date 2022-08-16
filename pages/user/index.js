import Link from "next/link";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu.js";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import checkroute from "../../components/helpers/checkroute.js";
export default function user() {
  checkroute();
  const [bookings, setBookingData] = useState([]);
  const getBookings = async () => {
    const token = localStorage.getItem("token");
    const url = process.env.API_URL + "/bookings";
    const header = {
      headers: {
        x_auth_token: token,
      },
    };
    try {
      const result = await axios.get(url, header);
      console.log("room result", result.data);
      setBookingData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("token room", localStorage.getItem("token"));
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
              My List of Bookings
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
