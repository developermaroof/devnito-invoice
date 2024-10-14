import React from 'react';

const PreviewContent = ({ formData, logoURL }) => {
  return (
    <div className="p-4 lg:py-6 rounded w-full lg:max-h-[80vh] lg:min-h-auto">
      <div className='bg-gray-100 p-2 md:p-4 lg:p-6 flex flex-col gap-10 lg:gap-14'>
        <div className='flex justify-between items-center'>
          <div>
            <p className='font-semibold text-[0.6rem] sm:text-sm md:text-lg lg:text-xl xl:text-2xl text-gray-700'>{formData.title}</p>
          </div>
          <div className='flex items-center justify-center gap-[0.1rem]'>
            {logoURL && (
              <img src={logoURL} alt={formData.companyLogoName} className="w-4 h-4 sm:w-6 sm:h-6 lg:w-10 lg:h-10 xl:w-12 xl:h-12" />
            )}
            <p className='text-sm sm:text-lg md:text-xl lg:text-3xl xl:text-4xl font-bold'>{formData.companyLogoName}</p>
          </div>
        </div>
        <div>
          <p className='text-center font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl'>{formData.contractHeading}</p>
        </div>
      </div>
      <div className='flex flex-col gap-2 lg:gap-4 mt-4 md:mt-8 text-[0.6rem] sm:text-[0.8rem] md:text-sm lg:text-lg xl:text-xl'>
        <p>Dear <span className='font-semibold'>{formData.name}</span>,</p>
        <p>{formData.paragraph1}</p>
        <p>{formData.paragraph2}</p>
        <p>{formData.paragraph3}</p>
      </div>
      <div className='flex flex-col lg:flex-row justify-between p-2 md:p-4 lg:p-8 xl:py-14 gap-2 lg:gap-4'>
        <div>
          <span className='text-xs sm:text-sm md:text-[1rem] xl:text-xl font-bold'>Project Budget</span>
          <p className='text-xs sm:text-sm md:text-[1rem] xl:text-xl pt-2'>{formData.projectBudget}</p>
        </div>
        <div className='lg:border-l lg:border-l-[0.2rem] lg:pl-6'>
          <span className='text-xs sm:text-sm md:text-[1rem] xl:text-xl font-bold'>Duration</span>
          <li className='text-xs sm:text-sm md:text-[1rem] xl:text-xl lg:pl-2 lg:pt-2'>{formData.durationSoft} soft-deadline</li>
          <li className='text-xs sm:text-sm md:text-[1rem] xl:text-xl lg:pl-2'>{formData.durationHard} hard-deadline</li>
        </div>
        <div className='lg:border-l lg:border-l-[0.2rem] lg:pl-6'>
          <span className='text-xs sm:text-sm md:text-[1rem] xl:text-xl font-bold'>Starting from</span>
          <li className='text-xs sm:text-sm md:text-[1rem] xl:text-xl lg:pl-2 lg:pt-2'>{formData.startingDate}</li>
        </div>
      </div>
      <div className='mt-2'>
        <p className='text-[0.6rem] sm:text-[0.8rem] md:text-sm lg:text-lg xl:text-xl'>{formData.endingDescription}</p>
      </div>
      <div className='mt-4 md:mt-8 xl:mt-14 flex flex-col gap-2'>
        <span className='text-xs sm:text-sm md:text-[1rem] lg:text-lg xl:text-xl'>Sincerely,</span>
        <div>
          <p className='text-[0.7rem] sm:text-[0.8rem] md:text-sm lg:text-lg xl:text-xl'>{formData.ceoName}</p>
          <p className='text-[0.7rem] sm:text-[0.8rem] md:text-sm lg:text-lg xl:text-xl font-bold italic'>Founder & CEO @{formData.companyName}</p>
          <p className='text-[0.7rem] sm:text-[0.8rem] md:text-sm lg:text-lg xl:text-xl'>{formData.ceoEmail}</p>
        </div>
      </div>
      <div className='flex border-y p-2 md:p-4 items-center justify-center mt-10 w-full h-full'>
        <div className='p-2 lg:px-6'>
          {/* Display the logo if logoURL is provided */}
          {logoURL && (
            <img src={logoURL} alt={formData.companyLogoName} className="w-4 h-4 sm:w-6 sm:h-6 lg:w-10 lg:h-10 xl:w-12 xl:h-12" />
          )}
        </div>
        <div className='flex flex-col border-l gap-2 pl-2 lg:pl-6 w-full overflow-x-scroll lg:overflow-x-hidden'>
          <p className='text-[0.7rem] sm:text-[0.8rem] md:text-[1rem] lg:text-lg xl:text-xl'><span className='font-bold'>Address:</span> {formData.bannerAddress}</p>
          <p className='text-[0.7rem] sm:text-[0.8rem] md:text-[1rem] lg:text-lg xl:text-xl'><span className='font-bold'>Email Address:</span> {formData.bannerEmail}</p>
          <p className='text-[0.7rem] sm:text-[0.8rem] md:text-[1rem] lg:text-lg xl:text-xl'><span className='font-bold'>Website:</span> {formData.bannerWebsite}</p>
        </div>
      </div>
    </div>
  );
};

export default PreviewContent;
