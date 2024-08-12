import React, { useRef, useState } from 'react'
import './Quiz.css'
export default function App() {
  const data = [{
    question: "Which HTML tag is used to create a hyperlink?",
    option1: "<link>",
    option2: "<href>",
    option3: "<a>",
    option4: "<hyperlink>",
    ans: "<a>"
  },
  {
    question: "Which of the following is not associated with web socket communication?",
    option1: "https",
    option2: "ws",
    option3: "http",
    option4: "wss",
    ans: "http"
  },
  {
    question: " Which HTML tag is used to create an ordered list in a webpage?",
    option1: "<ol>",
    option2: "<ul>",
    option3: "<li>",
    option4: "<ul> & <ol>",
    ans: "<ol>"
  },
  {
    question: " What is React.js?",
    option1: "Open-source JavaScript back-end library",
    option2: "JavaScript front-end library to create a database",
    option3: "Free and open-source JavaScript front-end library",
    option4: "<ul> & <ol>",
    ans: "Free and open-source JavaScript front-end library"
  },
  {
    question: "  React.js is written in which of the following language?",
    option1: "c",
    option2: "c++",
    option3: "javascript",
    option4: "java",
    ans: "javascript"
  }
  ];
  let [index, setindex] = useState(0);
  let [question, setquestion] = useState(data[index]);
  let [lock, setlock] = useState(false);
  let [score, setscore] = useState(0);
  let [result, setresult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];


  const checkAns = (e, option) => {
    if (lock === false) {
      const correctIndex = [question.option1, question.option2, question.option3, question.option4].indexOf(question.ans);
      if (question.ans === option) {
        e.target.classList.add("correct");
        setlock(true);
        setscore(prev=>prev+1)
      }
      else {
        e.target.classList.add("wrong");
        setlock(true);
        option_array[correctIndex].current.classList.add("correct")
      }
    }
    
  };
  const next = () => {
    if (lock === true) {
      if (index===data.length-1) {
        setresult(true);
        return 0;
      }
      setindex(++index);
      setquestion(data[index]);
      setlock(false);
      option_array.map((options) => {
        options.current.classList.remove("wrong");
        options.current.classList.remove("correct");
        return null;
      })
      
    }
    
  }
  return (
    <div id='container'>
      <div className='container mt-5'>
        <div className='row p-5'>
          <div className='col-md-6 offset-3'>
          <h2 className='mt-3 text-center'>QUIZ APP</h2>
            <hr />
            {result ? <></> : <>
              <h4>{index + 1}. {question.question}</h4>
          <ul className="list-group m-1">
            <li className='list-group-item'ref={Option1} onClick={(e)=>{checkAns(e,question.option1)}}>{question.option1}</li>
            <li className='list-group-item'ref={Option2} onClick={(e)=>{checkAns(e,question.option2)}}>{question.option2}</li>
              <li className='list-group-item' ref={Option3} onClick={(e)=>{checkAns(e,question.option3)}}>{question.option3}</li>
            <li className='list-group-item'ref={Option4} onClick={(e)=>{checkAns(e,question.option4)}}>{question.option4}</li>
            </ul>
              <button onClick={next} className=' button btn m-3 px-3 '>Next</button></>}
            {result ? <><h3 className='text-center'>Your score is {score} out of {data.length}</h3></>: <></>}
            
            </div>
        </div>
      </div>
    </div>
  )
}

