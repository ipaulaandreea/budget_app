import axios from 'axios';


export const updateActualAmount = async (transactionData) => {
    let category_name = transactionData.category_name
    let amount = transactionData.amount
    let month = transactionData.month
    let year = transactionData.year
    try {
    let response = await axios.put(`http://localhost:5000/api/update-budget-amount`, {category_name, amount, month, year})
    console.log('Amount updated:', response.data);
} catch (error) {
console.error('Error creating post:', error);
}
}