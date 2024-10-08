import React, { useRef } from 'react';
import PreviewContent from './PreviewContent';
import ReactToPrint from 'react-to-print';

class ComponentToPrint extends React.Component {
  render() {
    return <PreviewContent formData={this.props.formData} logoURL={this.props.logoURL} />;
  }
}

const PDFPopup = ({ formData, logoURL, setShowPopup }) => {
  const componentRef = useRef();

  return (
    <div className='2xl:max-w-screen-2xl 2xl:mx-auto'>
    <div className="fixed w-full h-full inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-[52rem] h-[100%] overflow-scroll">
        <h3 className="text-lg font-semibold mb-4 text-center">Submission</h3>
        <div className="p-4 lg:py-6 rounded lg:mb-8">
          <ComponentToPrint ref={componentRef} formData={formData} logoURL={logoURL} />
        </div>
        <ReactToPrint
          trigger={() => <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Download as PDF</button>}
          content={() => componentRef.current}
          onAfterPrint={() => console.log('Printed')}
        />
        <button
          onClick={() => setShowPopup(false)}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  </div>
  );
};

export default PDFPopup;
