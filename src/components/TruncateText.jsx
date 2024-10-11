import React, { useState } from 'react';

const TruncateText = ({ text, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const handleToggle = () => {
    setIsTruncated(!isTruncated);
  };

  // If the text is longer than maxLength, truncate it
  const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  return (
    <div>
      <span>
        {isTruncated ? truncatedText : text}{' '}
        {text.length > maxLength && (
          <button
            onClick={handleToggle}
            className="text-blue-500 text-xs md:text-sm lg:text-[1rem] xl:text-lg hover:underline focus:outline-none"
          >
            {isTruncated ? 'Read more' : 'Show less'}
          </button>
        )}
      </span>
    </div>
  );
};

export default TruncateText;
