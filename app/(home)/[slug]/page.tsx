import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import remarkGfm from "remark-gfm";
import emoji from "remark-emoji";
import supersub from "remark-supersub";
import remarkComment from "remark-comment";
import remarkIns from "remark-ins";
import Image from "next/image";
import Link from "next/link";
import rehypeHighlight from "rehype-highlight";
import remarkFlexibleMarkers from "remark-flexible-markers";
import remarkFlexibleContainers from "remark-flexible-containers";
import {
  MDXComponents,
  MDXRemote,
  type MDXRemoteOptions,
} from "next-mdx-remote-client/rsc";
import { Suspense } from "react";
import slugify from "slugify";
import { Metadata } from "next";
import { Em, Flex, Heading, Stack, VStack } from "@chakra-ui/react";
import { BreadcrumbLink, BreadcrumbRoot } from "@/components/ui/breadcrumb";
import { Blockquote } from "@/components/ui/blockquote";

const getPost = unstable_cache(
  async (id: string) => {
    return await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  },
  ["posts"],
  { tags: ["posts"] }
);

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
    },
  });
  return posts.map((post) => ({
    slug:
      slugify(post.title, {
        replacement: "-",
        remove: undefined,
        lower: true,
        strict: true,
        locale: "vi",
        trim: true,
      }) +
      "-" +
      post.id +
      ".html",
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  // fetch data
  const id = slug.split(".")[0].split("-").pop() || "";

  const post = await getPost(id);

  return {
    title: post ? post.title : "No title",
    // openGraph: {
    //   images: ["/some-specific-page-image.jpg", ...previousImages],
    // },
  };
}

const components: MDXComponents = {
  h1({ children }) {
    return (
      <Heading as="h1" size="4xl">
        {children}
      </Heading>
    );
  },
  h2({ children }) {
    return (
      <Heading as="h2" size="3xl">
        {children}
      </Heading>
    );
  },
  h3({ children }) {
    return (
      <Heading as="h3" size="2xl">
        {children}
      </Heading>
    );
  },
  h4({ children }) {
    return (
      <Heading as="h4" size="xl">
        {children}
      </Heading>
    );
  },
  h5({ children }) {
    return (
      <Heading as="h5" size="lg">
        {children}
      </Heading>
    );
  },

  h6({ children }) {
    return (
      <Heading as="h6" size="xl">
        {children}
      </Heading>
    );
  },
  strong({ children }) {
    return <strong className="font-bold">{children}</strong>;
  },
  u({ children }) {
    return <u className="underline">{children}</u>;
  },
  em({ children }) {
    return <Em>{children}</Em>;
  },
  // p({ children }) {
  //   return <p className="text-gray-500">{children}</p>;
  // },
  blockquote({ children }) {
    return <Blockquote>{children}</Blockquote>;
  },

  img({ alt, src }) {
    return (
      <Image
        width={0}
        height={0}
        alt={alt || ""}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        src={src || "./no-image.jpg"}
        className="rounded-lg"
      />
    );
  },
  table({ children }) {
    return (
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          {children}
        </table>
      </div>
    );
  },
  thead({ children }) {
    return (
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        {children}
      </thead>
    );
  },
  th({ children }) {
    return (
      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {children}
      </th>
    );
  },
  td({ children }) {
    return <td className="px-6 py-4">{children}</td>;
  },
  tr({ children }) {
    return <tr className="border-b">{children}</tr>;
  },
  ul({ children }) {
    return (
      <ul className="space-y-1 text-gray-500 list-disc list-inside">
        {children}
      </ul>
    );
  },
  ol({ children }) {
    return (
      <ol className="space-y-1 text-gray-500 list-decimal list-inside">
        {children}
      </ol>
    );
  },
  li({ children }) {
    return <li>{children}</li>;
  },
  a({ href, children }) {
    return (
      <Link
        className="font-medium text-blue-600 hover:underline"
        href={href || ""}
      >
        {children}
      </Link>
    );
  },
  hr() {
    return <hr className="h-px my-8 bg-gray-200 border-0" />;
  },
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const postId = slug.split(".")[0].split("-").pop();

  if (!postId) {
    return null;
  }
  const post = await getPost(postId);

  if (!post) {
    return (
      <main>
        <h2>404</h2>
      </main>
    );
  }

  const options: MDXRemoteOptions = {
    mdxOptions: {
      rehypePlugins: [[rehypeHighlight]],
      remarkPlugins: [
        [remarkGfm, { singleTilde: false }],
        [emoji, { emoticon: true }],
        [supersub],
        [remarkIns],
        [remarkFlexibleMarkers],
        [remarkFlexibleContainers],
        [remarkComment],
      ],
    },
    // parseFrontmatter: true,
  };

  const breadcrumbs = post.categories.map((c) => ({
    id: c.category.id,
    name: c.category.name,
    href: `/category/${c.category.slug}`,
  }));
  return (
    <VStack>
      <Flex
        gap="1rem"
        direction={{
          base: "column",
          md: "row",
        }}
        maxWidth="1024px"
        width="100%"
      >
        <Flex direction="column" gap="1rem">
          <BreadcrumbRoot
            backgroundColor={{
              base: "white",
              _dark: "black",
            }}
            borderYWidth={1}
            position="sticky"
            top="4rem"
            paddingY="0.5rem"
            paddingX="1rem"
          >
            {breadcrumbs.map((b) => (
              <BreadcrumbLink key={b.id} href={b.href}>
                {b.name}
              </BreadcrumbLink>
            ))}
          </BreadcrumbRoot>
          <Stack paddingX="1rem">
            <Heading as="h1" size="4xl">
              {post.title || "(No title)"}
            </Heading>
            <p>
              {new Date(post.createdAt).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>

            <p className="font-semibold">{post.description}</p>
            <Suspense fallback={<div>Loading...</div>}>
              <MDXRemote
                source={post.content}
                options={options}
                components={components}
              />
            </Suspense>
          </Stack>
        </Flex>
        <Stack
          bgColor={"gray.100"}
          width={{
            base: "100%",
            md: "32rem",
          }}
        >
          fe
        </Stack>
      </Flex>
    </VStack>
  );
}
