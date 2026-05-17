import { Github, Linkedin } from "lucide-react";

export const projects = [
  {
    title: "Lex-Chat",
    description: "An end-to-end RAG (Retrieval-Augmented Generation) pipeline for Indian Jurisprudence. Orchestrated using LangChain and ChromaDB vector embeddings to facilitate sub-second semantic retrieval of Supreme Court precedents. The system is deployed locally, ensuring data privacy and sovereignty.",
    tags: ["Python", "NLP", "ChromaDB"],
    link: "https://github.com/Mr-Mamosa/Lex-Chat",
  },
  {
    title: "Lime",
    description: "A statically typed programming language that uses LLVM Lite for Just-In-Time (JIT) compilation. The language is designed for performance and safety, with a focus on systems programming.",
    tags: ["OCaml", "LLVM", "Compilers"],
    link: "https://github.com/Mr-Mamosa/lime",
  },
  {
    title: "PaPaYaa Typing",
    description: "A custom WPM (Words Per Minute) typing test application built with Pygame. It features a real-time WPM counter, accuracy tracking, and a variety of text sources.",
    tags: ["Pygame", "Python", "CLI"],
    link: "https://github.com/Mr-Mamosa/PaPaYaa-Typing",
  },
  {
    title: "LeNet-5 Re-implementation",
    description: "A deterministic reconstruction of the 1998 LeCun architecture using TensorFlow. Developed to analyze the historical efficacy of convolutional kernels and subsampling layers in modern GPU-accelerated environments.",
    tags: ["Deep Learning", "Research"],
    link: "https://github.com/Mr-Mamosa/LeNet-5-Implementation",
  },
  {
    title: "Kisan Valley",
    description: "A modular game engine architecture built on Object-Oriented Programming (OOP) principles. Implements the Observer and Factory design patterns to handle entity-component system (ECS) state management in Python.",
    tags: ["Pygame", "Systems Design"],
    link: "https://github.com/Mr-Mamosa/Kisan-Valley",
  },
  {
    title: "Ethical Hacking Lab",
    description: "A containerized security research environment utilizing Docker and DVWA. Engineered to simulate real-world attack vectors, focusing on XSS payloads and session impersonation for educational vulnerability analysis.",
    tags: ["Security", "Docker"],
    link: "https://github.com/Mr-Mamosa/Ethical-Hacking-Lab",
  },
];

export const socials = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/adnan-revo-a68041325/",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    url: "https://github.com/Mr-Mamosa",
    icon: Github,
  },
];

export const resume = "Not Available";

export const skills = [
  "Python",
  "C",
  "C++",
  "Frontend",
  "Backend",
  "ML",
  "Bash Scripting",
];

export const education = [
    {
        degree: "Bachelor of Technology in Computer Science",
        institution: "VIT Bhopal",
        year: "2021-2025",
        details: "Focus on Artificial Intelligence and Machine Learning. Relevant coursework in Data Structures, Algorithms, and Software Engineering.",
    },
];

export const techStack = [
    { name: "Python", icon: "python" },
    { name: "Linux", icon: "linux" },
    { name: "Vim", icon: "vim" },
    { name: "TensorFlow", icon: "tensorflow" },
    { name: "TypeScript", icon: "typescript" },
    { name: "Next.js", icon: "nextjs" },
    { name: "Go", icon: "go" },
];
