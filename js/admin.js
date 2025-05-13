import { auth, db } from "./firebase-config.js";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 管理者ログイン状態を確認
auth.onAuthStateChanged(async (user) => {
  if (!user || user.email !== "admin@example.com") {
    alert("管理者権限が必要です。");
    window.location.href = "index.html"; // 管理者でなければログイン画面へ
    return;
  }

  document.getElementById("adminControls").style.display = "block";

  // 質問一覧を表示
  const q = query(collection(db, "questions"));
  const querySnapshot = await getDocs(q);
  const questionList = document.getElementById("questionList");

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const card = document.createElement("div");
    card.className = "question-card";

    const text = document.createElement("p");
    text.textContent = `${data.toUserId} さんへの質問: ${data.message}`;

    card.appendChild(text);
    questionList.appendChild(card);
  });
});

// ユーザーBAN機能
document.getElementById("banUserBtn").addEventListener("click", async () => {
  const banUserId = document.getElementById("banUserId").value.trim();

  if (banUserId) {
    const usersRef = collection(db, "users");
    const userQuery = query(usersRef, where("userId", "==", banUserId));
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      document.getElementById("banStatusMessage").textContent = "ユーザーが見つかりません";
      return;
    }

    const userDoc = userSnapshot.docs[0];
    await updateDoc(userDoc.ref, {
      banned: true
    });

    document.getElementById("banStatusMessage").textContent = `${banUserId} はBANされました`;
  }
});

// 管理者から質問を送信
document.getElementById("sendAdminQuestionBtn").addEventListener("click", async () => {
  const toUserId = document.getElementById("sendToUserId").value.trim();
  const question = document.getElementById("adminQuestionText").value.trim();

  if (!toUserId || !question) {
    alert("送信先と質問内容を入力してください");
    return;
  }

  try {
    await addDoc(collection(db, "questions"), {
      toUserId,
      message: question,
      timestamp: serverTimestamp()
    });

    document.getElementById("sendAdminQuestionStatus").textContent = `質問が送信されました：${toUserId}`;
  } catch (e) {
    console.error("質問送信エラー", e);
    alert("質問送信エラー");
  }
});
