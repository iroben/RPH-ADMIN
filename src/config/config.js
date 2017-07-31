import Env from './env';
let config = {
  env: Env,
  basicUrl: Env == 'development' ? 'http://127.0.0.1:8000' : Env === 'production' ? 'http://www.tenantschina.com' : Env === 'beta' ? 'http://beta.tenantschina.com' : 'http://test.tenantschina.com',
  docUrl: Env == 'development' ? 'http://127.0.0.1:8000/upload/index' : Env === 'production' ? 'http://doc.tenantschina.com/upload/index' : 'http://doc-beta.tenantschina.com/upload/index'
};
export default config;

