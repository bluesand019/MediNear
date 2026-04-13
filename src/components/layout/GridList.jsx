import React from "react";
import bloodTestIcon from "/src/assets/Icons/blood-test.png";
import xray from "/src/assets/Icons/xray.png";
import mri from "/src/assets/Icons/mri.png";
import ultrasound from "/src/assets/Icons/ultrasound.png";
import ecg from "/src/assets/Icons/electrocardiogram.png";
import consultant from "/src/assets/Icons/consultant.png";
import pathology from "/src/assets/Icons/pathology.png";
import viewAll from "/src/assets/Icons/plus.png";

const GridList = ({ title, sub, className }) => {
  const dummy_data = [
    { img: bloodTestIcon, title: "Blood test" },
    { img: xray, title: "Xray" },
    { img: mri, title: "MRI/CT Scan" },
    { img: ultrasound, title: "Ultrasound" },
    { img: ecg, title: "ECG" },
    { img: consultant, title: "Consultant" },
    { img: pathology, title: "Pathology" },
    { img: viewAll, title: "View all" },
  ];

return (
    <div className={`p-6 max-w-7xl mx-auto ${className}`}>
      {/* Centered Heading Section */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
          {title}
        </h2>
        <div className="w-20 h-1 bg-green-500 mx-auto mb-4 rounded-full"></div>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          {sub}
        </p>
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {dummy_data.map((item, index) => (
          <li
            key={index}
            className="group relative p-6 border border-gray-100 rounded-2xl bg-white 
                       transition-all duration-300 ease-in-out cursor-pointer 
                       flex flex-col items-center justify-center text-center
                       hover:border-green-400 
                       hover:shadow-[0_10px_25px_-5px_rgba(59,130,246,0.2)] 
                       hover:-translate-y-1"
          >
            <div className="w-16 h-16 mb-4 flex items-center justify-center bg-green-50 rounded-full group-hover:bg-green-100 transition-colors">
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-10 h-10 object-contain" 
              />
            </div>

            <span className="text-sm font-semibold text-gray-700 group-hover:text-green-600 transition-colors">
              {item.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default GridList;