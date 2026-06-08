import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import guideMarkdown from '../data/guide.md?raw';
import './Learning.css';

const generateSlug = (text) => {
  return text.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const Learning = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(guideMarkdown);
  }, []);

  const components = {
    h1: ({node, children}) => <h1 id={generateSlug(children)}>{children}</h1>,
    h2: ({node, children}) => <h2 id={generateSlug(children)}>{children}</h2>,
    h3: ({node, children}) => <h3 id={generateSlug(children)}>{children}</h3>
  };

  return (
    <div className="learning-container animate-fade-in">
      <div className="learning-content glass">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Learning;
