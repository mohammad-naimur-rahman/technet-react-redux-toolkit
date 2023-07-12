import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { useGetProductQuery } from '@/redux/features/products/productApi';
import { useAppDispatch } from '@/redux/hooks';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();

  const { isLoading, isError, data: product } = useGetProductQuery(id);
  const dispatch = useAppDispatch();

  if (!product) {
    return <h1>No Product found!</h1>;
  }

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={product?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{product?.name}</h1>
          <p className="text-xl">Rating: {product?.rating}</p>
          {isLoading && <div>Loading...</div>}
          {isError && <div>Something went wrong!</div>}
          <ul className="space-y-1 text-lg">
            {product?.features?.map((feature: string) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <Button onClick={() => dispatch(addToCart(product))}>
            Add to cart
          </Button>
        </div>
      </div>
      <ProductReview id={id!} />
    </>
  );
}
