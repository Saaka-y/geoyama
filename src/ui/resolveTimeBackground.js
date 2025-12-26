//@/utils/resolveTimeBackground.js

export const resolveTimeBackground = (isLandscape, hour) => {
  const isMd = typeof window !== "undefined" && window.matchMedia("(min-width: 640px)").matches;

  const direction = isMd || isLandscape ? "to bottom" : "to right";
  if (hour === 0) {
    return { background: `linear-gradient(${direction}, #2C3E50, #000000)`, color: "#fff" };
  } else if (hour === 3) {
    return { background: `linear-gradient(${direction}, #000000, #FFF9C4)`, color: "#fff" };
  } else if (hour === 6) {
    return { background: `linear-gradient(${direction}, #FFF9C4, #f7c8ad)`, color: "#000" };
  } else if (hour === 9) {
    return { background: `linear-gradient(${direction}, #f7c8ad, #A3E4FF)`, color: "#000" };
  } else if (hour === 12) {
    return { background: `linear-gradient(${direction}, #A3E4FF, #00BFFF)`, color: "#000" };
  } else if (hour === 15) {
    return { background: `linear-gradient(${direction}, #00BFFF, #FFDAB9)`, color: "#000" };
  } else if (hour === 18) {
    return { background: `linear-gradient(${direction}, #FFDAB9, #494ff5)`, color: "#000" };
  } else if (hour === 21) {
    return { background: `linear-gradient(${direction}, #494ff5, #000000)`, color: "#fff" };
  } else {
    return { background: "#ccc", color: "#000" };
  }
};