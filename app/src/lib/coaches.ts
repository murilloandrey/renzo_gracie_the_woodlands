export type Coach = {
  name: string;
  role: string;
  credential: string;
  badge?: string;
  photoUrl?: string;
  bio?: string;
  photos?: string[];
};

export const COACHES: Coach[] = [
  {
    name: "Professor Todd",
    role: "Head Instructor · BJJ",
    credential: "4th-Degree Black Belt",
    badge: "4TH DEGREE",
    photos: [],
  },
  {
    name: "Professor Eddie",
    role: "BJJ Instructor",
    credential: "Black Belt",
    photos: [],
  },
  {
    name: "Coach Vinnie",
    role: "BJJ Instructor",
    credential: "Adult & Early-Morning BJJ",
    photos: [],
  },
  {
    name: "Coach Phillipe",
    role: "Muay Thai Coach",
    credential: "The Science of Eight Limbs",
    photos: [],
  },
  {
    name: "Coach Alex Garcia",
    role: "BJJ Instructor",
    credential: "Adult Gi & No-Gi",
    photos: [],
  },
  {
    name: "Coach Nathan Bates",
    role: "Kids & Teens BJJ",
    credential: "Building Young Champions",
    photos: [],
  },
  {
    name: "Coach Vinny",
    role: "Kids & Teens BJJ",
    credential: "Junior Development",
    photos: [],
  },
  {
    name: "Coach Ollie",
    role: "MMA Coach",
    credential: "All-Ages Mixed Martial Arts",
    photos: [],
  },
  {
    name: "Fadi Khouri",
    role: "BJJ Instructor",
    credential: "Evening & Open Mat",
    photos: [],
  },
];

/** Drops an honorific so the placeholder represents the coach, not the title. */
export function coachInitial(name: string): string {
  const parts = name.trim().split(/\s+/);
  const firstName =
    parts[0] === "Professor" || parts[0] === "Coach" ? parts[1] : parts[0];

  return firstName?.charAt(0).toUpperCase() ?? "";
}
