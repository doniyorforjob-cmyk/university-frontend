// Temporary cache clear script
localStorage.clear();
sessionStorage.clear();
console.log('Cache cleared! Reloading...');
setTimeout(() => window.location.reload(), 500);
