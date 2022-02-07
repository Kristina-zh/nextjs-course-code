import { useState } from 'react'
import { buildFeedbackPath, extractFeedback } from '../api/feedback/index';

function FeedbackPage(props) {

    const [feedbackData, setFeedbackData] = useState();

    function loadFeedbackHandler(id) {
       fetch(`/api/feedback/${id}`).then(res => res.json()).then(data => setFeedbackData(data.feedback));
    }

    return (
      <>
        {feedbackData && <p>{feedbackData.email}</p>}
        <ul>
            {props.feedbackItems.map(v => (
                <li key={v.id}>
                    {v.text}
                    <button onClick={loadFeedbackHandler.bind(null, v.id)}>Show Details</button>
                </li>
            ))}
        </ul>
      </>)
};

export async function getStaticProps() {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    
    return {
        props: {
            feedbackItems: data,
        },
    };
}

export default FeedbackPage;
