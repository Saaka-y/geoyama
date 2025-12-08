//@/utils/degToCardinal.js

export function degToCardinal(deg) {
    const directions = ['↓', '↙︎', '←', '↖︎', '↑', '↗︎', '→', '↘︎'];
    return directions[Math.round(deg / 45) % 8];
  }