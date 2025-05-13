import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const loginBtn = document.getElementById("loginButton");
const registerBtn = document.getElementById("registerButton");

// ユーザーID → Firebase用のダミーメールアドレスに変換
function idToEmail(id) {
  return `${id}@questionbox.com`;
}

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const id = document.getElementById("loginId").value;
    const password = document.getElementById("loginPassword").value;
    try {
      await signInWithEmailAndPassword(auth, idToEmail(id), password);
      alert("ログイン成功！");
      window.location.href = "dashboard.html";
    } catch (error) {
      alert("ログイン失敗: " + error.message);
    }
  });
}

if (registerBtn) {
  registerBtn.addEventListener("click", async () => {
    const id = document.getElementById("registerId").value;
    const password = document.getElementById("registerPassword").value;
    try {
      await createUserWithEmailAndPassword(auth, idToEmail(id), password);
      alert("登録成功！");
      window.location.href = "dashboard.html";
    } catch (error) {
      alert("登録失敗: " + error.message);
    }
  });
}
