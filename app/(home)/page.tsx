import prisma from "@/lib/prisma";
import { Card, Flex, Grid, Text, Heading, Container } from "@chakra-ui/react";
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
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
        ]}
        gap="1rem"
      >
        {allPosts.slice(0, 4).map((post) => (
          <NextLink
            key={post.id}
            href={`/${slugify(post.title, {
              replacement: "-",
              remove: undefined,
              lower: true,
              strict: true,
              locale: "vi",
              trim: true,
            })}-${post.id}.html`}
          >
            <Card.Root
              height="100%"
              border="none"
              overflow="hidden"
              cursor="pointer"
            >
              <Card.Header padding={0}>
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
              </Card.Header>
              <Card.Body padding="1rem">
                <Heading size="xl">{post.title}</Heading>
                <Text lineClamp={2}>{post.description}</Text>
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card.Root>
          </NextLink>
        ))}
      </Grid>
    </Container>
  );
}
