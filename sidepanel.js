const cards = document.getElementById("cards");
const refreshBtn = document.getElementById("refreshBtn");

function getStatusColor(available) {
  return available ? "status-green" : "status-red";
}

function createCard(title, value, extra = "") {
  let statusClass = "";
  let isStatusCard = false;

  if (title === "image → available") {
    isStatusCard = true;
    statusClass = getStatusColor(value);
    title = value
      ? "⚡ Speed Image"
      : "⚠️ Speed Image";
    value = value ? "ACTIVE" : "LIMIT REACHED";

  } else if (title === "image → remainingQueries") {
    title = "⚡ Speed Image Quota";

  } else if (title === "image → windowSizeSeconds") {
    title = "⚡ Speed Reset Window";
    value = `${(value / 3600).toFixed(0)} hrs`;

  } else if (title === "imagePro → available") {
    isStatusCard = true;
    statusClass = getStatusColor(value);
    title = value
      ? "🎨 Quality Image"
      : "⚠️ Quality Image";
    value = value ? "ACTIVE" : "LIMIT REACHED";

  } else if (title === "imagePro → remainingQueries") {
    title = "🎨 Quality Image Quota";

  } else if (title === "imagePro → windowSizeSeconds") {
    title = "🎨 Quality Reset Window";
    value = `${(value / 3600).toFixed(0)} hrs`;

  } else if (title === "imageEdit → available") {
    isStatusCard = true;
    statusClass = getStatusColor(value);
    title = value
      ? "✏️ Edit Image"
      : "⚠️ Edit Image";
    value = value ? "ACTIVE" : "LIMIT REACHED";

  } else if (title === "imageEdit → remainingQueries") {
    title = "✏️ Edit Image Quota";

  } else if (title === "imageEdit → windowSizeSeconds") {
    title = "✏️ Edit Reset Window";
    value = `${(value / 3600).toFixed(0)} hrs`;

  } else if (title === "video → available") {
    isStatusCard = true;
    statusClass = getStatusColor(value);
    title = value
      ? "🎥 480p Video"
      : "⚠️ 480p Video";
    value = value ? "ACTIVE" : "LIMIT REACHED";

  } else if (title === "video → remainingQueries") {
    title = "🎥 480p Video Quota";

  } else if (title === "video → windowSizeSeconds") {
    title = "🎥 480p Reset Window";
    value = `${(value / 3600).toFixed(0)} hrs`;

  } else if (title === "video → nextAvailableAt") {
    title = "🎥 480p Next Available";

  } else if (title === "video720p → available") {
    isStatusCard = true;
    statusClass = getStatusColor(value);
    title = value
      ? "📽️ 720p Video"
      : "⚠️ 720p Video";
    value = value ? "ACTIVE" : "LIMIT REACHED";

  } else if (title === "video720p → remainingQueries") {
    title = "📽️ 720p Video Quota";

  } else if (title === "video720p → windowSizeSeconds") {
    title = "📽️ 720p Reset Window";
    value = `${(value / 3600).toFixed(0)} hrs`;

  } else if (title === "video720p → nextAvailableAt") {
    title = "📽️ 720p Next Available";
  }

  return `
    <div class="card ${statusClass}">
      ${
        isStatusCard
          ? `<div class="status-bar"></div>`
          : ""
      }

      <div class="card-title">${title}</div>

      <div class="card-value">
        ${value}
      </div>

      ${extra ? `<div class="small">${extra}</div>` : ""}
    </div>
  `;
}

function formatDate(dateString) {
  try {
    return new Date(dateString).toLocaleString();
  } catch {
    return dateString;
  }
}

async function loadQuota() {
  cards.innerHTML = `
    <div class="card loading-card">
      <div class="loader"></div>
      Loading quotas...
    </div>
  `;

  try {
    const response = await fetch(
      "https://grok.com/rest/media/imagine/quota_info",
      {
        method: "POST",
        credentials: "include",
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json"
        },
        referrer: "https://grok.com/",
        body: "{}"
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    cards.innerHTML = "";

    Object.entries(data).forEach(([section, values]) => {

      if (typeof values === "object" && values !== null) {

        Object.entries(values).forEach(([key, value]) => {

          let formatted = value;

          if (
            typeof value === "string" &&
            value.includes("T")
          ) {
            formatted = formatDate(value);
          }

          cards.innerHTML += createCard(
            `${section} → ${key}`,
            formatted
          );
        });

      } else {

        cards.innerHTML += createCard(
          section,
          values
        );
      }
    });

  } catch (err) {

    cards.innerHTML = `
      <div class="card status-red">
        <div class="status-bar"></div>
        <div class="card-title">❌ Error</div>
        <div class="card-value">${err.message}</div>
      </div>
    `;

    console.error(err);
  }
}

refreshBtn.addEventListener("click", loadQuota);

loadQuota();

setInterval(loadQuota, 30000);