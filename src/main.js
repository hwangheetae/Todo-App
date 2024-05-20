import About from "./component/About.js";
import Home from "./component/Home.js";

const $app = document.querySelector(".App");

const routes = {
  "/": Home,
  "/about": About,
};

const renderPage = (route) => {
  $app.innerHTML = route.template();
  if (route.init) {
    route.init(); // 페이지 초기화 함수 호출
  }
};

export const changeUrl = (requestedUrl) => {
  history.pushState(null, null, requestedUrl);
  renderPage(routes[requestedUrl]);
};

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("moveToAboutPageBtn")) {
    // Home 페이지의 버튼이 클릭된 경우
    changeUrl("/about");
  } else if (e.target.classList.contains("moveToHomePageBtn")) {
    // About 페이지의 버튼이 클릭된 경우
    changeUrl("/");
  }
});

window.addEventListener("popstate", () => {
  changeUrl(window.location.pathname);
});

renderPage(routes["/"]);
