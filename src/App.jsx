import React, { useState, useEffect } from 'react';
import QuestionCard from './components/QuestionCard';
import Learning from './components/Learning';
import questionsData from './data/questions.json';
import guideMarkdown from './data/guide.md?raw';
import { Trophy, ArrowRight, ArrowLeft, BookOpen, LayoutDashboard } from 'lucide-react';

const generateSlug = (text) => {
  return text.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

function App() {
  const [currentTab, setCurrentTab] = useState('simulator');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [toc, setToc] = useState([]);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    // Load and shuffle questions on mount
    setQuestions(shuffleArray(questionsData));

    // Extract headings for TOC
    const headings = [];
    const lines = guideMarkdown.split('\n');
    lines.forEach(line => {
      const match = line.match(/^(#{1,2})\s+(.+)$/);
      if (match) {
        headings.push({
          level: match[1].length,
          text: match[2],
          slug: generateSlug(match[2])
        });
      }
    });
    setToc(headings);
  }, []);

  const handleSelectOption = (letter) => {
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: letter
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
    setQuestions(shuffleArray(questionsData));
  };

  const scrollTo = (slug) => {
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (questions.length === 0) return <div className="loading">Loading...</div>;

  const currentQuestion = questions[currentIndex];
  const selectedOption = answers[currentIndex] || null;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="app-container">
      {/* Persistent Sidebar */}
      <aside className="sidebar">
        {currentTab === 'simulator' ? (
          <>
            <div style={{ padding: '24px', borderBottom: '1px solid var(--panel-border)' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '0.05em' }}>Questions</h2>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px' }}>
                Answered: <span style={{ color: 'white', fontWeight: '600' }}>{answeredCount}</span> / {questions.length}
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
              {questions.map((q, idx) => {
                const isAns = answers[idx] !== undefined;
                const isCorr = isAns && answers[idx] === q.correct;
                return (
                  <button
                    key={idx}
                    onClick={() => { setIsFinished(false); setCurrentIndex(idx); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 16px',
                      borderRadius: '8px', marginBottom: '4px',
                      background: currentIndex === idx && !isFinished ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                      color: isAns ? (isCorr ? 'var(--success)' : 'var(--error)') : 'var(--text-muted)'
                    }}
                  >
                    <div style={{
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: isAns ? (isCorr ? 'var(--success)' : 'var(--error)') : 'var(--text-muted)'
                    }} />
                    <span>Q{q.global_n}</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div style={{ padding: '24px', borderBottom: '1px solid var(--panel-border)' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '0.05em' }}>Table of Contents</h2>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
              <ul className="toc-list">
                {toc.map((heading, i) => (
                  <li key={i} className={`toc-item level-${heading.level}`}>
                    <button onClick={() => scrollTo(heading.slug)}>{heading.text}</button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ fontWeight: '800', fontSize: '18px', color: 'var(--accent)', marginRight: '16px' }}>CCA-F</div>
            <button 
              className={`btn ${currentTab === 'simulator' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setCurrentTab('simulator')}
              style={{ padding: '8px 16px' }}
            >
              <LayoutDashboard size={16} /> Simulator
            </button>
            <button 
              className={`btn ${currentTab === 'learning' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setCurrentTab('learning')}
              style={{ padding: '8px 16px' }}
            >
              <BookOpen size={16} /> Learning Guide
            </button>
          </div>
          
          {currentTab === 'simulator' && (
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-secondary" onClick={handlePrev} disabled={currentIndex === 0 || isFinished}>
                <ArrowLeft size={16} /> Prev
              </button>
              <button className="btn btn-secondary" onClick={handleNext} disabled={currentIndex === questions.length - 1 || isFinished}>
                Next <ArrowRight size={16} />
              </button>
              <button className="btn btn-primary" onClick={handleFinish}>
                Finish & Review
              </button>
            </div>
          )}
        </header>

        <div className="content-area">
          {currentTab === 'learning' ? (
            <Learning />
          ) : isFinished ? (
            <div className="summary glass animate-fade-in" style={{ padding: '40px', borderRadius: '16px', maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <Trophy size={48} color="var(--warning)" />
                <div>
                  <h1 style={{ fontSize: '32px', marginBottom: '4px' }}>Result Summary</h1>
                  <p style={{ color: 'var(--text-muted)' }}>You completed {answeredCount} out of {questions.length} questions.</p>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
                <div className="glass" style={{ padding: '24px', textAlign: 'center', borderRadius: '12px' }}>
                  <div style={{ fontSize: '40px', fontWeight: '800', color: 'var(--accent)' }}>{answeredCount}</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Attempted</div>
                </div>
                <div className="glass" style={{ padding: '24px', textAlign: 'center', borderRadius: '12px' }}>
                  <div style={{ fontSize: '40px', fontWeight: '800', color: 'var(--success)' }}>
                    {Object.keys(answers).filter(k => answers[k] === questions[k].correct).length}
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Correct</div>
                </div>
                <div className="glass" style={{ padding: '24px', textAlign: 'center', borderRadius: '12px' }}>
                  <div style={{ fontSize: '40px', fontWeight: '800', color: 'var(--error)' }}>
                    {Object.keys(answers).filter(k => answers[k] !== questions[k].correct).length}
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Incorrect</div>
                </div>
              </div>

              <button className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px' }} onClick={handleRestart}>
                Restart Test
              </button>
            </div>
          ) : (
            <QuestionCard
              question={currentQuestion}
              selectedOption={selectedOption}
              onSelectOption={handleSelectOption}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
