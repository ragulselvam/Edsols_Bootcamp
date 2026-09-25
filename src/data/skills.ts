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
