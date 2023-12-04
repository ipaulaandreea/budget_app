import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Form as DForm } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { redirect } from "react-router-dom";
import { Form, Link, useSearchParams, json } from "react-router-dom";

const AuthForm =()=> {

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return (
    <Form method="POST">
       <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
      <DForm.Group as={Row} className="mb-3">
        <DForm.Label column sm={2}>
          Username
        </DForm.Label>
        <Col sm={10}>
          <DForm.Control
            placeholder="Enter username..."
            id="username"
            type="text"
            name="username"
            required
          />
        </Col>
      </DForm.Group>

      <DForm.Group as={Row} className="mb-3">
        <DForm.Label column sm={2}>
          Password
        </DForm.Label>
        <Col sm={10}>
          <DForm.Control
            type="password"
            placeholder="Enter password..."
            id="password"
            name="password"
            required
          />
        </Col>
      </DForm.Group>
      <DForm.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
        <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {" "}
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <Button type="submit">{isLogin ? "Login"  : "Create new user"}</Button>
        </Col>
      </DForm.Group>
    </Form>
  );
}

export default AuthForm;

export async function action({ request, params }) {
  const method = request.method;
  const searchParams = new URL(request.url).searchParams
  const mode = searchParams.get('mode') || 'login';
  const data = await request.formData();
  const username = data.get('username');
  const password = data.get('password');
  let userData = {
    username: data.get("username"),
    password: data.get("password")
  }

  if (mode !=='login' && mode!=='signup') {
    throw json({message: 'Unsupported mode.'}, {status: 422})
  }

  if (method === "POST") {
    if (mode === 'signup'){
      try {
        const response = await axios.post("http://localhost:5000/api/signup", {
          userData,
        });
        console.log("New user created:", response.data);
      } catch (error) {
        console.error("Error creating user:", error);
      }
  
      return redirect("/");

  }

  if (mode === 'login'){
    try {
      axios.post("http://localhost:5000/api/login", {
        username, password
      }, {
        withCredentials: true
      })
      .then(response => {
        console.log("success - we have a cookie!");
        sessionStorage.setItem('token', response.data.token)
      })
      ;
      localStorage.setItem('user', userData.username);
      return redirect("/");
    } catch (error) {
      console.error("Error logging in:", error);
      
    } 
    
    }
    return null;

}
}

   
  
