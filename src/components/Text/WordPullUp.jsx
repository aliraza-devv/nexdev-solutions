import { motion, Variants } from "framer-motion";

import { cn } from "@/lib/utils";

function WordPullUp({
  words,
  delayMultiple,
  wrapperFramerProps = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  },
  framerProps = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  },
  className,
}) {
  return (
    <motion.h1
      variants={wrapperFramerProps}
      initial="hidden"
      whileInView="show" // <--- Add this prop
      viewport={{ once: true }} // <--- Add this prop
      className={cn(
        "font-display text-center text-4xl font-bold leading-[5rem] drop-shadow-sm heading-primary",
        className
      )}
    >
      {words.split(" ").map((word, i) => (
        <motion.span
          key={i}
          variants={framerProps}
          style={{ display: "inline-block", paddingRight: "8px" }}
        >
          {word === "" ? <span>&nbsp;</span> : word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default WordPullUp;
