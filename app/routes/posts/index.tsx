import {
  Container,
  Heading,
  List,
  ListItem,
} from "@chakra-ui/react";
import { Link, useLoaderData } from "remix";
import { getPosts, Post } from "~/post";

export const loader = async () => {
  return getPosts();
};

export default function Posts() {
  const posts = useLoaderData<Post[]>();

  return (
    <Container>
      <Heading>Posts</Heading>
      <List>
        {posts.map((post) => (
          <ListItem key={post.slug}>
            <Link to={post.slug}>
              {post.title}
            </Link>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
