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
    <div className="flex items-center text-center justify-center min-h-screen bg-blue-200">
      <form className="bg-white p-2  items-center  justify-between  rounded-md w-[400px]">
        <h2 className=" font-bold mt-5 mb-5 text-center">Patient Information Form</h2>
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
          <div key={index} className="mb-1 flex items-center "> 
            <label className="text-black font-semibold  text-sm  ml-10 w-24">{label}:</label> 
            {type === 'select' ? (
              <select
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="border-2 border-black p-1 rounded ml-10 w-40 h-8 "
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
                className="border-2 border-black p-2 rounded text-sm ml-10  w-40 h-8"
                required
              />
            )}
          </div>
        ))}

        {errorMessage && <p className="text-red-600 font-semibold text-center">{errorMessage}</p>}

        <button
          type="button"
          onClick={generatePDF}
          className="bg-blue-600 text-white py-2 px-3 mt-5 rounded hover:bg-blue-700 transition-colors  text-sm"
        >
          Generate PDF
        </button>
      </form>
    </div>
    
  );
}
