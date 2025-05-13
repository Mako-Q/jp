import { auth, db } from "./firebase-config.js";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import html2canvas from "./html2canvas.min.js";

function emailToId(email) {
  return email.split("@")[0]; // "makoto@..." → "makoto"
}

// 認証状態が変わったら処理を開始
auth.onAuthStateChanged(async (user) => {
  if (user) {
    const userId = emailToId(user.email);
    const q = query(
      collection(db, "questions"),
      where("toUserId", "==", userId),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);

    const questionList = document.getElementById("questionList");
    questionList.innerHTML = "";

    querySnapshot.forEach((doc, index) => {
      const data = doc.data();

      const card = document.createElement("div");
      card.className = "question-card";
      card.id = `card-${index}`;

      const text = document.createElement("p");
      text.textContent = data.message;

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "画像として保存";
      saveBtn.onclick = () => saveAsImage(card.id);

      card.appendChild(text);
      card.appendChild(saveBtn);
      questionList.appendChild(card);
    });
  } else {
    alert("ログインが必要です");
    window.location.href = "index.html";
  }
});

function saveAsImage(cardId) {
  const card = document.getElementById(cardId);
  html2canvas(card).then(canvas => {
    const link = document.createElement("a");
    link.download = "question.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}
