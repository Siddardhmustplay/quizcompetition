import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'
import Question from './Question';
//import Quiz from './Quiz';
//import Quizupdate from './Quizupdate';
import Quizusercheck from './Quizusercheck';
function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/question" element={<Question />} /> {/* Define the Question route */}
        <Route path="/quiz" element={<Quizusercheck />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
