import { useRef, useState, useEffect } from "react";

function useCountUp(target, duration = 2000, startOnMount = false) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(startOnMount);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
      else setCount(target);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [started, target, duration]);

  return { count, start: () => setStarted(true) };
}

function StatCard({ value, suffix, label, prefix = "", duration = 2000, variant = "emerald" }) {
  const cardRef = useRef(null);
  const { count, start } = useCountUp(value, duration);
  const hasStarted = useRef(false);

  const variants = {
    emerald: "bg-[#1F6F5F] border-emerald-100 text-white dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400",
    teal: "bg-[#2FA084] border-teal-100 text-white dark:bg-teal-950/20 dark:border-teal-900/50 dark:text-teal-400",
    green: "bg-[#6FCF97] border-green-100 text-white dark:bg-green-950/20 dark:border-green-900/50 dark:text-green-400",
    lime: "bg-[#EEEEEE] border-gray-100 text-lime-900 dark:bg-lime-950/20 dark:border-lime-900/50 dark:text-lime-400",
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          start();
        }
      },
      { threshold: 0.4 },
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [start]);

  return (
    <div
      ref={cardRef}
      className={`flex flex-col items-center justify-center rounded-2xl border px-6 py-8 text-center transition-all duration-300 hover:shadow-lg ${variants[variant]}`}
    >
      <span className="text-4xl font-semibold tabular-nums tracking-tight">
        {prefix}{count.toLocaleString()}{suffix}
      </span>
      <span className="mt-2 text-sm font-medium uppercase tracking-wider opacity-70">
        {label}
      </span>
    </div>
  );
}

export default StatCard;