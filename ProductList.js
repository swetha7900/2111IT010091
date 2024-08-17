import { Button, CircularProgress, Grid, MenuItem, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../utils/fetchProducts';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    company: 'AMZ',
    category: 'Laptop',
    minPrice: 0,
    maxPrice: 10000,
    rating: 0,
    availability: '',
    sortBy: 'price',
    page: 1,
    perPage: 10
  });

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(
          filters.company,
          filters.category,
          filters.minPrice,
          filters.maxPrice,
          filters.sortBy,
          filters.page,
          filters.perPage
        );
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [filters]);

  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <div>
        <TextField name="company" select label="Company" value={filters.company} onChange={handleFilterChange}>
          {['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'].map((company) => (
            <MenuItem key={company} value={company}>{company}</MenuItem>
          ))}
        </TextField>
        <TextField name="category" select label="Category" value={filters.category} onChange={handleFilterChange}>
          {['Laptop', 'Phone', 'Tablet'].map((category) => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </TextField>
        {/* Add more filters as needed */}
        <Button onClick={() => setFilters({ ...filters, page: filters.page + 1 })}>Next Page</Button>
      </div>
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Link to={`/product/${product.id}`}>
              <div>
                <img src={`https://via.placeholder.com/150?text=${product.productName}`} alt={product.productName} />
                <Typography variant="h6">{product.productName}</Typography>
                <Typography>Price: ${product.price}</Typography>
                <Typography>Rating: {product.rating}</Typography>
                <Typography>Discount: {product.discount}%</Typography>
                <Typography>Availability: {product.availability}</Typography>
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
