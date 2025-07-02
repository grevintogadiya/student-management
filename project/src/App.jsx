import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./compartment/Table";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2.js";

function App() {
  let [enquriy, setEnquriy] = useState([]);
  let [fromDara, setFromData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: "",
  });

  let saveEnquiry = (e) => {
    e.preventDefault();
    console.log("Form submitted");

    if (fromDara._id) {
      axios
        .put(`http://localhost:8020/api/website/enquriy/update/${fromDara._id}`, fromDara)
        .then((res) => {
          console.log(res.data);
          toast.success("Enquiry updated successfully");
          setFromData({
            name: "",
            email: "",
            phone: "",
            message: "",
            _id: "", // ✅ ensure _id is reset
          });
          getAllenquriy();
        });
      return;
    }

    axios
      .post(`http://localhost:8020/api/website/enquriy/insert`, fromDara)
      .then((res) => {
        console.log(res.data);
        toast.success("Enquiry saved successfully");
        setFromData({
          name: "",
          email: "",
          phone: "",
          message: "",
          _id: "", 
        });
        getAllenquriy();
      });
  };

  let getValue = (e) => {
    let inputname = e.target.name;
    let inputvalue = e.target.value;
    let oldData = { ...fromDara };
    oldData[inputname] = inputvalue;
    setFromData(oldData);
  };

  let getAllenquriy = () => {
    axios.get("http://localhost:8020/api/website/enquriy/view")
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.status) {
          setEnquriy(finalData.enquriylist);
        }
      });
  };

  useEffect(() => {
    getAllenquriy();
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50 p-6">
        <h1 className="text-5xl text-center py-6 font-extrabold text-blue-800 drop-shadow">
          User Enquiry
        </h1>

        <div className="grid grid-cols-[35%_auto] gap-12 max-w-7xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-xl border border-blue-100">
            <h2 className="text-3xl font-bold mb-6 text-blue-700">Enquiry Form</h2>
            <form onSubmit={saveEnquiry}>
              <div className="mb-5">
                <label className="block mb-2 text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="name"
                  value={fromDara.name}
                  onChange={getValue}
                  required
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  name="email"
                  value={fromDara.email}
                  onChange={getValue}
                  required
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-gray-700 font-medium">Phone No</label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  name="phone"
                  value={fromDara.phone}
                  onChange={getValue}
                  required
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-gray-700 font-medium">Message</label>
                <textarea
                  placeholder="Enter your message"
                  className="w-full p-3 border border-blue-200 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  name="message"
                  value={fromDara.message}
                  onChange={getValue}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition"
              >
                Submit Enquiry
              </button>
            </form>
          </div>

          <Table
            data={enquriy}
            getAllenquriy={getAllenquriy}
            Swal={Swal}
            setFromData={setFromData}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
