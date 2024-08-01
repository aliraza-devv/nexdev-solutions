"use client";
// components/SmoothScroll/SmoothScroll.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, useAnimation } from 'framer-motion';

const SmoothScroll = ({ children }) => {
  const controls = useAnimation();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      controls.start({
        opacity: 0,
        transition: { duration: 0.3 },
      });
    };

    const handleRouteChangeComplete = () => {
      window.scrollTo(0, 0);
      controls.start({
        opacity: 1,
        transition: { duration: 0.3 },
      });
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router, controls]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export default SmoothScroll;
