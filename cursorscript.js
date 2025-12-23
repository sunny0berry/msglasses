const cursor = document.querySelector(".cursor");

// Track mouse position
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Hover effect for the main thumbnail
const mainThumb = document.querySelector(".chapter-thumbnails .main");

mainThumb.addEventListener("mouseenter", () => {
  cursor.classList.add("active");
});

mainThumb.addEventListener("mouseleave", () => {
  cursor.classList.remove("active");
});
mainThumb.addEventListener("click", () => {
  window.location.href = "christmas.html"; // link to second HTML
});

// Scroll-to-top button (exclusive to first page)
const scrollTop = document.querySelector(".scroll-top");

// Scroll event to show/hide button
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {    // adjust threshold as needed
    scrollTop.classList.add("show");
  } else {
    scrollTop.classList.remove("show");
  }
});

// Click to scroll smoothly to top
scrollTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
scrollTop.addEventListener("mouseenter", () => {
  cursor.classList.add("active"); // make cursor bigger/red
});

scrollTop.addEventListener("mouseleave", () => {
  cursor.classList.remove("active");
});