import Link from "next/link";
import { useEffect, useState } from "react";
import Menu from "../../../components/Menu.js";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function Contracts() {
  const [userdata, setUserdata] = useState([]);

  const getusers = async () => {
    const url = process.env.API_URL + "/users";
    const header = {
      headers: {
        x_auth_token: localStorage.getItem("token"),
      },
    };
    try {
      const result = await axios.get(url, header);
      console.log("user result", result.data);
      setUserdata(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("token", localStorage.getItem("token"));
    getusers();
  }, []);

  return (
    <div className="grid">
      {/* Menu imported here  */}
      <Menu />

      <div className="grid grid-cols-1 flow-col  w-3/4 mx-auto my-8">
        <div className="flex flex-row">
          <div className="basis-4/6 mt-2">
            <h1 className="text-2xl font-normal underline underline-offset-8   decoration-cip-orange text-start">
              List of Accounts
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
              <Link href={"/dashboard/accounts/add"}>
                <a className="bg-cip-deep-green p-2.5 text-white  rounded-md w-full text-sm">
                  {" "}
                  Add New Account{" "}
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
              <td className="text-start p-2">Name</td>
              <td className="text-start p-2">Email</td>
              <td className="text-start p-2">Role</td>
              <td className="text-start p-2">Date Created</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {userdata.map((contract, index) => (
              <tr
                key={contract.id}
                className="border border-gray-300 border-2  even:bg-cip-light-green  odd:bg-white"
              >
                <td className={"text-start p-2 text-sm"}>{index + 1}</td>
                <td className="text-start p-2 text-sm">
                  {contract.firstname + " " + contract.lastname}
                </td>
                <td className="text-start p-2 text-sm">{contract.email}</td>
                <td className="text-start p-2 text-sm">{contract.role}</td>
                <td className="text-start p-2 text-sm">
                  {contract.created_on}
                </td>
                <td className="text-start p-2  text-xs">
                  <Link href={"/dashboard/contracts/" + contract.id}>
                    <span className="p-1.5 rounded-full  bg-cip-blue px-4 cursor-pointer">
                      <FontAwesomeIcon icon={faEdit} color={"#fff"} />
                    </span>
                  </Link>

                  <span
                    className="p-1.5 rounded-full   bg-red-500 px-4 cursor-pointer"
                    onClick={() => deleteContract(contract.id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} color={"#fff"} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
