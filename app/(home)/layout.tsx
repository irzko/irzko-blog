import { Flex } from "@chakra-ui/react/flex";
import Link from "next/link";
import { Heading, Input } from "@chakra-ui/react";
import { Silkscreen } from "next/font/google";
import { InputGroup } from "@/components/ui/input-group";
import { ColorModeButton } from "@/components/ui/color-mode";
import SideBar from "@/components/sidebar";
// import AvatarMenu from "@/components/avatar-menu";

const silkscreen = Silkscreen({
  weight: ["400"],
  subsets: ["latin"],
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Flex
        position="sticky"
        inset="0"
        zIndex="40"
        backgroundColor={{
          base: "white",
          _dark: "black",
        }}
        height="auto"
        justifyContent="center"
        alignItems="center"
        // shadow="sm"
      >
        <Flex
          paddingX="1rem"
          justifyContent="space-between"
          width="full"
          height="4rem"
          gap="1rem"
          maxWidth="1024px"
          alignItems="center"
        >
          <Flex gapX="1rem">
            <Link href="/">
              <Heading
                whiteSpace="nowrap"
                className={`${silkscreen.className}`}
                size="2xl"
              >
                irzko
              </Heading>
            </Link>
          </Flex>
          <Flex gap="0.5rem" alignItems="center">
            <InputGroup
              hideBelow="md"
              startElement={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  fill={"none"}
                >
                  <path
                    d="M17.5 17.5L22 22"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            >
              <Input
                rounded="xl"
                ps="2.5rem"
                variant="subtle"
                placeholder="Tìm kiếm"
              />
            </InputGroup>
            <ColorModeButton />
            {/* <AvatarMenu /> */}
            <SideBar />
          </Flex>
        </Flex>
      </Flex>
      {children}
    </>
  );
}
