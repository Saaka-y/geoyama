import { degToArrow } from '../degToArrow';

describe('degToArrow', () => {
  it('should return down arrow for 0 degrees (North wind)', () => {
    expect(degToArrow(0)).toBe('↓');
  });

  it('should return up arrow for 180 degrees (South wind)', () => {
    expect(degToArrow(180)).toBe('↑');
  });

  it('should return left arrow for 90 degrees (East wind)', () => {
    expect(degToArrow(90)).toBe('←');
  });

  it('should return right arrow for 270 degrees (West wind)', () => {
    expect(degToArrow(270)).toBe('→');
  });

  it('should handle 360 degrees (wraps to 0)', () => {
    expect(degToArrow(360)).toBe('↓');
  });

  it('should return down-left arrow for 45 degrees', () => {
    expect(degToArrow(45)).toBe('↙︎');
  });
});
