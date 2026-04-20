import React, { useState } from "react";
import Personal from "../../components/Signup/Personal";
import Contact from "../../components/Signup/Contact";
import Security from "../../components/Signup/Security";

const Register = () => {
  const [stage, setStage] = useState(1);

  const stages = [
    { id: 1, label: "Personal" },
    { id: 2, label: "Contact" },
    { id: 3, label: "Security" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Create your account</h2>
          <p className="text-gray-500 text-sm mt-1">Free patient account — book services and track appointments</p>
        </div>

        {/* Progress Stepper */}
        <div className="flex items-center justify-between mb-8 px-2">
          {stages.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-2">
              <div className={`h-2 w-16 rounded-full transition-colors duration-300 ${stage >= s.id ? 'bg-teal-500' : 'bg-gray-200'}`} />
              <span className={`text-[10px] font-bold uppercase tracking-wider ${stage >= s.id ? 'text-teal-600' : 'text-gray-400'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div className="form-content">
          {stage === 1 && <Personal setStage={setStage} />}
          {stage === 2 && <Contact setStage={setStage} />}
          {stage === 3 && <Security setStage={setStage} />}
        </div>
      </div>
    </div>
  );
};

export default Register;