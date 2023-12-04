const REFRESH_TOKEN_COOKIE_KEY = 'refreshToken';

class Credentials {
    constructor(token) {
        this.token = token;
        this.refreshToken = this.getRefreshTokenFromCookies();
      }
    
    getToken() {
        return this.token;
    }

    getRefreshToken() {
        return this.refreshToken;
    }

    getRefreshTokenForHeader() {
        return `refreshToken=${this.refreshToken}`;
    }

    getRefreshTokenFromCookies() {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
          const [cookieName, cookieValue] = cookie.split('=');
          if (cookieName.trim() === REFRESH_TOKEN_COOKIE_KEY) {
            return cookieValue;
          }
        }
        return null;
      }
}

const getCredentials = () => {
    return new Credentials(
        sessionStorage.getItem("token")
    );
}

export default getCredentials;