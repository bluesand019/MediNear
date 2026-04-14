import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  CalendarCheck,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Search a service",
    desc: "Type what you need - blood test, MRI, or a cardiologist and your location is detected automatically.",
    icon: <Search className="w-6 h-6 text-emerald-600" />,
  },
  {
    id: 2,
    title: "Compare options",
    desc: "Results are sorted by distance, rating, and price. See available time slots without calling.",
    icon: <MapPin className="w-6 h-6 text-emerald-600" />,
  },
  {
    id: 3,
    title: "Book instantly",
    desc: "Select a time slot and confirm your booking in seconds. Get a digital reminder.",
    icon: <CalendarCheck className="w-6 h-6 text-emerald-600" />,
  },
];

const ThreeDCarousel = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % steps.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + steps.length) % steps.length);

  return (
    /* Reduced py-20 to py-12 and min-h-[650px] to min-h-[500px] */
    <div className="my-6 mx-4 rounded-md bg-[#e7f5e4] py-12 flex flex-col items-center overflow-hidden min-h-[500px]">
      {/* Header: Reduced mb-16 to mb-8 */}
      <div className="text-center mb-8 px-6">
        <h2 className="text-emerald-900 text-3xl font-black tracking-tight mb-2">
          Three steps to the{" "}
          <span className="text-emerald-600">right care</span>
        </h2>
      </div>

      {/* 3D Perspective Container: Reduced height from 420px to 320px */}
      <div
        className="relative w-full max-w-[320px] h-[320px]"
        style={{ perspective: "1000px" }}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0, rotateY: 30, z: -100, x: 80 }}
            animate={{ opacity: 1, rotateY: 0, z: 0, x: 0 }}
            exit={{ opacity: 0, rotateY: -30, z: -100, x: -80 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
            className="absolute inset-0"
          >
            {/* The Glass Card: Reduced padding and icon size */}
            <div className="w-full h-full bg-[#b0dea4] rounded-[2rem] p-6 shadow-[0_0_10px_rgba(0,0,0,0.1)] border border-emerald-100/50 flex flex-col items-center text-center justify-center">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 ring-4 ring-emerald-50/50">
                {steps[index].icon}
              </div>

              <div className="space-y-2">
                <span className="inline-block px-2 py-0.5 rounded-full bg-[#C5D3E8] text-black-100 font-bold text-[10px] tracking-widest uppercase shadow-sm">
                  Step 0{steps[index].id}
                </span>
                <h3 className="text-white text-[30px] font-extrabold text-slate-800 text-shadow-lg">
                  {steps[index].title}
                </h3>
                <p className="text-slate-600 leading-snug text-sm italic font-bold">
                  {steps[index].desc}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mt-8">
        <button
          onClick={prev}
          className="p-2.5 cursor-pointer rounded-xl bg-white text-emerald-600 border border-emerald-100 shadow-sm hover:bg-emerald-600 hover:text-white transition-all active:scale-90"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-2">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-8 bg-emerald-600" : "w-1.5 bg-emerald-200"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-2.5 cursor-pointer rounded-xl bg-white text-emerald-600 border border-emerald-100 shadow-sm hover:bg-emerald-600 hover:text-white transition-all active:scale-90"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ThreeDCarousel;
