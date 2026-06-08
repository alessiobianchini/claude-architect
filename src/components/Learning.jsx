import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import guideMarkdown from '../data/guide.md?raw';
import { Copy, Check } from 'lucide-react';
import './Learning.css';

const generateSlug = (text) => {
  return text.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const CodeBlock = ({ node, children, ...props }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Extract text from children
    const extractText = (childArray) => {
      if (typeof childArray === 'string') return childArray;
      if (Array.isArray(childArray)) {
        return childArray.map(child => {
          if (typeof child === 'string') return child;
          if (child && child.props && child.props.children) {
            return extractText(child.props.children);
          }
          return '';
        }).join('');
      }
      if (childArray && childArray.props && childArray.props.children) {
        return extractText(childArray.props.children);
      }
      return '';
    };

    const text = extractText(children);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-wrapper">
      <button className="copy-btn" onClick={handleCopy} title="Copy code">
        {copied ? <Check size={14} color="var(--success)" /> : <Copy size={14} color="var(--text-muted)" />}
      </button>
      <pre {...props}>{children}</pre>
    </div>
  );
};

const Learning = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(guideMarkdown);
  }, []);

  const components = {
    h1: ({node, children}) => <h1 id={generateSlug(children)}>{children}</h1>,
    h2: ({node, children}) => <h2 id={generateSlug(children)}>{children}</h2>,
    h3: ({node, children}) => <h3 id={generateSlug(children)}>{children}</h3>,
    pre: CodeBlock
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
