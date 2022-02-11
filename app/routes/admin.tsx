import { Box, Heading, HStack } from "@chakra-ui/react";
import { Link, Outlet, useLoaderData } from "remix";
import { getPosts, Post } from "~/post";

export const loader = async () => {
  return getPosts();
};

export default function Admin() {
  const posts = useLoaderData<Post[]>();

  return (
    <Box>
      <Heading>Admin</Heading>
      <HStack spacing={10}>
        {posts.map((post) => (
          <Link key={post.slug} to={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        ))}
      </HStack>
      <Outlet />
    </Box>
  );
}
