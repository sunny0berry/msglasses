const cursor = document.querySelector(".cursor");

// Track mouse position
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Hover effect
document.querySelectorAll("button").forEach(button => {
  button.addEventListener("mouseenter", () => {
    cursor.classList.add("active");
  });

  button.addEventListener("mouseleave", () => {
    cursor.classList.remove("active");
  });
});
