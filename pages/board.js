import { useEffect, useState } from "react";
import axios from "axios";
import {
  errorResponse,
  successResponse,
  formatdate,
  getTime,
  getSeconds,
} from "../utils/helpers/general";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function board() {
  const [bookings, setBookingdata] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
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

  const checkTimeBetween = (startTime, endTime) => {
    const currentTime = getTime(new Date());
    const sTime = getTime(new Date(startTime));
    const eTime = getTime(new Date(endTime));

    if (currentTime < sTime) {
      return "bg-cip-blue";
    } else if (currentTime >= sTime && currentTime <= eTime) {
      return "bg-cip-active";
    } else if (currentTime > eTime) {
      return "bg-cip-inactive";
    }
  };

  const MINUTE_MS = 60000;
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Logs every minute");
      getBookings();
    }, MINUTE_MS);
    getBookings();

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  return (
    <div class="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-screen pt-4">
      <div className="">
        <p className="text-center text-white text-4xl uppercase font-black ">
          Booking Appointments Board
        </p>
        {/* <p className="text-center">{new Date().toLocaleString()}</p> */}
        <div className="grid grid-cols-4 gap-2 m-10">
          {bookings.map((booking) => (
            <div
              className={`flex flex-col col-span-1 h-64 justify-center shadow-lg
               justify-items-center items-center rounded-md ${checkTimeBetween(
                 booking.from_date,
                 booking.to_date
               )}`}
            >
              <p className="text-white text-xl uppercase font-normal">
                Booked By: {booking.user}{" "}
              </p>
              <p className="text-white uppercase">
                Room:{" "}
                <span className="text-2xl font-bold">{booking.room} </span>
              </p>
              <p className="text-white  py-2">
                Start Time:{" "}
                <span className="text-4xl font-bold">
                  {getTime(booking.from_date)}{" "}
                </span>
              </p>
              <p className="text-white ">
                End Time:{" "}
                <span className="text-2xl font-bold">
                  {getTime(booking.to_date)}
                </span>{" "}
              </p>

              {/* <p className="mt-4">
                <CountdownCircleTimer
                  isPlaying
                  strokeWidth={5}
                  duration={getSeconds(booking.from_date, booking.to_date)}
                  colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                  colorsTime={[7, 5, 2, 0]}
                  size={80}
                >
                  {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
              </p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default board;
