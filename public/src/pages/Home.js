import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { eventRoute } from "../utils/APIRoutes";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import NavbarComponent from '../components/Navbar';
import { FaChevronDown } from 'react-icons/fa';
import { Collapse } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import green from '../assets/green.jpeg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.png';
function MyCarousel() {
  return (
    <div style={{ height: "90vh", width: "100vw" }}>
      <Carousel style={{ height: "100%" }}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={green}
            alt="First slide"
          />
          <Carousel.Caption>
            <h1 className="log">Think. Act. Save.</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img2}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h1 className="log">Unplug to save the planet</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img3}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h1 className="log">Reduce your carbon footprint, switch to green electricity</h1>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

function EventCard({ event }) {

  const [openCollapse, setOpenCollapse] = useState(null);
  const handleCardClick = () => {
    alert("You are Invited for the Event!!!")
    // delay in milliseconds, 3000 = 3 seconds
  };


  return (
    <div className="card" onClick={handleCardClick} style={{ height: "300px", width: "500px" }}>
      <div className="card-body">
        <h2 className="card-title" style={{ backgroundColor: "#80FF72", color: "black", padding: "10px" }}>{event.title}</h2>
        <button
                    className="description-button "
                    onMouseEnter={() => setOpenCollapse(openCollapse === event.description ? null : event.description)}
                    onMouseLeave={() => setOpenCollapse(null)}
                  >
                    {event.description.slice(0,30)}...<FaChevronDown className={`arrow ${openCollapse === event.description ? 'up' : ''}`} />
                  </button>
                  <Collapse in={openCollapse === event.description}>
                    <div className="desc">
                      <p className="card-text font-weight-bold bg-success text-white">
                        {event.description}
                      </p>
                    </div>
                  </Collapse>
                  <p className="card-text">Date: {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p className="card-text">Time: {event.time}</p>
        <p className="card-text">Location: {event.location}</p>
      </div>
    </div>
  );
}


export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log(process.env.REACT_APP_LOCALHOST_KEY);
    async function fetchData() {
      try {
        const response = await axios.get(eventRoute);
        const currentDate = new Date();
        const upcomingEvents = response.data.events.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= currentDate;
        });
        setEvents(upcomingEvents);
      } catch (error) {
        console.log(error);
      }
    }
    
    fetchData();
  }, []);
  return (
    <>
      <NavbarComponent></NavbarComponent>
      <Container>
      <div className='scroll-container'>
      <div className="carousel-container">
          <MyCarousel></MyCarousel>
        </div>
        <div className="heading">
            <h1>Upcoming Events</h1>
          </div>
        <div className="event-card-container">
          <div className="card-deck">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
          </div>
          <div className="todo">
          <div className="about-section">
  <h1>About Us</h1>
  
  <p>We aim to bring together individuals,
organizations, and businesses that are committed to
promoting sustainability in their communities. The Community
Hub would serve as a virtual space for members of the
community to connect, share information, and collaborate on
sustainability initiatives.
</p>
</div>
</div>
        </div>
      </Container>
    </>
  )
}

const Container = styled.div`
.scroll-container {
  scroll-behavior: smooth;
  overflow-y: scroll;
  height:97vh;
}
  /* reduce the size of the carousel indicators */
  .carousel-indicators li {
    width: 8px;
    height: 8px;
    margin: 0 4px;
  }
  /* reduce the size of the carousel captions */
  .carousel-caption {
    width: 80%;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }

  /* reduce the size of the carousel images */
  .carousel-item img {
    height: 90vh;
    object-fit: fill;
  }
  .heading {
    margin:5px;
    border:4px;
    display: flex;
    justify-content: center;
    height:100px;
    font-family:'Brush Script MT, Brush Script Std, cursive';
    padding:25px;
  }
  .event-card-container {
  margin-top: 20px;

  .card-deck {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
    margin-bottom:30px;

    .card {
      margin: 20px;
      border:2px solid black;

      &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      }
    }
  }
}
.team{
  margin-bottom:45px;
}
${'' /* .body{
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
} */}
${'' /* .body,.body:before,.body:after
{
  box-sizing: inherit;
} */}
.todo{
  box-sizing: border-box;
}
.column {
  float: left;
  width: 20%;
  height:20%;
  align-item:center;
  margin-bottom: 10px;
  padding: 0 8px;
}
.row{
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  display:flex;
  justify-content:space-between;
  padding:10px;
}
h1{
  font-style:oblique;
  font-weight:bold;
  font-size:50px
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 8px;
}
.about-section {
  font-size:25px;
  padding: 50px;
  text-align: center;
  background-color: #AEF359;
  color: white;
}

.container {
  padding: 0 14px;
}

.container::after, .row::after {
  content: "";
  clear: both;
  display: table;
}

.title {
  color: grey;
}

.button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
}

.button:hover {
  background-color: #555;
}
.set{
  height:300px;
  border-radius:10px;
}
.log
{
  text-align:top;
  color:while;
  font-family:'Brush Script MT, Brush Script Std, cursive';

}
`;
        