import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import {
  ActionFunction,
  Form,
  redirect,
  useActionData,
  useTransition,
} from "remix";
import invariant from "tiny-invariant";
import { createPost } from "~/post";

type PostError = {
  title?: boolean;
  slug?: boolean;
  markdown?: boolean;
};

export const action: ActionFunction = async ({
  request,
}) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  const errors: PostError = {};
  !title && (errors.title = true);
  !slug && (errors.slug = true);
  !markdown && (errors.markdown = true);

  if (Object.keys(errors).length) {
    return errors;
  }

  invariant(typeof title === "string");
  invariant(typeof slug === "string");
  invariant(typeof markdown === "string");
  await createPost({ title, slug, markdown });

  return redirect("/admin");
};

export default function NewPost() {
  const errors = useActionData();
  const transition = useTransition();

  return (
    <Form method="post">
      <FormControl>
        <FormLabel>
          Post Title:{" "}
          {errors?.title ? (
            <Text>Title is required</Text>
          ) : null}
          <Input w={300} />
        </FormLabel>
      </FormControl>
      <FormControl>
        <FormLabel>
          Post Slug:{" "}
          {errors?.slug ? (
            <Text>Slug is required</Text>
          ) : null}
          <Input w={300} />
        </FormLabel>
      </FormControl>
      <FormControl>
        <FormLabel>Markdown: </FormLabel>
        {errors?.markdown ? (
          <Text>Markdown is required</Text>
        ) : null}
        <Textarea />
      </FormControl>
      <Button type="submit">
        {transition.submission
          ? "Creating..."
          : "Create Post"}
      </Button>
    </Form>
  );
}
