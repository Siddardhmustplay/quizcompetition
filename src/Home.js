import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'
import { useNavigate } from 'react-router-dom'; // Make sure this is imported
import friends from './images/friends.jpg'

const Home = ()=>{
    const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleStartClick = () => {
    navigate('/question'); // Navigate to the "Question" page
  };
    return(
        <div >
  <section id="home-section" class="d-flex align-items-center justify-content-center">
      <div class="container">
         <div class="row justify-content-center">
             
              <div className=' col-md-12 text-center'>
              <h1 className='protest-strike-regular-head text-center'>Know Your Friend</h1>
              <div >
              <img src={friends} className='frnd-png'/>
              </div>
              <button onClick={handleStartClick} className='btn-start  protest-strike-regular-BTN'>Start</button>
              </div>
            </div>
        </div>
    </section>
    </div>
    )
}
export default Home;
