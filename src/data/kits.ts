export interface KitComponent {
  name: string;
  category: string;
  description: string;
}

export interface HardwareKit {
  id: string;
  track: "Robotics" | "IoT" | "AI";
  name: string;
  fullName: string;
  manufacturer: string;
  tagline: string;
  badge: string;
  image: string;
  fallbackImage: string;
  referenceUrl: string;
  overview: string;
  specs: { label: string; value: string }[];
  highlightFeatures: string[];
  components: KitComponent[];
  whatStudentsLearn: string[];
}

export const hardwareKits: HardwareKit[] = [
  {
    id: "robotics-kit",
    track: "Robotics",
    name: "Yahboom 16-in-1 Building:bit Super Kit",
    fullName: "Yahboom 16-in-1 Building:bit Super Kit for BBC Micro:bit V2 / V1.5",
    manufacturer: "Yahboom",
    tagline: "Precision Mechanical Engineering & Programmable Micro:bit Robotics",
    badge: "Track 01 Core Hardware",
    image: "https://cdn.shopify.com/s/files/1/0066/9686/1780/files/Superkit-Yahboom-_1.jpg?v=1684313735",
    fallbackImage: "https://cdn.shopify.com/s/files/1/0066/9686/1780/files/Superkit-Yahboom-_1.jpg?v=1684313735",
    referenceUrl: "https://category.yahboom.net/products/buildingbit-super-kit",
    overview: "An all-in-one STEM robotics kit combining 350+ Lego-compatible precision building blocks, the Super:bit multi-functional motor expansion board, ultrasonic distance sensor, infrared tracking module, and RGB lighting. Students construct and program 16+ creative robotic structures including rovers, robotic limbs, forklifts, obstacle-avoiding cars, and automatic gates.",
    specs: [
      { label: "Core Controller", value: "BBC Micro:bit V2 + Super:bit Expansion" },
      { label: "Motor Drivers", value: "4-Channel DC Motor + 8-Channel Servo Ports" },
      { label: "Sensors Included", value: "RGB Ultrasonic, Dual IR Line Patrol, Light & Sound" },
      { label: "Power System", value: "3.7V 18650 Rechargeable Li-ion Battery" },
      { label: "Programming", value: "MakeCode Graphical Blocks + MicroPython" },
    ],
    highlightFeatures: [
      "350+ high-precision Lego-compatible mechanical bricks for 16+ robotic designs",
      "Super:bit expansion board drives up to 8 servos & 4 DC motors simultaneously",
      "RGB glowing ultrasonic sensor for millimeter-accuracy obstacle detection",
      "Dual infrared tracking array for autonomous race line navigation",
      "Wireless Bluetooth & 2.4G mobile app / joystick remote control capability",
    ],
    components: [
      { name: "Super:bit Expansion Board", category: "Microcontroller Hub", description: "Drives up to 8 servos and 4 motors simultaneously with built-in buzzer and RGB LEDs." },
      { name: "350+ Structural Building Bricks", category: "Mechanics", description: "Precision structural elements, gears, axles, and linkages to construct rovers, cranes, and robotic arms." },
      { name: "Building Block Motors & Servos", category: "Actuation", description: "Geared high-efficiency DC motors and precision positioning servos." },
      { name: "RGB Ultrasonic Sensor", category: "Telemetry", description: "Measures distances with millimeter accuracy and displays dynamic LED feedback." },
      { name: "Line Following Board", category: "Navigation", description: "Dual-channel high-sensitivity infrared optical sensor for path patrol." },
    ],
    whatStudentsLearn: [
      "Mechanical leverage, gear ratios, torque, and chassis stability",
      "Sensor signal conditioning, calibration, and threshold detection",
      "Closed-loop feedback control and autonomous obstacle avoidance",
      "Event-driven programming and state machine architecture",
    ],
  },
  {
    id: "iot-kit",
    track: "IoT",
    name: "Yahboom World of Module Sensor Suite",
    fullName: "Yahboom World of Module Programmable Sensor & IoT Kit for Micro:bit V2",
    manufacturer: "Yahboom",
    tagline: "Connected Sensor Networks, Smart Home & Environmental IoT Telemetry",
    badge: "Track 02 Core Hardware",
    image: "https://cdn.shopify.com/s/files/1/0066/9686/1780/products/1_f3ce7858-a59f-499e-8aa1-267ecf932afb.jpg?v=1667217844",
    fallbackImage: "https://cdn.shopify.com/s/files/1/0066/9686/1780/products/1_f3ce7858-a59f-499e-8aa1-267ecf932afb.jpg?v=1667217844",
    referenceUrl: "https://category.yahboom.net/products/wom-sensor-kit-microbit",
    overview: "An extensive physical Internet-of-Things suite packed with over 20+ sensor modules, including RFID smart locks, PIR human motion detectors, flame & gas sensors, sound & light sensors, soil moisture telemetry, OLED display, and relay controllers. Enables students to build real smart home and connected city prototypes.",
    specs: [
      { label: "Controller Support", value: "BBC Micro:bit V2 + Sensor Expansion Shield" },
      { label: "Sensor Ecosystem", value: "20+ Modular Sensors & Actuators" },
      { label: "Connectivity", value: "Wireless Radio, Bluetooth BLE, Serial Telemetry" },
      { label: "Display & Audio", value: "I2C 128x64 OLED + Digital Buzzer" },
      { label: "Automation", value: "Optically Isolated Relays, RFID, Servo Gates" },
    ],
    highlightFeatures: [
      "RFID contactless card authentication for intelligent access control systems",
      "PIR pyroelectric motion sensor for automated intruder alerts & smart lighting",
      "Comprehensive environmental monitoring (temperature, humidity, air quality & gas)",
      "Automated moisture sensing with motorized solar/rain tracking mechanisms",
      "I2C graphic OLED display for real-time live sensor telemetry dashboards",
    ],
    components: [
      { name: "RFID Security Module", category: "Access Control", description: "Contactless identity authentication for intelligent smart locks and gates." },
      { name: "PIR Pyroelectric Sensor", category: "Motion Detection", description: "Infrared human detection for smart lighting and security intrusion alerts." },
      { name: "Gas & Climate Sensor", category: "Environmental", description: "Monitors volatile gas thresholds, temperature, and ambient humidity." },
      { name: "Opto-Isolated Relay", category: "Power Actuation", description: "Switches external AC/DC loads and smart lighting circuits safely." },
      { name: "I2C OLED Display Module", category: "Data Display", description: "Visualizes real-time sensor parameters, graphs, and system states." },
    ],
    whatStudentsLearn: [
      "IoT network architectures, bus protocols (I2C, GPIO, UART), and data transmission",
      "Sensor telemetry data logging and environmental threshold automation",
      "Access control cryptography basics and RFID identification logic",
      "Smart home energy management, circuit isolation, and safety relays",
    ],
  },
  {
    id: "ai-kit",
    track: "AI",
    name: "Yahboom DOFBOT AI Vision Robotic Arm",
    fullName: "Yahboom DOFBOT 6-DOF AI Vision Robotic Arm Platform with ROS2 & Python",
    manufacturer: "Yahboom",
    tagline: "Edge AI, OpenCV Computer Vision & Kinematic Manipulation",
    badge: "Track 03 Core Hardware",
    image: "https://cdn.shopify.com/s/files/1/0066/9686/1780/files/DOFBOT-PI-_1.jpg?v=1684314188",
    fallbackImage: "https://cdn.shopify.com/s/files/1/0066/9686/1780/files/DOFBOT-PI-_1.jpg?v=1684314188",
    referenceUrl: "https://category.yahboom.net/products/dofbot-pi",
    overview: "An industrial-grade 6-DOF all-aluminum robotic arm powered by high-torque digital bus servos and an HD AI camera. Features real-time OpenCV computer vision, forward and inverse kinematics algorithms, color tracking, gesture mimicry, face recognition, and ROS2 Python SDK integration.",
    specs: [
      { label: "Degrees of Freedom", value: "6-Axis Full Articulation + Precision Claw" },
      { label: "Actuators", value: "6x 15KG High-Torque Serial Bus Servos" },
      { label: "Vision System", value: "HD Camera with 120° Wide-Angle Lens" },
      { label: "Construction", value: "Full All-Aluminum Anodized Heavy-Duty Alloy" },
      { label: "Software Stack", value: "Python 3, OpenCV 4, ROS2 Humble, MediaPipe" },
    ],
    highlightFeatures: [
      "Real-time OpenCV visual color recognition and automatic cube sorting",
      "AI 21-point hand landmark gesture tracking and real-time mimicry",
      "Face detection and autonomous tracking with spatial coordinate targeting",
      "Inverse kinematics (IK) calculations for millimeter-precision pick-and-place",
      "Professional Python API & Jupyter Notebook interactive robotic development",
    ],
    components: [
      { name: "6-DOF Aluminum Armature", category: "Mechanics", description: "Heavy-duty CNC machined alloy structure with smooth multi-axis articulation." },
      { name: "15KG Serial Bus Servos", category: "Precision Actuation", description: "Digital high-torque servos with real-time angle feedback and overload protection." },
      { name: "AI Vision Camera Module", category: "Perception", description: "High-frame-rate visual capture system for neural net & OpenCV processing." },
      { name: "Inverse Kinematics Engine", category: "Computation", description: "Translates 3D Cartesian coordinates (X, Y, Z) to individual joint angles." },
      { name: "Industrial Gripper End-Effector", category: "Tooling", description: "Custom claw with silicone pads for manipulating blocks, tools, and industrial parts." },
    ],
    whatStudentsLearn: [
      "Computer vision fundamentals (HSV color filtering, contour detection, morphological ops)",
      "Robotic arm kinematics (Euler angles, forward and inverse coordinate calculations)",
      "Machine learning inference for human hand gesture and pose classification",
      "Industrial automation pipelines, ROS2 fundamentals, and smart factory sorting logic",
    ],
  },
  {
    id: "rosmaster-x3",
    track: "Robotics",
    name: "Yahboom ROSMASTER X3 ROS2 Robot",
    fullName: "Yahboom ROSMASTER X3 ROS2 AI Voice & Vision Robot with Mecanum Omnidirectional Wheels",
    manufacturer: "Yahboom",
    tagline: "Omnidirectional Mobile Base, LiDAR SLAM & Autonomous Navigation",
    badge: "Advanced Robotics Platform",
    image: "https://cdn.shopify.com/s/files/1/0066/9686/1780/products/ROSMASTER_X3-1.jpg?v=1744704874",
    fallbackImage: "https://cdn.shopify.com/s/files/1/0066/9686/1780/products/ROSMASTER_X3-1.jpg?v=1744704874",
    referenceUrl: "https://category.yahboom.net/products/rosmaster-x3",
    overview: "A professional educational mobile robot with 4-wheel independent Mecanum drive for 360° omnidirectional movement, high-precision YDLIDAR laser radar for real-time 2D/3D SLAM mapping, depth camera for visual navigation, and ROS2 Python programming.",
    specs: [
      { label: "Chassis Drive", value: "4-Wheel Independent Mecanum Omnidirectional" },
      { label: "LiDAR Navigation", value: "360° Laser Radar TOF (8-meter range)" },
      { label: "Perception", value: "Depth Camera + AI Voice Interaction" },
      { label: "Controller", value: "Raspberry Pi 5 / Jetson Compatible" },
      { label: "Algorithms", value: "Cartographer SLAM, TEB Navigation, ROS2" },
    ],
    highlightFeatures: [
      "360° omnidirectional Mecanum drive for smooth translation and in-place rotation",
      "High-precision laser LiDAR for indoor SLAM mapping and dynamic obstacle avoidance",
      "ROS2 Humble architecture with Python 3 nodes and visualization tools",
      "Multi-modal AI voice interaction and real-time vision target tracking",
      "Heavy-duty aluminum alloy chassis with integrated battery management system",
    ],
    components: [
      { name: "YDLIDAR Laser Radar", category: "LiDAR Sensing", description: "360-degree high-frequency optical scanning for point-cloud environment mapping." },
      { name: "Mecanum Wheels & Motors", category: "Drive System", description: "Four independent high-speed encoder motors for vector movement in any direction." },
      { name: "Depth Vision Camera", category: "3D Perception", description: "Measures visual depth planes for 3D obstacle avoidance and object targeting." },
      { name: "Robotics Power System", category: "Power Board", description: "Multi-cell high-discharge Li-ion power supply with voltage protection circuits." },
    ],
    whatStudentsLearn: [
      "SLAM (Simultaneous Localization and Mapping) concepts and point-cloud navigation",
      "ROS2 topic publish-subscribe architecture and action server design",
      "Omnidirectional kinematics and velocity vector calculations",
      "Sensor fusion between LiDAR, IMU gyroscopes, and wheel encoders",
    ],
  },
  {
    id: "tinybit-pro",
    track: "Robotics",
    name: "Yahboom Tiny:bit Pro AI Visual Car",
    fullName: "Yahboom Tiny:bit Pro AI Visual Smart Robot Car with Micro:bit",
    manufacturer: "Yahboom",
    tagline: "Compact Visual AI, Line Patrol & Acoustic Sensing",
    badge: "Starter Robotics Kit",
    image: "https://cdn.shopify.com/s/files/1/0066/9686/1780/files/TinybitPro_Yahboom_01_39a670c4-b683-4429-8396-f5c5192b8983.jpg?v=1693885187",
    fallbackImage: "https://cdn.shopify.com/s/files/1/0066/9686/1780/files/TinybitPro_Yahboom_01_39a670c4-b683-4429-8396-f5c5192b8983.jpg?v=1693885187",
    referenceUrl: "https://category.yahboom.net/products/tinybit-pro",
    overview: "A nimble, highly integrated robotics platform equipped with an AI vision camera module, ultrasonic sensor, IR tracking array, buzzer, and programmable RGB lights. Ideal for younger engineers exploring computer vision, traffic sign recognition, and path following.",
    specs: [
      { label: "Microcontroller", value: "BBC Micro:bit V2" },
      { label: "Vision Processing", value: "Dedicated AI Camera Module" },
      { label: "Chassis", value: "Integrated PCB Chassis with High-Speed Motors" },
      { label: "Lighting & Audio", value: "Full-Color RGB LEDs + Piezo Buzzer" },
      { label: "Control Modes", value: "IR Remote, Bluetooth App & Autonomous" },
    ],
    highlightFeatures: [
      "Built-in AI camera for color tracking, AprilTag & road sign recognition",
      "High-speed precision tracking sensors for challenging circuit paths",
      "Ultrasonic distance sensing with animated RGB headlight response",
      "Graphical MakeCode block programming and MicroPython support",
      "Compact all-in-one chassis ready to program out of the box",
    ],
    components: [
      { name: "AI Visual Camera", category: "Perception", description: "On-board visual chip for real-time shape and color classification." },
      { name: "Ultrasonic Module", category: "Distance Sensor", description: "Detects front obstacles with glowing RGB illumination." },
      { name: "Dual IR Patrol Sensor", category: "Navigation", description: "High-frequency ground sensors for high-speed line tracing." },
      { name: "Smart Motor Drive", category: "Actuation", description: "Precision DC motors with smooth PWM speed regulation." },
    ],
    whatStudentsLearn: [
      "Visual sign recognition and autonomous vehicle rule logic",
      "Proportional line-following control loops",
      "Ultrasonic safety braking and distance maintenance",
      "Mobile app telemetry and remote dashboard building",
    ],
  },
  {
    id: "dogzilla-lite",
    track: "Robotics",
    name: "Yahboom DOGZILLA-Lite AI Robot Dog",
    fullName: "Yahboom DOGZILLA-Lite AI Multimodal Quadruped Bionic Robot Dog",
    manufacturer: "Yahboom",
    tagline: "15-DOF Bionic Gait Kinematics & Multimodal AI Interaction",
    badge: "Bionic Quadruped Platform",
    image: "https://cdn.shopify.com/s/files/1/0066/9686/1780/files/YahboomDOGZILLA-Lite_1.jpg?v=1749009848",
    fallbackImage: "https://cdn.shopify.com/s/files/1/0066/9686/1780/files/YahboomDOGZILLA-Lite_1.jpg?v=1749009848",
    referenceUrl: "https://category.yahboom.net/products/dogzilla-lite",
    overview: "A desktop-level 15-DOF bionic robot dog equipped with 12 high-precision metal servos in its quadruped legs plus a 3-DOF robotic arm on its back. Supports dynamic trot gaits, self-balancing, face tracking, gesture control, and Python programming.",
    specs: [
      { label: "Degrees of Freedom", value: "15-DOF (12-DOF Legs + 3-DOF Robotic Arm)" },
      { label: "Actuation", value: "15x Metal Gear High-Speed Digital Servos" },
      { label: "Camera", value: "Wide-Angle HD AI Vision Camera" },
      { label: "Bionic Gaits", value: "Trot, Walk, Crawl, Self-Righting Balance" },
      { label: "Control", value: "Python 3 SDK, OpenCV Vision, App Remote" },
    ],
    highlightFeatures: [
      "12-DOF bionic leg linkage system for agile multi-terrain quadruped walking",
      "Integrated 3-DOF robotic arm for picking and placing objects on the move",
      "AI vision for human following, gesture recognition, and obstacle jumping",
      "IMU gyroscope balancing algorithms for dynamic posture stability",
      "Full Python SDK for custom gait programming and inverse kinematics",
    ],
    components: [
      { name: "Quadruped 12-DOF Skeleton", category: "Bionics", description: "Lightweight aluminum-alloy leg linkages for natural bionic movement." },
      { name: "Metal-Gear Bus Servos", category: "High-Torque Actuation", description: "Fast-response digital servos capable of rapid gait transitions." },
      { name: "3-DOF Arm End-Effector", category: "Manipulation", description: "Articulated gripping claw mounted on the robot dog chassis." },
      { name: "IMU Balance Unit", category: "Telemetry", description: "Real-time posture feedback for dynamic stability on uneven surfaces." },
    ],
    whatStudentsLearn: [
      "Quadruped biological gait mechanics (duty cycles, phase coordination, trot gaits)",
      "Center-of-mass balance algorithms and IMU sensor fusion",
      "Coordinate kinematics for multi-leg motion planning",
      "Combining mobile bionics with computer vision targeting",
    ],
  },
];
