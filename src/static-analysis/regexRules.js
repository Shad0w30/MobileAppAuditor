export const RULES = [
  {
    name: "AWS Key",
    regex: /AKIA[0-9A-Z]{16}/g,
    severity: "High"
  },
  {
    name: "Firebase URL",
    regex: /https:\/\/.*\.firebaseio\.com/g,
    severity: "Medium"
  },
  {
    name: "JWT",
    regex: /eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\./g,
    severity: "High"
  }
];
