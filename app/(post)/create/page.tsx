import CreatePostForm from "@/components/post/create-post-form";
import { auth } from "@/auth";
import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { Container } from "@chakra-ui/react";

const getCategories = unstable_cache(
  async () => {
    return await prisma.category.findMany({
      orderBy: [
        {
          name: "asc",
        },
      ],
    });
  },
  ["categories"],
  { tags: ["categories"] }
);
export default async function Page() {
  const categories = await getCategories();
  const session = await auth();

  if (!session?.user) return null;

  return (
    <Container maxW="5xl" padding="1rem">
      <CreatePostForm
        authorId={session.user.id as string}
        categories={categories}
      />
    </Container>
  );
}
