
const isProduction = process.env.NODE_ENV === 'production';

const url1= isProduction ? 'https://github.com/jackchen0120/' : 'http://localhost:9090/';
const url = 'http://localhost:9090/';

const apiUrl = '/user';  


export {
  apiUrl,
  url
};