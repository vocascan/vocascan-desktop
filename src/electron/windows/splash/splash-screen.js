const header = document.getElementById("header");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progressBar");
const launchBtn = document.getElementById("launch");

launchBtn.addEventListener("click", () => {
  window.update.skip();
});

window.t.then((t) => {
  launchBtn.innerText = t.updates.skipButton;
});

window.update.on("check", (_event) => {
  window.t.then((t) => {
    header.textContent = t.updates.check;
    launchBtn.style.display = "initial";
  });
});

window.update.on("skipCheck", (_event) => {
  window.t.then((t) => {
    header.textContent = t.updates.skipCheck;
    launchBtn.style.display = "none";
  });
});

window.update.on("launch", (_event) => {
  window.t.then((t) => {
    header.textContent = t.start.starting;
    launchBtn.style.display = "none";
  });
});

window.update.on("relaunch", (_event) => {
  window.t.then((t) => {
    header.textContent = t.start.restarting;
    launchBtn.style.display = "none";
  });
});

window.update.on("download", (_event) => {
  window.t.then((t) => {
    header.textContent = t.updates.download;
    launchBtn.style.display = "none";
  });
});

window.update.on("progress", (_event, percentage) => {
  window.t.then((t) => {
    progress.style.display = "inherit";
    launchBtn.style.display = "none";
    header.textContent = `${t.updates.download} (${percentage}%)`;
    progressBar.style.width = `${percentage}%`;
  });
});
