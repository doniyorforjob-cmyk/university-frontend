// scripts/maybe-react-snap.js
if (process.env.CI === "true" || process.env.VERCEL === "1") {
    console.log("🚫 react-snap skipped in CI/Vercel");
    return;
}

try {
    console.log("⚡ Running react-snap...");
    require("react-snap").run();
} catch (e) {
    console.warn("⚠️ react-snap failed, skipping", e.message);
}
