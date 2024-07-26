import { MetaFunction } from "@remix-run/node";
import Layout from "~/components/landingPage/layouts/Layout";
import ProductList from "~/components/landingPage/sections/product-list/ProductList";

export const meta: MetaFunction = () => [{ title: "ALL IN ONE | Products" }];

export default function products() {
  return (
    <Layout>
      <ProductList/>
    </Layout>
  );
}
