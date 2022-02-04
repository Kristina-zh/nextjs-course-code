import {useRef, useState} from 'react';

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const [loadedFeedbacks, setLoadedFeedbacks] = useState([]);

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = {email: enteredEmail, text: enteredFeedback};

    fetch('/api/feedback', {
      method: 'POST', 
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(responce => responce.json()).then(data => console.log('data', data))
  }

  function loadFeedbacksHandler(event) {
    fetch('/api/feedback').then(responce => responce.json()).then(data => setLoadedFeedbacks(data.feedback))
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type='email' id='email'ref={emailInputRef}/>
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea row='5' id='feedback' ref={feedbackInputRef}/>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbacksHandler}>Load Feedbacks</button>
        <ul>
          {loadedFeedbacks?.map(v => (<li key={v.id}>{v.text}</li>))}
        </ul>
    </div>
  );
}

export default HomePage;