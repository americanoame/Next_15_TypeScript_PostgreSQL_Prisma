import ProductList from '@/components/shared/product/product-list';
import { getLatestProducts } from "@/lib/actions/product.actions";


const HomePage = async () => {

  const latestProducts = await getLatestProducts();

  console.log(latestProducts)

  return (
    <div className='space-y-8'>
      {/* <h2 className='h2-bold'>Latest Products</h2> */}
      <ProductList title="Save 25% on this items – now on sale!" data={latestProducts} limit={4} />
    </div>
  );
};
export default HomePage;