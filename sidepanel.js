const cards = document.getElementById("cards");
const refreshBtn = document.getElementById("refreshBtn");

function createServiceCard(title, data) {
  const isActive = data.available;

  return `
    <div class="service-card">

      <div class="service-header">
        <div class="service-title">
          ${title}
        </div>

        <button class="status-btn ${isActive ? "active" : "inactive"}">
          <span class="dot"></span>
          ${isActive ? "ACTIVE" : "LIMITED"}
        </button>
      </div>

      <div class="stats-row">

        <div class="stat-box">
          <div class="stat-label">Quota</div>
          <div class="stat-value">
            ${data.remainingQueries ?? "-"}
          </div>
        </div>

        <div class="stat-box">
          <div class="stat-label">Reset</div>
          <div class="stat-value">
            ${
              data.windowSizeSeconds
                ? `${(data.windowSizeSeconds / 3600).toFixed(0)}h`
                : "-"
            }
          </div>
        </div>

        <div class="stat-box">
          <div class="stat-label">Next</div>
          <div class="stat-value small-text">
            ${
              data.nextAvailableAt
                ? formatDate(data.nextAvailableAt)
                : "Not Set"
            }
          </div>
        </div>

      </div>

    </div>
  `;
}

function formatDate(dateString) {
  try {
    return new Date(dateString).toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return dateString;
  }
}

async function loadQuota() {
  cards.innerHTML = `
    <div class="loading-card">
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
          "content-type": "application/json"
        },
        body: "{}"
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    cards.innerHTML = "";

    const services = [
      {
        key: "image",
        title: "⚡ Speed Image"
      },
      {
        key: "imagePro",
        title: "🎨 Quality Image"
      },
      {
        key: "imageEdit",
        title: "✏️ Edit Image"
      },
      {
        key: "video",
        title: "🎥 480p Video"
      },
      {
        key: "video720p",
        title: "📽️ 720p Video"
      }
    ];

    services.forEach(service => {
      if (data[service.key]) {
        cards.innerHTML += createServiceCard(
          service.title,
          data[service.key]
        );
      }
    });

  } catch (err) {

    cards.innerHTML = `
      <div class="service-card error-card">
        <div class="service-title">
          ❌ Error
        </div>

        <div class="stat-value">
          ${err.message}
        </div>
      </div>
    `;

    console.error(err);
  }
}

refreshBtn.addEventListener("click", loadQuota);

loadQuota();

setInterval(loadQuota, 30000);