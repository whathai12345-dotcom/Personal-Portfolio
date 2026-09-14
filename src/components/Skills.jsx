import { useState, useEffect } from "react";

const DEFAULT_SKILLS = [
  { id: 1, name: "HTML", level: "90%", icon: "🌐", type: "skill" },
  { id: 2, name: "CSS", level: "85%", icon: "🎨", type: "skill" },
  { id: 3, name: "JavaScript", level: "80%", icon: "⚡", type: "skill" },
  { id: 4, name: "React", level: "75%", icon: "⚛️", type: "skill" },
  { id: 5, name: "Tailwind CSS", level: "85%", icon: "💨", type: "skill" },
  { id: 6, name: "Python", level: "70%", icon: "🐍", type: "skill" },
  // Tools
  { id: 7, name: "Git & GitHub", level: "85%", icon: "🐙", type: "tool" },
  { id: 8, name: "VS Code", level: "90%", icon: "💻", type: "tool" },
  { id: 9, name: "Postman", level: "80%", icon: "🚀", type: "tool" },
  { id: 10, name: "Figma", level: "70%", icon: "🎯", type: "tool" },
];

function Skills() {
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // "all" | "skill" | "tool"

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_skills");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        setItems(DEFAULT_SKILLS);
      }
    } else {
      setItems(DEFAULT_SKILLS);
      localStorage.setItem("portfolio_skills", JSON.stringify(DEFAULT_SKILLS));
    }
  }, []);

  const displayedItems =
    activeTab === "all"
      ? items
      : items.filter((item) => item.type === activeTab);

  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">
            My abilities
          </p>
          <h2 className="text-4xl font-extrabold sm:text-5xl">
            Skills & Tools
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-600 dark:text-gray-400">
            Technologies, programming languages, and daily workflow tools I use.
          </p>
        </div>

        {/* Tab Filter */}
        <div className="mb-10 flex justify-center gap-3">
          {[
            { label: "All Abilities", value: "all" },
            { label: "Tech Stack & Languages", value: "skill" },
            { label: "Workflow Tools", value: "tool" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                activeTab === tab.value
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid Display */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedItems.map((item) => (
            <div
              key={item.id || item.name}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon || "⚙️"}</span>
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                      {item.type === "tool" ? "Tool" : "Tech Skill"}
                    </span>
                  </div>
                </div>

                <span className="text-sm font-semibold text-indigo-500">
                  {item.level}
                </span>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                  style={{ width: item.level.includes("%") ? item.level : `${item.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;