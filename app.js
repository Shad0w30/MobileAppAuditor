import { renderFileTree } from "./analyzers/fileExplorer.js";
import { renderFindings } from "./analyzers/findingsRenderer.js";
import { extractDexStrings } from "./analyzers/dexStrings.js";
import { scanSecrets } from "./analyzers/secrets.js";
import { scoreMASVS } from "./analyzers/masvs.js";

const input = document.getElementById("fileInput");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

input.addEventListener("change", async e => {
  const file = e.target.files[0];
  if (!file) return;

  progressText.textContent = "Extracting archive...";
  progressBar.style.width = "20%";

  const zip = await JSZip.loadAsync(file);
  renderFileTree(zip);

  progressText.textContent = "Extracting strings...";
  progressBar.style.width = "40%";

  const dexStrings = await extractDexStrings(zip);

  progressText.textContent = "Scanning secrets...";
  progressBar.style.width = "60%";

  const secretFindings = scanSecrets(dexStrings);

  progressText.textContent = "Scoring MASVS...";
  progressBar.style.width = "80%";

  const masvsFindings = scoreMASVS(secretFindings);

  renderFindings([...secretFindings, ...masvsFindings]);

  progressBar.style.width = "100%";
  progressText.textContent = "Scan complete";
});
