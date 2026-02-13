import { groupForecastByDate } from '../groupForecastByDate';

// Mock the unixToLocalDateTime function
jest.mock('../unixToLocalDateTime', () => ({
  unixToLocalDateTime: jest.fn((timestamp) => {
    // Simple mock: convert timestamp to date string
    const date = new Date(timestamp * 1000);
    return {
      date: date.toISOString().split('T')[0],
      time: '12:00'
    };
  })
}));

describe('groupForecastByDate', () => {
  // Suppress console.log in tests
  let consoleLogSpy;
  
  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should group forecast items by date', () => {
    const mockForecast = [
      { dt: 1704672000, temp: 10 }, // 2024-01-08
      { dt: 1704758400, temp: 12 }, // 2024-01-09
      { dt: 1704672000, temp: 15 }, // 2024-01-08 (same day)
    ];

    const result = groupForecastByDate(mockForecast);

    expect(Object.keys(result)).toHaveLength(2);
    expect(result['2024-01-08']).toHaveLength(2);
    expect(result['2024-01-09']).toHaveLength(1);
  });

  it('should return empty object for empty array', () => {
    const result = groupForecastByDate([]);
    expect(result).toEqual({});
  });

  it('should preserve original item data', () => {
    const mockForecast = [
      { dt: 1704672000, temp: 10, weather: 'sunny' },
    ];

    const result = groupForecastByDate(mockForecast);
    const dateKey = Object.keys(result)[0];

    expect(result[dateKey][0]).toEqual({
      dt: 1704672000,
      temp: 10,
      weather: 'sunny'
    });
  });

  it('should handle multiple items on same date', () => {
    const mockForecast = [
      { dt: 1704672000, temp: 10 },
      { dt: 1704675600, temp: 12 },
      { dt: 1704679200, temp: 14 },
    ];

    const result = groupForecastByDate(mockForecast);
    const dateKey = Object.keys(result)[0];

    expect(result[dateKey]).toHaveLength(3);
  });
});
