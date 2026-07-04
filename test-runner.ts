import { getSimulatedDestination, generateSimulatedStory } from "./src/app/api/explore/simulatedData";

let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  \x1b[32m✓\x1b[0m ${message}`);
    passedTests++;
  } else {
    console.error(`  \x1b[31m✗\x1b[0m Assertion Failed: ${message}`);
    failedTests++;
  }
}

console.log("\n==================================================");
console.log("      CultureQuest - Automated Test Runner");
console.log("==================================================\n");

// Test 1: Preset location query resolving
console.log("Running Test Suite 1: Destination Resolver");
try {
  const kyotoData = getSimulatedDestination("Kyoto");
  assert(kyotoData.location === "Kyoto, Japan", "Resolves 'Kyoto' to 'Kyoto, Japan'");
  assert(kyotoData.attractions.length === 3, "Resolves exactly 3 attractions for Kyoto");
  assert(kyotoData.hiddenGems.length === 2, "Resolves exactly 2 hidden gems for Kyoto");
  assert(kyotoData.etiquette.length > 0, "Resolves etiquette items for Kyoto");
  assert(kyotoData.phrases.length > 0, "Resolves glossary phrases for Kyoto");

  const oaxacaData = getSimulatedDestination("oaxaca ");
  assert(oaxacaData.location === "Oaxaca, Mexico", "Resolves lowercase and padded 'oaxaca ' to 'Oaxaca, Mexico'");
} catch (e) {
  console.error("  \x1b[31m✗\x1b[0m Failed Test Suite 1 due to exception:", e);
  failedTests++;
}

// Test 2: Fallback / Dynamic location templates
console.log("\nRunning Test Suite 2: Fallback/Unrecognized Destinations");
try {
  const customData = getSimulatedDestination("Vancouver, Canada");
  assert(customData.location === "Vancouver, Cultural Destination", "Formats unknown city into standard template");
  assert(customData.attractions[0].name.includes("Vancouver"), "Dynamic attraction titles include location name");
  assert(customData.hiddenGems[0].name.includes("Vancouver"), "Dynamic hidden gem titles include location name");
} catch (e) {
  console.error("  \x1b[31m✗\x1b[0m Failed Test Suite 2 due to exception:", e);
  failedTests++;
}

// Test 3: Storyteller Persona Variation
console.log("\nRunning Test Suite 3: Immersive Storyteller Variation");
try {
  const kyotoCookStory = generateSimulatedStory("Kyoto, Japan", "Cook", "Nishiki Market");
  const kyotoWeaverStory = generateSimulatedStory("Kyoto, Japan", "Weaver", "Kiln");
  
  assert(kyotoCookStory.includes("Nishiki"), "Cook story contains market details");
  assert(kyotoCookStory.includes("dashi tamago") || kyotoCookStory.includes("tea"), "Cook story contains sensory culinary text");
  assert(kyotoWeaverStory.includes("bamboo") || kyotoWeaverStory.includes("weaving"), "Weaver story contains artisan craft text");
  assert(kyotoCookStory !== kyotoWeaverStory, "Different narrator personas yield distinct stories");
} catch (e) {
  console.error("  \x1b[31m✗\x1b[0m Failed Test Suite 3 due to exception:", e);
  failedTests++;
}

console.log("\n==================================================");
console.log(`Test Execution Finished: ${passedTests} passed, ${failedTests} failed.`);
console.log("==================================================\n");

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log("\x1b[32mAll test assertions passed successfully!\x1b[0m\n");
  process.exit(0);
}
