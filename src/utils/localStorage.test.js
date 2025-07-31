import {
  saveEntriesToStorage,
  loadEntriesFromStorage,
  clearEntriesFromStorage,
} from "./localStorage";
import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("Local Storage Utils", () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  it("saveEntriesToStorage should save entries to localStorage", () => {
    const testEntries = [{ hours: 2.5, time: "10:30" }];
    saveEntriesToStorage(testEntries);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "habit-hive-entries",
      JSON.stringify(testEntries),
    );
  });

  it("saveEntriesToStorage should handle localStorage errors gracefully", () => {
    localStorageMock.setItem.mockImplementation(() => {
      throw new Error("localStorage not available");
    });
    expect(() => {
      saveEntriesToStorage([{ hours: 1.0, time: "10:00" }]);
    }).not.toThrow();
  });

  it("loadEntriesFromStorage should return empty array when no data exists", () => {
    localStorageMock.getItem.mockReturnValue(null);
    const result = loadEntriesFromStorage();
    expect(result).toEqual([]);
  });

  it("loadEntriesFromStorage should return parsed entries when data exists", () => {
    const testEntries = [{ hours: 2.5, time: "10:30" }];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(testEntries));
    const result = loadEntriesFromStorage();
    expect(result).toEqual(testEntries);
  });

  it("loadEntriesFromStorage should handle JSON parsing errors gracefully", () => {
    localStorageMock.getItem.mockReturnValue("invalid-json");
    const result = loadEntriesFromStorage();
    expect(result).toEqual([]);
  });

  it("loadEntriesFromStorage should handle localStorage errors gracefully", () => {
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error("localStorage not available");
    });
    const result = loadEntriesFromStorage();
    expect(result).toEqual([]);
  });

  it("clearEntriesFromStorage should remove entries from localStorage", () => {
    clearEntriesFromStorage();
    expect(localStorageMock.removeItem).toHaveBeenCalledWith(
      "habit-hive-entries",
    );
  });

  it("clearEntriesFromStorage should handle localStorage errors gracefully", () => {
    localStorageMock.removeItem.mockImplementation(() => {
      throw new Error("localStorage not available");
    });
    expect(() => {
      clearEntriesFromStorage();
    }).not.toThrow();
  });
});
