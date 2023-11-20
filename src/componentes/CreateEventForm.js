// CreateEventForm.js
import React, { useState } from 'react';

const CreateEventForm = ({ onCreateEvent, onClose }) => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    betIds: [],
  });

  const handleInputChange = (e) => {
    setEventData({ ...eventData, [e.target.id]: e.target.value });
  };

  const createEvent = () => {
    const apiUrl = "http://localhost:8080/event";
const token = localStorage.getItem('token');

fetch(apiUrl, {
  method: "POST",
  headers: {
    'Authorization': 'Bearer ' + token,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(eventData),
})
  .then(response => {
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor: " + response.status);
    }
    return response.text(); // Cambiado de response.json() a response.text(), asumiendo que la API devuelve un texto plano.
  })
  .then(result => {
    if (result === "Event created.") {
      console.log("Evento creado con éxito.");
      onCreateEvent();
      onClose();
    } else {
      // Manejar casos en los que la API podría devolver una respuesta inesperada.
      console.error("Respuesta inesperada de la API:", result);
    }
  })
  .catch(error => {
    console.error("Error al crear el evento:", error);
  });
  };

  return (
    <div>
      <h3>Create Event</h3>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          onChange={handleInputChange}
          value={eventData.name}
          required
        />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          onChange={handleInputChange}
          value={eventData.description}
          required
        />
        {/* Puedes agregar más campos según las necesidades del evento */}
        <button type="button" onClick={createEvent}>
          Create Event
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;
