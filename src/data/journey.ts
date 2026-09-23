export interface WeekJourney {
  weekNumber: string;
  phase: string;
  theme: string;
  badge: string;
  iconName: string;
  tagline: string;
  description: string;
  keyTopics: string[];
  handsOnActivities: string[];
  deliverable: string;
  visualTag: "Discover" | "Build" | "Connect" | "Create";
}

export const learningJourney: WeekJourney[] = [
  {
    weekNumber: "WEEK 01",
    phase: "DISCOVER",
    theme: "Foundation & Computational Thinking",
    badge: "Milestone 01",
    iconName: "Compass",
    tagline: "Unpack the mechanics of intelligent hardware.",
    description: "Students step into the shoes of hardware engineers. They explore electrical circuits, microcontrollers, sensor physics, logic gates, and write their first embedded programs.",
    keyTopics: [
      "Introduction to Robotics, IoT & AI ecosystems",
      "Microcontroller architecture & pinout electronics",
      "Sensor telemetry (ultrasonic, light, sound, IR)",
      "Core programming logic (loops, conditions, variables)",
    ],
    handsOnActivities: [
      "Assembling the base Micro:bit and Super:bit expansion platform",
      "Calibrating real-time analog & digital sensor thresholds",
      "Writing multi-threaded LED matrix telemetry displays",
    ],
    deliverable: "Working Sensor Telemetry Station & Breadboard Controller",
    visualTag: "Discover",
  },
  {
    weekNumber: "WEEK 02",
    phase: "BUILD",
    theme: "Robotics Engineering & Motor Control",
    badge: "Milestone 02",
    iconName: "Cpu",
    tagline: "Assemble mechanical rovers and program movement.",
    description: "Theory turns into kinetic motion. Students construct 4WD wheeled rovers and mechanical gear assemblies, programming dual DC motors, precision servos, and obstacle-avoidance logic.",
    keyTopics: [
      "Mechanical chassis construction & Lego-compatible gearing",
      "H-Bridge DC motor drivers & PWM speed modulation",
      "Closed-loop feedback & ultrasonic distance avoidance",
      "Dual infrared optical line patrol algorithms",
    ],
    handsOnActivities: [
      "Building the Yahboom Super Kit autonomous rover chassis",
      "Programming smooth differential steering & evasive turns",
      "Competing in a time-trial line-following challenge track",
    ],
    deliverable: "Autonomous Multi-Sensor Rover with Obstacle Navigation",
    visualTag: "Build",
  },
  {
    weekNumber: "WEEK 03",
    phase: "CONNECT",
    theme: "IoT Automation & Edge AI Perception",
    badge: "Milestone 03",
    iconName: "Wifi",
    tagline: "Link hardware to networks and give robots visual intelligence.",
    description: "Students wire up miniature smart homes with RFID security and environmental sensors, then transition to computer vision algorithms on the DOFBOT 6-DOF robotic arm.",
    keyTopics: [
      "Internet of Things topologies & data communication",
      "RFID contactless authentication & relay power switching",
      "OpenCV Computer Vision: Color spaces, thresholds & bounding boxes",
      "Robotic arm coordinate spaces and 6-axis servo kinematics",
    ],
    handsOnActivities: [
      "Building the Keyestudio Smart Home automated security lock & alarm",
      "Configuring live environmental monitoring with OLED display",
      "Setting up OpenCV video capture on the DOFBOT robotic arm",
    ],
    deliverable: "Connected Smart Home Station + AI Color Tracking Camera",
    visualTag: "Connect",
  },
  {
    weekNumber: "WEEK 04",
    phase: "CREATE",
    theme: "Capstone Integration, Teamwork & Demo Day",
    badge: "Milestone 04",
    iconName: "Rocket",
    tagline: "Unleash creativity to engineer custom capstone solutions.",
    description: "The culmination of the bootcamp. Teams select a high-impact real-world challenge, design an integrated Robotics + IoT + AI solution, test under pressure, and present live on Demo Day.",
    keyTopics: [
      "End-to-end hardware-software system integration",
      "Iterative engineering debugging & failure analysis",
      "Technical communication, demo pitching & team collaboration",
      "Future pathway planning in Robotics, AI & Engineering",
    ],
    handsOnActivities: [
      "Developing custom capstone projects (e.g. AI Waste Sorting / Smart Ag / Autonomous Patrol)",
      "Peer review, stress testing, and final polish",
      "Live Grand Demo Day presentation to mentors, peers, and parents",
    ],
    deliverable: "Fully Functioning Capstone Invention + Official EDSOLS Certification",
    visualTag: "Create",
  },
];
