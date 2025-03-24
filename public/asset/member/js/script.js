$(document).ready(function () {
  $(document).on("click", ".section-item", function (e) {
    e.preventDefault();

    let $this = $(this);
    let isActive = $this.hasClass("active"); // Check if the clicked item is already active

    $(".section-item").removeClass("active");
    $(".questions-list").removeClass("active");
    $(".icon_section i")
      .removeClass("fa-angle-down")
      .addClass("fa-angle-right");

    if (!isActive) {
      // Toggle only if it wasn't active before
      $this.addClass("active");
      $this.find(".questions-list").addClass("active");
      $this
        .find(".icon_section i")
        .removeClass("fa-angle-right")
        .addClass("fa-angle-down");
    }
  });

  $(document).on("click", ".toggle_left_sidebar", function (e) {
    e.preventDefault();
    openSidebar("left");
  });

  $(document).on("click", ".toggle_right_sidebar", function (e) {
    e.preventDefault();
    openSidebar("right");
  });
  $(document).on("click", ".close_right_sidebar", function (e) {
    e.preventDefault();
    openSidebar("right");
  });
  $(document).on("click", ".close_left_sidebar", function (e) {
    e.preventDefault();
    openSidebar("left");
  });
});

// DOM Elements
const showSavedBtn = document.getElementById("showSavedBtn");
const saveBtn = document.getElementById("saveBtn");
const overlay = document.getElementById("overlay");
const savedSidebar = document.getElementById("savedSidebar");
const closeBtn = document.getElementById("closeBtn");

// Toggle Sidebar
function toggleSidebar() {
  overlay.classList.toggle("active");
  savedSidebar.classList.toggle("active");
  showSavedBtn.classList.toggle("active");
}

// Close Sidebar on close button click
closeBtn.addEventListener("click", () => {
  overlay.classList.remove("active");
  savedSidebar.classList.remove("active");
  showSavedBtn.classList.remove("active");
});

// Event Listeners
showSavedBtn.addEventListener("click", toggleSidebar);

// Prevent Sidebar from closing when clicking inside it
savedSidebar.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent event from bubbling up to the overlay
});

// Prevent Sidebar from closing when clicking on overlay (outside the sidebar)
overlay.addEventListener("click", toggleSidebar);

// Save Button Animation
saveBtn.addEventListener("click", () => {
  saveBtn.style.transform = "scale(0.95)";
  setTimeout(() => {
    saveBtn.style.transform = "scale(1)";
  }, 100);
});

function tooltip() {
  // Get all elements with tooltips
  var tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );

  // Initialize Bootstrap tooltips
  var tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );

  // Add click event listener to hide tooltip on click
  tooltipTriggerList.forEach((tooltipTriggerEl) => {
    tooltipTriggerEl.addEventListener("click", function () {
      const tooltip = bootstrap.Tooltip.getInstance(tooltipTriggerEl); // Get the Tooltip instance
      if (tooltip) {
        tooltip.hide(); // Hide the tooltip
      }
    });
  });
}

tooltip();

const prevPhase = document.getElementById("prevPhase");
const nextPhase = document.getElementById("nextPhase");
const phasesContainer = document.getElementById("phasesContainer");
const progressBar = document.querySelector(".progress-bar");

// Phase Data
let phases = [
  "Problem Definition",
  "Research & Analysis",
  "User Interviews",
  "Data Synthesis",
  "Solution Ideation",
  "Design Exploration",
  "Prototyping",
  "User Testing",
  "Implementation",
  "Launch & Monitor",
];
let currentPhase = 0;
const visiblePhases = 5; // Number of visible phases
let startPhase = 0; // Start index for visible phases

// Create Phase Items
function createPhaseItems() {
  phasesContainer.innerHTML = "";
  const endPhase = Math.min(startPhase + visiblePhases, phases.length);

  for (let i = startPhase; i < endPhase; i++) {
    const phaseItem = document.createElement("div");
    phaseItem.className = `phase-item ${
      i === currentPhase ? "active finished" : ""
    }`;
    phaseItem.innerHTML = `
                    <div class="phase-title">${phases[i]}</div>
                    <div class="phase-count">Phase ${i + 1} of ${
      phases.length
    }</div>
                `;
    phaseItem.addEventListener("click", () => {
      currentPhase = i;
      updatePhaseUI();
    });
    phasesContainer.appendChild(phaseItem);
  }
}

// Update Phase UI
function updatePhaseUI() {
  // Update progress bar
  progressBar.style.width = `${((currentPhase + 1) / phases.length) * 100}%`;

  // Update visible range if necessary
  if (currentPhase < startPhase) {
    startPhase = currentPhase;
  } else if (currentPhase >= startPhase + visiblePhases) {
    startPhase = currentPhase - visiblePhases + 1;
  }

  // Recreate phase items
  createPhaseItems();

  // Update button states
  prevPhase.disabled = startPhase === 0;
  nextPhase.disabled = startPhase + visiblePhases >= phases.length;
}

// Phase Navigation
prevPhase.addEventListener("click", () => {
  if (startPhase > 0) {
    startPhase--;
    updatePhaseUI();
  }
});

nextPhase.addEventListener("click", () => {
  if (startPhase + visiblePhases < phases.length) {
    startPhase++;
    updatePhaseUI();
  }
});

// Initialize Phase UI
createPhaseItems();
updatePhaseUI();

function openSidebar(side) {
  $(`.__${side}-sidebar`).toggleClass("active");
}
