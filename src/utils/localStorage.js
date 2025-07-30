const STORAGE_KEY = "habit-hive-entries";

export const saveEntriesToStorage = (entries) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error("Failed to save entries to localStorage:", error);
  }
};

export const loadEntriesFromStorage = () => {
  try {
    const storedEntries = localStorage.getItem(STORAGE_KEY);
    return storedEntries ? JSON.parse(storedEntries) : [];
  } catch (error) {
    console.error("Failed to load entries from localStorage:", error);
    return [];
  }
};

export const clearEntriesFromStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear entries from localStorage:", error);
  }
};
