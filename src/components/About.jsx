function About() {
  return (
    <section
      id="about"
      className="bg-gray-50 px-6 py-24 dark:bg-gray-900/40"
    >

      <div className="mx-auto max-w-7xl">

        <div className="mb-12 text-center">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">
            Get to know me
          </p>

          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            About Me
          </h2>

        </div>

        <div className="grid items-center gap-12 md:grid-cols-2">

          <div>

            <h3 className="text-3xl font-bold">
              I love building things for the web.
            </h3>

            <p className="mt-6 leading-8 text-gray-600 dark:text-gray-400">
              I'm a student and aspiring frontend developer
              interested in creating beautiful and functional
              websites.
            </p>

            <p className="mt-4 leading-8 text-gray-600 dark:text-gray-400">
              I enjoy learning new technologies, solving problems,
              and improving my coding skills through real projects.
            </p>

            <a
              href="#contact"
              className="mt-8 inline-block font-semibold text-indigo-500 hover:text-indigo-600"
            >
              Let's work together →
            </a>

          </div>

          {/* Information Cards */}
          <div className="grid gap-4 sm:grid-cols-2">

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

              <div className="mb-4 text-3xl">🎓</div>

              <h3 className="font-bold">Education</h3>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Royal University of Phnom Penh
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

              <div className="mb-4 text-3xl">💻</div>

              <h3 className="font-bold">Development</h3>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                React and modern web technologies
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

              <div className="mb-4 text-3xl">🚀</div>

              <h3 className="font-bold">Goal</h3>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Become a professional developer
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

              <div className="mb-4 text-3xl">🌱</div>

              <h3 className="font-bold">Learning</h3>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Always improving my skills
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default About;