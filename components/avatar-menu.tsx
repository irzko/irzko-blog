import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { Avatar } from "./ui/avatar";
import { IconButton } from "@chakra-ui/react";
import { auth, signOut } from "@/auth";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function AvatarMenu() {
  const session = await auth();
  return (
    <>
      {session ? (
        <MenuRoot>
          <MenuTrigger asChild>
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
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <Button type="submit" w="full" variant="ghost" color="red">
                  Sign out
                </Button>
              </form>
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
