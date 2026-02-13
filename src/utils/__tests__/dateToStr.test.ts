import { dateToStr } from '../dateToStr';

describe('dateToStr', () => {
  it('should format date as YYYY-MM-DD', () => {
    const date = new Date('2026-01-08T12:00:00Z');
    expect(dateToStr(date)).toBe('2026-01-08');
  });

  it('should handle single digit months and days with zero padding', () => {
    const date = new Date('2026-03-05T12:00:00Z');
    expect(dateToStr(date)).toBe('2026-03-05');
  });

  it('should handle December (month 12)', () => {
    const date = new Date('2025-12-25T12:00:00Z');
    expect(dateToStr(date)).toBe('2025-12-25');
  });

  it('should handle end of year', () => {
    const date = new Date('2025-12-31T12:00:00Z');
    expect(dateToStr(date)).toBe('2025-12-31');
  });
});
