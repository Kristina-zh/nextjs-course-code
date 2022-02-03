import fs from "fs/promises";
import path from "path";

function ProductDetailPage(props) {
  const { loadedData } = props;

  if(!loadedData) {
    return <p>Loading...</p>
  };

  return (
    <>
      <h1>{loadedData.title}</h1>
      <p>{loadedData.description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.productId;
  const data = await getData();
  const product = data.products.find((v) => v.id === productId);

  if(!product) {
    return { notFound: true}
  }

  return {
    props: {
      loadedData: product,
    },
  };
};

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map(v => v.id);

  const pathsWithParams = ids.map(v => ({params: {productId: v}}))

  return {
    paths: pathsWithParams,
    fallback: true
    // fallback: 'blocking'
  };
}

export default ProductDetailPage;
