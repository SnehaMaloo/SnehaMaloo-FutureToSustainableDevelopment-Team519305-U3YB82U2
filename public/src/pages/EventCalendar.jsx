import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { eventRoute } from "../utils/APIRoutes";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import NavbarComponent from '../components/Navbar';
function EventList() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    time: '',
    description: '',
    location: ''
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(eventRoute);
        setEvents(response.data.events);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    event.preventDefault();
    setNewEvent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleInputChange1 = (event) => {
    const { name, value } = event.target;
    event.preventDefault();
    setNewEvent(prevState => ({
      ...prevState,
      [name]: value.slice(0,50)
    }));
  };
  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    event.preventDefault();
    setNewEvent(prevState => ({
      ...prevState,
      [name]: value.slice(0,200)
    }));
  };
  const handleSubmit = async (event) => {
    try {
        await axios.post(eventRoute, newEvent);
      console.log("something");
    //   setEvents(prevState => [...prevState, response.data.event]);
    async function fetchData() {
        try {
          const response = await axios.get(eventRoute);
          setEvents(response.data.events);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
      console.log(events)
      setNewEvent({
        name: '',
        date: '',
        time: '',
        description: '',
        location: ''
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div><NavbarComponent> </NavbarComponent>
    <FormContainer>
      <div className='scroll-Container'>
      
      <form onSubmit={handleSubmit}>
      <div className="brand">
        
        <h1>Add New Event</h1>
      </div>

        <label>
          Title:
          <input type="text" name="name" value={newEvent.name} onChange={handleInputChange1} placeholder="Character limit 50 characters" />
        </label>
        
        <br />
        
        <label>
        Description:
        <br/>
          <textarea id="name" name="name" rows="5" cols="129" value={newEvent.description} onChange={handleInputChange2} placeholder="Character limit 200 characters"></textarea>
        </label>
        
        <br />

        <label>
          Date-Time:
          <input type="datetime-local" name="date" value={newEvent.date} onChange={handleInputChange} min={new Date().toISOString().split('T')[0]} />
        </label>
        <br />
        
        <br />
        <label>
          Location:
          <input type="search" name="location" value={newEvent.location} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit" onClick={handleSubmit}>Add Event</button>
      </form>
    </div>
    </FormContainer>
    </div>
     /* <ToastContainer/>   */
  );
}
const FormContainer = styled.div`
.scroll-container {
  scroll-behavior: smooth;
  overflow-y: scroll;
  height:90vh;
}
  min-height: 100vh;
  display: flex;
  border-style:solid;
  border-radius: 0.3rem;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  background-image:url("https://images.pexels.com/photos/3876566/pexels-photo-3876566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
  background-position:center;
  background-color: red;
  padding-top: 0.25rem;
  padding-right: 1.5rem;
  padding-bottom: 3.5rem;
  padding-left: 1.5rem;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    width:1100px;
    img {
      height: 5rem;
    }
    h1 {
      color: black;
      text-shadow: 2px 2px 2px #CCCCCC;
      font-family: 'Montserrat', sans-serif;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 0.32rem;
    background-color: white;
    border-radius: 2rem;
    border-style:solid;
    padding: 1.5rem;
    margin-top: 0rem;
    width:1200px
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid green;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid green;
      outline: none;
    }
  }

  button {
    background-color: green;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: green;
    }
  }
  #name
  {
    border: 0.1rem solid green;
    border-radius: 0.4rem;
  }
  ul {
    max-height: calc(100vh - 15rem);
    overflow-y: auto;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin-bottom: 1rem;

      h2 {
        margin: 0;
        font-size: 2rem;
      }

      p {
        margin: 0.5rem 0;
        font-size: 1.2rem;
      }
    }
  }
`;

export default EventList;