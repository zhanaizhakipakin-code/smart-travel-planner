// Wait until page content is ready before running scripts.
document.addEventListener("DOMContentLoaded", () => {
  // Add a simple page-load transition effect.
  document.body.classList.add("page-loaded");

  // Highlight the current page in navbar automatically.
  setActiveNavLink();

  // Add fade-in animation as elements enter viewport.
  setupScrollReveal();

  // Wire booking buttons on flights/hotels pages.
  setupBookingButtons();

  // Wire AI itinerary generation on home page.
  setupTripPlanner();
});

function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".nav-links a");

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });
}

function setupScrollReveal() {
  const revealItems = document.querySelectorAll(".reveal");
  if (!revealItems.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupBookingButtons() {
  const bookButtons = document.querySelectorAll(".book-btn");
  if (!bookButtons.length) return;

  bookButtons.forEach((button) => {
    button.addEventListener("click", () => {
      alert("Booking feature coming soon");
    });
  });
}

function setupTripPlanner() {
  const plannerButton = document.getElementById("generate-plan");
  const output = document.getElementById("itinerary-output");
  if (!plannerButton || !output) return;

  plannerButton.addEventListener("click", () => {
    const destination = document.getElementById("destination").value.trim();
    const budget = document.getElementById("budget").value.trim();
    const days = Number(document.getElementById("days").value.trim()) || 3;

    const city = destination || "your destination";
    const money = budget || "your budget";
    const tripDays = Math.max(1, Math.min(days, 10));

    // Build a dynamic itinerary based on user day count and destination.
    const itineraryItems = createItinerary(city, tripDays)
      .map((plan, index) => `<li><strong>Day ${index + 1}:</strong> ${plan}</li>`)
      .join("");

    output.innerHTML = `
      <h3>Your AI Trip Plan for ${city}</h3>
      <p class="muted">Budget target: ${money} | Duration: ${tripDays} day(s)</p>
      <ul>${itineraryItems}</ul>
      <p class="muted">Tip: Use Flights and Hotels pages to continue planning your trip.</p>
    `;
  });
}

function createItinerary(destination, days) {
  const placeType = detectPlaceType(destination);

  const firstDayTemplates = [
    `Arrive in ${destination}, check into your hotel, explore the nearby district, and enjoy a light welcome dinner.`,
    `Land in ${destination}, settle in, take an easy neighborhood walk, and visit a local cafe for your first taste of the city.`,
    `Reach ${destination}, do a relaxed orientation tour, and spend the evening at a scenic viewpoint.`
  ];

  const lastDayTemplates = [
    `Enjoy a slow morning, visit a final nearby attraction, pick up souvenirs, and head to the airport for departure.`,
    `Have brunch at a top-rated local spot, take a short final walk, and complete your checkout and transfer.`,
    `Wrap up with a relaxed breakfast, a quick photo stop, and departure preparations.`
  ];

  const activitiesByType = {
    beach: [
      "morning beach walk and swim",
      "snorkeling or boat trip",
      "seafood lunch by the waterfront",
      "sunset promenade",
      "night market near the coast",
      "relaxing cafe break with ocean view"
    ],
    mountain: [
      "sunrise nature trail",
      "mountain viewpoint visit",
      "cable car or scenic route",
      "local village food stop",
      "light evening recovery session",
      "photography walk in fresh air"
    ],
    city: [
      "historic district walking tour",
      "major landmark visit",
      "museum or art gallery stop",
      "street food tasting",
      "shopping street exploration",
      "evening skyline viewpoint"
    ],
    cultural: [
      "heritage site exploration",
      "local craft market visit",
      "guided architecture walk",
      "traditional lunch experience",
      "cultural performance in the evening",
      "photography break in old town"
    ],
    default: [
      "guided city highlights tour",
      "popular attraction visit",
      "local lunch at a top-rated spot",
      "scenic afternoon walk",
      "free time for shopping and cafe breaks",
      "relaxing evening experience"
    ]
  };

  const pool = activitiesByType[placeType] || activitiesByType.default;
  const usedActivities = new Set();
  const plans = [];

  for (let day = 1; day <= days; day += 1) {
    if (day === 1) {
      plans.push(pickRandom(firstDayTemplates));
      continue;
    }

    if (day === days && days > 1) {
      plans.push(pickRandom(lastDayTemplates));
      continue;
    }

    const dayActivities = [];
    while (dayActivities.length < 3) {
      const candidate = pickRandom(pool);
      if (!usedActivities.has(candidate) || usedActivities.size >= pool.length) {
        dayActivities.push(candidate);
        usedActivities.add(candidate);
      }
    }

    plans.push(
      `Start with ${dayActivities[0]}, continue with ${dayActivities[1]}, and end the day with ${dayActivities[2]}.`
    );
  }

  return plans;
}

function detectPlaceType(destination) {
  const text = destination.toLowerCase();

  const beachKeywords = ["bali", "maldives", "phuket", "goa", "miami", "beach"];
  const mountainKeywords = ["alps", "nepal", "swiss", "himalaya", "mountain", "banff"];
  const culturalKeywords = ["rome", "kyoto", "istanbul", "athens", "cairo", "varanasi"];

  if (beachKeywords.some((word) => text.includes(word))) return "beach";
  if (mountainKeywords.some((word) => text.includes(word))) return "mountain";
  if (culturalKeywords.some((word) => text.includes(word))) return "cultural";
  if (text) return "city";
  return "default";
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}
