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

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const generatePDF = () => {
    const { ptname, age, dname, refby, test, amttotal, amtpaid, amtonline, amtcash, amtdue, rcless } = formData;

    setErrorMessage('');

    if ([ptname, age, dname, refby, test, amttotal, amtpaid, amtonline, amtcash, amtdue, rcless].includes('')) {
      setErrorMessage('All fields are required to fill!');
      return;
    }

    if (!window.confirm('Do you want to download the PDF?')) {
      return;
    }

    const doc = new jsPDF();
    doc.text('Patient Information', 20, 20);
    Object.entries(formData).forEach(([key, value], index) => {
      doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`, 20, 30 + index * 10);
    });

    doc.save('patientForm.pdf');

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
  };

  return (
<div className="flex items-center justify-center min-h-screen bg-slate-400">
  <form className="bg-white p-4 shadow-md rounded-md w-[400px]">
    <h2 className="text-2xl font-bold mb-2 text-center">Patient Information Form</h2>
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
      <div key={index} className="mb-6">
        <label className="text-gray-700 font-semibold mb-2 text-lg">{label}:</label>
        {type === 'select' ? (
          <select
            name={name}
            value={formData[name]}
            onChange={handleInputChange}
            className="border-2 border-gray-300 p-1 rounded w-full"
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
            className="border-2 border-gray-300 p-3 rounded w-full"
            required
          />
        )}
      </div>
    ))}

    {errorMessage && <p className="text-red-600 font-semibold text-center">{errorMessage}</p>}

    <button
      type="button"
      onClick={generatePDF}
      className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition-colors w-full text-lg"
    >
      Generate PDF
    </button>
  </form>
</div>
  );
}
