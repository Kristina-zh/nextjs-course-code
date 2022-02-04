import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import Comment from '../../components/input/comments'
// import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage({event}) {

  if (!event) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comment eventId={event.id}/>
    </>
  );
}

export default EventDetailPage;

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      event
    },
    revalidate: 30
  }
};

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const pathWithParams = events.map(v => ({params: {eventId: v.id}}))

  return {
    paths: pathWithParams,
    fallback: 'blocking'
  }
}