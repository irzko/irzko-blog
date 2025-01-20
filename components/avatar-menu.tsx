"use client";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { Avatar } from "./ui/avatar";
import { IconButton } from "@chakra-ui/react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function AvatarMenu() {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <MenuRoot>
          <MenuTrigger display={{ base: "none", md: "block" }} asChild>
            <IconButton variant="subtle" rounded="full">
              <Avatar name={session?.user?.name || session.user?.username} />
            </IconButton>
          </MenuTrigger>
          <MenuContent>
            <MenuItem value="profile" asChild>
              <Link href={`/profile/${session?.user?.username}`}>
                <Avatar name={session?.user?.name || session.user?.username} />{" "}
                {session?.user?.name || session.user?.username}
              </Link>
            </MenuItem>
            <MenuItem value="sign-out" asChild>            
              <Button w="full" variant="ghost" onClick={() => signOut()} color="red">
                Đăng xuất
              </Button>
            </MenuItem>
          </MenuContent>
        </MenuRoot>
      ) : (
        <Button rounded="lg" size="sm" asChild>
          <Link href="/auth/sign-in">Sign in</Link>
        </Button>
      )}
    </>
  );
}
