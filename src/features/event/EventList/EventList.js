import React, { Component } from 'react';
import EventListItem from './EventListItem';
import InfiniteScroll from 'react-infinite-scroller';

class EventList extends Component {
  render() {
    const { events, getNextEvents, loading, moreEvents } = this.props;
    const eventList = events && events.map(event =>
      <EventListItem
        key={event.id}
        event={event}
      />
    );
    return (
      <div>
        {
          events &&
          events.length !== 0 &&
          <InfiniteScroll 
            pageStart={0}
            loadMore={getNextEvents}
            hasMore={!loading && moreEvents}
            initialLoad={false}
          >
            {eventList}
          </InfiniteScroll>
        }
      </div>
    )
  }
}

export default EventList;