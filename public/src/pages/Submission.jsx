import React, { useState } from 'react';
import axios from 'axios';
import { SubmissionRoute} from "../utils/APIRoutes";
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../components/Navbar';
import styled from "styled-components";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileSelectedHandler = event => {
    setSelectedFile(event.target.files[0]);
  };
  const [uploadStatus, setUploadStatus] = useState('');
  const navigate = useNavigate();
  const [newEvent, setNewEvent] = useState({
    title:'',
    data: '',
    description: '',
    likes: '',
    username: '',
    date:''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value.slice(0,200),
    }));
  };

  const handleUpload = async() => {
    try {
      const fd = new FormData();
    fd.append('image', selectedFile, selectedFile.name);
    axios.post('http://localhost:3000/upload', fd)
      .then(res => {
        console.log(res);
      });
      newEvent.data = selectedFile.name;
      newEvent.date=Date.now;
      newEvent.username = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)).username;
      console.log(newEvent.username);
      newEvent.likes = 0;
      console.log("file is sent");
      await axios.post(SubmissionRoute, newEvent);
      setUploadStatus(`Uploaded file(s) successfully.`);
      setTimeout(() => {
        navigate("/home")
      }, 2000);
    } catch (error) {
      console.error(error);
      setUploadStatus('Failed to upload file(s).');
    }
  };
  

  return (
    <>
    <NavbarComponent></NavbarComponent>
    <Container>
    <div>
      <h1>Upload Images</h1>
      <input type="file" name="data" onChange={fileSelectedHandler} />
      <p> Only .jpeg and .png files are supported</p>
      <textarea type="textarea" name="description" placeholder="Character-limit: 200 characters" value={newEvent.description} onChange={handleInputChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{uploadStatus}</p>
    </div>
    </Container>
    </>
  );
};

export default UploadPage;

const Container = styled.div`
background-image: url("https://images.pexels.com/photos/3876566/pexels-photo-3876566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
  background-size: 100%;
  ${'' /* background-position: center; */}
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

h1{
  font-size: 36px;
  text-align: center;
  margin-bottom: 20px;
  padding: 25px 25px;
}
input{
  display: block;
  margin-bottom: 20px;
  font-size: 18px;
  padding: 10px;
  border: none;
}
textarea{
  width: 600px;
	height: 300px;
	border: 3px solid #cccccc;
	padding: 10px 10px;
	font-family: Tahoma, sans-serif;
  display:block;
  outline: 2px solid black;
	background-image: url(bg.gif);
	background-position: bottom right;
	background-repeat: no-repeat;
}
button{
  display: block;
  margin-left: auto;
  margin-top: 20px;
  background-color: #80FF72;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 16px;
  }
}
`;