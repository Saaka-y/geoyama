import { groupForecastByDate } from "../groupForecastByDate";
import { WeatherForecast } from "@/types/weather";

// Mock the unixToLocalDateTime function
jest.mock("../unixToLocalDateTime", () => ({
    unixToLocalDateTime: jest.fn((timestamp) => {
        // Simple mock: convert timestamp to date string
        const date = new Date(timestamp * 1000);
        return {
            date: date.toISOString().split("T")[0],
            time: "12:00",
        };
    }),
}));

describe("groupForecastByDate", () => {
    // Suppress console.log in tests
    let consoleLogSpy: jest.SpyInstance<void, any[], any>;

    beforeEach(() => {
        consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(() => {
        consoleLogSpy.mockRestore();
    });

    it("should group forecast items by date", () => {
        const mockForecast: Partial<WeatherForecast>[] = [
            {
                dt: 1704672000,
                main: {
                    temp: 10,
                    feels_like: 0,
                    temp_min: 0,
                    temp_max: 0,
                    pressure: 0,
                    humidity: 0,
                },
                weather: [],
                clouds: { all: 0 },
                wind: { speed: 0, deg: 0 },
                visibility: 0,
                pop: 0,
                dt_txt: "",
            }, // 2024-01-08
            {
                dt: 1704758400,
                main: {
                    temp: 12,
                    feels_like: 0,
                    temp_min: 0,
                    temp_max: 0,
                    pressure: 0,
                    humidity: 0,
                },
                weather: [],
                clouds: { all: 0 },
                wind: { speed: 0, deg: 0 },
                visibility: 0,
                pop: 0,
                dt_txt: "",
            }, // 2024-01-09
            {
                dt: 1704672000,
                main: {
                    temp: 15,
                    feels_like: 0,
                    temp_min: 0,
                    temp_max: 0,
                    pressure: 0,
                    humidity: 0,
                },
                weather: [],
                clouds: { all: 0 },
                wind: { speed: 0, deg: 0 },
                visibility: 0,
                pop: 0,
                dt_txt: "",
            }, // 2024-01-08
        ];

        const result = groupForecastByDate(mockForecast as WeatherForecast[]);

        expect(Object.keys(result)).toHaveLength(2);
        expect(result["2024-01-08"]).toHaveLength(2);
        expect(result["2024-01-09"]).toHaveLength(1);
    });

    it("should return empty object for empty array", () => {
        const result = groupForecastByDate([]);
        expect(result).toEqual({});
    });

    it("should preserve original item data", () => {
        const mockForecast: Partial<WeatherForecast>[] = [
            {
                dt: 1704672000,
                main: {
                    temp: 10,
                    feels_like: 0,
                    temp_min: 0,
                    temp_max: 0,
                    pressure: 0,
                    humidity: 0,
                },
                weather: [],
                clouds: { all: 0 },
                wind: { speed: 0, deg: 0 },
                visibility: 0,
                pop: 0,
                dt_txt: "",
            },
        ];

        const result = groupForecastByDate(mockForecast as WeatherForecast[]);
        const dateKey = Object.keys(result)[0];

        expect(result[dateKey][0]).toEqual({
            dt: 1704672000,
            temp: 10,
            weather: "sunny",
        });
    });

    it("should handle multiple items on same date", () => {
        const mockForecast: Partial<WeatherForecast>[] = [
            {
                dt: 1704672000,
                main: {
                    temp: 10,
                    feels_like: 0,
                    temp_min: 0,
                    temp_max: 0,
                    pressure: 0,
                    humidity: 0,
                },
                weather: [],
                clouds: { all: 0 },
                wind: { speed: 0, deg: 0 },
                visibility: 0,
                pop: 0,
                dt_txt: "",
            },
            {
                dt: 1704675600,
                main: {
                    temp: 12,
                    feels_like: 0,
                    temp_min: 0,
                    temp_max: 0,
                    pressure: 0,
                    humidity: 0,
                },
                weather: [],
                clouds: { all: 0 },
                wind: { speed: 0, deg: 0 },
                visibility: 0,
                pop: 0,
                dt_txt: "",
            },
            {
                dt: 1704679200,
                main: {
                    temp: 14,
                    feels_like: 0,
                    temp_min: 0,
                    temp_max: 0,
                    pressure: 0,
                    humidity: 0,
                },
                weather: [],
                clouds: { all: 0 },
                wind: { speed: 0, deg: 0 },
                visibility: 0,
                pop: 0,
                dt_txt: "",
            },
        ];

        const result = groupForecastByDate(mockForecast as WeatherForecast[]);
        const dateKey = Object.keys(result)[0];

        expect(result[dateKey]).toHaveLength(3);
    });
});
