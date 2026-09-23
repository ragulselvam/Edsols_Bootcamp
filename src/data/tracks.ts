export interface LearningTrack {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  accentColor: string;
  accentBorder: string;
  accentGlow: string;
  badge: string;
  hardwareName: string;
  hardwareKitId: string;
  hardwareImageUrl: string;
  topics: string[];
  detailedDescription: string;
  coreOutcomes: string[];
  sampleProject: string;
  ctaText: string;
}

export const learningTracks: LearningTrack[] = [
  {
    id: "robotics",
    number: "TRACK 01",
    title: "ROBOTICS",
    shortTitle: "Robotics",
    subtitle: "Build it. Program it. Make it move.",
    accentColor: "from-rose-500 to-pink-600",
    accentBorder: "border-pink-500/40 hover:border-pink-500",
    accentGlow: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.35)]",
    badge: "Hardware & Mechanics",
    hardwareName: "16-in-1 Building:bit Super Kit",
    hardwareKitId: "robotics-kit",
    hardwareImageUrl: "https://cdn.shopify.com/s/files/1/0066/9686/1780/files/Superkit-Yahboom-_1.jpg?v=1684313735",
    topics: [
      "Robotics fundamentals & kinematics",
      "Mechanical construction & gear assemblies",
      "Ultrasonic & infrared sensors",
      "High-torque DC motors & micro-servos",
      "Microcontroller programming & logic",
      "Real-time robot autonomous control",
      "Algorithmic obstacle navigation",
      "Hands-on engineering problem solving",
    ],
    detailedDescription: "Students dive deep into the mechanical, electrical, and computational pillars of robotics. From assembling sturdy chassis and calibrating precision gearboxes to writing autonomous navigation algorithms, students transform raw parts into intelligent moving machines.",
    coreOutcomes: [
      "Master mechanical construction principles & gear ratios",
      "Program autonomous obstacle avoidance algorithms",
      "Build infrared line-following rovers and robotic cranes",
      "Debug hardware circuits and sensor telemetry in real time",
    ],
    sampleProject: "Autonomous Multi-Terrain Rover with Ultrasonic Mapping",
    ctaText: "Explore Robotics →",
  },
  {
    id: "iot",
    number: "TRACK 02",
    title: "IoT",
    shortTitle: "Internet of Things",
    subtitle: "Connect the physical world.",
    accentColor: "from-cyan-500 to-blue-600",
    accentBorder: "border-cyan-500/40 hover:border-cyan-500",
    accentGlow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.35)]",
    badge: "Connected Devices & Automation",
    hardwareName: "World of Module Sensor Suite",
    hardwareKitId: "iot-kit",
    hardwareImageUrl: "https://cdn.shopify.com/s/files/1/0066/9686/1780/products/1_f3ce7858-a59f-499e-8aa1-267ecf932afb.jpg?v=1667217844",
    topics: [
      "Internet of Things architecture",
      "Smart devices & microcontrollers",
      "PIR motion & environmental sensors",
      "Relay switches & smart home automation",
      "Micro:bit embedded ecosystem",
      "Smart security & RFID gate access",
      "Data telemetry & wireless connectivity",
      "Embedded firmware logic",
    ],
    detailedDescription: "Bridge physical objects with intelligent digital logic. Students construct an interactive miniature smart home, integrating RFID door locks, automated climate controls, solar tracking arrays, and safety gas alarms to understand how smart cities operate.",
    coreOutcomes: [
      "Architect smart home automation routines and triggers",
      "Deploy environmental monitoring stations with live LCD readouts",
      "Implement secure RFID contactless authentication systems",
      "Understand cloud connectivity, packet telemetry, and remote relays",
    ],
    sampleProject: "Smart Eco-Home with RFID Access & Climate Control Mesh",
    ctaText: "Explore IoT →",
  },
  {
    id: "ai",
    number: "TRACK 03",
    title: "AI",
    shortTitle: "Artificial Intelligence",
    subtitle: "Teach machines to see, think and act.",
    accentColor: "from-fuchsia-500 to-purple-600",
    accentBorder: "border-fuchsia-500/40 hover:border-fuchsia-500",
    accentGlow: "group-hover:shadow-[0_0_30px_rgba(217,70,239,0.35)]",
    badge: "Computer Vision & Kinematics",
    hardwareName: "DOFBOT AI Robotic Arm",
    hardwareKitId: "ai-kit",
    hardwareImageUrl: "https://cdn.shopify.com/s/files/1/0066/9686/1780/files/DOFBOT-PI-_1.jpg?v=1684314188",
    topics: [
      "AI & Machine Learning fundamentals",
      "OpenCV Computer Vision concepts",
      "Robotics + AI physical embodiment",
      "Intelligent coordinate control & targeting",
      "Real-time visual object sorting",
      "Robotic arm inverse kinematics",
      "Python programming & AI libraries",
      "Hands-on AI-powered capstone projects",
    ],
    detailedDescription: "Give robots human-like perception. Working with the 6-DOF industrial DOFBOT arm, students program computer vision models to identify colors, recognize human gestures, detect objects, and manipulate items with surgical precision using inverse kinematics.",
    coreOutcomes: [
      "Process live video streams with OpenCV filters & contours",
      "Program 6-axis robotic arm inverse kinematics in Python",
      "Build gesture-controlled robotic manipulation pipelines",
      "Train visual classifiers for automated assembly & sorting",
    ],
    sampleProject: "AI Vision Color & Shape Sorting Industrial Robotic Station",
    ctaText: "Explore AI →",
  },
];
