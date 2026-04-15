import React from "react";
import { Search, MapPin, CalendarCheck, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Search a service",
    desc: "Type what you need - blood test, MRI, or a cardiologist and your location is detected automatically.",
    icon: <Search className="w-10 h-10 text-emerald-600" />,
  },
  {
    id: 2,
    title: "Compare options",
    desc: "Results are sorted by distance, rating, and price. See available time slots without calling.",
    icon: <MapPin className="w-10 h-10 text-emerald-600" />,
  },
  {
    id: 3,
    title: "Book instantly",
    desc: "Select a time slot and confirm your booking in seconds. Get a digital reminder.",
    icon: <CalendarCheck className="w-10 h-10 text-emerald-600" />,
  },
];

const cardsVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.15,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const HorizontalSteps = () => {
  return (
    <div className="my-12 px-4 md:px-8 py-16 bg-[#F8FFF7] rounded-3xl">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2 className="text-emerald-950 text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 leading-tight">
          Three steps to the <span className="text-emerald-600">right care</span>
        </h2>
        <p className="text-lg text-emerald-800/80">
          Booking healthcare has never been easier. Follow our simple process to
          connect with top medical professionals.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={cardsVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Animate when 20% visible
      >
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            variants={cardItemVariants}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm flex flex-col items-center text-center transform transition-transform duration-300"
          >
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-emerald-50/50">
              {step.icon}
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs tracking-wider uppercase mb-3">
              Step 0{step.id}
            </span>

            <h3 className="text-emerald-950 text-2xl font-bold mb-4 tracking-tight">
              {step.title}
            </h3>

            <p className="text-slate-600 leading-relaxed text-base flex-grow">
              {step.desc}
            </p>

            <div className="mt-6 flex items-center text-emerald-600 font-medium group cursor-pointer text-sm">
                How it works <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform"/>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HorizontalSteps;