import {redirect } from 'react-router-dom';

export function getRefreshToken(){
    const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
          const [cookieName, cookieValue] = cookie.split('=');
          if (cookieName.trim() === 'refreshToken') {
            return cookieValue;
          }
        }

}


export function refreshTokenLoader(){
    return getRefreshToken();
}

export function checkAuthLoader(){

    const refreshToken = getRefreshToken();

    if(!refreshToken){
        return redirect('/auth')
    }

}