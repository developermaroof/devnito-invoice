// src/pages/InvoiceList.jsx
import React from 'react';
import { useInvoice } from '../context/InvoiceContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const InvoiceList = () => {
  const { invoices } = useInvoice(); // Get invoices from context

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">Invoice List</h1>
        {invoices.length === 0 ? (
          <p>No invoices available.</p>
        ) : (
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Contract Status</th>
                <th className="border border-gray-300 p-2">Starting Date</th>
                <th className="border border-gray-300 p-2">Deadline</th>
                <th className="border border-gray-300 p-2">Payment Status</th>
                <th className="border border-gray-300 p-2">Title</th>
                <th className="border border-gray-300 p-2">Client Details</th>
                <th className="border border-gray-300 p-2">Assignee Details</th>
                <th className="border border-gray-300 p-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="border border-gray-300 p-2">{invoice.name}</td>
                  <td className="border border-gray-300 p-2">{invoice.contractStatus}</td>
                  <td className="border border-gray-300 p-2">{invoice.startingDate}</td>
                  <td className="border border-gray-300 p-2">{invoice.deadline}</td>
                  <td className="border border-gray-300 p-2">{invoice.paymentStatus}</td>
                  <td className="border border-gray-300 p-2">{invoice.title}</td>
                  <td className="border border-gray-300 p-2">{invoice.clientDetails}</td>
                  <td className="border border-gray-300 p-2">{invoice.assigneeDetails}</td>
                  <td className="border border-gray-300 p-2">{invoice.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default InvoiceList;
