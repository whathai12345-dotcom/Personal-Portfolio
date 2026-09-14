function Footer() {
  return (
    <footer className="border-t border-gray-200 px-6 py-8 dark:border-gray-800">

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Hak Hai. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm text-gray-500">

          <a
            href="#home"
            className="transition hover:text-indigo-500"
          >
            Back to top ↑
          </a>

          <a
            href="#contact"
            className="transition hover:text-indigo-500"
          >
            Contact
          </a>

        </div>

      </div>

    </footer>
  );
}

export default Footer;