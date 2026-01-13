export function detectFileType(file) {
  if (file.name.endsWith(".apk")) return "apk";
  if (file.name.endsWith(".ipa")) return "ipa";
  throw new Error("Unsupported file type");
}
