function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24"
    >

      {/* Background decoration */}
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">

        {/* Text */}
        <div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">
            Welcome to my portfolio
          </p>

          <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">

            Hi, I'm{" "}

            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Hak Hai
            </span>

          </h1>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">

            <a
              href="#projects"
              className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-1 hover:bg-indigo-700"
            >
              View My Projects →
            </a>

            <a
              href="#contact"
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold transition hover:-translate-y-1 hover:border-indigo-500 hover:text-indigo-500 dark:border-gray-700"
            >
              Contact Me
            </a>

          </div>

          {/* Social Links */}
          <div className="mt-10 flex gap-5 text-sm font-medium text-gray-500 dark:text-gray-400">

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-indigo-500"
            >
              GitHub ↗
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-indigo-500"
            >
              LinkedIn ↗
            </a>

          </div>

        </div>

        {/* Profile Image */}
        <div className="flex justify-center md:justify-end">

          <div className="relative">

            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 blur-2xl" />

            <div className="relative h-72 w-72 overflow-hidden rounded-full border-8 border-white shadow-2xl dark:border-gray-800 sm:h-96 sm:w-96">

              <img
                src="mypicture.jpg"
                alt="Hak Hai"
                className="h-full w-full object-cover"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;