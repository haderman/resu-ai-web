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
  id: string
  name: string
  label: string
  markdown: string
  onChange: (markdown: string) => void
};

export function TextEditor(props: TextEditorProps) {
  const labelId = React.useMemo(() => `label-${Math.random()}`, []);
  const descriptionId = React.useMemo(() => `description-${Math.random()}`, []);

  return (
    <div className={styles.label}>
      <span aria-label={props.label} id={labelId}>{props.label}:</span>
      <Input
        markdown={props.markdown}
        onChange={props.onChange}
        labelId={labelId}
        descriptionId={descriptionId}
      />
      <Hint id={descriptionId} />
    </div>
  );
}

type InputProps = {
  labelId: string
  descriptionId: string
  markdown: string
  onChange: (markdown: string) => void
};

function Input(props: InputProps) {
  /**
   * I added props.markdown to the dependency array to avoid
   * eslintreact-hooks/exhaustive-deps warning but initialConfig
   * it's just applied only the first time the component is rendered
   *
   * initialConfig: Readonly<InitialConfigType>
   */
  const editorConfig: InitialConfigType = React.useMemo(() => {
    return {
      namespace: 'ResuEditor',
      theme: {},
      onError(error: Error) {
        throw error;
      },
      editorState: () => $convertFromMarkdownString(props.markdown, TRANSFORMERS)
    };
  }, [props.markdown]);

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
          contentEditable={
            <ContentEditable
              className={styles.input}
              ariaLabelledBy={props.labelId}
              ariaDescribedBy={props.descriptionId}
            />
          }
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin ignoreSelectionChange onChange={handleOnChange} />
      </div>
    </LexicalComposer>
  );
}

function Placeholder() {
  return (
    <div className={styles.placeholder} aria-hidden="true">
      Placeholder text
    </div>
  );
}

type HintProps = {
  id: string
};

function Hint(props: HintProps) {
  return (
    <div id={props.id} className={styles.hint}>
      <span>Use <kbd>Cmd</kbd> + <kbd>b</kbd> to <strong>bold</strong>
      and use <kbd>Cmd</kbd> + <kbd>i</kbd> to <i>italic</i></span>
    </div>
  );
}
