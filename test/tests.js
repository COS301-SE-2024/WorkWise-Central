import http from "k6/http";
import { sleep } from "k6";

export const options = {
  duration: "1m", // Test duration
  vus: 50, // Number of virtual users
};

export default function () {
  http.get("http://localhost:3000"); // Replace with your endpoint
  sleep(1); // Sleep for 1 second between requests
}
