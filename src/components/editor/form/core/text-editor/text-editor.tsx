import * as React from 'react';
import { EditorState, LexicalEditor } from 'lexical';
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from '@lexical/markdown';

import styles from './text-editor.module.scss';

export type TextEditorProps = {
  label: string;
  markdown: string;
  onChange: (markdown: string) => void;
};

export function TextEditor(props: TextEditorProps) {
  return (
    <div aria-label={props.label}>
      <Input markdown={props.markdown} onChange={props.onChange} />
    </div>
  );
}

type InputProps = {
  markdown: string;
  onChange: (markdown: string) => void;
};

function Input(props: InputProps) {
  const editorConfig: InitialConfigType = React.useMemo(() => {
    return {
      namespace: 'ResuEditor',
      theme: {},
      onError(error: Error) {
        throw error;
      },
      editorState: () => $convertFromMarkdownString(props.markdown, TRANSFORMERS)
    };
  }, []);

  function handleOnChange(editorState: EditorState, editor: LexicalEditor) {
    editorState.read(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS);
      props.onChange(markdown);
    });
  }

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className={styles.container}>
        <RichTextPlugin
          contentEditable={<ContentEditable className={styles.input} />}
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin onChange={handleOnChange} />
      </div>
    </LexicalComposer>
  );
}

function Placeholder() {
  return <div className={styles.placeholder}>Placeholder text</div>;
}
