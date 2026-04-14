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

function StatCard({ value, suffix, label, prefix = "", duration = 2000 }) {
  const cardRef = useRef(null);
  const { count, start } = useCountUp(value, duration);
  const hasStarted = useRef(false);

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
  }, []);

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-100 px-6 py-8 text-center"
    >
      <span className="text-4xl font-semibold text-gray-900 tabular-nums tracking-tight">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </span>
      <span className="mt-2 text-sm text-gray-400 font-normal">{label}</span>
    </div>
  );
}

export default StatCard;