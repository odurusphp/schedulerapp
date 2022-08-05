import { useState, useEffect } from "react";
import axios from "axios";
import Joi from "joi-browser";
import { useRouter } from "next/router";

export default function Editform({ contractdata }) {
  const router = useRouter();

  const [accountsdata, setAccountsdata] = useState([]);
  const [error, setError] = useState({});

  const [formdata, setFormData] = useState({
    name: "",
    accountId: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  //Form schema
  const schema = {
    name: Joi.string().required(),
    accountId: Joi.string().required(),
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
    const contractid = router.query.contractid;
    try {
      const result = await axios.put(
        process.env.API_URL + "/contracts/" + contractid,
        formdata
      );
      console.log(result);
      if (result.status === 200) {
        router.push("/dashboard/contracts");
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

  const getAccounts = async () => {
    const url = process.env.API_URL + "/accounts";
    try {
      const result = await axios.get(url);
      setAccountsdata(result.data.accounts);
      console.log("ac data", result.data.accounts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFormData({
      name: contractdata.name,
      accountId: contractdata.accountId,
    });
    getAccounts();
  }, [contractdata]);

  return (
    <>
      <div className="grid grid-rows-1 p-10 bg-white shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-rows-1 mt-4">
            <input
              type="text"
              name="name"
              placeholder="Contract Name"
              onChange={handleChange}
              value={formdata.name || ""}
              className="p-1.5 rounded w-full border-2 border-white border-b-cip-blue"
            />
            <label className="text-red-500 text-sm">
              {error.name && "Name of contract required"}{" "}
            </label>
          </div>

          <div className="grid grid-rows-1">
            <select
              type="text"
              placeholder="Account ID"
              name="accountId"
              onChange={handleChange}
              className="p-1.5 rounded w-full border-2 border-white border-b-cip-blue text-gray-500 "
            >
              <option>{formdata.accountId || ""}</option>
              {accountsdata.map((account) => (
                <option value={account.accountId} key={account.id}>
                  {account.accountId}
                </option>
              ))}
            </select>
            <label className="text-red-500 text-sm">
              {error.accountId && "Account ID required"}{" "}
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
