import Env from './env';
let config = {
  env: Env,
  basicUrl: Env == 'development' ? 'http://192.168.1.210' : Env === 'production' ? 'http://www.uooconline.com' : Env === 'beta' ? 'http://beta.uooconline.com' : 'http://test.uooconline.com',
  docUrl: Env == 'development' ? 'http://doc210.uooc.online/upload/index' : Env === 'production' ? 'http://doc.uooconline.com/upload/index' : 'http://doc-beta.uooconline.com/upload/index'
};
export default config;

