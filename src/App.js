import React, { useState, useEffect } from 'react';
import Header from './componentes/Header';
import EventList from './componentes/EventList';
import LoginForm from './componentes/SigninForm';
import SignupForm from './componentes/SignupForm';
import CreateEventForm from './componentes/CreateEventForm';

function App() {
  const [events, setEvents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeComponent, setActiveComponent] = useState('eventList');
  const [userInfo, setUserInfo] = useState({});
  const [showCreateEventForm, setShowCreateEventForm] = useState(false); // Agrega esta línea


  useEffect(() => {
    // Obtener eventos al cargar la página
    getAllEvents();
  }, [isLoggedIn,showCreateEventForm]);
  


  const getAllEvents = () => {
    fetch("http://localhost:8080/event/getall")
      .then(response => response.json())
      .then(data => {
        setEvents(data);
      })
      .catch(error => {
        console.error("Error al obtener los eventos:", error);
      });
  };

  const handleCreateEvent = (newEvent) => {
    // Actualizar la lista de eventos después de la creación exitosa
    setEvents([...events, newEvent]);
  };

  const handleSigninClick = () => {
    setActiveComponent('loginForm');
  };

  const handleSignupClick = () => {
    setActiveComponent('signupForm');
  };

  const handleSignupClose = () => {
    setActiveComponent('eventList');
  };

  const handleGoToSignup = () => {
    setActiveComponent('signupForm');
  };

  const handleSignin = (userData) => {
    setIsLoggedIn(true);
    setUserInfo(userData);
    setActiveComponent('eventList');
  };

  const handleSignout = () => {
    setIsLoggedIn(false);
    setActiveComponent('eventList');
  };
  const handleViewProfile = () => {
    // Abre una nueva pestaña o ventana para mostrar la información del perfil
    const profileWindow = window.open('', '_blank');
    profileWindow.document.write(`<h2>Perfil de ${userInfo.username}</h2>`);
    profileWindow.document.write(`<p><strong>Username:</strong> ${userInfo.username}</p>`);
    profileWindow.document.write(`<p><strong>Email:</strong> ${userInfo.email}</p>`);
  };


  

  const handleCreateEventClick = () => {
    setShowCreateEventForm(true);
  };

  const handleCreateEventFormClose = () => {
    setShowCreateEventForm(false);
  };

  return (
    <div className="App">
      <div className="container">
        <Header />
        {activeComponent === 'eventList' && (
          <>
            {events.length > 0 && <EventList events={events} />}
            {!isLoggedIn && (
              <>
              <div style={{textAlign: 'center'}}>
                <button onClick={handleSigninClick}
                        style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: '#5d5dff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >Sign In</button>
                <button onClick={handleSignupClick}
                      style={{ padding: '10px 20px', backgroundColor: '#ff5d5d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                      >Sign Up</button>
                      </div>
              </>
            )}
          </>
        )}
        {activeComponent === 'loginForm' && (
          <LoginForm onSignin={handleSignin} onGoToSignup={handleGoToSignup} />
        )}
        {activeComponent === 'signupForm' && (
          <SignupForm onSignupClose={handleSignupClose} />
        )}
        {isLoggedIn && (
          <>
          <button onClick={handleSignout}>Sign Out</button>
          <button onClick={handleViewProfile}>Perfil</button>   
          <button onClick={() => setShowCreateEventForm(true)}>Create Event</button>
          </>
        )}
        {showCreateEventForm && (
          <CreateEventForm
            onCreateEvent={handleCreateEvent}
            onClose={() => setShowCreateEventForm(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
