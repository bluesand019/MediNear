import { useEffect, useRef, useState } from "react";
import { HighlightText } from "../animate-ui/primitives/texts/highlight";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import StatCard from "./StatCard";

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


export default function StatsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  return (
    <section className="bg-gray-50 px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2
            ref={containerRef}
            className="text-2xl font-semibold text-gray-900 mb-1 leading-relaxed"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {isInView && (
                <HighlightText
                  delay={0.3}
                  text="Trusted across Rajshahi"
                  className="px-2 py-0.5 rounded-md bg-gradient-to-r from-green-100 to-emerald-200 dark:from-green-900/40 dark:to-emerald-800/40"
                />
              )}
            </motion.span>
          </h2>
          <p className="text-sm text-gray-400">
            Real-time data from verified providers
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            value={120}
            suffix="+"
            label="Hospitals & centers"
            duration={1600}
          />
          <StatCard
            value={340}
            suffix="+"
            label="Verified doctors"
            duration={1800}
          />
          <StatCard
            value={4.7}
            suffix="★"
            label="Avg. platform rating"
            duration={1400}
          />
          <StatCard
            value={8}
            suffix="k+"
            label="Bookings this month"
            duration={2000}
          />
        </div>
      </div>
    </section>
  );
}
