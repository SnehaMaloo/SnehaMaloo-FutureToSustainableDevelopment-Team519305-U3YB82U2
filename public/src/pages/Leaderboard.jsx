import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {FaGifts} from 'react-icons/fa';
import { SubmissionRoute } from "../utils/APIRoutes"
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/Navbar"

function SubmissionList() {
    const [submission, setsubmission] = useState([]);
    const navigate = useNavigate();
    const handleclaim=async(username)=>{
      const today=new Date();
      const currentUser=JSON.stringify(
        JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)).username
      );
      if(username!==currentUser)
      {
        alert("You are not eligible for the reward");
        return ;
      }
      if(today.getDay()===6)
      {
        navigate("/Reward");
      }
      else{
        alert("You can claim the rewards only at the end of the week");
        return ;
      }
    }
    useEffect(() => {
        axios.get(SubmissionRoute)
            .then(response => {
              const sortedData = response.data.submissions.sort((a, b) => {
                if (b.likes === a.likes) {
                    return a.username.localeCompare(b.username);
                }
                return b.likes - a.likes;
            });      
            const newsortedData = sortedData.filter(item => {
              const weekStart = new Date();
              weekStart.setDate(weekStart.getDate() - 7);
              const itemDate = new Date(item.date);
              return itemDate.getTime() >= weekStart.getTime();
            });      
            const filteredData = [];
            const seenUsernames = new Set();
            for (const item of newsortedData) {
            if (!seenUsernames.has(item.username)) {
            filteredData.push(item);
            seenUsernames.add(item.username);
          }
          }
                setsubmission(filteredData);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
      <><NavbarComponent></NavbarComponent>
        <Container >
            <div className="brand">
            <h1>Leaderboard</h1>
          </div>
            <ul>
            {submission.slice(0,3).map((item,index) => (
                    <li key={item.id} >#{index + 1}.  {item.username} ({item.likes} likes)
                        <button onClick={() => handleclaim(item.username)}>Claim Reward <FaGifts/></button>
                    </li>
                ))}
                {submission.slice(3,5).map((item,index) => (
                    <li key={item.id}>#{index + 4}.  {item.username} ({item.likes} likes)
                    </li>
                ))}
            </ul>
        </Container>
        </>
    );
}

export default SubmissionList;

const Container = styled.div`
background-image:url(https://images.pexels.com/photos/3876566/pexels-photo-3876566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1);
background-position:cover;
background-repeat:no-repeat;
background-size:100%;
height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      align-item:top;
      color: black;
      text-transform: uppercase;
      color: black;
      text-shadow: 2px 2px 2px #CCCCCC;
      font-family: 'Montserrat', sans-serif;
      text-transform: uppercase;
    }
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    display:flex;
    text-align:top;
    text-transform: uppercase;
    align-items: center;
    justify-content: space-between;
    font-style:border;
    font-weight:bold;
    text-font:italic;
    background-color:#aef359;
    border-radius: 9px;
    padding: 10px;
    margin-bottom: 10px;
    width:50vw;
    height:7vh;
    color:black;
    font-size:20px;
    
  }
  
  li:hover {
    transform: scale(1.05);
  }
  
  .author {
    font-size: 1.5rem;
    font-weight: bold;
  }
  button{
    height:10vw;
    height:5vh;
    padding:10px;
    border-radius:5px;
    font-weight:bold;
  }
  .likes {
    font-size: 1.2rem;
  }`