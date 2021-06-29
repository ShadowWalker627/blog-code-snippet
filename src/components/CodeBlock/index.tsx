import React, { useMemo } from 'react';
import { CopyBlock } from 'react-code-blocks';
// import AppMarkdown from './App.md';

interface Props {
  code: string;
  language: 'tsx' | 'jsx' | 'js' | 'ts' | 'html' | 'css';
  showLineNumbers: boolean;
  startingLineNumber?: number;
}

function CodeBlock({
  code,
  language,
  showLineNumbers,
  startingLineNumber = 1,
}: Props) {
  return (
    <CopyBlock
      text={code}
      language={language}
      showLineNumbers={showLineNumbers}
      startingLineNumber={startingLineNumber}
      wrapLines
    />
  );
}

export default CodeBlock;
