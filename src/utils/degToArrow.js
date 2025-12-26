//@/utils/degToArrow.js

export function degToArrow(deg) {
    const directions = ['↓', '↙︎', '←', '↖︎', '↑', '↗︎', '→', '↘︎'];
    return directions[Math.round(deg / 45) % 8];
  }