/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";
import { useLexicalEditable } from "@lexical/react/useLexicalEditable";
import { useSharedHistoryContext } from "./context/SharedHistoryContext";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { $convertFromMarkdownString } from "@lexical/markdown";
import { PLAYGROUND_TRANSFORMERS } from "@/components/lexical/plugins/MarkdownTransformers";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { useState } from "react";
import ImagesPlugin from "./plugins/ImagesPlugin";
import LinkPlugin from "./plugins/LinkPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import ActionsPlugin from "./plugins/ActionsPlugin";
import { Box, Card, Text } from "@chakra-ui/react";

const placeholder = "Hãy bắt đầu viết...";

export default function Editor({ markdown }: { markdown?: string }) {
  const [editor] = useLexicalComposerContext();
  const { historyState } = useSharedHistoryContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const isEditable = useLexicalEditable();
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  console.log(isLinkEditMode);
  if (markdown) {
    editor.update(() => {
      $convertFromMarkdownString(markdown, PLAYGROUND_TRANSFORMERS);
    });
  }

  return (
    <Card.Root shadow="none">
      <Card.Header borderBottomWidth="0.8px" padding="0.5rem">
        <ToolbarPlugin
          editor={editor}
          activeEditor={activeEditor}
          setActiveEditor={setActiveEditor}
          setIsLinkEditMode={setIsLinkEditMode}
        />
      </Card.Header>
      <Card.Body w="full">
        <HistoryPlugin externalHistoryState={historyState} />
        <MarkdownShortcutPlugin transformers={PLAYGROUND_TRANSFORMERS} />
        <Box position="relative">
          <RichTextPlugin
            contentEditable={
              <Box
                display="block"
                w="full"
                position="relative"
                minHeight="10rem"
                outline="none"
                fontSize="0.875rem"
                border="0"
                overflow="auto"
                focusRing="0"
                asChild
              >
                <ContentEditable
                  aria-placeholder={placeholder}
                  placeholder={
                    <Text
                      position="absolute"
                      fontSize="0.875rem"
                      top={0}
                      textOverflow="ellipsis"
                      userSelect="none"
                      pointerEvents="none"
                      display="inline"
                    >
                      {placeholder}
                    </Text>
                  }
                />
              </Box>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />

          <ListPlugin />
          <LinkPlugin hasLinkAttributes={false} />
          <ClickableLinkPlugin disabled={isEditable} />
          <CodeHighlightPlugin />
          <CheckListPlugin />
          <TablePlugin
            hasCellMerge={true}
            hasCellBackgroundColor={true}
            hasTabHandler={true}
          />
          <ImagesPlugin />
          <AutoFocusPlugin />
        </Box>
      </Card.Body>
      <Card.Footer>
        <ActionsPlugin shouldPreserveNewLinesInMarkdown={false} />
      </Card.Footer>
    </Card.Root>
  );
}
