import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Form as DForm } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { redirect } from "react-router-dom";
import { Form } from "react-router-dom";
function HorizontalExample() {
  return (
    <Form method="POST">
      <DForm.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
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

      <DForm.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
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
          <Button type="submit">Sign up</Button>
        </Col>
      </DForm.Group>
    </Form>
  );
}

export default HorizontalExample;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  let userData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  if (method === "POST") {
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
}
