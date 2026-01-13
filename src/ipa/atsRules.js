export function checkATS(plist) {
  const ats = plist.NSAppTransportSecurity;
  if (!ats) return [];

  if (ats.NSAllowsArbitraryLoads) {
    return [{
      issue: "ATS disabled (NSAllowsArbitraryLoads=true)",
      severity: "High",
      masvs: "MASVS-NETWORK-1"
    }];
  }
  return [];
}
