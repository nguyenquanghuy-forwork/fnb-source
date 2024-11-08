export const reduxStorage = {
  setItem: async (key: string, value: string) => {
    localStorage.setItem(key, value);
  },
  getItem: async (key: string) => {
    return localStorage.getItem(key);
  },
  removeItem: async (key: string) => {
    localStorage.removeItem(key);
  },
};
