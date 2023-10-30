import { Form as CForm} from "react-bootstrap";
import { InputGroup, Button } from 'react-bootstrap'
import { Form, useNavigate, useActionData, redirect } from "react-router-dom";


const Row = () => {

  const data = useActionData();




  return (
    
    <tr>
      <td>
      <Form method="post">
        {/* {" "} */}
        <CForm>
          <InputGroup className="mb-3">
            <CForm.Control
              placeholder="Enter category name..."
              aria-label="Category name"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <Button>Save</Button>
        </CForm>
       </Form>
      </td>
 
      <td> 0
        {/* {" "}
        <InputGroup className="mb-3">
          <CForm.Control
            placeholder="Entered expected amount..."
            aria-label="Expected amount"
            aria-describedby="basic-addon1"
          />
        </InputGroup>{" "}
        <Button>Save</Button> */}
      </td>
      <td> 0 </td>
    </tr>



  );
};

export default Row;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  console.log(data)
}
