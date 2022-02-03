import { useEffect, useState } from "react";
import useSWR from 'swr';

function LastSalesPage(props) {
    const [sales, setSales] = useState(props.sales);
    // const [isLoading, setIsLoading] = useState(false);

    const { data, error } = useSWR('https://nextjs-basics-39d91-default-rtdb.firebaseio.com/sales.json',
     (url) => fetch(url).then(res => res.json()));

    useEffect(() => {
      let transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }, [data])

    // useEffect(() => {
    //   setIsLoading(true);
    //   fetch("https://nextjs-basics-39d91-default-rtdb.firebaseio.com/sales.json")
    //     .then((res) => res.json())
    //     .then((data) => {
    //       let transformedSales = [];

    //       for (const key in data) {
    //         transformedSales.push({
    //           id: key,
    //           username: data[key].username,
    //           volume: data[key].volume,
    //         });
    //       }

    //       setSales(transformedSales);
    //       setIsLoading(false);
    //     });
    // }, []);

    if (error) {
      return <p>Faild to load!</p>;
    }

    if (!data && !sales) {
      return <p>Loading...</p>;
    }

  return (
    <ul>
        {sales.map(v => <li key={v.id}>{v.username} - {v.volume}</li>)}
    </ul>
  );
};

export default LastSalesPage;

export async function getStaticProps() {
    const response = await fetch("https://nextjs-basics-39d91-default-rtdb.firebaseio.com/sales.json");

    const data = await response.json();

    let transformedSales = [];

    for (const key in data) {
      transformedSales.push({
        id: key,
        username: data[key].username,
        volume: data[key].volume,
      });
    }

    console.log('transformedSales', transformedSales)

    return {props: {sales: transformedSales}};
}