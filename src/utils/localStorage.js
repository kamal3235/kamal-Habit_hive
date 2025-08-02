const STORAGE_KEYS = {
  reading: "habit-hive-reading-entries",
  physical: "habit-hive-physical-entries",
  mentalHealth: "habit-hive-mental-health-entries",
};

// Generic functions for any category
export const saveEntriesToStorage = (entries, category) => {
  try {
    const key = STORAGE_KEYS[category];
    if (!key) {
      throw new Error(`Invalid category: ${category}`);
    }
    localStorage.setItem(key, JSON.stringify(entries));
  } catch (error) {
    console.error(`Failed to save ${category} entries to localStorage:`, error);
  }
};

export const loadEntriesFromStorage = (category) => {
  try {
    const key = STORAGE_KEYS[category];
    if (!key) {
      throw new Error(`Invalid category: ${category}`);
    }
    const storedEntries = localStorage.getItem(key);
    return storedEntries ? JSON.parse(storedEntries) : [];
  } catch (error) {
    console.error(
      `Failed to load ${category} entries from localStorage:`,
      error,
    );
    return [];
  }
};

export const clearEntriesFromStorage = (category) => {
  try {
    const key = STORAGE_KEYS[category];
    if (!key) {
      throw new Error(`Invalid category: ${category}`);
    }
    localStorage.removeItem(key);
  } catch (error) {
    console.error(
      `Failed to clear ${category} entries from localStorage:`,
      error,
    );
  }
};

// Category-specific convenience functions
export const saveReadingEntries = (entries) =>
  saveEntriesToStorage(entries, "reading");
export const loadReadingEntries = () => loadEntriesFromStorage("reading");
export const clearReadingEntries = () => clearEntriesFromStorage("reading");

export const savePhysicalEntries = (entries) =>
  saveEntriesToStorage(entries, "physical");
export const loadPhysicalEntries = () => loadEntriesFromStorage("physical");
export const clearPhysicalEntries = () => clearEntriesFromStorage("physical");

export const saveMentalHealthEntries = (entries) =>
  saveEntriesToStorage(entries, "mentalHealth");
export const loadMentalHealthEntries = () =>
  loadEntriesFromStorage("mentalHealth");
export const clearMentalHealthEntries = () =>
  clearEntriesFromStorage("mentalHealth");

// Load all categories at once
export const loadAllEntries = () => {
  return {
    reading: loadReadingEntries(),
    physical: loadPhysicalEntries(),
    mentalHealth: loadMentalHealthEntries(),
  };
};

// Clear all categories
export const clearAllEntries = () => {
  clearReadingEntries();
  clearPhysicalEntries();
  clearMentalHealthEntries();
};

// Get storage stats
export const getStorageStats = () => {
  const stats = {};
  Object.keys(STORAGE_KEYS).forEach((category) => {
    const entries = loadEntriesFromStorage(category);
    stats[category] = {
      totalEntries: entries.length,
      lastUpdated:
        entries.length > 0
          ? Math.max(...entries.map((e) => new Date(e.date).getTime()))
          : null,
    };
  });
  return stats;
};
