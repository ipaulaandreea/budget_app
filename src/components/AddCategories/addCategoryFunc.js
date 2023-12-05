import axios from 'axios'
import getCredentials from "../../Credentials";

export async function action({ request, params }) {
    const method = request.method;
    const data = await request.formData();
    const category_name = data.get("category_name")
    const type = data.get("type")
    if (method === "POST") {  
      let credentials = getCredentials();
      let user = localStorage.getItem('user');
      try {
        const response = await axios.post('http://localhost:5000/api/addcategory', {category_name, type, user},
        {withCredentials: true},
        {
    headers: {
      'Authorization': `Bearer ${credentials.getToken()}`,
      'Cookie': `${credentials.getRefreshTokenForHeader()}`
    }});
        console.log('New category created:', response.data);
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
    return {category_name, type};
}