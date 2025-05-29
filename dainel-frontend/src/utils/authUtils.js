export const getAuthToken = () => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    try {
      const parsed = JSON.parse(userInfo);
  console.log('Retrieving userInfo from localStorage:', parsed);

      return parsed.access_token;
    } catch (e) {
      console.error('Error parsing userInfo from localStorage:', e);
      return null;
    }
  }
  return null;
};