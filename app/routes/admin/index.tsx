import { Text } from "@chakra-ui/react";
import { Link } from "remix";

export default function AdminIndex() {
  return (
    <Text>
      <Link to="new">Create a New</Link>
    </Text>
    );
}