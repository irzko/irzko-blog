import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Grid, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { LuMenu } from "react-icons/lu";
import { Avatar } from "../ui/avatar";
import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";

const getCategories = unstable_cache(
  async () => {
    return await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
      },

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

const SideBar = async () => {
  const session = await auth();
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
        <DrawerBody>
          <Grid templateColumns={"repeat(2, 1fr)"}>
            {categories.map((category) => (
              <Link key={category.id} w="full" colorPalette="teal" asChild>
                <NextLink href={`/category/${category.slug}`}>
                  {category.name}
                </NextLink>
              </Link>
            ))}
          </Grid>
        </DrawerBody>
        <DrawerFooter>
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
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};

export default SideBar;
