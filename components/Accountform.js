import { useState, useEffect } from "react";
import axios from "axios";
import Joi from "joi-browser";
import { useRouter } from "next/router";

export default function Accountform() {
  const router = useRouter();
  const [error, setError] = useState({});

  const [formdata, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  //Form schema
  const schema = {
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().required(),
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
      const result = await axios.post(
        process.env.API_URL + "/users/add",
        formdata
      );
      console.log(result);
      if (result.status === 200) {
        router.push("/dashboard/accounts");
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
              name="firstname"
              placeholder="First name"
              onChange={handleChange}
              className="p-1.5 rounded w-full border-2 border-white border-b-cip-blue"
            />
            <label className="text-red-500 text-sm">
              {error.firstname && "Name of account required"}{" "}
            </label>
          </div>

          <div className="grid grid-rows-1 mt-4">
            <input
              type="text"
              name="lastname"
              placeholder="Last name"
              onChange={handleChange}
              className="p-1.5 rounded w-full border-2 border-white border-b-cip-blue"
            />
            <label className="text-red-500 text-sm">
              {error.lastname && "Name of account required"}{" "}
            </label>
          </div>

          <div className="grid grid-rows-1 mt-4">
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="p-1.5 rounded w-full border-2 border-white border-b-cip-blue"
            />
            <label className="text-red-500 text-sm">
              {error.email && "Email required"}{" "}
            </label>
          </div>

          <div className="grid grid-rows-1 mt-4">
            <select
              name="role"
              onChange={handleChange}
              className="p-1.5 rounded w-full border-2 border-white border-b-cip-blue"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <label className="text-red-500 text-sm">
              {error.role && "Role required"}{" "}
            </label>
          </div>

          <div className="grid grid-rows-1 mt-4">
            <div className="flex">
              <button
                type="button"
                className="bg-cip-grey w-1/2 rounded text-sm text-cip-blue  p-2"
              >
                Cancel
              </button>

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
