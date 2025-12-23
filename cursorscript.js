/* ===============================
   Custom cursor (desktop only)
   =============================== */
if (window.matchMedia("(pointer: fine)").matches) {

  const cursor = document.querySelector(".cursor");

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  const mainThumb = document.querySelector(".main");
  const scrollTop = document.querySelector(".scroll-top");

  mainThumb.addEventListener("mouseenter", () => {
    cursor.classList.add("active");
  });

  mainThumb.addEventListener("mouseleave", () => {
    cursor.classList.remove("active");
  });

  scrollTop.addEventListener("mouseenter", () => {
    cursor.classList.add("active");
  });

  scrollTop.addEventListener("mouseleave", () => {
    cursor.classList.remove("active");
  });
}

/* ===============================
   Scroll to top button
   =============================== */
const scrollTop = document.querySelector(".scroll-top");

window.addEventListener("scroll", () => {
  scrollTop.classList.toggle("show", window.scrollY > 50);
});

scrollTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* Thumbnail click */
document.querySelector(".main").addEventListener("click", () => {
  window.location.href = "christmas.html";
});
