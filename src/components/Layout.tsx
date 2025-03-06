interface LayoutProps {
  title: string;
  children: any;
}

export const Layout = ({ title, children }: LayoutProps) => {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          src="https://unpkg.com/htmx.org@1.9.10"
          integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
          crossorigin="anonymous"
        ></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body class="bg-gray-50">
        <nav class="bg-white shadow p-4">
          <div class="container mx-auto flex justify-between">
            <a href="/" class="text-xl font-bold">
              Online Store
            </a>
            <div class="space-x-4">
              <a href="/" class="hover:underline">
                Home
              </a>
            </div>
          </div>
        </nav>
        <main class="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
};
