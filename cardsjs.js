// =====================
// CUSTOM CURSOR
// =====================
const cursor = document.querySelector(".cursor");
let mouseX = 0, mouseY = 0;

document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
    requestAnimationFrame(animateCursor);
}
animateCursor();

// =====================
// ENVELOPE & CARDS
// =====================
const envelope = document.querySelector(".envelope-container");
const envelopeImg = document.querySelector(".envelope");
const cards = document.querySelectorAll(".card");
let selectedCard = null;

// Envelope hover swap
envelopeImg.addEventListener("mouseenter", () => {
    if (!envelope.classList.contains("corner"))
        envelopeImg.src = envelopeImg.dataset.hover;
});
envelopeImg.addEventListener("mouseleave", () => {
    envelopeImg.src = "https://picsum.photos/id/100/320/180";
});

// Cursor active effect on envelope and cards
document.querySelectorAll(".envelope,.card").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("active"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
});

// =====================
// CARD CLICK LOGIC
// =====================
cards.forEach(card => {
    card.addEventListener("click", e => {
        e.stopPropagation();

        // First click → move card to center
        if (!selectedCard) {
            selectedCard = card;
            document.body.appendChild(card);
            card.classList.add("selected");
            envelope.classList.add("corner", "active");
            cards.forEach(c => { if (c !== card) c.style.opacity = 0; });
            return;
        }

        // If card is already opened, do nothing on left page click (closing handled separately)
        if (card === selectedCard && card.classList.contains("opened")) return;

        // ---------- Open book ----------
        if (card === selectedCard && !card.classList.contains("opened")) {
            card.classList.add("opened");

            // Rotate cover
            card.style.transform = "translate(-50%, -50%) rotateY(-180deg)";

            // After rotation, replace cover with left page
            setTimeout(() => { 
                card.src = card.dataset.left; 

                // Create right page
                const right = document.createElement("img");
                right.src = card.dataset.right;
                right.className = "card-right";
                right.style.opacity = 0;
                document.body.appendChild(right);
                card.rightPage = right;

                // Fade in right page
                setTimeout(() => { right.style.opacity = 1; }, 50);

                // Attach close listener to right page
                right.addEventListener("click", () => closeBook(card), { once: true });

            }, 300);
        }
    });
});

// ---------- Close book function ----------
function closeBook(card) {
    if (!card.classList.contains("opened")) return;

    card.style.transform = "translate(-50%, -50%) rotateY(0deg)";

    if (card.rightPage) {
        card.rightPage.style.opacity = 0;
    }

    setTimeout(() => {
        card.classList.remove("opened");
        card.src = card.dataset.front;
        if (card.rightPage) {
            document.body.removeChild(card.rightPage);
            card.rightPage = null;
        }
    }, 600);
}

// Envelope reset
envelope.addEventListener("click", () => {
    if (!envelope.classList.contains("corner")) return;

    envelope.classList.remove("corner", "active");

    cards.forEach(card => {
        card.classList.remove("selected", "opened");
        card.style.opacity = 1;
        card.style.top = "";
        card.style.left = "";
        card.style.transform = "";
        if (card.rightPage) {
            document.body.removeChild(card.rightPage);
            card.rightPage = null;
        }
        document.querySelector(".cards-container").appendChild(card);
        card.src = card.dataset.front;
    });

    selectedCard = null;
});
