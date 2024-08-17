import { CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = 'http://20.244.56.144/test/companies/';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}AMZ/categories/Laptop/products/${id}`);
      setProduct(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      {product && (
        <div>
          <img src={`https://via.placeholder.com/300?text=${product.productName}`} alt={product.productName} />
          <Typography variant="h4">{product.productName}</Typography>
          <Typography>Price: ${product.price}</Typography>
          <Typography>Rating: {product.rating}</Typography>
          <Typography>Discount: {product.discount}%</Typography>
          <Typography>Availability: {product.availability}</Typography>
          <Typography>Company: {product.company}</Typography>
          <Typography>Category: {product.category}</Typography>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
