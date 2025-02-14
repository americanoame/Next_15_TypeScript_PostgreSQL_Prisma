import ProductList from '@/components/shared/product/product-list';
import sampleData from '@/db/sample-data';


const HomePage = () => {
  return (
    <div className='space-y-8'>
      {/* <h2 className='h2-bold'>Latest Products</h2> */}
      <ProductList title="Save 25% on this items – now on sale!" data={sampleData.products} limit={4} />
    </div>
  );
};
export default HomePage;