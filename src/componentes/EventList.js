// EventList.js

import React from 'react';

const EventList = ({ events }) => {
  return (
    <div style={{ margin: '0 auto', width: '1000px', textAlign: 'center', padding: '20px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
  <h3 style={{ color: '#5d5dff' }}>Lista de Eventos</h3>
  <div id="event-list">
    {events.map((event, index) => event && (
      <div
        key={event.id || index}
        className="event-item"
        style={{ padding: '10px', border: '1px solid #ddd', marginBottom: '10px', borderRadius: '4px', backgroundColor: '#fff', textAlign: 'left' }}
      >
        <p style={{ margin: '5px 0' }}><strong>ID:</strong> {event.id}</p>
        <p style={{ margin: '5px 0' }}><strong>Name:</strong> {event.name}</p>
        <p style={{ margin: '5px 0' }}><strong>Description:</strong> {event.description}</p>
        {/* event.betIds && <p style={{ margin: '5px 0' }}><strong>Bet IDs:</strong> {event.betIds.join(", ")}</p> */}
      </div>
    ))}
  </div>
</div>
  );
};

export default EventList;