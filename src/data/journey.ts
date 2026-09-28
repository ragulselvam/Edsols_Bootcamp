export type TechnologyTrackKey = 'microbit' | 'iot' | 'aiRobotics';

export interface WeekJourney {
  week: string;
  weekNumber: string;
  phase: 'DISCOVER' | 'BUILD' | 'CONNECT' | 'CREATE';
  title: string;
  theme: string;
  badge: string;
  iconName: string;
  tagline: string;
  description: string;
  activities: string[];
  handsOnActivities: string[];
  keyTopics: string[];
  deliverable: string;
  visualTag: 'Discover' | 'Build' | 'Connect' | 'Create';
}

export interface TechnologyPlan {
  id: TechnologyTrackKey;
  title: string;
  badge: string;
  trackSubtitle: string;
  ageTrack: string;
  description: string;
  weeks: WeekJourney[];
}

export const technologyPlans: Record<TechnologyTrackKey, TechnologyPlan> = {
  microbit: {
    id: 'microbit',
    title: 'Micro:bit',
    badge: 'Ages 6+ Track',
    trackSubtitle: 'Foundational Electronics & Block Coding',
    ageTrack: 'Ages 6+',
    description: 'Beginner-friendly physical computing with BBC Micro:bit V2, Super:bit expansion, interactive sensors, motors, and autonomous mechanical builds.',
    weeks: [
      {
        week: 'Week 1',
        weekNumber: 'WEEK 01',
        phase: 'DISCOVER',
        title: 'Micro:bit Foundations & Visual Block Coding',
        theme: 'Micro:bit Foundations & Visual Block Coding',
        badge: 'Milestone 01',
        iconName: 'Compass',
        tagline: 'Unpack the mechanics of intelligent microcontrollers.',
        description: 'Young innovators step into hardware engineering. They master the Micro:bit V2 board, explore 5x5 LED matrix displays, push buttons, tilt sensors, and write their first embedded programs.',
        keyTopics: [
          'Micro:bit V2 architecture & built-in sensor array',
          'MakeCode visual block programming & algorithmic logic',
          'Accelerometer, compass, and sound sensor telemetry',
          'Microcontroller pinout & circuit electronics fundamentals',
        ],
        activities: [
          'Unboxing Micro:bit V2 and setting up MakeCode environment',
          'Programming interactive LED pixel animations & name badges',
          'Building a shake-controlled digital dice and step counter game',
        ],
        handsOnActivities: [
          'Unboxing Micro:bit V2 and setting up MakeCode environment',
          'Programming interactive LED pixel animations & name badges',
          'Building a shake-controlled digital dice and step counter game',
        ],
        deliverable: 'Interactive Smart Badge & Shake-to-Play Micro Game',
        visualTag: 'Discover',
      },
      {
        week: 'Week 2',
        weekNumber: 'WEEK 02',
        phase: 'BUILD',
        title: 'Super:bit Expansion & Motor Mechanics',
        theme: 'Super:bit Expansion & Motor Mechanics',
        badge: 'Milestone 02',
        iconName: 'Cpu',
        tagline: 'Connect motors, servos, and construct kinetic machines.',
        description: 'Theory turns into kinetic motion. Students interface the Super:bit expansion board to drive DC motors and precision servos, constructing geared Lego-compatible mechanical rovers.',
        keyTopics: [
          'Super:bit motor expansion interface & pinout control',
          'DC motor drivers & Pulse Width Modulation (PWM) speed tuning',
          '180° and 360° servo calibration for robotic steering',
          'Mechanical gear ratios and torque principles',
        ],
        activities: [
          'Interfacing Super:bit board with dual high-torque DC motors',
          'Calibrating precision steering servos with MakeCode block code',
          'Building the 16-in-1 motorized rover chassis and gear assembly',
        ],
        handsOnActivities: [
          'Interfacing Super:bit board with dual high-torque DC motors',
          'Calibrating precision steering servos with MakeCode block code',
          'Building the 16-in-1 motorized rover chassis and gear assembly',
        ],
        deliverable: 'Dual-Motor Rover with Programmable Steering & Speed Control',
        visualTag: 'Build',
      },
      {
        week: 'Week 3',
        weekNumber: 'WEEK 03',
        phase: 'CONNECT',
        title: 'Ultrasonic Sonar & Wireless Radio Remote',
        theme: 'Ultrasonic Sonar & Wireless Radio Remote',
        badge: 'Milestone 03',
        iconName: 'Wifi',
        tagline: 'Give rovers sensory vision and wireless remote control.',
        description: 'Expanding the rover with ultrasonic sonar sensors for obstacle avoidance, infrared optical tracking for path following, and 2.4GHz peer-to-peer radio remote communication.',
        keyTopics: [
          'Ultrasonic distance sensing & real-time echo calculation',
          'Dual infrared reflectance tracking for line patrol tracks',
          'Micro:bit 2.4GHz radio frequency packet communication',
          'Event-driven remote controller code architecture',
        ],
        activities: [
          'Wiring ultrasonic sonar eyes and programming evasive maneuvers',
          'Calibrating IR line tracking sensors for autonomous speed racing',
          'Pairing two Micro:bit devices as wireless transmitter and rover receiver',
        ],
        handsOnActivities: [
          'Wiring ultrasonic sonar eyes and programming evasive maneuvers',
          'Calibrating IR line tracking sensors for autonomous speed racing',
          'Pairing two Micro:bit devices as wireless transmitter and rover receiver',
        ],
        deliverable: 'Autonomous Obstacle-Navigating Rover + Wireless Handheld Controller',
        visualTag: 'Connect',
      },
      {
        week: 'Week 4',
        weekNumber: 'WEEK 04',
        phase: 'CREATE',
        title: 'Creative Capstone Invention & Grand Demo Day',
        theme: 'Creative Capstone Invention & Grand Demo Day',
        badge: 'Milestone 04',
        iconName: 'Rocket',
        tagline: 'Unleash creativity to engineer custom capstone solutions.',
        description: 'Teams apply everything learned to create an original inventive prototype—such as an automated pet feeder, smart alarm safe, or rescue rover—and present to parents on Demo Day.',
        keyTopics: [
          'End-to-end hardware-software integration & iterative testing',
          'Mechanical stability, wire management & battery optimization',
          'Technical communication, project pitching & teamwork',
          'Transition pathways to Python and applied AI engineering',
        ],
        activities: [
          'Designing and building custom team capstone invention prototypes',
          'Stress-testing obstacle algorithms and servo mechanics',
          'Live Demo Day showcase presentation to mentors, peers, and parents',
        ],
        handsOnActivities: [
          'Designing and building custom team capstone invention prototypes',
          'Stress-testing obstacle algorithms and servo mechanics',
          'Live Demo Day showcase presentation to mentors, peers, and parents',
        ],
        deliverable: 'Fully Functional Micro:bit Capstone Prototype + Official Certification',
        visualTag: 'Create',
      },
    ],
  },

  iot: {
    id: 'iot',
    title: 'IoT',
    badge: 'Connected Systems',
    trackSubtitle: 'Smart Home Automation & Sensor Networks',
    ageTrack: 'Ages 6+ & 12+',
    description: 'Practical IoT engineering with the World of Module sensor suite, RFID security access, smart relays, environmental OLED telemetry, and wireless automation.',
    weeks: [
      {
        week: 'Week 1',
        weekNumber: 'WEEK 01',
        phase: 'DISCOVER',
        title: 'Sensor Physics & Environmental Telemetry',
        theme: 'Sensor Physics & Environmental Telemetry',
        badge: 'Milestone 01',
        iconName: 'Compass',
        tagline: 'Capture and visualize real-time physical environments.',
        description: 'Students explore the sensory foundation of the Internet of Things. They interface analog and digital sensors—temperature, humidity, light, flame, and sound—monitoring real-time physical metrics.',
        keyTopics: [
          'IoT architecture: Edge nodes, sensor inputs & data protocols',
          'Analog-to-Digital Conversion (ADC) and calibration curves',
          'I2C bus protocol & OLED digital display drivers',
          'Threshold alert logic and multi-sensor data fusion',
        ],
        activities: [
          'Wiring DHT environmental sensors and calibrated photoresistors',
          'Programming real-time telemetry metrics on miniature OLED displays',
          'Building an automatic ambient brightness lamp with threshold triggers',
        ],
        handsOnActivities: [
          'Wiring DHT environmental sensors and calibrated photoresistors',
          'Programming real-time telemetry metrics on miniature OLED displays',
          'Building an automatic ambient brightness lamp with threshold triggers',
        ],
        deliverable: 'Live Multi-Sensor Environmental Telemetry Station',
        visualTag: 'Discover',
      },
      {
        week: 'Week 2',
        weekNumber: 'WEEK 02',
        phase: 'BUILD',
        title: 'RFID Access Control & High-Power Relays',
        theme: 'RFID Access Control & High-Power Relays',
        badge: 'Milestone 02',
        iconName: 'Cpu',
        tagline: 'Authenticate users and control high-power smart actuators.',
        description: 'Moving from passive monitoring to active smart control. Students interface contactless 13.56MHz RFID cards, optical motion detectors, and mechanical relay switches to automate physical security.',
        keyTopics: [
          '13.56MHz RFID contactless communication & UID authentication',
          'Electromechanical relay switching & optocoupler circuit isolation',
          'PIR pyroelectric infrared motion sensing & intruder detection',
          'Finite state machine logic for automated gate locking',
        ],
        activities: [
          'Interfacing RFID card reader and programming authorized access cards',
          'Wiring high-current electromagnetic relays to motorized door locks',
          'Building a motorized smart door that opens upon authorized RFID tap',
        ],
        handsOnActivities: [
          'Interfacing RFID card reader and programming authorized access cards',
          'Wiring high-current electromagnetic relays to motorized door locks',
          'Building a motorized smart door that opens upon authorized RFID tap',
        ],
        deliverable: 'RFID Smart Door Access System with Motorized Security Gate',
        visualTag: 'Build',
      },
      {
        week: 'Week 3',
        weekNumber: 'WEEK 03',
        phase: 'CONNECT',
        title: 'Wireless Networks & Cloud Dashboards',
        theme: 'Wireless Networks & Cloud Dashboards',
        badge: 'Milestone 03',
        iconName: 'Wifi',
        tagline: 'Connect edge hardware to local networks and cloud telemetry.',
        description: 'Connecting hardware edge nodes to Wi-Fi and Bluetooth networks. Students stream live sensor metrics to interactive cloud dashboards, publish alerts via MQTT, and control appliances remotely.',
        keyTopics: [
          'Wi-Fi 802.11 and Bluetooth Low Energy (BLE) microcontrollers',
          'MQTT publish/subscribe telemetry messaging protocol',
          'Interactive web-based IoT telemetry dashboards and gauges',
          'Remote two-way device actuation and latency optimization',
        ],
        activities: [
          'Connecting microcontroller edge nodes to local Wi-Fi networks',
          'Publishing sensor telemetry data to real-time online dashboard gauges',
          'Building a web toggle interface to remotely activate smart home fans and lights',
        ],
        handsOnActivities: [
          'Connecting microcontroller edge nodes to local Wi-Fi networks',
          'Publishing sensor telemetry data to real-time online dashboard gauges',
          'Building a web toggle interface to remotely activate smart home fans and lights',
        ],
        deliverable: 'Cloud-Connected Smart Home Hub with Mobile Telemetry Dashboard',
        visualTag: 'Connect',
      },
      {
        week: 'Week 4',
        weekNumber: 'WEEK 04',
        phase: 'CREATE',
        title: 'Smart City / Smart Home Capstone & Demo Day',
        theme: 'Smart City / Smart Home Capstone & Demo Day',
        badge: 'Milestone 04',
        iconName: 'Rocket',
        tagline: 'Engineer complete connected automation systems.',
        description: 'Student teams design and deploy a complete connected automation solution—such as an automated agriculture irrigation system, smart warehouse monitor, or wildfire alarm—and present live.',
        keyTopics: [
          'Full-stack IoT solution engineering (sensors, logic, network, cloud)',
          'Automated fail-safes, buzzer alarms & push notification webhooks',
          'Edge computing reliability, battery lifespan & enclosure design',
          'Technical communication and live system demonstration',
        ],
        activities: [
          'Building integrated smart city/home automation hardware prototypes',
          'Configuring multi-sensor threshold triggers and cloud fail-safes',
          'Live Demo Day presentation demonstrating remote telemetry and actuation',
        ],
        handsOnActivities: [
          'Building integrated smart city/home automation hardware prototypes',
          'Configuring multi-sensor threshold triggers and cloud fail-safes',
          'Live Demo Day presentation demonstrating remote telemetry and actuation',
        ],
        deliverable: 'Fully Automated Smart Home/City System + Official Certification',
        visualTag: 'Create',
      },
    ],
  },

  aiRobotics: {
    id: 'aiRobotics',
    title: 'AI & Robotics',
    badge: 'Ages 12+ Advanced Track',
    trackSubtitle: 'Computer Vision, Multi-DOF Kinematics & Applied AI',
    ageTrack: 'Ages 12+',
    description: 'Advanced engineering with Python, OpenCV computer vision, 6-DOF DOFBOT robotic arm kinematics, visual servoing, and autonomous AI rover navigation.',
    weeks: [
      {
        week: 'Week 1',
        weekNumber: 'WEEK 01',
        phase: 'DISCOVER',
        title: 'Python for Robotics & Hardware Architecture',
        theme: 'Python for Robotics & Hardware Architecture',
        badge: 'Milestone 01',
        iconName: 'Compass',
        tagline: 'Transition to Python scripts, ROS2 nodes, and bus servo arrays.',
        description: 'Students graduate into text-based Python programming and robotic architectures. They explore Linux terminal workflows, serial digital bus servos, HD camera video streams, and kinematic degrees of freedom.',
        keyTopics: [
          'Python 3 for embedded Linux & robotics systems',
          'High-torque digital bus serial servos vs. analog PWM',
          'Camera frame buffers, resolution & digital image matrices',
          'Multi-DOF robotic arm coordinate spaces (Base, Shoulder, Elbow, Wrist)',
        ],
        activities: [
          'Configuring Python robotics environment and testing servo communication',
          'Writing Python scripts to read and write serial servo register angles',
          'Streaming and inspecting live HD camera frames with Python video feeds',
        ],
        handsOnActivities: [
          'Configuring Python robotics environment and testing servo communication',
          'Writing Python scripts to read and write serial servo register angles',
          'Streaming and inspecting live HD camera frames with Python video feeds',
        ],
        deliverable: 'Python-Controlled 6-Axis Servo Calibration & Video Pipeline',
        visualTag: 'Discover',
      },
      {
        week: 'Week 2',
        weekNumber: 'WEEK 02',
        phase: 'BUILD',
        title: 'OpenCV Computer Vision & Object Perception',
        theme: 'OpenCV Computer Vision & Object Perception',
        badge: 'Milestone 02',
        iconName: 'Cpu',
        tagline: 'Endow robots with real-time visual perception.',
        description: 'Giving robots visual intelligence. Students implement OpenCV computer vision algorithms to isolate colors in HSV space, track object centroids, recognize facial features, and detect fiducial markers.',
        keyTopics: [
          'OpenCV image processing (color space conversion, Gaussian blur, masks)',
          'Contour extraction, bounding rectangles & spatial centroid math',
          'Haar cascades for real-time human face detection',
          'Camera-to-world 2D coordinate mapping algorithms',
        ],
        activities: [
          'Programming dynamic color tracking algorithms with HSV sliders',
          'Drawing real-time tracking bounding boxes and centroid crosshairs',
          'Implementing automated camera panning to follow human face movements',
        ],
        handsOnActivities: [
          'Programming dynamic color tracking algorithms with HSV sliders',
          'Drawing real-time tracking bounding boxes and centroid crosshairs',
          'Implementing automated camera panning to follow human face movements',
        ],
        deliverable: 'Real-Time OpenCV Object Detection & Face-Tracking Camera System',
        visualTag: 'Build',
      },
      {
        week: 'Week 3',
        weekNumber: 'WEEK 03',
        phase: 'CONNECT',
        title: 'Inverse Kinematics & Visual Pick-and-Place',
        theme: 'Inverse Kinematics & Visual Pick-and-Place',
        badge: 'Milestone 03',
        iconName: 'Wifi',
        tagline: 'Unite computer vision with robotic manipulation.',
        description: 'Bridging perception and action. Students implement inverse kinematics algorithms to calculate required servo angles, guiding the DOFBOT 6-DOF arm to autonomously locate, grasp, and sort physical objects.',
        keyTopics: [
          'Forward & Inverse Kinematics (FK/IK) geometric models',
          'End-effector gripper coordinate positioning and trajectory planning',
          'Visual servoing: closed-loop visual feedback guidance',
          'Speed ramping, collision envelopes & payload stabilization',
        ],
        activities: [
          'Writing Python inverse kinematics solvers to position gripper at (X, Y, Z)',
          'Calibrating gripper jaw force and positioning with visual target locks',
          'Programming an autonomous assembly line that sorts colored blocks into bins',
        ],
        handsOnActivities: [
          'Writing Python inverse kinematics solvers to position gripper at (X, Y, Z)',
          'Calibrating gripper jaw force and positioning with visual target locks',
          'Programming an autonomous assembly line that sorts colored blocks into bins',
        ],
        deliverable: 'Autonomous 6-DOF Robotic Arm with Visual Pick-and-Place Capability',
        visualTag: 'Connect',
      },
      {
        week: 'Week 4',
        weekNumber: 'WEEK 04',
        phase: 'CREATE',
        title: 'Autonomous Industrial AI Capstone & Demo Day',
        theme: 'Autonomous Industrial AI Capstone & Demo Day',
        badge: 'Milestone 04',
        iconName: 'Rocket',
        tagline: 'Engineer an end-to-end autonomous intelligent system.',
        description: 'Teams build advanced capstone robotics systems—such as an automated pharmaceutical sorter, gesture-mimicking robotic hand, or autonomous rover navigation system—and present live on Demo Day.',
        keyTopics: [
          'End-to-end Edge AI & robotics system architecture',
          'Real-time edge inference, sensor integration & error handling',
          'Technical communication, system demonstration & engineering rigor',
          'Future pathways in ROS2, Mechatronics, and Applied AI Engineering',
        ],
        activities: [
          'Developing custom advanced AI robotics capstone pipelines',
          'Stress-testing sorting speed, recognition accuracy & system recovery',
          'Live Grand Demo Day presentation to parents, mentors, and industry guests',
        ],
        handsOnActivities: [
          'Developing custom advanced AI robotics capstone pipelines',
          'Stress-testing sorting speed, recognition accuracy & system recovery',
          'Live Grand Demo Day presentation to parents, mentors, and industry guests',
        ],
        deliverable: 'Complete Autonomous AI Robotics Capstone System + Official Certification',
        visualTag: 'Create',
      },
    ],
  },
};

// Backward-compatibility export: defaults to Micro:bit 4-week journey
export const learningJourney: WeekJourney[] = technologyPlans.microbit.weeks;
