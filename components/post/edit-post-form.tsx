"use client";
import { useState } from "react";

import { updatePost } from "@/app/actions";
import { $convertToMarkdownString } from "@lexical/markdown";
import { EditorState } from "lexical";
import { PLAYGROUND_TRANSFORMERS } from "@/components/lexical/plugins/MarkdownTransformers";
import { useCallback } from "react";
import {
  Post,
  TagsOnPosts,
  Tag,
  CategoriesOnPosts,
  Category,
} from "@prisma/client";
import LexicalEditor from "@/components/lexical";

import SelectCategoryModal from "./select-category-modal";
import { Box, Card, Flex, Input, Text } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { Button } from "../ui/button";

function sortCategories(categories: Category[]) {
  const result: string[] = [];
  function addChildren(parentId: string | null) {
    categories
      .filter((category) => category.parentCategoryId === parentId)
      .forEach((category) => {
        result.push(category.id);
        addChildren(category.id);
      });
  }
  addChildren(null);
  return result;
}

export default function EditPostForm({
  categories,
  post,
}: {
  authorId: string;
  categories: Category[];
  post: Post & {
    tags: TagsOnPosts & { tag: Tag }[];
    categories: CategoriesOnPosts & { category: Category }[];
  };
}) {
  const [content, setContent] = useState(post.content);

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
    sortCategories(
      post.categories.map((selectedCategory) => selectedCategory.category)
    )
  );

  const handleChange = useCallback((editorState: EditorState) => {
    editorState.read(() => {
      const markdownText = $convertToMarkdownString(PLAYGROUND_TRANSFORMERS);
      setContent(markdownText);
    });
  }, []);

  return (
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
          formData.append("id", post.id);
          formData.append("categoryIds", JSON.stringify(selectedCategoryIds));
          updatePost(formData);
        }}
      >
        <Box w="full" spaceY="1rem">
          <Field label="Tiêu đề" required>
            <Input
              rounded="lg"
              id="title"
              name="title"
              defaultValue={post.title}
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
                  selectedCategoryIds={selectedCategoryIds}
                  setSelectedCategoryIds={setSelectedCategoryIds}
                />
              </div>
              <Field label="URL hình ảnh" required>
                <Input
                  rounded="lg"
                  defaultValue={post.featuredImageURL}
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
                  defaultValue={post.description}
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
                  defaultValue={post.tags.map((i) => i.tag.name).join(", ")}
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
  );
}
