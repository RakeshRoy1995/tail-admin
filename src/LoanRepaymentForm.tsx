import React from 'react';

const LoanRepaymentForm = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Loan Repayment Form</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Loan Account Number</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="Write"
            />
          </div>
          <div>
            <label className="block text-gray-700">Borrower Name</label>
            <select className="w-full mt-1 p-2 border rounded-lg">
              <option>Select</option>
              {/* Add options here */}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Loan Amount (BDT)</label>
            <input
              type="number"
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="00,000.00"
            />
          </div>
          <div>
            <label className="block text-gray-700">Interest Rate (BDT)</label>
            <input
              type="number"
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="00.00"
            />
          </div>
          <div>
            <label className="block text-gray-700">Repayment Frequency (BDT)</label>
            <select className="w-full mt-1 p-2 border rounded-lg">
              <option>Select</option>
              {/* Add options here */}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Loan Tenure</label>
            <input
              type="number"
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="00.00"
            />
          </div>
          <div>
            <label className="block text-gray-700">Grace Period</label>
            <input
              type="number"
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="00"
            />
          </div>
        </div>

        <h3 className="text-lg font-semibold mt-8 mb-4">Repayment Schedule List</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">S.N</th>
                <th className="border border-gray-300 p-2">Repayment Number</th>
                <th className="border border-gray-300 p-2">Repayment Date</th>
                <th className="border border-gray-300 p-2">Principal Amount</th>
                <th className="border border-gray-300 p-2">Interest Amount</th>
                <th className="border border-gray-300 p-2">Total Payment</th>
                <th className="border border-gray-300 p-2">Remaining Balance</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample row, repeat or map over rows here */}
              <tr>
                <td className="border border-gray-300 p-2 text-center">1</td>
                <td className="border border-gray-300 p-2">1</td>
                <td className="border border-gray-300 p-2">01/01/2025</td>
                <td className="border border-gray-300 p-2">10,000</td>
                <td className="border border-gray-300 p-2">500</td>
                <td className="border border-gray-300 p-2">10,500</td>
                <td className="border border-gray-300 p-2">90,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow">
            Download
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanRepaymentForm;
