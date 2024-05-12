const deleteBtn = document.getElementById("delete-btn");
const cancleBtn = document.getElementById("cancle-btn");
const toastMessage = document.getElementById("toast-message");

function showToast() {
  toastMessage.style.opacity = "1";
  toastMessage.style.visibility = "visible";
}

function hideToast() {
  toastMessage.style.opacity = "0";
  toastMessage.style.visibility = "hidden";
}

deleteBtn.addEventListener("click", () => {
  confirmDelete();
});

cancleBtn.addEventListener("click", () => {
  cancleDelete();
});

function cancleDelete() {
  hideToast();
}
function confirmDelete() {
  hideToast();
}
deleteBtn.addEventListener("click", confirmDelete);
