
import {redirect} from 'react-router-dom';

import { json } from 'react-router-dom';

import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

// export async function action({ request }) {
//   const searchParams = new URL(request.url).searchParams;
//   const mode = searchParams.get('mode') || 'login';

//   if (mode !== 'login' && mode !== 'signup') {
//     throw json({ message: 'Unsupported mode.' }, { status: 422 });
//   }

//   const data = await request.formData();
//   const authData = {
//     username: data.get('username'),
//     password: data.get('password'),
//   };

//   const response = await fetch('http://localhost:5000/' + mode, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(authData),
//   });

//   if (response.status === 422 || response.status === 401) {
//     return response;
//   }

//   if (!response.ok) {
//     throw json({ message: 'Could not authenticate user.' }, { status: 500 });
//   }

//   const resData = await response.json();
//   const token = resData.token;

//   localStorage.setItem('token', token);
//   const expiration = new Date();
//   expiration.setHours(expiration.getHours() + 1);
//   localStorage.setItem('expiration', expiration.toISOString());

//   return redirect('/');
// }


// async function loginUser(event){
//     event.preventDefault()
//     const response = await fetch ('http://localhost:3000/api/login',{
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             username,
//             password,
//         })
//     })
//     const data = await response.json();
//     if(data.user){
//         alert ('Login successful')
//         return redirect('/')
//     } else {
//         alert ('Please check username and password')
//     }
// }

