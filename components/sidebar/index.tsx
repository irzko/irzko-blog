// import { auth } from "@/auth";
// import { Button } from "@/components/ui/button";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  // DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Box, Grid, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { LuMenu } from "react-icons/lu";
// import { Avatar } from "../ui/avatar";
import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { findChildCategories } from "@/lib/findChildCategories";
import { Category } from "@prisma/client";

const getCategories = unstable_cache(
  async () => {
    return await prisma.category.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  },
  ["categories"],
  { tags: ["categories"] }
);

const ChildCategories = ({
  categories,
  parentId,
}: {
  categories: Category[];
  parentId: string;
}) => {
  const childCategories = findChildCategories(categories, parentId);
  return (
    <>
      {childCategories.map((category) => (
        <Link key={category.id} w="full" asChild>
          <NextLink href={`/category/${category.slug}`}>
            {category.name}
          </NextLink>
        </Link>
      ))}
    </>
  );
};

const SideBar = async () => {
  // const session = await auth();
  const categories = await getCategories();
  return (
    <DrawerRoot>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <IconButton rounded="lg" variant="ghost" size="sm">
          <LuMenu />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent roundedLeft="2xl">
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <DrawerBody autoFocus={false}>
          <Grid templateColumns={"repeat(2, 1fr)"} gap="1rem">
            {categories.map((category) => (
              <Box key={category.id}>
                <Link
                  w="full"
                  fontWeight="bold"
                  // focusRing="none"
                  colorPalette="teal"
                  asChild
                >
                  <NextLink href={`/category/${category.slug}`}>
                    {category.name}
                  </NextLink>
                </Link>
                <ChildCategories
                  categories={categories}
                  parentId={category.id}
                />
              </Box>
            ))}
          </Grid>
        </DrawerBody>
        {/* <DrawerFooter>
          {session ? (
            <Button
              rounded="lg"
              variant="ghost"
              w="full"
              justifyContent="start"
              padding="0.5rem"
              h="auto"
              asChild
            >
              <NextLink href={`/profile/${session?.user?.username}`}>
                <Avatar name={session?.user?.name || session.user?.username} />{" "}
                {session?.user?.name || session.user?.username}
              </NextLink>
            </Button>
          ) : (
            <Button rounded="lg" size="sm" asChild>
              <NextLink href="/auth/sign-in">Sign in</NextLink>
            </Button>
          )}
        </DrawerFooter> */}
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};

export default SideBar;
