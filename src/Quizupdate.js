import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Quiz.css';

const Quizupdate = () => {
    const location = useLocation(); // Get the location object
    const navigate = useNavigate(); // Initialize navigate
    const { region, username } = location.state || {}; // Destructure state

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [formData, setFormData] = useState({
        dateofbirth: "", // Only store dateofbirth
        crickter: "",
        actor: "",
        car: "",
        bike: "",
        place: "",
        teacher: "",
        pet: "",
        hillstation: "",
        commonname: "",
        mobilebrand: "",
        laptopbrand: "",
        tabbrand: "",
        camerabrand: "",
        company: "",
    });

    const initialQuestions = [
        {
            question: "What is your Date of Birth (dateofbirth)?",
            options: ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            field: 'dateofbirth',
        },
        {
            question: "Who is your favourite cricketer?",
            options: ["", "Sachin Tendulkar", "Virat Kohli", "MS Dhoni", "Ricky Ponting"],
            field: 'crickter',
        },
        {
            question: "Who is your favourite actor?",
            options: ["", "Shah Rukh Khan", "Salman Khan", "Aamir Khan", "Ranbir Kapoor"],
            field: 'actor',
        },
        {
            question: "Who is your favourite teacher?",
            options: ["", "Mr. Smith", "Mrs. Johnson", "Mr. Brown", "Ms. Taylor"],
            field: 'teacher',
        },
        {
            question: "What is your favourite bike?",
            options: ["", "Harley Davidson", "Ducati", "Yamaha", "Kawasaki"],
            field: 'bike',
        },
        {
            question: "What is your favourite hill station?",
            options: ["", "Ooty", "Coorg", "Ladakh", "Manali"],
            field: 'hillstation',
        },
        {
            question: "What is your favourite pet?",
            options: ["", "Dog", "Cat", "Both"],
            field: 'pet',
        },
        {
            question: "What is your common name calling by friends?",
            options: ["", "Chintu", "Nani", "Chinna"],
            field: 'commonname',
        },
        {
            question: "What is your favourite place?",
            options: ["", "Hyderabad", "Bangalore", "Delhi", "Andhra Pradesh"],
            field: 'place',
        },
        {
            question: "What is your favourite car?",
            options: ["", "Porsche", "Ducati", "Lamborghini", "Audi"],
            field: 'car',
        },
        {
            question: "What is your favourite mobile brand?",
            options: ["", "Apple", "Samsung", "OnePlus", "Nokia"],
            field: 'mobilebrand',
        },
        {
            question: "What is your favourite laptop brand?",
            options: ["", "Dell", "HP", "Apple", "Lenovo"],
            field: 'laptopbrand',
        },
        {
            question: "What is your favourite tab brand?",
            options: ["", "Apple", "Samsung", "Lenovo", "Microsoft"],
            field: 'tabbrand',
        },
        {
            question: "What is your favourite camera brand?",
            options: ["", "Canon", "Nikon", "Sony", "Fujifilm"],
            field: 'camerabrand',
        },
        {
            question: "What is your favourite company?",
            options: ["", "Tesla", "Google", "Amazon", "Microsoft"],
            field: 'company',
        },
    ];

    // Shuffle the questions and limit to 10
    const shuffledQuestions = initialQuestions.sort(() => Math.random() - 0.5).slice(0, 10);

    const handleChange = (event) => {
        const { value } = event.target;
        setFormData({
            ...formData,
            [shuffledQuestions[currentQuestionIndex].field]: value, // Update the corresponding field
        });
    };
    const handleNext = () => {
        // Move to the next question if there are more questions
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            postScoreToDatabase(); // Call the function to post data when quiz is complete
        }
    };

    const postScoreToDatabase = async () => {
        const SUPABASE_URL = 'https://tvzirhubwcmgwachroza.supabase.co/rest/v1/Quizdata';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2emlyaHVid2NtZ3dhY2hyb3phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyNTM0NDEsImV4cCI6MjA0MjgyOTQ0MX0.Dt4fUofu9MgETlh3zl29021YzQjebwKiJmcgVPY_G-o';
        const SUPABASE_BEARER_KEY = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2emlyaHVid2NtZ3dhY2hyb3phIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNzI1MzQ0MSwiZXhwIjoyMDQyODI5NDQxfQ.bYWGSemkvbQ1pKFk-PkBtHcw9B5yD5mUgfbp7cEA0-E';

        const headers = {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': SUPABASE_BEARER_KEY,
        };

        // Check if the dateofbirth field is filled
        if (!formData.dateofbirth) {
            console.error('Please select a valid dateofbirth.');
            return; // Do not proceed if dateofbirth is invalid
        }

        try {
            const response = await fetch(SUPABASE_URL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    username: username,
                    region: region,
                    dateofbirth: formData.dateofbirth, // Use the dateofbirth directly
                    ...formData, // Spread formData to include all collected responses
                }),
            });

            if (response.ok) {
                console.log('Data posted successfully!');
                // Navigate to the "quiz" page after successful submission
                navigate('/quiz');
            } else {
                const error = await response.json();
                console.error('Error posting data:', error);
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    // useEffect to change question on component mount (mimicking window.onload)
    useEffect(() => {
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * shuffledQuestions.length); // Generate a new random index
            } while (newIndex === currentQuestionIndex); // Ensure it's not the same as the current question

            setCurrentQuestionIndex(newIndex); // Update to the new random question index
        }
    }, []); // Empty dependency array means this runs only once when the component loads

    return (
        <div>
            <section id="question-section" className="buytoken d-flex align-items-center justify-content-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className='col-md-12 text-center'>
                            <h1 className='protest-strike-regular'>Welcome to Quiz Questions</h1>
                            <div className='progress'>
                                <div
                                    className='progress-bar'
                                    style={{ width: `${((currentQuestionIndex + 1) / shuffledQuestions.length) * 100}%` }}
                                >
                                    {currentQuestionIndex + 1} / {shuffledQuestions.length}
                                </div>
                            </div>
                            <div className='question protest-strike-regular'>
                                <p>{shuffledQuestions[currentQuestionIndex].question}</p>

                                {/* Display dateofbirth selection for the first question */}
                                <select className='form-select' onChange={handleChange}>
                                    {shuffledQuestions[currentQuestionIndex].options.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>

                                {currentQuestionIndex < shuffledQuestions.length - 1 ? (
                                    <button className='btn btn-success' onClick={handleNext}>Next Question</button>
                                ) : (
                                    <button className='btn btn-success' onClick={postScoreToDatabase}>Submit</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Quizupdate;
