const isVercel = !!process.env.VERCEL;
const skipSnap = process.env.SKIP_REACT_SNAP === "true";

if (isVercel || skipSnap) {
    console.log("🚫 react-snap skipped");
    process.exit(0);
}

console.log("⚡ Running react-snap...");
require("react-snap").run();
