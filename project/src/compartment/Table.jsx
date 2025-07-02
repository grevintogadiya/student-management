import axios from 'axios';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

function Table({ data, getAllenquriy, Swal, setFromData }) {
  let deleteRow = (delid) => {

    Swal.fire({
      title: "Do you want to save the data?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8020/api/website/enquriy/delete/${delid}`)
          .then(() => {
            toast.success("Enquiry deleted successfully");
            getAllenquriy();
          })
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });


  };

  let editRow = (editid) => {
    axios.get(`http://localhost:8020/api/website/enquriy/edit/${editid}`).then((res) => {
      let data = res.data;
      setFromData(data.enquriy);
    })
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-purple-700">Enquiry List</h2>
      <ToastContainer />
      <div className="overflow-x-auto bg-white rounded-xl shadow-xl border border-purple-100">
        <table className="min-w-full text-sm text-gray-700">
          <thead>
            <tr className="bg-gradient-to-r from-purple-100 to-pink-100 text-gray-900 font-semibold">
              <th className="py-3 px-4 border-b text-left">Sr</th>
              <th className="py-3 px-4 border-b text-left">Name</th>
              <th className="py-3 px-4 border-b text-left">Email</th>
              <th className="py-3 px-4 border-b text-left">Phone</th>
              <th className="py-3 px-4 border-b text-left">Message</th>
              <th className="py-3 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-purple-50">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4">{item.email}</td>
                    <td className="py-2 px-4">{item.phone}</td>
                    <td className="py-2 px-4">{item.message}</td>
                    <td className="py-2 px-4 space-x-2">
                      <button onClick={() => editRow(item._id)} className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600">Edit</button>
                      <button onClick={() => deleteRow(item._id)} className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white">
                  <td className="py-4 px-4 text-center text-gray-500" colSpan={6}>
                    No Data Found
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
