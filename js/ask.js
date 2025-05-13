import { db } from "./firebase-config.js";
import {
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// URLパラメータから to=〇〇 を取得
function getToUserIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("to");
}

con
