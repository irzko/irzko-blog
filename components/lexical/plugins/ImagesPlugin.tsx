/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $wrapNodeInElement, mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand,
  LexicalEditor,
} from "lexical";
import { useEffect, useRef, useState } from "react";
import * as React from "react";

import { $createImageNode, ImageNode, ImagePayload } from "../nodes/ImageNode";
import { Button } from "@/components/ui/button";
import { IconButton, Input } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";

export type InsertImagePayload = Readonly<ImagePayload>;

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
  createCommand("INSERT_IMAGE_COMMAND");

export function InsertImageDialog({
  activeEditor,
}: {
  activeEditor: LexicalEditor;
}): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const hasModifier = useRef(false);
  const [src, setSrc] = useState("");
  const [altText, setAltText] = useState("");

  const isDisabled = src === "";

  useEffect(() => {
    hasModifier.current = false;
    const handler = (e: KeyboardEvent) => {
      hasModifier.current = e.altKey;
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [activeEditor]);

  const onClick = (payload: InsertImagePayload) => {
    activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
    setOpen(false);
  };

  return (
    <>
      <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogTrigger asChild>
          <IconButton
            rounded="lg"
            variant="ghost"
            onClick={() => setOpen(true)}
            size="sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={20}
              height={20}
              fill={"none"}
            >
              <circle
                cx="7.5"
                cy="7.5"
                r="1.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M5 21C9.37246 15.775 14.2741 8.88406 21.4975 13.5424"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </IconButton>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chèn ảnh</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Field label="Image URL">
              <Input
                placeholder="i.e. https://source.unsplash.com/random"
                onChange={(e) => setSrc(e.target.value)}
                value={src}
                data-test-id="image-modal-url-input"
              />
            </Field>
            <Field label="Alt Text">
              <Input
                placeholder="Random unsplash image"
                onChange={(e) => setAltText(e.target.value)}
                value={altText}
                data-test-id="image-modal-alt-text-input"
              />
            </Field>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Huỷ</Button>
            </DialogActionTrigger>
            <Button
              color="primary"
              disabled={isDisabled}
              onClick={() => onClick({ altText, src })}
            >
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
      {/* <InsertImageUriDialogBody onClick={onClick} /> */}
    </>
  );
}

export default function ImagesPlugin({
  captionsEnabled,
}: {
  captionsEnabled?: boolean;
}): React.JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagesPlugin: ImageNode not registered on editor");
    }

    return mergeRegister(
      editor.registerCommand<InsertImagePayload>(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload);
          $insertNodes([imageNode]);
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
          }

          return true;
        },
        COMMAND_PRIORITY_EDITOR
      )
    );
  }, [captionsEnabled, editor]);

  return null;
}

const TRANSPARENT_IMAGE =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

if (typeof document !== "undefined") {
  const img = document.createElement("img");
  img.src = TRANSPARENT_IMAGE;
}
