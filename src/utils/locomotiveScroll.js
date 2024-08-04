import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

export const initializeScroll = () => {
  const scrollContainer = document.querySelector("#scroll-container");
  if (!scrollContainer) return null;

  const locomotiveScroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    smoothMobile: true,
    inertia: 0.75,
  });

  return locomotiveScroll;
};
