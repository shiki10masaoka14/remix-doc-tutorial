import {
  ChakraProvider,
  Box,
  Heading,
} from "@chakra-ui/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";

function Document({
  children,
  title = "App title",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        <Meta />
        <title>{title}</title>
        <Links />
        <link rel="shortcut icon" href="/favicon.svg" />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && (
          <LiveReload />
        )}
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <ChakraProvider>
        <Outlet />
      </ChakraProvider>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document
      title={`${caught.status} ${caught.statusText}`}
    >
      <ChakraProvider>
        <Box>
          <Heading as="h1" bg="purple.600">
            [CatchBoundary]: {caught.status}{" "}
            {caught.statusText}
          </Heading>
        </Box>
      </ChakraProvider>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Error!">
      <ChakraProvider>
        <Box>
          <Heading as="h1" bg="blue.500">
            [ErrorBoundary]: There was an error:{" "}
            {error.message}
          </Heading>
        </Box>
      </ChakraProvider>
    </Document>
  );
}
