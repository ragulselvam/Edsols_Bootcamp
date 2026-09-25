export interface BatchTiming {
  label: string;
  timing: string;
  seatsTotal: number;
  seatsFilled: number;
  tag: string;
}

export interface MonthSchedule {
  monthName: string;
  year: number;
  status: "Open for Registration";
  days: string;
  sessionsCount: string;
  targetAudience: string;
  description: string;
  morning: BatchTiming;
  afternoon: BatchTiming;
}

export interface ScheduleConfig {
  october: MonthSchedule;
  november: MonthSchedule;
}

/**
 * Centralized Schedule Configuration for EDSOLS Technology Bootcamp.
 * You can easily update batch timings, dates, and seat availability here.
 */
export const scheduleConfig: ScheduleConfig = {
  october: {
    monthName: "Dussehra BootCamp",
    year: 2026,
    status: "Open for Registration",
    days: "Saturday & Sunday",
    sessionsCount: "8 Intensive Weekend Sessions (1 Month)",
    targetAudience: "Ages 6+ & 12+ (Progressive Tracks)",
    description: "Launch your innovation journey in the Dussehra BootCamp cohort with dedicated mentor guidance and hands-on kit access at EDSOLS.",
    morning: {
      label: "Morning Batch",
      timing: "09:30 AM – 12:30 PM",
      seatsTotal: 16,
      seatsFilled: 9,
      tag: "Ideal for Early Innovators",
    },
    afternoon: {
      label: "Afternoon Batch",
      timing: "02:00 PM – 05:00 PM",
      seatsTotal: 16,
      seatsFilled: 7,
      tag: "High Energy Afternoon Lab",
    },
  },
  november: {
    monthName: "Special BootCamp",
    year: 2026,
    status: "Open for Registration",
    days: "Saturday & Sunday",
    sessionsCount: "8 Intensive Weekend Sessions (1 Month)",
    targetAudience: "Ages 6+ & 12+ (Progressive Tracks)",
    description: "Advance your robotics and AI skills in the Special BootCamp cohort with live capstone project building and demo day at EDSOLS.",
    morning: {
      label: "Morning Batch",
      timing: "09:30 AM – 12:30 PM",
      seatsTotal: 16,
      seatsFilled: 6,
      tag: "Fast Track Morning Cohort",
    },
    afternoon: {
      label: "Afternoon Batch",
      timing: "02:00 PM – 05:00 PM",
      seatsTotal: 16,
      seatsFilled: 5,
      tag: "Prime Weekend Slot",
    },
  },
};
