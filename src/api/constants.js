const API_PORT = 8080;
export const API_SERVER = `http://localhost:${API_PORT}`;
export const CORS_ORIGIN = "http://localhost:3000";

export const AUTH_HEADERS = function(token) {
    return {
      'Access-Control-Allow-Origin': CORS_ORIGIN,
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${token}`
    };
  };

export const POST_USERDATA = {
    'method': 'POST',
    'route': `${API_SERVER}/api/v1/userdata/`
  };