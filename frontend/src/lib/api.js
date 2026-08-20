const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const TOKEN_KEY = "access_token";
const DEVICE_KEY = "interview_ai_device_id";

function getDeviceId() {
  let deviceId = localStorage.getItem(DEVICE_KEY);

  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem(DEVICE_KEY, deviceId);
  }

  return deviceId;
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  const token = getToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const detail =
      typeof payload === "object" && payload?.detail
        ? payload.detail
        : `Request failed with status ${response.status}.`;

    const error = new Error(detail);
    error.status = response.status;
    throw error;
  }

  return payload;
}

export async function ensureGuestSession() {
  const existingToken = getToken();

  if (existingToken) {
    return existingToken;
  }

  const result = await request("/auth/guest", {
    method: "POST",
    body: JSON.stringify({
      device_id: getDeviceId(),
    }),
  });

  localStorage.setItem(TOKEN_KEY, result.access_token);
  return result.access_token;
}

export async function createInterview(payload) {
  await ensureGuestSession();

  return request("/interviews/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getInterview(interviewId) {
  await ensureGuestSession();
  return request(`/interviews/${interviewId}`);
}

export async function getInterviewQuestions(interviewId) {
  await ensureGuestSession();
  return request(`/interviews/${interviewId}/questions`);
}

export async function getInterviews() {
  await ensureGuestSession();
  return request("/interviews/");
}

export { API_BASE_URL };
