import axios from 'axios'

export async function action({ request, params }) {
    const method = request.method;
    const data = await request.formData();
    const category_name = data.get("category_name")
    const type = data.get("type")
    if (method === "POST") {  
      try {
        const response = await axios.post('http://localhost:5000/api/addcategory', {category_name, type});
        console.log('New category created:', response.data);
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
    return null;
}