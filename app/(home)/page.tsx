import prisma from "@/lib/prisma";
import { Flex, Grid, Text, Heading, Container, Box } from "@chakra-ui/react";
import { unstable_cache } from "next/cache";
import NextImage from "next/image";
import NextLink from "next/link";
import slugify from "slugify";
import { Image } from "@chakra-ui/react";

const getPosts = unstable_cache(
  async () => {
    return await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        featuredImageURL: true,
        createdAt: true,
        author: {
          select: {
            name: true,
            username: true,
          },
        },
      },

      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  },
  ["posts"],
  { tags: ["posts"] }
);
export default async function Home() {
  const allPosts = await getPosts();
  return (
    <Container maxW="5xl" padding="1rem">
      <Grid
        divideY={{
          base: "1rem",
          sm: "0",
        }}
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
        ]}
        gap="1rem"
      >
        {allPosts.slice(0, 4).map((post) => (
          <Box
            key={post.id}
            paddingTop={{
              base: "1rem",
              sm: "0",
            }}
          >
            <NextLink
              href={`/${slugify(post.title, {
                replacement: "-",
                remove: undefined,
                lower: true,
                strict: true,
                locale: "vi",
                trim: true,
              })}-${post.id}.html`}
            >
              <Flex position="relative" aspectRatio={16 / 9}>
                <Image asChild alt={post.title} rounded="xl">
                  <NextImage
                    src={post.featuredImageURL || "/no-image.jpg"}
                    alt={post.title}
                    fill
                    unoptimized
                  />
                </Image>
              </Flex>
              <Box spaceY={"0.5rem"}>
                <Heading size="xl">{post.title}</Heading>
                <Text lineClamp={2}>{post.description}</Text>
              </Box>
            </NextLink>
          </Box>
        ))}
      </Grid>
    </Container>
  );
}
