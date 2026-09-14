import { useState, useEffect } from "react";

// Fallback seed data if storage is empty
const INITIAL_PROJECTS = [
  {
    id: 1,
    title: "Pizza Shop Website",
    category: "React",
    description: "A modern pizza ordering website with menu browsing and checkout.",
    technologies: ["React", "Tailwind CSS", "JavaScript"],
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/",
    demo: "https://example.com",
  },
  {
    id: 2,
    title: "Cryptography Project",
    category: "JavaScript",
    description: "A web application for encryption and decryption using different cipher methods.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/",
    demo: "https://example.com",
  },
];

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_projects");
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch {
        setProjects(INITIAL_PROJECTS);
      }
    } else {
      setProjects(INITIAL_PROJECTS);
      localStorage.setItem("portfolio_projects", JSON.stringify(INITIAL_PROJECTS));
    }
  }, []);

  // Dynamically extract distinct categories based on existing project data
  const categories = ["All", ...new Set(projects.map((p) => p.category).filter(Boolean))];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section id="projects" className="bg-gray-50 px-6 py-24 dark:bg-gray-900/40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">
            My work
          </p>
          <h2 className="text-4xl font-extrabold sm:text-5xl">Featured Projects</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
            Some projects I have built while learning and developing my programming skills.
          </p>
        </div>

        {/* Dynamic Category Filter Buttons */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                filter === category
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-600 hover:bg-indigo-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
            >
              {/* Project Image Preview Header */}
              <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling.style.display = "flex";
                    }}
                  />
                ) : null}

                {/* Fallback Display if no image URL is provided or if it breaks */}
                <div
                  className={`h-full w-full items-center justify-center text-5xl transition group-hover:scale-105 ${
                    project.image ? "hidden" : "flex"
                  }`}
                >
                  💻
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm font-semibold text-indigo-500">{project.category}</p>
                <h3 className="mt-2 text-xl font-bold">{project.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="mt-6 flex gap-5 text-sm font-semibold">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-600 hover:text-indigo-500 dark:text-gray-300"
                    >
                      GitHub ↗
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-500 hover:text-indigo-600"
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;