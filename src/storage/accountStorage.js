import ls from 'local-storage'


export const setUserData = userData => ls.set('userData', userData);

export const getUserData = () => ls.get('userData');
