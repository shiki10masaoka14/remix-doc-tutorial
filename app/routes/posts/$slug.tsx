import { Box, Text } from "@chakra-ui/react";
import { LoaderFunction, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { getPost } from "~/post";

export const loader: LoaderFunction = async ({
  params,
}) => {
  invariant(params.slug, "expected params.slug");
  return getPost(params.slug);
};

export default function PostSlug() {
  const post = useLoaderData();
  return (
    <Box dangerouslySetInnerHTML={{ __html: post.html }} />
  );
}
