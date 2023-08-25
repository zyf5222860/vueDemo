
const isProduction = process.env.NODE_ENV === 'production';
const url= isProduction ? 'http://39.108.2.123:9090/fan' : 'http://localhost:9090';
const pyUrl = isProduction ? 'http://39.108.2.123:5000' : 'http://localhost:5000';
const apiUrl = '/user';  

export {
  apiUrl,
  url,
  pyUrl
};