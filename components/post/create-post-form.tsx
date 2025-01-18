"use client";
import { useState } from "react";
import { createPost } from "@/app/actions";
import { $convertToMarkdownString } from "@lexical/markdown";
import { PLAYGROUND_TRANSFORMERS } from "@/components/lexical/plugins/MarkdownTransformers";
import { EditorState } from "lexical";

import { useCallback } from "react";
import LexicalEditor from "@/components/lexical";
import { Category } from "@prisma/client";

import SelectCategoryModal from "./select-category-modal";
import { Box, Card, Flex, Input, Text } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { Button } from "../ui/button";

export default function CreatePostForm({
  authorId,
  categories,
}: {
  authorId: string;
  categories: Category[];
}) {
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategoryIds] = useState<string[]>([]);

  const handleChange = useCallback((editorState: EditorState) => {
    editorState.read(() => {
      const markdownText = $convertToMarkdownString(PLAYGROUND_TRANSFORMERS);
      setContent(markdownText);
    });
  }, []);

  return (
    <>
      <Flex
        direction={{
          md: "row",
          base: "column",
        }}
        asChild
        justifyContent="center"
        w="full"
        maxWidth="1024px"
        padding="1rem"
        gap="1rem"
      >
        <form
          action={(formData) => {
            formData.append("content", content);
            formData.append("authorId", authorId);
            formData.append("categoryIds", JSON.stringify(selectedCategory));
            createPost(formData);
          }}
        >
          <Box w="full" spaceY="1rem">
            <Field label="Tiêu đề" required>
              <Input
                rounded="lg"
                id="title"
                name="title"
                placeholder="Nhập tiêu đề"
                autoComplete="off"
              />
            </Field>
            <div>
              <Text marginBottom="0.5rem" fontSize="0.875rem">
                Nội dung
              </Text>
              <LexicalEditor onChange={handleChange} />
            </div>
          </Box>
          <Box
            w={{
              md: "24rem",
              base: "full",
            }}
            className="md:w-96 w-full space-y-4"
          >
            <Card.Root shadow="none">
              <Card.Body padding="1rem" spaceY="1rem">
                <div>
                  <p className="text-sm mb-2">Danh mục</p>
                  <SelectCategoryModal
                    categories={categories}
                    selectedCategoryIds={selectedCategory}
                    setSelectedCategoryIds={setSelectedCategoryIds}
                  />
                </div>
                <Field label="URL hình ảnh" required>
                  <Input
                    rounded="lg"
                    id="featuredImageURL"
                    name="featuredImageURL"
                    placeholder="Nhập URL hình ảnh tiêu biểu"
                    autoComplete="off"
                  />
                </Field>

                <Field label="Mô tả" required>
                  <Input
                    rounded="lg"
                    id="description"
                    name="description"
                    placeholder="Nhập mô tả"
                    autoComplete="off"
                  />
                </Field>

                <Field label="Thẻ bài viết" required>
                  <Input
                    rounded="lg"
                    id="tags"
                    name="tagNames"
                    placeholder="Nhập thẻ bài viết"
                    autoComplete="off"
                  />
                </Field>
              </Card.Body>
              <Card.Footer padding="1rem">
                <Button w="full" rounded="lg" variant="solid" color="primary">
                  Đăng
                </Button>
              </Card.Footer>
            </Card.Root>
          </Box>
        </form>
      </Flex>
    </>
  );
}
