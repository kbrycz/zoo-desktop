import React, { useState } from 'react';
import server from '../../../api/server';
import '../../styles/Help/AIScreen.css';

function AIScreen() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await server.get('/ask', { params: { question } });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error('Error fetching AI answer:', error);
      setAnswer('Sorry, an error occurred while getting your answer. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="ai-screen">
      <h1>AI Support</h1>
      <p>Type your question below and get an instant AI-powered answer.</p>
      <div className="ai-container">
        <form onSubmit={handleSubmit} className="ai-form">
          <textarea
            className="ai-question-input"
            onChange={handleQuestionChange}
            value={question}
            placeholder="Ask me anything..."
            disabled={loading}
          />
          <button type="submit" className="ai-submit-button" disabled={loading || !question}>
            {loading ? 'Getting your answer...' : 'Submit'}
          </button>
        </form>
        {answer && <div className="ai-answer">{answer}</div>}
      </div>
    </div>
  );
}

export default AIScreen;
