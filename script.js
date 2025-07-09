document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");

  // Load last viewed page from localStorage or default to profile
  const lastPage = localStorage.getItem("currentPage") || "profile";
  loadPage(lastPage);

  // Setup nav links
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.getAttribute("data-page");
      loadPage(page);
      history.pushState({ page }, "", `#${page}`);
      localStorage.setItem("currentPage", page);
    });
  });

  // Handle browser back/forward
  window.addEventListener("popstate", (e) => {
    const page = e.state ? e.state.page : "profile";
    loadPage(page);
    localStorage.setItem("currentPage", page);
  });

  function loadPage(page) {
    fetch(`${page}.html`)
      .then((res) => res.text())
      .then((data) => {
        content.innerHTML = data;
      })
      .catch(() => {
        content.innerHTML = "<p>Page not found.</p>";
      });
  }
});
