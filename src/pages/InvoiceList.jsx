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
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Client</th>
                <th className="border border-gray-300 p-2">Amount</th>
                <th className="border border-gray-300 p-2">Date</th>
                {/* Add more headers as necessary */}
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="border border-gray-300 p-2">{invoice.id}</td>
                  <td className="border border-gray-300 p-2">{invoice.client}</td>
                  <td className="border border-gray-300 p-2">{invoice.amount}</td>
                  <td className="border border-gray-300 p-2">{invoice.date}</td>
                  {/* Render more fields as necessary */}
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
