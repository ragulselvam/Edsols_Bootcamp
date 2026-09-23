export interface SkillOutcome {
  id: string;
  name: string;
  category: "Technical" | "Cognitive" | "Collaborative";
  level: string;
  icon: string;
  summary: string;
  realWorldApplication: string;
}

export const skillsData: SkillOutcome[] = [
  {
    id: "programming",
    name: "Programming",
    category: "Technical",
    level: "Core Competency",
    icon: "Code2",
    summary: "Master computational logic, conditional execution, event handlers, loops, and Python/graphical scripting.",
    realWorldApplication: "The foundational syntax of modern software development and automation systems.",
  },
  {
    id: "robotics",
    name: "Robotics Engineering",
    category: "Technical",
    level: "Core Competency",
    icon: "Bot",
    summary: "Understand motor torque, gear trains, chassis dynamics, PWM speed control, and actuator dynamics.",
    realWorldApplication: "Directly applicable to autonomous vehicles, industrial robotics, and aerospace engineering.",
  },
  {
    id: "ai",
    name: "Artificial Intelligence",
    category: "Technical",
    level: "Advanced Skill",
    icon: "BrainCircuit",
    summary: "Work with computer vision (OpenCV), visual contouring, object recognition, and machine learning inference.",
    realWorldApplication: "Powers smart surveillance, automated manufacturing, and modern autonomous robotics.",
  },
  {
    id: "iot",
    name: "IoT & Smart Systems",
    category: "Technical",
    level: "Core Competency",
    icon: "Network",
    summary: "Learn smart device architecture, telemetry protocols, relay actuation, and RFID access security.",
    realWorldApplication: "The backbone of smart cities, automated agriculture, and home automation systems.",
  },
  {
    id: "electronics",
    name: "Circuit & Hardware Design",
    category: "Technical",
    level: "Applied Skill",
    icon: "Zap",
    summary: "Grasp voltage, current, pinout signals, analog-digital conversion, and sensor interfacing.",
    realWorldApplication: "Hardware prototyping, embedded electronics, and consumer device innovation.",
  },
  {
    id: "problem-solving",
    name: "Algorithmic Problem Solving",
    category: "Cognitive",
    level: "Essential Mindset",
    icon: "Lightbulb",
    summary: "Deconstruct complex multi-variable problems into discrete, testable algorithmic steps.",
    realWorldApplication: "High-value skill in computer science, STEM research, and competitive Olympiads.",
  },
  {
    id: "logical-thinking",
    name: "Logical Reasoning",
    category: "Cognitive",
    level: "Essential Mindset",
    icon: "Binary",
    summary: "Develop rigorous mental models for cause-and-effect, state machines, and edge case handling.",
    realWorldApplication: "Critical for mathematical fluency, analytical decision-making, and software debugging.",
  },
  {
    id: "creativity",
    name: "Applied Innovation",
    category: "Cognitive",
    level: "Creative Focus",
    icon: "Sparkles",
    summary: "Invent novel solutions by synthesizing robotics, sensors, and intelligent algorithms.",
    realWorldApplication: "Transforms students from passive tech consumers into active creators and inventors.",
  },
  {
    id: "engineering",
    name: "Engineering Rigor",
    category: "Cognitive",
    level: "Industry Standard",
    icon: "Wrench",
    summary: "Apply iterative design cycles: build, benchmark, fail fast, diagnose root causes, and optimize.",
    realWorldApplication: "The exact engineering methodology utilized at top tech companies and research labs.",
  },
  {
    id: "teamwork",
    name: "Teamwork & Collaboration",
    category: "Collaborative",
    level: "Leadership",
    icon: "Users2",
    summary: "Collaborate in paired programming, divide hardware/software tasks, and resolve technical friction.",
    realWorldApplication: "Essential for modern agile engineering teams, hackathons, and high-impact careers.",
  },
  {
    id: "communication",
    name: "Technical Communication",
    category: "Collaborative",
    level: "Leadership",
    icon: "MessageSquareCode",
    summary: "Articulate engineering decisions, present project demos with clarity, and explain technical trade-offs.",
    realWorldApplication: "Vastly boosts university admissions, science fairs, and entrepreneurial pitches.",
  },
  {
    id: "project-dev",
    name: "End-to-End Project Execution",
    category: "Collaborative",
    level: "Capstone Level",
    icon: "Layers",
    summary: "Manage a project from conceptual wireframe and breadboard prototype to polished working demo.",
    realWorldApplication: "Builds a verified portfolio of physical and digital technology projects.",
  },
];
