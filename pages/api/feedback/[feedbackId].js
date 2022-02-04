import { buildFeedbackPath, extractFeedback } from '.';

function handler(req, res) {
    const feedbackId = req.query.feedbackId;
    const filePath = buildFeedbackPath();
    const fileData = extractFeedback(filePath);
    const selectedFedback = fileData.find(v => v.id === feedbackId);
    res.status(200).json({ feedback: selectedFedback });
}

export default handler;
