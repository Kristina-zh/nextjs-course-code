export async function getAllEvents() {
    const response = await fetch('https://nextjs-basics-39d91-default-rtdb.firebaseio.com/events.json');
    const data = await response.json();
  
    let events = [];
  
    for(const key in data) {
        events.push({
        id: key,
        // title: data[key].title,
        // image: data[key].image,
        // description: data[key].description,
        // location: data[key].location,
        // isFeatured: data[key].isFeatured
        ...data[key]
       })
    }

    return events;
}

export async function getFeaturedEvents() {
    const allEvents = await getAllEvents();

    return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
    const allEvents = await getAllEvents();

    return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
    const allEvents = await getAllEvents();
    const { year, month } = dateFilter;
  
    let filteredEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
  
    return filteredEvents;
}