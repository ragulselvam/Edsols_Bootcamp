export interface StatCard {
  number: string;
  title: string;
  subtitle: string;
  detail: string;
  iconName: string;
}

export interface BootcampInfo {
  brandName: string;
  brandSubname: string;
  tagline: string;
  heroHeadline: string;
  heroHighlight: string;
  heroSubtitle: string;
  targetAudience: string;
  format: string;
  datesHighlight: string;
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    location: string;
    website: string;
    operatingHours: string;
  };
  socialLinks: {
    instagram: string;
    linkedin: string;
    youtube: string;
    facebook: string;
    github: string;
  };
  stats: StatCard[];
  faqs: { question: string; answer: string; category: string }[];
}

export const bootcampData: BootcampInfo = {
  brandName: "EDSOLS",
  brandSubname: "INNOVATIONS",
  tagline: "Robotics | IoT | AI",
  heroHeadline: "BUILD. CODE. CREATE.",
  heroHighlight: "Intelligence at the Edge for Young Innovators",
  heroSubtitle: "A premier hands-on Robotics, IoT & AI Bootcamp for students in Grades 6–12 by EDSOLS. Learn practical engineering through real hardware kits, computer vision, smart automation, and capstone inventions.",
  targetAudience: "School Students in Grades 6–12",
  format: "Weekend Program · Saturday & Sunday · Morning & Afternoon Batches",
  datesHighlight: "October & November 2026 — Registrations Open",
  contact: {
    email: "bootcamp@edsols.in",
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    location: "EDSOLS Innovation Hub & Edge AI Robotics Lab",
    website: "https://www.edsols.in",
    operatingHours: "Saturday – Sunday: 9:00 AM – 6:00 PM (Batch Sessions)",
  },
  socialLinks: {
    instagram: "https://instagram.com/edsols_innovations",
    linkedin: "https://linkedin.com/company/edsols",
    youtube: "https://youtube.com/@edsols",
    facebook: "https://facebook.com/edsols",
    github: "https://github.com/edsols",
  },
  stats: [
    {
      number: "01",
      title: "1 Month",
      subtitle: "Hands-on technology learning",
      detail: "8 intensive hands-on weekend sessions covering the full spectrum of modern hardware, IoT & Edge AI.",
      iconName: "Calendar",
    },
    {
      number: "02",
      title: "Weekends",
      subtitle: "Saturday & Sunday",
      detail: "Designed around school schedules so students learn without academic conflict.",
      iconName: "Clock",
    },
    {
      number: "03",
      title: "Grades 6–12",
      subtitle: "Designed for school students",
      detail: "Custom curriculum tiered for middle school and high school cognitive levels.",
      iconName: "GraduationCap",
    },
    {
      number: "04",
      title: "2 Batches",
      subtitle: "Morning & Afternoon",
      detail: "Small cohort cap of 16 students per batch ensuring a 1:8 mentor-to-student ratio.",
      iconName: "Users",
    },
  ],
  faqs: [
    {
      question: "Does my child need prior coding or robotics experience?",
      answer: "No prior experience is required! The bootcamp is built with a stepped learning curve. We start with fundamental computational logic and visual block programming before moving into Python and real-world OpenCV AI vision. Mentors provide personalized guidance tailored to each student's current skill level.",
      category: "Eligibility",
    },
    {
      question: "What hardware kits will students work with during the bootcamp?",
      answer: "Students work with 100% genuine industrial and educational hardware: the Yahboom Building Super Kit for robotics, the Keyestudio Smart Home Kit for IoT automation, and the Yahboom DOFBOT 6-DOF AI Robotic Arm with high-def vision cameras.",
      category: "Hardware",
    },
    {
      question: "What are the batch timings and format?",
      answer: "The program runs across 4 weekends (Saturday and Sunday). You can select either the Morning Batch (09:30 AM – 12:30 PM) or the Afternoon Batch (02:00 PM – 05:00 PM). Both batches follow the exact same high-standard curriculum.",
      category: "Schedule",
    },
    {
      question: "Do students need to bring their own laptop?",
      answer: "Yes, students should bring a basic laptop (Windows, Mac, or Linux) with a USB port for uploading code to microcontrollers and running Python scripts. If a laptop is unavailable, please mention it during registration and our lab will arrange a workstation.",
      category: "Logistics",
    },
    {
      question: "Will students receive a certificate upon completion?",
      answer: "Yes! Every student who completes the 4-week program and presents their capstone project on Demo Day receives the official EDSOLS Bootcamp Certificate of Completion in Robotics, IoT & Applied AI, showcasing their verified engineering portfolio.",
      category: "Certification",
    },
    {
      question: "How are the October and November batches different?",
      answer: "Both October and November 2026 batches cover the same complete 1-month curriculum. Students can choose whichever month fits their academic and holiday schedule best. Both months are currently OPEN for registration.",
      category: "Registration",
    },
  ],
};
