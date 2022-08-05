import { useState, useEffect } from "react";
import axios from "axios";
import Joi from "joi-browser";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Roomform() {
  const router = useRouter();
  const [error, setError] = useState({});
  const [roomdata, setRoomdata] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [formdata, setFormData] = useState({
    from_date: "",
    to_date: "",
    room_id: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  //Form schema
  const schema = {
    from_date: Joi.string().required(),
    to_date: Joi.string().required(),
    room_id: Joi.string().required(),
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

  const getrooms = async () => {
    const url = process.env.API_URL + "/rooms";
    const header = {
      headers: {
        x_auth_token: localStorage.getItem("token"),
      },
    };
    try {
      const result = await axios.get(url, header);
      console.log("room result", result.data);
      setRoomdata(result.data.data);
    } catch (error) {
      console.log(error);
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
    getrooms();
  }, []);

  return (
    <>
      <div className="grid grid-rows-1 p-10 bg-white shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-rows-1 mt-4">
            <select
              name="room_id"
              onChange={handleChange}
              className="p-1.5 rounded w-full border-2 border-white border-b-cip-blue"
            >
              <option value="">Select Room</option>
              {roomdata.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>

            <label className="text-red-500 text-sm">
              {error.room_id && "Room required"}{" "}
            </label>
          </div>

          <div className="grid grid-rows-1 mt-4">
            <DatePicker
              placeholderText="From"
              className="p-1.5 rounded w-full border-2 border-white border-b-cip-blue"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="yyyy-MM-dd h:mm aa"
            />
            <label className="text-red-500 text-sm">
              {error.startDate && "Start date required"}{" "}
            </label>
          </div>

          <div className="grid grid-rows-1 mt-4">
            <DatePicker
              placeholderText="To"
              className="p-1.5 rounded w-full border-2 border-white border-b-cip-blue"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              dateFormat="yyyy-MM-dd h:mm aa"
            />
            <label className="text-red-500 text-sm">
              {error.endDate && "End date required"}{" "}
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
