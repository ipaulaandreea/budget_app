import {Container} from 'react-bootstrap'
// import { useEffect } from 'react';
// import history from 'history';
// import jwt from 'jsonwebtoken';
const HomePage = () => {

    // const populatePage = async () => {
    //     const req = await fetch('http://localhost:3000/api/', {
    //         headers: {
    //             'x-access-token': localStorage.getItem('token')
    //         }
    //     })
    //     const data = req.json()
    //     console.log(data)

    // }

    // useEffect(()=>{
    //     const token = localStorage.getItem('token');
    //     if (token){
    //         const user = jwt.decode(token);
    //         if (!user){
    //             localStorage.removeItem('token')
    //             history.replace('/login')
    //         } else {
    //             populatePage();
    //         }
    //     }
    // }, [])
    return (
        <Container>
        <h1>Welcome to Budget app</h1>
        </Container>
    )
}

export default HomePage;