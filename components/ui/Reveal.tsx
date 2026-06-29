"use client";

import { motion, type Variants } from "framer-motion";

const base: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Reveal({
  children,
  i = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  i?: number;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      variants={base}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
    >
      {children}
    </M>
  );
}

// Word-by-word headline reveal
export function RevealText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ staggerChildren: 0.06 }}
    >
      {words.map((w, idx) => (
        <span key={idx} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              show: {
                y: "0%",
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {w}
            {idx < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
