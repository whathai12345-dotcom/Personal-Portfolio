import { useState, useEffect } from "react";

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
  {
    id: 3,
    title: "Student Information System",
    category: "Java",
    description: "A student management application for managing student information and courses.",
    technologies: ["Java", "MySQL", "Swing"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/",
    demo: "https://example.com",
  },
];

const DEFAULT_SKILLS = [
  { id: 1, name: "HTML", level: "90%", icon: "🌐", type: "skill" },
  { id: 2, name: "CSS", level: "85%", icon: "🎨", type: "skill" },
  { id: 3, name: "JavaScript", level: "80%", icon: "⚡", type: "skill" },
  { id: 4, name: "React", level: "75%", icon: "⚛️", type: "skill" },
  { id: 5, name: "Tailwind CSS", level: "85%", icon: "💨", type: "skill" },
  { id: 6, name: "Python", level: "70%", icon: "🐍", type: "skill" },
  { id: 7, name: "Git & GitHub", level: "85%", icon: "🐙", type: "tool" },
  { id: 8, name: "VS Code", level: "90%", icon: "💻", type: "tool" },
  { id: 9, name: "Postman", level: "80%", icon: "🚀", type: "tool" },
  { id: 10, name: "Figma", level: "70%", icon: "🎯", type: "tool" },
];

