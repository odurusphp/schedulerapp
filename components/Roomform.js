import { useState, useEffect } from "react";
import axios from "axios";
import Joi from "joi-browser";
import { useRouter } from "next/router";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";

export default function Roomform() {
  const router = useRouter();
  const [error, setError] = useState({});

  const [formdata, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  //Form schema
  const schema = {
    name: Joi.string().required(),
    description: Joi.string().required(),
  };

  //Validate form function
  const validate = () => {
    const result = Joi.validate(formdata, schema, { abortEarly: false });
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const submitFormdata = async (e) => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      x_auth_token: token,
    };

    console.log(headers);

    const url = process.env.API_URL + "/rooms/add";
    try {
      const result = await axios.post(url, formdata, { headers });
      console.log(result);
      if (result.status === 200) {
        router.push("/admin/rooms");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setError(errors || {});
    if (errors) return;
    submitFormdata();
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="grid grid-rows-1 p-10 bg-white shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-rows-1 mt-4">
            <input
              type="text"
              name="name"
              placeholder="Room Name"
              onChange={handleChange}
              className="p-1.5 rounded w-full border-2 border-white border-b-cip-blue"
            />

            <label className="text-red-500 text-sm">
              {error.name && "Room required"}{" "}
            </label>
          </div>

          <div className="grid grid-rows-1 mt-4">
            <input
              type="text"
              name="description"
              placeholder="Description"
              onChange={handleChange}
              className="p-1.5 rounded w-full border-2 border-white border-b-cip-blue"
            />

            <label className="text-red-500 text-sm">
              {error.description && "Room required"}{" "}
            </label>
          </div>

          <div className="grid grid-rows-1 mt-4">
            <div className="flex">
              <Link href={"/admin/rooms"}>
                <button
                  type="button"
                  className="bg-cip-grey w-1/2 rounded text-sm text-cip-blue  p-2"
                >
                  Cancel
                </button>
              </Link>

              <button
                type="submit"
                className="bg-cip-blue w-1/2 rounded text-sm text-white p-2  ml-4"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
