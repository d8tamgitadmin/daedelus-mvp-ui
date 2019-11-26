import ls from 'local-storage'


export const setUserData = userData => ls.set('userData', userData);

export const getUserData = () => ls.get('userData');

export const setAccount = account => ls.set('account', account);

export const getAccount = () => ls.get('account');
