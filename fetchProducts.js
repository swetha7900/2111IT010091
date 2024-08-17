import axios from 'axios';

const API_URL = 'http://20.244.56.144/test/companies/';

export const fetchProducts = async (company, category, minPrice, maxPrice, sortBy, page, perPage) => {
  try {
    const response = await axios.get(`${API_URL}${company}/categories/${category}/products`, {
      params: {
        top: perPage,
        minPrice,
        maxPrice,
        sortBy,
        page
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
