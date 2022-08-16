import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Bookingform from "../../components/Bookingform.js";
import Menu from "../../components/Menu.js";
import axios from "axios";
import { useEffect, useState } from "react";
import checkroute from "../../components/helpers/checkroute.js";

export default function Add() {
  checkroute();
  return (
    <div className="grid">
      {/* Menu imported here  */}
      <Menu />
      <div className="h-screen bg-cip-grey">
        <div className="grid grid-cols-1 flow-col  w-2/4 mx-auto my-4">
          <div className="flex flex-row mt-10">
            <div className="mt-2 flex">
              <Link href={"/user"}>
                <p className="text-base font-normal text-start -ml-10 mx-10 cursor-pointer">
                  <span>
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </span>{" "}
                  Back
                </p>
              </Link>
              <p className="text-base font-normal underline underline-offset-8   decoration-cip-orange text-start">
                Book a Room
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-rows-1 flow-col w-2/4 mt-4 mx-auto">
          <Bookingform />
        </div>
      </div>
    </div>
  );
}
