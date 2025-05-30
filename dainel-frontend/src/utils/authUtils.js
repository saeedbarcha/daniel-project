export const getAuthToken = () => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    try {
      const parsed = JSON.parse(userInfo);

      return parsed.access_token;
    } catch (e) {
      console.error('Error parsing userInfo from localStorage:', e);
      return null;
    }
  }
  return null;
};