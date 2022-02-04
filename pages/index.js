import Head from 'next/head';

import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";

function HomePage({ events }) {
  if (!events) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content='Find a lot of great events that alow you to evolve'/>
      </Head>
      <EventList items={events} />
    </div>
  );
}

export default HomePage;

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 600,
  };
}
