const DANGEROUS = {
  "android.permission.READ_SMS": "High",
  "android.permission.RECEIVE_BOOT_COMPLETED": "Medium",
  "android.permission.RECORD_AUDIO": "High"
};

export function checkPermissions(manifest) {
  const perms = manifest.permissions || [];
  return perms
    .filter(p => DANGEROUS[p.name])
    .map(p => ({
      issue: `Dangerous permission: ${p.name}`,
      severity: DANGEROUS[p.name],
      masvs: "MASVS-PLATFORM-1"
    }));
}
