import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import './Question.css';

const Questions = () => {
    // State to hold the region and username
    const [region, setRegion] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate(); // Initialize the useNavigate hook
    // Initialize navigate hook
    const handleClick = () => {
        navigate('/quiz', { state: { region, username } });
    };
    return (
        <div>
            <section id="question-section" className="buytoken d-flex align-items-center justify-content-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className='col-md-12 text-center'>
                            <h1 className='protest-strike-regular'>How Well Do Your Friends Know You?</h1>
                        </div>
                        <h5 className='protest-strike-regular-inst'>Instructions:</h5>
                        <ul>
                            <li>Choose your region.</li>
                            <li>Enter your name.</li>
                            <li>Answer any 10 Questions about yourself.</li>
                            <li>Your quiz-link will be ready.</li>
                            <li>Share your quiz-link with your friends.</li>
                            <li>Your friends will try to guess the right answers.</li>
                            <li>Check the score of your friends at your quiz-link!</li>
                        </ul>
                        
                        {/* Region Selection */}
                        <div className='col-md-12 text-center region'>
                            <label htmlFor="region-select" className='protest-strike-regular-head'>
                                Select your region
                            </label>
                            <select
                                id="region-select"
                                className='region-select protest-strike-regular-options'
                                value={region}
                                onChange={(e) => setRegion(e.target.value)} // Update region state
                            >
                                <option value="">Select</option>
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="China">China</option>
                                <option value="UK">UK</option>
                                <option value="Australia">Australia</option>
                                <option value="Europe">Europe</option>
                            </select>
                        </div>

                        {/* Username Input */}
                        <div className='col-md-12 text-center name'>
                            <input
                                type='text'
                                placeholder='Enter your name eg: Joey'
                                className='input-name'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} // Update username state
                            />
                        </div>

                        {/* Submit Button */}
                        <div className='col-md-12 text-center question'>
                            <button className='btn btn-primary protest-strike-regular-submit' onClick={handleClick}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Questions;
