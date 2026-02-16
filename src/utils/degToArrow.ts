//@/utils/degToArrow.js

export function degToArrow(deg: number) {
    const directions = ['↓', '↙︎', '←', '↖︎', '↑', '↗︎', '→', '↘︎'];
    return directions[Math.round(deg / 45) % 8];
  }