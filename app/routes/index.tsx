import { Heading, VStack } from "@chakra-ui/react";
import { Link } from "remix";

export default function Index() {
  return (
    <VStack>
      <Heading>Hello World</Heading>
      <Link to={"/posts"}>Posts</Link>
      <Link to={"/admin"}>Admin</Link>
    </VStack>
  );
}
