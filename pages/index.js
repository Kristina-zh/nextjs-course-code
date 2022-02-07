import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";
import NewsletterRegistration from '../components/input/newsletter-registration';

function HomePage({ events }) {
  if (!events) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <NewsletterRegistration />
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
