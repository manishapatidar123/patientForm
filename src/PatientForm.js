import React, { useState } from 'react';

import jsPDF from 'jspdf';

export default function PatientForm() {
  const [formData, setFormData] = useState({
    ptname: '',
    age: '',
    dname: '',
    refby: '',
    test: '',
    amttotal: '',
    amtpaid: '',
    amtonline: '',
    amtcash: '',
    amtdue: '',
    rcless: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePreview = () => {
    if (Object.values(formData).includes('')) {
      setErrorMessage('All fields are required to fill!');
      return;
    }
    setErrorMessage('');
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Patient Information', 20, 20);
    Object.entries(formData).forEach(([key, value], index) => {
      doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`, 20, 30 + index * 10);
    });

    doc.save('PatientForm.pdf');

    setFormData({
      ptname: '',
      age: '',
      dname: '',
      refby: '',
      test: '',
      amttotal: '',
      amtpaid: '',
      amtonline: '',
      amtcash: '',
      amtdue: '',
      rcless: '',
    });

    setShowPreview(false);
  };

  return (
    <div className="flex items-center text-center justify-center min-h-screen bg-blue-200">
      <form className="bg-white p-2  items-center  justify-between  rounded-md w-[400px]">
        <h2 className="relative text-3xl font-bold mb-5 text-center text-gray-800">
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500  opacity-30 blur-md -z-10"></span>
          <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-500 ">
            Patient Information Form
          </span>
          <span className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-gray-300 transform rotate-2 opacity-20">
            Patient Information Form
          </span>
        </h2>


        {[
          { label: 'Patient Name', name: 'ptname', type: 'text', placeholder: 'Enter Patient Name' },
          { label: 'Age', name: 'age', type: 'text', placeholder: 'Enter Age' },
          { label: 'Doctor Name', name: 'dname', type: 'text', placeholder: 'Enter Doctor Name' },
          { label: 'Referred By', name: 'refby', type: 'text', placeholder: 'Enter Referred By' },
          {
            label: 'Test',
            name: 'test',
            type: 'select',
            options: [
              'HAEMATOLOGY_CELLCOUNTER',
              'HAEMATOLOGY',
              'BIOCHEMISTRY',
              'EXAMINATION OF BODY FLUID',
              'CARDIAC MARKER',
              'SEROLOGY',
              'CLINICAL PATHOLOGY',
              'COAGULATION STUDIES',
              'ANTIBODY TESTS',
              'CYTOLOGY',
            ],
          },
          { label: 'Amount Total', name: 'amttotal', type: 'number', placeholder: 'Enter Amount Total' },
          { label: 'Amount Paid', name: 'amtpaid', type: 'number', placeholder: 'Enter Amount Paid' },
          { label: 'Amount Online', name: 'amtonline', type: 'number', placeholder: 'Enter Amount Online' },
          { label: 'Amount Cash', name: 'amtcash', type: 'number', placeholder: 'Enter Amount Cash' },
          { label: 'Amount Due', name: 'amtdue', type: 'number', placeholder: 'Enter Amount Due' },
          { label: 'RC Less', name: 'rcless', type: 'number', placeholder: 'Enter RC Less' },
        ].map(({ label, name, type, placeholder, options }, index) => (
          <div key={index} className="mb-1 flex ">
            <label className="text-black font-semibold text-sm ml-10 w-24">{label}:</label>
            {type === 'select' ? (
              <select
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="border-2 border-black p-1 rounded ml-10 w-40 h-8"
              >
                <option value="" disabled>
                  Choose Test...
                </option>
                {options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleInputChange}
                className="border-2 border-black p-2 rounded text-sm ml-10 w-40 h-8"
                required
              />
            )}
          </div>
        ))}

        {errorMessage && <p className="text-red-600 font-semibold text-center">{errorMessage}</p>}

        <button
          type="button"
          onClick={handlePreview}
          className="bg-blue-600 text-left  text-white py-2 px-3 mt-5 rounded hover:bg-blue-700 transition-colors text-sm"
        >
          Preview & Generate PDF
        </button>

        {showPreview && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-lg w-80">
              <h3 className="font-bold text-lg mb-4 text-center">Patient Information Preview</h3>
              <ul>
                {Object.entries(formData).map(([key, value], index) => (
                  <li key={index} className="text-sm mb-1">
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                  </li>
                ))}
              </ul>
              <div className="flex justify-around mt-4">
                <button
                  onClick={generatePDF}
                  className="bg-blue-800  text-white py-1 px-3 rounded hover:bg-green-700"
                >
                  Confirm & Download
                </button>
                <button
                  onClick={handleClosePreview}
                  className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
