import resume from "./data/resume.json";
export { resume };
export const links = {
  linkedin: resume.basics.profiles.find(
    (profile) => profile.network === "LinkedIn",
  ).url,
  github: "https://github.com/lucasguenebaud",
  email: `mailto:${resume.basics.email}`,
};
export const capabilities = [
  {
    number: "01",
    title: "Data platforms that last",
    description:
      "From legacy pipelines to governed lakehouses. I build the foundations that make data reliable, accessible and useful.",
    skills: [
      "Python",
      "SQL",
      "Spark",
      "Databricks",
      "Delta Lake",
      "Unity Catalog",
    ],
  },
  {
    number: "02",
    title: "Engineering for production",
    description:
      "Versioned contracts, automated quality checks and observable pipelines. Engineering practices that keep teams confident as systems grow.",
    skills: ["AWS", "GCP", "Airflow", "dbt", "Docker", "GitHub Actions"],
  },
  {
    number: "03",
    title: "AI beyond the prototype",
    description:
      "Working with data scientists to bring models into production, with evaluation, tracing and guardrails for agentic workflows.",
    skills: ["MLflow", "PyTorch", "Vertex AI", "Kubeflow", "Agent evaluation"],
  },
];
export const experienceNotes = {
  "Decathlon-2023": {
    focus: "Cloud-native data & lakehouse modernization",
    tags: ["AWS", "Databricks", "Delta Lake", "Python", "Spark"],
  },
  "Matmut-2022": {
    focus: "Data engineering meets MLOps",
    tags: ["GCP", "Cloudera", "Vertex AI", "Airflow", "MLflow"],
  },
  "Renault-2021": {
    focus: "Embedded intelligence & technical leadership",
    tags: ["AI architecture", "Agile delivery", "Azure DevOps", "GitLab"],
  },
  "Renault-2018": {
    focus: "Making autonomous-vehicle data useful",
    tags: ["Python", "SQL", "Spark", "Kubernetes", "Bokeh"],
  },
  "Renault-2017": {
    focus: "Where it started: autonomous systems",
    tags: ["C++", "Docker", "SCANeR", "Simulation"],
  },
};
