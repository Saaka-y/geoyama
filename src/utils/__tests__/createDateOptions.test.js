import { createDateOptions } from '../createDateOptions';

describe('createDateOptions', () => {
  // Mock current date for consistent testing
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-01-08T12:00:00Z'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should return 6 date options (today + 5 days)', () => {
    const options = createDateOptions();
    expect(options).toHaveLength(6);
  });

  it('should have correct labels for first three days', () => {
    const options = createDateOptions();
    expect(options[0].label).toBe('Today');
    expect(options[1].label).toBe('Tomorrow');
    expect(options[2].label).toBe('2 days later');
  });

  it('should have correct structure for each option', () => {
    const options = createDateOptions();
    const firstOption = options[0];
    
    expect(firstOption).toHaveProperty('date');
    expect(firstOption).toHaveProperty('label');
    expect(firstOption).toHaveProperty('value');
    expect(firstOption).toHaveProperty('string');
    expect(firstOption.date).toBeInstanceOf(Date);
  });

  it('should generate sequential dates', () => {
    const options = createDateOptions();
    
    // Check if dates are sequential (each day is 1 day after previous)
    for (let i = 1; i < options.length; i++) {
      const prevDate = options[i - 1].date;
      const currDate = options[i].date;
      const dayDiff = (currDate - prevDate) / (1000 * 60 * 60 * 24);
      expect(dayDiff).toBe(1);
    }
  });

  it('should format value as YYYY-MM-DD', () => {
    const options = createDateOptions();
    expect(options[0].value).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