/* =========================================================
   1. SKILLS & TOOLS SUB-COMPONENT
========================================================= */
function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({
    name: "",
    level: "80",
    icon: "⚡",
    type: "skill",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_skills");
    if (saved) {
      try {
        setSkills(JSON.parse(saved));
      } catch {
        setSkills(DEFAULT_SKILLS);
      }
    } else {
      setSkills(DEFAULT_SKILLS);
      localStorage.setItem("portfolio_skills", JSON.stringify(DEFAULT_SKILLS));
    }
  }, []);

  function save(updated) {
    setSkills(updated);
    localStorage.setItem("portfolio_skills", JSON.stringify(updated));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formattedLevel = form.level.toString().includes("%")
      ? form.level
      : `${form.level}%`;

    if (editingId) {
      const updated = skills.map((s) =>
        s.id === editingId ? { ...form, id: editingId, level: formattedLevel } : s
      );
      save(updated);
      setEditingId(null);
    } else {
      const newItem = {
        id: Date.now(),
        ...form,
        level: formattedLevel,
      };
      save([...skills, newItem]);
    }

    setForm({ name: "", level: "80", icon: "⚡", type: "skill" });
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      level: item.level.replace("%", ""),
      icon: item.icon,
      type: item.type || "skill",
    });
  }

  function handleDelete(id) {
    if (window.confirm("Remove this skill/tool?")) {
      save(skills.filter((s) => s.id !== id));
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Skills & Tools Management</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Add, adjust proficiency percentage, or delete skills and tools displayed on your portfolio.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
      >
        <h3 className="text-lg font-bold">
          {editingId ? "Edit Skill / Tool" : "Add New Skill or Tool"}
        </h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="text-xs font-semibold text-gray-500">Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Docker, React, Figma"
              className="mt-1 w-full rounded-xl border border-gray-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-700"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500">Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="mt-1 w-full rounded-xl border border-gray-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-900"
            >
              <option value="skill">Tech Skill (Language / Framework)</option>
              <option value="tool">Tool / Workflow Software</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500">
              Proficiency ({form.level.toString().replace("%", "")}%)
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={form.level.toString().replace("%", "")}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
              className="mt-3 w-full accent-indigo-600"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500">Emoji Icon</label>
            <input
              type="text"
              required
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              placeholder="⚡, 🐙, 💻"
              className="mt-1 w-full rounded-xl border border-gray-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-700"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ name: "", level: "80", icon: "⚡", type: "skill" });
              }}
              className="rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700"
          >
            {editingId ? "Save Changes" : "Add Entry"}
          </button>
        </div>
      </form>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
          <thead className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase text-gray-700 dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-300">
            <tr>
              <th className="px-6 py-3">Item</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Proficiency</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {skills.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-400">
                  No skills or tools added yet.
                </td>
              </tr>
            ) : (
              skills.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40">
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <span>{item.icon}</span> {item.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                      {item.type === "tool" ? "Tool" : "Skill"}
                    </span>
                  </td>
                  <td className="px-6 py-4">{item.level}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:underline text-xs font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:underline text-xs font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================
   2. MAIN PROJECT DASHBOARD WITH TAB CONTROLLER & FILE PICKER
========================================================= */
export default function ProjectDashboard() {
  const [activeTab, setActiveTab] = useState("projects"); // "projects" | "skills"

  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewingProject, setViewingProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "React",
    description: "",
    technologies: "",
    image: "",
    github: "",
    demo: "",
  });

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

  function saveToStorage(updated) {
    setProjects(updated);
    localStorage.setItem("portfolio_projects", JSON.stringify(updated));
  }

  // Handle image selection from a file folder & compress it
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Verify file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const img = new Image();
      img.src = uploadEvent.target.result;
      img.onload = () => {
        // Compress and resize image using canvas so it fits smoothly in localStorage
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 900;
        const scaleSize = MAX_WIDTH / img.width;
        
        canvas.width = img.width > MAX_WIDTH ? MAX_WIDTH : img.width;
        canvas.height = img.width > MAX_WIDTH ? img.height * scaleSize : img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert to lightweight JPEG Base64
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.75);
        setFormData((prev) => ({ ...prev, image: compressedBase64 }));
      };
    };
    reader.readAsDataURL(file);
  }

  function handleOpenCreate() {
    setEditingProject(null);
    setFormData({
      title: "",
      category: "React",
      description: "",
      technologies: "",
      image: "",
      github: "",
      demo: "",
    });
    setIsFormOpen(true);
  }

  function handleOpenEdit(project) {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : project.technologies || "",
      image: project.image || "",
      github: project.github || "",
      demo: project.demo || "",
    });
    setIsFormOpen(true);
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const updated = projects.filter((p) => p.id !== id);
      saveToStorage(updated);
      if (viewingProject?.id === id) setViewingProject(null);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const techArray = formData.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingProject) {
      const updated = projects.map((p) =>
        p.id === editingProject.id
          ? {
              ...p,
              title: formData.title,
              category: formData.category,
              description: formData.description,
              technologies: techArray,
              image: formData.image,
              github: formData.github,
              demo: formData.demo,
            }
          : p
      );
      saveToStorage(updated);
    } else {
      const newProject = {
        id: Date.now(),
        title: formData.title,
        category: formData.category,
        description: formData.description,
        technologies: techArray,
        image: formData.image,
        github: formData.github,
        demo: formData.demo,
      };
      saveToStorage([newProject, ...projects]);
    }

    setIsFormOpen(false);
  }

  const categories = ["All", ...new Set(projects.map((p) => p.category).filter(Boolean))];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase()) ||
      project.technologies?.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Navigation Switcher Tabs */}
      <div className="mb-8 flex items-center gap-3 border-b border-gray-200 pb-4 dark:border-gray-800">
        <button
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
            activeTab === "projects"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
              : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
          }`}
        >
          <span>📁</span> Manage Projects
        </button>

        <button
          onClick={() => setActiveTab("skills")}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
            activeTab === "skills"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
              : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
          }`}
        >
          <span>⚡</span> Manage Skills & Tools
        </button>
      </div>

      {/* RENDER VIEW: SKILLS MANAGER */}
      {activeTab === "skills" && <SkillsManager />}

      {/* RENDER VIEW: PROJECTS MANAGER */}
      {activeTab === "projects" && (
        <>
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Project Management</h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Add, update, view, or remove projects visible on your live portfolio.
              </p>
            </div>

            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              <span>➕</span> Add New Project
            </button>
          </div>

          {/* Search & Category Filter */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by title, description, or tech..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 pl-10 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-800 dark:bg-gray-900"
              />
              <span className="absolute left-3.5 top-3 text-gray-400 text-sm">🔍</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                    activeCategory === category
                      ? "bg-indigo-600 text-white"
                      : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Table */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                <thead className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-700 dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-300">
                  <tr>
                    <th className="px-6 py-4">Preview</th>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Technologies</th>
                    <th className="px-6 py-4 text-center">Links</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {filteredProjects.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                        No projects found matching your search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredProjects.map((project) => (
                      <tr key={project.id} className="transition hover:bg-gray-50/50 dark:hover:bg-gray-800/40">
                        <td className="px-6 py-4">
                          <div className="h-12 w-16 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                            {project.image ? (
                              <img
                                src={project.image}
                                alt={project.title}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                  e.currentTarget.nextSibling.style.display = "flex";
                                }}
                              />
                            ) : null}
                            <span className={`text-lg ${project.image ? "hidden" : "flex"}`}>💻</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {project.title}
                          </div>
                          <div className="line-clamp-1 max-w-xs text-xs text-gray-400">
                            {project.description}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                            {project.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {project.technologies?.map((tech) => (
                              <span
                                key={tech}
                                className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-3">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="text-gray-500 hover:text-indigo-600 transition"
                              >
                                GitHub
                              </a>
                            )}
                            {project.demo && (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noreferrer"
                                className="text-indigo-500 hover:text-indigo-600 transition font-medium"
                              >
                                Demo
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setViewingProject(project)}
                              className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                              title="View Details"
                            >
                              👁️ View
                            </button>
                            <button
                              onClick={() => handleOpenEdit(project)}
                              className="rounded-lg p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                              title="Edit Project"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDelete(project.id)}
                              className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                              title="Delete Project"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* MODAL 1: ADD / EDIT PROJECT (WITH FOLDER FILE UPLOAD) */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between border-b pb-3 dark:border-gray-800">
              <h3 className="text-xl font-bold">
                {editingProject ? "Edit Project" : "Create New Project"}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Portfolio Website"
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-transparent px-3.5 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500">
                  Category
                </label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="React, Java, Full Stack..."
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-transparent px-3.5 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700"
                />
              </div>

              {/* FOLDER FILE UPLOAD WITH PREVIEW & REMOVE */}
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500">
                  Project Image
                </label>

                {formData.image ? (
                  <div className="relative mt-2 h-36 w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: "" })}
                      className="absolute right-2 top-2 rounded-lg bg-red-600/90 px-2.5 py-1 text-xs font-semibold text-white shadow hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="mt-1">
                    <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-5 text-center cursor-pointer transition hover:border-indigo-500 hover:bg-gray-50/50 dark:border-gray-700 dark:hover:bg-gray-800/50">
                      <span className="text-2xl mb-1">📁</span>
                      <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        Choose an image from folder
                      </span>
                      <span className="text-xs text-gray-400 mt-0.5">
                        PNG, JPG, WebP up to 5MB
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>

                    {/* Optional URL input as alternative */}
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-gray-400">or paste URL:</span>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://..."
                        className="flex-1 rounded-lg border border-gray-300 bg-transparent px-2.5 py-1 text-xs outline-none focus:border-indigo-500 dark:border-gray-700"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short overview of what the project does..."
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-transparent px-3.5 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  required
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, Tailwind CSS, Vite"
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-transparent px-3.5 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-500">
                    GitHub Link
                  </label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    placeholder="https://github.com/..."
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-transparent px-3.5 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-500">
                    Live Demo Link
                  </label>
                  <input
                    type="url"
                    value={formData.demo}
                    onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                    placeholder="https://..."
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-transparent px-3.5 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700"
                >
                  {editingProject ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: VIEW PROJECT DETAILS */}
      {viewingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">
            {viewingProject.image && (
              <div className="h-44 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={viewingProject.image}
                  alt={viewingProject.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    {viewingProject.category}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold">{viewingProject.title}</h3>
                </div>
                <button
                  onClick={() => setViewingProject(null)}
                  className="text-gray-400 hover:text-gray-600 text-lg"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4">
                <h4 className="text-xs font-semibold uppercase text-gray-500">Description</h4>
                <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {viewingProject.description}
                </p>
              </div>

              <div className="mt-4">
                <h4 className="text-xs font-semibold uppercase text-gray-500">Technologies</h4>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {viewingProject.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4 border-t pt-4 dark:border-gray-800">
                {viewingProject.github && (
                  <a
                    href={viewingProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-gray-600 hover:text-indigo-500 dark:text-gray-300"
                  >
                    GitHub Repository ↗
                  </a>
                )}
                {viewingProject.demo && (
                  <a
                    href={viewingProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Live Demo ↗
                  </a>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setViewingProject(null)}
                  className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}