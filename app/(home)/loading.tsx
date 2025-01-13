import { Container, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Container position="absolute" inset={0}>
      <Spinner
        size="md"
        color={{
          base: "black",
          _dark: "white",
        }}
      />
    </Container>
  );
}
