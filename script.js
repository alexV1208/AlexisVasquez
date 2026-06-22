// =====================
// CONFIGURACIÓN
// =====================

// Fecha del evento
const eventDate = new Date("October 11, 2026 00:00:00");

// Fecha límite para confirmar
// (15 días antes del evento)
const confirmationLimit = new Date(eventDate);
confirmationLimit.setDate(confirmationLimit.getDate() - 15);

// =====================
// CUENTA REGRESIVA
// =====================

function updateCountdown() {

    const now = new Date().getTime();

    const distance = eventDate - now;

    if (distance < 0) {

        document.getElementById("days").innerText = "0";
        document.getElementById("hours").innerText = "0";
        document.getElementById("minutes").innerText = "0";
        document.getElementById("seconds").innerText = "0";

        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// =====================
// GALERÍA
// =====================

const slider = document.getElementById("slider");

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function moveSlide(direction) {

    currentSlide += direction;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    slider.style.transform =
        `translateX(-${currentSlide * 100}%)`;
}

// Auto slide cada 5 segundos

setInterval(() => {
    moveSlide(1);
}, 5000);

// =====================
// ANIMACIÓN SCROLL
// =====================

const fadeElements =
    document.querySelectorAll(".fade");

const observer = new IntersectionObserver(
(entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

},
{
    threshold: 0.15
});

fadeElements.forEach(el => {
    observer.observe(el);
});

// =====================
// POPUP
// =====================

function showPopup(message) {

    const popup =
        document.getElementById("popupMensaje");

    const text =
        document.getElementById("popupTexto");

    text.innerText = message;

    popup.style.display = "flex";

    setTimeout(() => {

        popup.style.display = "none";

    }, 4500);
}

// =====================
// CIERRE DE CONFIRMACIÓN
// =====================

const form = document.getElementById("rsvpForm");

const fechaTexto =
document.getElementById("fechaLimiteTexto");

const nowDate = new Date();

if (nowDate >= confirmationLimit) {

    form.style.display = "none";

    fechaTexto.innerHTML =
        "Las confirmaciones han sido cerradas.<br>Gracias por su comprensión.";

}

// =====================
// ENVÍO A APPS SCRIPT
// =====================

form.addEventListener("submit", async function(e) {

    e.preventDefault();

    const nombre =
        document.getElementById("nombre")
        .value.trim();

    const asistentes =
        document.getElementById("asistentes")
        .value.trim();

    if (!nombre || !asistentes) {

        showPopup(
            "Por favor completa todos los campos."
        );

        return;
    }

    try {

 const response = await fetch(
    `${WEBAPP_URL}?nombre=${encodeURIComponent(nombre)}&asistentes=${encodeURIComponent(asistentes)}`
);

const data = await response.json();
   
        if (data.status === "ok") {

            showPopup(
                data.message ||
                "Gracias por confirmar tu asistencia 💍"
            );

            form.reset();

        } else {

            showPopup(
                data.message ||
                "Ocurrió un error."
            );

        }

    } catch(error) {

        console.error(error);

        showPopup(
            "No fue posible enviar la confirmación."
        );

    }

});

// =====================
// EFECTO PARALLAX
// =====================

window.addEventListener("scroll", () => {

    const heroImg =
    document.querySelector(".hero-img");

    const scrollValue =
    window.pageYOffset;

    heroImg.style.transform =
    `translateY(${scrollValue * 0.3}px) scale(1.05)`;

});
