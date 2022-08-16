import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect } from "react";
import axios from "axios";
import Joi from "joi-browser";
import { useState } from "react";
import Logo from "../assets/logo.png";

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState({});
  const [regerror, setRegError] = useState("");

  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  //Form schema
  const schema = {
    email: Joi.string().required(),
    password: Joi.string().required(),
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
    try {
      const result = await axios.post(process.env.API_URL + "/login", formdata);
      console.log(result.data);
      if (result.status === 200) {
        if (result.data.userdata.role === "admin") {
          localStorage.setItem("token", result.data.token);
          router.push("/admin");
        } else {
          localStorage.setItem("token", result.data.token);
          router.push("/user");
        }
      } else {
        setRegError("Error: Invalid email or password");
      }
    } catch (err) {
      setRegError("Problem logging in. Try again later");
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

  useEffect(() => {
    console.log("process.env.API_URL", process.env.API_URL);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-rows-1 mx-auto my-20 w-1/3 bg-white border-2  p-4">
        <div className="grid grid-rows-1">
          <Image src={Logo} alt="logo" />{" "}
        </div>
        <div className="grid grid-rows-1 mt-4 place-items-center">
          <h1 className="text-2xl font-bold text-cip-blue ">SCHECULER APP</h1>
        </div>
        <div className="grid grid-rows-1 mt-4 place-items-center">
          <label className="text-red-500 text-sm">
            {regerror ? regerror : ""}
          </label>
        </div>

        <div className="grid grid-rows-1 mt-4">
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            className="p-1.5 rounded w-full border-2 border-gray-200"
          />
          <label className="text-red-500 text-sm">
            {error.email && "Email required"}{" "}
          </label>
        </div>
        <div className="grid grid-rows-1 my-2">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="p-1.5 rounded w-full border-2 border-gray-200 "
          />
          <label className="text-red-500 text-sm">
            {error.password && "Password required"}{" "}
          </label>
        </div>

        <div className="grid grid-rows-1 mt-4">
          <button className="bg-cip-deep-green w-full font-bold rounded text-base text-white p-2 uppercase ">
            Login
          </button>
        </div>
      </div>
    </form>
  );
}
