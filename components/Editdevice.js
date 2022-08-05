import { useState, useEffect } from "react";
import axios from "axios";
import Joi from "joi-browser";
import { useRouter } from "next/router";

export default function Editdevice({ devicedata }) {
  const router = useRouter();

  const [contractsdata, setContractsdata] = useState([]);
  const [error, setError] = useState({});
  const [formdata, setFormData] = useState({
    name: "",
    type: "",
    contractId: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  //Form schema
  const schema = {
    name: Joi.string().required(),
    contractId: Joi.string().required(),
    type: Joi.string().required(),
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
      const deviceid = devicedata.id;
      const result = await axios.put(
        process.env.API_URL + "/devices/" + deviceid,
        formdata
      );
      console.log(result);
      if (result.status === 200) {
        router.push("/dashboard/devices");
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

  const getContracts = async () => {
    const url = process.env.API_URL + "/contracts";
    try {
      const result = await axios.get(url);
      setContractsdata(result.data.contracts);
      console.log(result.data.contracts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //formdata.name = devicedata.name;
    console.log("edit data", devicedata);
    setFormData({
      name: devicedata.name,
      type: devicedata.type,
      contractId: devicedata.contractId,
    });

    getContracts();
  }, [devicedata]);

  return (
    <>
      <div className="grid grid-rows-1 p-10 bg-white shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-rows-1 mt-4">
            <label className="text-sm text-cip-blue">Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              value={formdata.name || ""}
              className="p-1.5 rounded w-full border-2 border-white border-b-cip-blue"
            />
            <label className="text-red-500 text-sm">
              {error.name && "Name of device required"}{" "}
            </label>
          </div>
          <div className="grid grid-rows-1 my-2">
            <label className="text-cip-blue text-sm">Type:</label>
            <select
              type="text"
              placeholder="Contract ID"
              name="type"
              onChange={handleChange}
              className="p-1.5 rounded w-full border-2 border-white border-b-cip-blue text-gray-500 "
            >
              <option>{formdata.type}</option>
              <option>Luxury</option>
              <option>Simple</option>
            </select>
            <label className="text-red-500 text-sm">
              {error.type && "Device type required"}{" "}
            </label>
          </div>

          <div className="grid grid-rows-1">
            <label className="text-cip-blue text-sm">Contract:</label>
            <select
              type="text"
              placeholder="Contract ID"
              name="contractId"
              onChange={handleChange}
              className="p-1.5 rounded w-full border-2 border-white border-b-cip-blue text-gray-500 "
            >
              <option>{formdata.contractId}</option>
              {contractsdata.map((contract) => (
                <option value={contract.name} key={contract.id}>
                  {contract.name}
                </option>
              ))}
            </select>
            <label className="text-red-500 text-sm">
              {error.contractId && "Contract of device required"}{" "}
            </label>
          </div>

          <div className="grid grid-rows-1 mt-4">
            <div className="flex">
              <button
                className="bg-cip-grey w-1/2 rounded text-sm text-cip-blue  p-2  "
                onClick={() => closeBox()}
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
