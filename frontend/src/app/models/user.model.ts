export interface StudyGoal {
  subject: string;
  level: string;
  duration: string;
}

export interface CareerGoal {
  field: string;
  role: string;
  skillsToDevelop: string[];
}

export interface Location {
  country: string;
  city: string;
}

export interface TimeCommitment {
  weeklyHours: number;
  preferredDays: string[];
}

export interface User {
  userId: string;
  name: string;
  email: string;
  studyGoals: StudyGoal[];
  careerGoals: CareerGoal[];
  preferredLearningMethods: string[];
  currentSkills: string[];
  preferredContentTypes: string[];
  location: Location;
  timeCommitment: TimeCommitment;
  createdAt: string;
  updatedAt: string;
}
