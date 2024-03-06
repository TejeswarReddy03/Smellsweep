import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaClipboard } from 'react-icons/fa';

const Codebox = ({ language, code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  if (!code) {
    return <span></span>;
  }
  return (
    <>
    <style jsx>{`
        .codebox {
            background-color: #2b2b2b;
            border-radius: 8px;
            padding: 1rem;
            overflow: auto;
          }
        
          .code-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #ddd;
            color: #ddd;
            font-size: 1.2rem;
          }
        
          .copy-btn {
            cursor: pointer;
            background-color: transparent;
            border: none;
            color: #ddd;
            font-size: 1.2rem;
          }
        
          .copy-btn:hover {
            color: #fff;
          }
        
          .code-body {
            margin: 0;
            font-size: 1rem;
            color: #ddd;
            font-family: monospace;
          }

        
    `}</style>

    <div className="codebox">
      <div className="code-header">
        <span>{language}</span>
        <button className="copy-btn" title="Copy to clipboard" onClick={handleCopyClick}>
          {isCopied ? 'Copied!' : (<><FaClipboard /> Copy</>)} 
        </button>
      </div>
      <div className="code-body">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
    </>
  );
};

Codebox.propTypes = {
  language: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
};

export default Codebox;

// To use in App.js:
// npm i react-icons
// import Codebox from './Codebox';
// let snippet = `def hello_world():
//     print("Hello World")`;
//  const language = 'python';
//  <Codebox language={language} code={snippet} />
