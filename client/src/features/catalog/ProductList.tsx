import { Grid, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  if (!products || products.length === 0) {
    return (
      <Typography variant="h5" sx={{ mt: 5, textAlign: 'center' }}>
        No products found.
      </Typography>
    );
  }

  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={4} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
