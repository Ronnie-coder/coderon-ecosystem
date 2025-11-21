// src/app/playroom/sentiment-analyzer/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Sentiment from 'sentiment';
import { FaArrowLeft, FaSmile, FaMeh, FaFrown } from 'react-icons/fa';

// Define the structure of our analysis result for TypeScript
interface AnalysisResult {
  score: number;
  comparative: number;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  positiveWords: string[];
  negativeWords: string[];
}

const SentimentAnalyzerPage = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysis = () => {
    if (!text.trim()) {
      setResult(null);
      return;
    }
    
    setIsLoading(true);
    setResult(null);

    // Simulate a brief "thinking" period for better UX
    setTimeout(() => {
      const sentiment = new Sentiment();
      const analysis = sentiment.analyze(text);
      
      let sentimentLabel: 'Positive' | 'Neutral' | 'Negative';
      if (analysis.comparative > 0.05) sentimentLabel = 'Positive';
      else if (analysis.comparative < -0.05) sentimentLabel = 'Negative';
      else sentimentLabel = 'Neutral';

      setResult({
        score: analysis.score,
        comparative: parseFloat(analysis.comparative.toFixed(2)),
        sentiment: sentimentLabel,
        positiveWords: analysis.positive,
        negativeWords: analysis.negative,
      });

      setIsLoading(false);
    }, 500); // 0.5 second delay
  };

  const getSentimentIcon = () => {
    if (!result) return null;
    switch (result.sentiment) {
      case 'Positive': return <FaSmile className="c-result__icon c-result__icon--positive" />;
      case 'Neutral': return <FaMeh className="c-result__icon c-result__icon--neutral" />;
      case 'Negative': return <FaFrown className="c-result__icon c-result__icon--negative" />;
      default: return null;
    }
  };

  return (
    <div className="c-page-container">
      <Link href="/playroom" className="c-dashboard-back-link">
        <FaArrowLeft />
        Back to Playroom
      </Link>
      
      <div className="c-analyzer">
        <div className="c-analyzer__header">
          <h1 className="c-analyzer__title">AI Sentiment Analyzer</h1>
          <p className="c-analyzer__subtitle">
            Enter any text below to analyze its emotional tone. Our AI will classify it as positive, negative, or neutral.
          </p>
        </div>

        <div className="c-analyzer__input-area">
          <textarea
            placeholder="e.g., Coderon provides excellent service and the results were amazing..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="c-analyzer__controls">
          <button
            className="c-analyzer__button"
            onClick={handleAnalysis}
            disabled={isLoading}
          >
            {isLoading ? 'Analyzing...' : 'Analyze Text'}
          </button>
        </div>
        
        {result && (
          <div className="c-result">
            <div className="c-result__header">
              {getSentimentIcon()}
              <h3 className="c-result__title">{result.sentiment}</h3>
            </div>
            <div className="c-result__details-grid">
              <div className="c-result__detail-item">
                <h4>SCORE</h4>
                <p>{result.score}</p>
              </div>
              <div className="c-result__detail-item">
                <h4>COMPARATIVE SCORE</h4>
                <p>{result.comparative}</p>
              </div>
            </div>
            {(result.positiveWords.length > 0 || result.negativeWords.length > 0) && (
              <div className="c-result__keywords">
                <h4>Keywords Identified</h4>
                <div className="c-result__keyword-list">
                  {result.positiveWords.map(word => <span key={word} className="keyword--positive">{word}</span>)}
                  {result.negativeWords.map(word => <span key={word} className="keyword--negative">{word}</span>)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SentimentAnalyzerPage;