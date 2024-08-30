import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'tailwindcss/tailwind.css';

// Sample data, replace this with your actual API call
const sampleData = {
    "success": true,
    "data": [
        {
            "id": 1,
            "dr_name": "Suyash",
            "ref_by": "abc",
            "created_at": "2024-08-30T07:57:55.000000Z",
            "updated_at": "2024-08-30T07:57:55.000000Z"
        },
        {
            "id": 2,
            "dr_name": "xyz",
            "ref_by": "xyz",
            "created_at": "2024-08-30T07:59:13.000000Z",
            "updated_at": "2024-08-30T07:59:13.000000Z"
        }
    ],
    "message": "Doctors retrieved successfully."
};

const PatientDetails = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        // Simulate an API call
        setDoctors(sampleData.data);
    }, []);

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Doctors List", 10, 10);

        doc.setFontSize(12);
        doc.text("ID", 10, 20);
        doc.text("Name", 30, 20);
        doc.text("Ref By", 70, 20);
        doc.text("Created At", 110, 20);
        doc.text("Updated At", 160, 20);

        let yPosition = 30;
        doctors.forEach((doctor) => {
            doc.text(doctor.id.toString(), 10, yPosition);
            doc.text(doctor.dr_name, 30, yPosition);
            doc.text(doctor.ref_by, 70, yPosition);
            doc.text(new Date(doctor.created_at).toLocaleString(), 110, yPosition);
            doc.text(new Date(doctor.updated_at).toLocaleString(), 160, yPosition);
            yPosition += 10;
        });

        doc.save("doctors-list.pdf");
    };

    return (
        <div className='bg-blue-200'>
            <div className="p-6 max-w-4xl mx-auto bg-blue-200 rounded-lg shadow-lg">

                <div className="overflow-x-auto">
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                            <thead className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
                                <tr>
                                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">ID</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">Name</th>

                                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">Created At</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">Updated At</th>
                                </tr>
                            </thead>
                            <tbody className=" divide-gray-200">
                                {doctors.map(doctor => (
                                    <tr key={doctor.id} className=" hover:bg-gray-50">
                                        <td className="py-4 px-6 text-gray-800 font-medium">{doctor.id}</td>
                                        <td className="py-4 px-6 text-gray-800 font-medium">{doctor.dr_name}</td>
                                        <td className="py-4 px-6 text-gray-800 font-medium">{new Date(doctor.created_at).toLocaleString()}</td>
                                        <td className="py-4 px-6 text-gray-800 font-medium">{new Date(doctor.updated_at).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                    <h1 className="relative text-4xl font-extrabold text-center mt-8 mb-6 leading-tight">
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 opacity-30 blur-md -z-10"></span>
                        <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">
                            Doctors List
                        </span>
                        <span className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-extrabold text-gray-300 transform rotate-3 opacity-30">
                            Doctors List
                        </span>
                    </h1>



                    <div className="flex justify-center mb-6">
                        <button
                            onClick={generatePDF}
                            className="mb-6 px-6   py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150 ease-in-out"
                        >
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDetails;
