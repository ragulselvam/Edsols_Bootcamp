export interface ProjectItem {
  id: string;
  title: string;
  category: "Robotics" | "IoT" | "AI";
  shortDescription: string;
  difficulty: "Foundation" | "Intermediate" | "Advanced";
  hardware: string;
  duration: string;
  highlights: string[];
  imageUrl: string;
  badgeColor: string;
}

export const projectsData: ProjectItem[] = [
  // Robotics Projects
  {
    id: "proj-robo-1",
    title: "Autonomous Obstacle Avoider Rover",
    category: "Robotics",
    shortDescription: "Construct a 4-wheel drive rover that dynamically maps distances using ultrasonic telemetry to calculate escape trajectories.",
    difficulty: "Foundation",
    hardware: "Super:bit Kit + Ultrasonic Array",
    duration: "Week 1–2",
    highlights: ["Real-time distance thresholding", "Differential steering drive", "Collision-free path planning"],
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  },
  {
    id: "proj-robo-2",
    title: "High-Speed Infrared Line Tracking Bot",
    category: "Robotics",
    shortDescription: "Program closed-loop proportional control algorithms to trace complex track lines at high velocity with zero derailment.",
    difficulty: "Intermediate",
    hardware: "Super:bit + Dual IR Sensors",
    duration: "Week 2",
    highlights: ["Analog sensor calibration", "Proportional line following", "Intersection state logic"],
    imageUrl: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  },
  {
    id: "proj-robo-3",
    title: "Motorized Cable Gripper Crane",
    category: "Robotics",
    shortDescription: "Build a multi-gear ratio mechanical hoist with servo claw to lift, transport, and deposit payloads into designated zones.",
    difficulty: "Intermediate",
    hardware: "Structural Bricks + Dual Servos + Micro:bit",
    duration: "Week 2",
    highlights: ["Gear reduction torque physics", "Winch spool mechanics", "Wireless remote dispatch"],
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  },

  // IoT Projects
  {
    id: "proj-iot-1",
    title: "Connected Smart Home Security Matrix",
    category: "IoT",
    shortDescription: "Build a model home with RFID badge door access, PIR intruder alarm, and automated relay-driven interior lighting.",
    difficulty: "Foundation",
    hardware: "Smart Home Kit + RFID Module",
    duration: "Week 2–3",
    highlights: ["RFID cryptographic UID check", "PIR motion sensor interrupts", "AC/DC relay circuit safety"],
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  },
  {
    id: "proj-iot-2",
    title: "Eco Climate & Air Quality Telemetry Station",
    category: "IoT",
    shortDescription: "Collect live temperature, humidity, and volatile gas metrics displayed on an I2C OLED display with buzzer thresholds.",
    difficulty: "Intermediate",
    hardware: "Gas & Climate Sensors + OLED",
    duration: "Week 3",
    highlights: ["I2C bus communications", "Multi-sensor telemetry aggregation", "Autonomous alarm triggers"],
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  },
  {
    id: "proj-iot-3",
    title: "Auto-Retracting Rain & Solar Energy Tracker",
    category: "IoT",
    shortDescription: "Implement dual light-dependent resistors to track the sun and a moisture sensor that automatically retracts solar panels in storms.",
    difficulty: "Advanced",
    hardware: "Dual LDRs + Moisture Sensor + Servo",
    duration: "Week 3",
    highlights: ["Differential light tracking math", "Analog moisture resistance", "Environmental resilience logic"],
    imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  },

  // AI Projects
  {
    id: "proj-ai-1",
    title: "DOFBOT AI Real-Time Color Sorting Arm",
    category: "AI",
    shortDescription: "Program OpenCV color segmentation to detect colored cubes in a video stream and coordinate 6-axis inverse kinematics to sort them.",
    difficulty: "Advanced",
    hardware: "DOFBOT 6-DOF Arm + HD AI Camera",
    duration: "Week 3–4",
    highlights: ["HSV color-space calibration", "6-DOF inverse kinematics", "Closed-loop visual grasping"],
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    badgeColor: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30",
  },
  {
    id: "proj-ai-2",
    title: "Spatial Gesture & Hand Mimicry Interface",
    category: "AI",
    shortDescription: "Detect 21 hand landmarks from an RGB camera feed and map finger positions to the DOFBOT robotic manipulator in real-time.",
    difficulty: "Advanced",
    hardware: "DOFBOT Arm + Python AI Vision Pipeline",
    duration: "Week 4",
    highlights: ["Hand skeleton landmark tracking", "Joint angle transformation", "Sub-50ms latency actuation"],
    imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80",
    badgeColor: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30",
  },
  {
    id: "proj-ai-3",
    title: "Intelligent Autonomous Sentry & Face Tracker",
    category: "AI",
    shortDescription: "Deploy Haar cascades / SSD neural models to track human faces in 3D space, orienting camera pan-tilt axes to maintain focus.",
    difficulty: "Advanced",
    hardware: "AI Vision Module + Pan-Tilt Servo Base",
    duration: "Week 4",
    highlights: ["Real-time facial bounding boxes", "PID tracking centering loop", "Active target acquisition"],
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    badgeColor: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30",
  },
];
