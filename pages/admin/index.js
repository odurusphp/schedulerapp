import { useEffect, useState } from "react";
import Menu from "../../components/Menu.js";
import axios from "axios";
import Checkroute from "../../components/helpers/Checkroute.js";

export default function Index() {
  const [usercount, setUserCount] = useState(0);
  const [todayBookings, seTtodayBookings] = useState("");
  const [totalBookings, setTotalBookings] = useState("");

  const getusers = async () => {
    const url = process.env.API_URL + "/users";
    const header = {
      headers: {
        x_auth_token: localStorage.getItem("token"),
      },
    };
    try {
      const result = await axios.get(url, header);
      const users = result.data.data;
      setUserCount(users.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getBookings = async () => {
    const url = process.env.API_URL + "/bookings/all";
    const header = {
      headers: {
        x_auth_token: localStorage.getItem("token"),
      },
    };
    try {
      const result = await axios.get(url, header);
      const booking = result.data.data;
      setTotalBookings(booking.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getBookingToday = async () => {
    const url = process.env.API_URL + "/bookings/today";
    const header = {
      headers: {
        x_auth_token: localStorage.getItem("token"),
      },
    };
    try {
      const result = await axios.get(url, header);
      const booking = result.data.data;
      seTtodayBookings(booking.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // Checkroute(token);
    getusers();
    getBookings();
    getBookingToday();
  }, []);

  return (
    <div className="grid">
      {/* Menu imported here  */}
      <Menu />

      <div className="grid grid-cols-1 flow-col  w-3/4 mx-auto my-8">
        <div className="grid grid-cols-3 gap-2 m-10">
          <div
            className={`flex flex-col col-span-1 h-64 justify-center shadow-lg
               justify-items-center items-center rounded-md bg-cip-orange p-4`}
          >
            <p className="text-white text-xl uppercase font-black">
              Total Users
            </p>
            <p className="text-white uppercase">
              <span className="text-4xl font-bold">{usercount} </span>
            </p>
          </div>
          <div
            className={`flex flex-col col-span-1 h-64 justify-center shadow-lg
               justify-items-center items-center rounded-md bg-cip-green p-4`}
          >
            <p className="text-white text-xl uppercase font-bold">
              Total Bookings
            </p>
            <p className="text-white uppercase">
              <span className="text-4xl font-bold">{totalBookings} </span>
            </p>
          </div>
          <div
            className={`flex flex-col col-span-1 h-64 justify-center shadow-lg
               justify-items-center items-center rounded-md bg-cip-blue p-4`}
          >
            <p className="text-white text-xl uppercase font-black">
              Total Bookings Today
            </p>
            <p className="text-white uppercase">
              <span className="text-4xl font-bold">{todayBookings} </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
