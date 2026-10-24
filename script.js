
/* =========================================
   CELESTIUS — COMPLETE JAVASCRIPT
   Intro, Events, Registration, Music, Star Rail
========================================= */

const intro = document.getElementById("intro");
const mainSite = document.getElementById("main-site");
const enterStar = document.getElementById("enter-star");
const skipIntro = document.getElementById("skip-intro");
const whiteFlash = document.getElementById("white-flash");
const starfield = document.getElementById("starfield");

const soundToggle = document.getElementById("sound-toggle");
const eventList = document.getElementById("event-list");
const eventDialog = document.getElementById("event-dialog");
const closeDialog = document.getElementById("close-dialog");
const detailContent = document.getElementById("event-detail-content");

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

let introOpened = false;
let revealObserver = null;


/* =========================================
   STARFIELD
========================================= */

function createStarfield() {
    if (!starfield) return;

    const fragment = document.createDocumentFragment();
    const count = window.innerWidth < 600 ? 100 : 180;

    for (let i = 0; i < count; i++) {
        const star = document.createElement("span");
        star.className = "tiny-star";

        const size = Math.random() * 1.6 + 0.5;

        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        star.style.setProperty("--duration", `${2 + Math.random() * 4}s`);
        star.style.setProperty("--delay", `${-Math.random() * 5}s`);

        fragment.appendChild(star);
    }

    starfield.replaceChildren(fragment);
}

createStarfield();


/* =========================================
   MUSIC — FÜR ELISE
   Keep fur-elise.mp3 beside index.html.
========================================= */

const furEliseAudio = new Audio("./fur-elise.mp3");
furEliseAudio.loop = true;
furEliseAudio.volume = 0.35;
furEliseAudio.preload = "auto";

let musicBusy = false;

function updateSoundButton(isPlaying) {
    if (!soundToggle) return;

    soundToggle.textContent = isPlaying
        ? "♫ Sound on"
        : "♫ Sound off";

    soundToggle.setAttribute("aria-pressed", String(isPlaying));
}

if (soundToggle) {
    updateSoundButton(false);

    soundToggle.addEventListener("click", async () => {
        if (musicBusy) return;
        musicBusy = true;

        try {
            if (furEliseAudio.paused) {
                await furEliseAudio.play();
                updateSoundButton(true);
            } else {
                furEliseAudio.pause();
                updateSoundButton(false);
            }
        } catch (error) {
            console.error("Music playback failed:", error);
            soundToggle.textContent = "♫ Check audio file";
            soundToggle.setAttribute("aria-pressed", "false");
        } finally {
            musicBusy = false;
        }
    });

    furEliseAudio.addEventListener("play", () => updateSoundButton(true));
    furEliseAudio.addEventListener("pause", () => updateSoundButton(false));
    furEliseAudio.addEventListener("error", () => {
        console.error(
            "Could not load fur-elise.mp3. Check the filename, location and file format."
        );
    });
}


/* =========================================
   INTRO TRANSITION
========================================= */

function enterCelestius() {
    if (introOpened || !intro || !mainSite) return;

    introOpened = true;

    if (enterStar) {
        enterStar.disabled = true;
        enterStar.classList.add("star-selected");
    }

    if (reducedMotion) {
        intro.classList.add("leaving");
        mainSite.classList.add("visible");
        mainSite.inert = false;
        intro.setAttribute("aria-hidden", "true");

        window.scrollTo(0, 0);
        observeReveals();
        return;
    }

    if (whiteFlash) {
        whiteFlash.classList.remove("flash");
        void whiteFlash.offsetWidth;
        whiteFlash.classList.add("flash");
    }

    window.setTimeout(() => {
        mainSite.classList.add("visible");
        mainSite.inert = false;
        intro.setAttribute("aria-hidden", "true");

        window.scrollTo(0, 0);
        observeReveals();
    }, 580);

    window.setTimeout(() => {
        intro.classList.add("leaving");
    }, 1000);
}

if (enterStar) {
    enterStar.addEventListener("click", enterCelestius);
}

if (skipIntro) {
    skipIntro.addEventListener("click", enterCelestius);
}


/* =========================================
   EVENT DATA
========================================= */

const events = [
    {
        id: "01",
        title: "Cosmic Code",
        category: "TECHNOLOGY",
        description: "A creative coding challenge where ideas become interactive experiences.",
        date: "Date to be announced",
        time: "To be announced",
        venue: "Campus venue to be announced",
        art: "⌘",
        artA: "#30265D",
        artB: "#101A37",
        glow: "#9D85FF",
        fullDescription: "Bring your curiosity, collaborate with other students, and turn a fresh idea into something that works. Replace this sample description with the official event brief.",
        schedule: ["Opening and introduction", "Main activity", "Showcase and closing"],
        eligibility: "Confirm the participation rules with the club."
    },
    {
        id: "02",
        title: "Beyond the Stars",
        category: "CREATIVE",
        description: "An imaginative challenge for curious minds, bold ideas, and unexpected discoveries.",
        date: "Date to be announced",
        time: "To be announced",
        venue: "Campus venue to be announced",
        art: "✧",
        artA: "#48265F",
        artB: "#17132E",
        glow: "#D3A0FF",
        fullDescription: "Explore a creative theme, experiment with new approaches, and share your perspective with the Celestius community. Replace this sample text with the official event details.",
        schedule: ["Welcome session", "Creative challenge", "Final showcase"],
        eligibility: "Confirm the participation rules with the club."
    },
    {
        id: "03",
        title: "The Idea Orbit",
        category: "INNOVATION",
        description: "Bring a thought, discover new perspectives, and turn possibilities into a plan.",
        date: "Date to be announced",
        time: "To be announced",
        venue: "Campus venue to be announced",
        art: "◎",
        artA: "#173F63",
        artB: "#11172F",
        glow: "#76CFFF",
        fullDescription: "A sample event concept for brainstorming and collaboration. Add the official activities, format, and participation details before publishing.",
        schedule: ["Introduction", "Idea development", "Presentations"],
        eligibility: "Confirm the participation rules with the club."
    },
    {
        id: "04",
        title: "Stellar Sessions",
        category: "COMMUNITY",
        description: "Meet fellow students, exchange ideas, and discover something unexpected.",
        date: "Date to be announced",
        time: "To be announced",
        venue: "Campus venue to be announced",
        art: "✳",
        artA: "#63365F",
        artB: "#21172F",
        glow: "#F0A9E7",
        fullDescription: "A sample community gathering designed to bring curious minds together. Replace this copy with the real event description.",
        schedule: ["Welcome and introductions", "Group activity", "Open discussion"],
        eligibility: "Confirm the participation rules with the club."
    },
    {
        id: "05",
        title: "Orbit Unplugged",
        category: "CULTURE",
        description: "A relaxed space to share talents, creative work, and good ideas.",
        date: "Date to be announced",
        time: "To be announced",
        venue: "Campus venue to be announced",
        art: "♫",
        artA: "#284A70",
        artB: "#121B38",
        glow: "#93CFFF",
        fullDescription: "A sample creative gathering for music, expression, and connection. Add the official event activities before launch.",
        schedule: ["Opening session", "Performances and activities", "Closing session"],
        eligibility: "Confirm the participation rules with the club."
    },
    {
        id: "06",
        title: "Future Foundry",
        category: "INNOVATION",
        description: "Explore new ideas, work together, and imagine what comes next.",
        date: "Date to be announced",
        time: "To be announced",
        venue: "Campus venue to be announced",
        art: "✧",
        artA: "#244C62",
        artB: "#131A35",
        glow: "#8CE2FF",
        fullDescription: "A sample innovation event focused on collaboration and creative problem-solving. Replace this text with the official event brief.",
        schedule: ["Introduction", "Idea-building session", "Team presentations"],
        eligibility: "Confirm the participation rules with the club."
    }
];


/* =========================================
   RENDER EVENT CARDS
========================================= */

function renderEvents() {
    if (!eventList) return;

    eventList.replaceChildren();

    events.forEach((event, index) => {
        const card = document.createElement("article");
        card.className = "event-card reveal";
        card.style.transitionDelay = `${(index % 3) * 80}ms`;

        const art = document.createElement("div");
        art.className = "event-art";
        art.style.setProperty("--art-a", event.artA);
        art.style.setProperty("--art-b", event.artB);
        art.style.setProperty("--art-glow", event.glow);

        const symbol = document.createElement("span");
        symbol.textContent = event.art;
        art.appendChild(symbol);

        const copy = document.createElement("div");
        copy.className = "event-copy";

        const category = document.createElement("p");
        category.className = "event-category";
        category.textContent = event.category;

        const title = document.createElement("h3");
        title.textContent = event.title;

        const description = document.createElement("p");
        description.append(document.createTextNode(event.description + " "));

        const littleStar = document.createElement("span");
        littleStar.className = "star-separator";
        littleStar.textContent = "✦";
        description.appendChild(littleStar);

        const meta = document.createElement("div");
        meta.className = "event-meta";

        const date = document.createElement("span");
        date.textContent = `◷ ${event.date}`;

        const venue = document.createElement("span");
        venue.textContent = `⌖ ${event.venue}`;

        meta.append(date, venue);
        copy.append(category, title, description, meta);

        const action = document.createElement("button");
        action.className = "event-action";
        action.type = "button";
        action.textContent = "Explore event";
        action.addEventListener("click", () => openEvent(event));

        card.append(art, copy, action);
        eventList.appendChild(card);
    });
}

renderEvents();


/* =========================================
   EVENT DETAILS + REGISTRATION
========================================= */

function openEvent(event) {
    if (!detailContent || !eventDialog) return;

    detailContent.replaceChildren();
    detailContent.scrollTop = 0;

    const art = document.createElement("div");
    art.className = "detail-art";
    art.style.setProperty("--art-a", event.artA);
    art.style.setProperty("--art-b", event.artB);
    art.style.setProperty("--art-glow", event.glow);
    art.textContent = event.art;

    const category = document.createElement("p");
    category.className = "event-category";
    category.textContent = `EVENT ${event.id} · ${event.category}`;

    const title = document.createElement("h2");
    title.textContent = event.title;

    const description = document.createElement("p");
    description.append(document.createTextNode(event.fullDescription + " "));

    const descriptionStar = document.createElement("span");
    descriptionStar.className = "star-separator";
    descriptionStar.textContent = "✦";
    description.appendChild(descriptionStar);

    const facts = document.createElement("div");
    facts.className = "detail-facts";

    [
        ["DATE", event.date],
        ["TIME", event.time],
        ["VENUE", event.venue],
        ["ELIGIBILITY", event.eligibility]
    ].forEach(([labelText, valueText]) => {
        const fact = document.createElement("div");
        fact.className = "detail-fact";

        const label = document.createElement("span");
        label.textContent = labelText;

        const value = document.createElement("div");
        value.textContent = valueText;

        fact.append(label, value);
        facts.appendChild(fact);
    });

    const scheduleTitle = document.createElement("p");
    scheduleTitle.className = "event-category";
    scheduleTitle.textContent = "THE JOURNEY";

    const schedule = document.createElement("ol");

    event.schedule.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        schedule.appendChild(li);
    });

    const invitation = document.createElement("h3");
    invitation.textContent = "Interested in participating?";

    const invitationText = document.createElement("p");
    invitationText.textContent =
        "Your next adventure starts here — register your interest below.";

    const registerButton = document.createElement("button");
    registerButton.className = "detail-cta";
    registerButton.type = "button";
    registerButton.textContent = "Register for this event ✦";

    const registration = document.createElement("section");
    registration.className = "registration";

    const formTitle = document.createElement("h3");
    formTitle.textContent = "Join the constellation";

    const formIntro = document.createElement("p");
    formIntro.textContent = "Enter your details to register your interest.";

    const form = document.createElement("form");
    form.className = "registration-form";

    const fields = [
        { name: "name", label: "FULL NAME", type: "text", autocomplete: "name" },
        { name: "email", label: "COLLEGE EMAIL", type: "email", autocomplete: "email" },
        { name: "course", label: "COURSE", type: "text", autocomplete: "off" },
        { name: "year", label: "YEAR OF STUDY", type: "select", autocomplete: "off" },
        { name: "phone", label: "PHONE NUMBER", type: "tel", autocomplete: "tel" }
    ];

    fields.forEach(field => {
        const label = document.createElement("label");
        label.className = "form-field";
        label.appendChild(document.createTextNode(field.label));

        let input;

        if (field.type === "select") {
            input = document.createElement("select");

            const placeholder = document.createElement("option");
            placeholder.value = "";
            placeholder.textContent = "Select your year";
            placeholder.disabled = true;
            placeholder.selected = true;
            input.appendChild(placeholder);

            ["1st Year", "2nd Year", "3rd Year", "4th Year", "Other"]
                .forEach(year => {
                    const option = document.createElement("option");
                    option.value = year;
                    option.textContent = year;
                    input.appendChild(option);
                });
        } else {
            input = document.createElement("input");
            input.type = field.type;
            input.autocomplete = field.autocomplete;
        }

        input.name = field.name;
        input.required = true;

        if (field.name === "phone") {
            input.maxLength = 15;
            input.minLength = 7;
            input.pattern = "[0-9+() -]{7,15}";
            input.title = "Enter a valid phone number.";
        }

        label.appendChild(input);
        form.appendChild(label);
    });

    const submit = document.createElement("button");
    submit.className = "detail-cta";
    submit.type = "submit";
    submit.textContent = "Submit registration ✦";

    const status = document.createElement("p");
    status.className = "form-status";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");

    form.append(submit, status);
    registration.append(formTitle, formIntro, form);

    registerButton.addEventListener("click", () => {
        registration.classList.add("expanded");
        registerButton.textContent = "Registration form opened ✦";
        registerButton.disabled = true;

        window.setTimeout(() => {
            registration.scrollIntoView({
                behavior: reducedMotion ? "auto" : "smooth",
                block: "nearest"
            });

            const firstInput = registration.querySelector("input");
            if (firstInput) firstInput.focus({ preventScroll: true });

            updateStarScrollbar();
        }, 250);
    });

    form.addEventListener("submit", submitEvent => {
        submitEvent.preventDefault();
        if (!form.reportValidity()) return;

        status.textContent =
            "Your details are valid, but online registration isn't connected yet.";

        submit.disabled = true;

        form.querySelectorAll("input, select").forEach(input => {
            input.disabled = true;
        });

        // Demo only: this does not send or store registration data online.
        console.info("Demo registration:", {
            eventId: event.id,
            eventTitle: event.title,
            name: form.elements.name.value,
            email: form.elements.email.value,
            course: form.elements.course.value,
            year: form.elements.year.value,
            phone: form.elements.phone.value
        });
    });

    detailContent.append(
        art, category, title, description, facts,
        scheduleTitle, schedule, invitation,
        invitationText, registerButton, registration
    );

    eventDialog.showModal();

    requestAnimationFrame(updateStarScrollbar);
}


/* =========================================
   CLOSE DIALOG
========================================= */

if (closeDialog && eventDialog) {
    closeDialog.addEventListener("click", () => eventDialog.close());

    eventDialog.addEventListener("click", event => {
        if (event.target === eventDialog) eventDialog.close();
    });
}


/* =========================================
   CUSTOM DRAGGABLE SHOOTING-STAR SCROLLBAR
   Scrolls detailContent, rail stays on dialog.
========================================= */

let starRail = null;
let starThumb = null;
let draggingStar = false;
let dragStartY = 0;
let dragStartScroll = 0;

function installStarScrollbar() {
    if (!eventDialog || !detailContent || starRail) return;

    starRail = document.createElement("div");
    starRail.className = "star-scroll-rail";

    starThumb = document.createElement("div");
    starThumb.className = "star-scroll-thumb";
    starThumb.setAttribute("role", "scrollbar");
    starThumb.setAttribute("aria-label", "Scroll event details");
    starThumb.setAttribute("aria-controls", "event-detail-content");
    starThumb.setAttribute("aria-orientation", "vertical");
    starThumb.setAttribute("tabindex", "0");

    starRail.appendChild(starThumb);
    eventDialog.appendChild(starRail);

    starThumb.addEventListener("pointerdown", event => {
        draggingStar = true;
        dragStartY = event.clientY;
        dragStartScroll = detailContent.scrollTop;

        try {
            starThumb.setPointerCapture(event.pointerId);
        } catch (error) {
            // Continue without pointer capture if unsupported.
        }

        event.preventDefault();
    });

    starThumb.addEventListener("pointermove", event => {
        if (!draggingStar) return;

        const maxScroll =
            detailContent.scrollHeight - detailContent.clientHeight;
        const maxTravel =
            starRail.clientHeight - starThumb.offsetHeight;

        if (maxScroll <= 0 || maxTravel <= 0) return;

        const distance = event.clientY - dragStartY;
        detailContent.scrollTop =
            dragStartScroll + distance * (maxScroll / maxTravel);
    });

    function stopDragging() {
        draggingStar = false;
    }

    starThumb.addEventListener("pointerup", stopDragging);
    starThumb.addEventListener("pointercancel", stopDragging);
    starThumb.addEventListener("lostpointercapture", stopDragging);

    starRail.addEventListener("pointerdown", event => {
        if (event.target === starThumb) return;

        const rect = starRail.getBoundingClientRect();
        const maxScroll =
            detailContent.scrollHeight - detailContent.clientHeight;
        const maxTravel =
            starRail.clientHeight - starThumb.offsetHeight;

        if (maxScroll <= 0 || maxTravel <= 0) return;

        const pointerY =
            event.clientY - rect.top - starThumb.offsetHeight / 2;
        const progress = Math.max(0, Math.min(1, pointerY / maxTravel));

        detailContent.scrollTop = progress * maxScroll;
    });

    starThumb.addEventListener("keydown", event => {
        const steps = {
            ArrowDown: 35,
            ArrowUp: -35,
            PageDown: detailContent.clientHeight * 0.8,
            PageUp: -detailContent.clientHeight * 0.8,
            Home: -detailContent.scrollTop,
            End: detailContent.scrollHeight -
                detailContent.clientHeight - detailContent.scrollTop
        };

        if (Object.prototype.hasOwnProperty.call(steps, event.key)) {
            detailContent.scrollTop += steps[event.key];
            event.preventDefault();
        }
    });

    detailContent.addEventListener("scroll", updateStarScrollbar);
    window.addEventListener("resize", updateStarScrollbar);

    if ("ResizeObserver" in window) {
        const observer = new ResizeObserver(updateStarScrollbar);
        observer.observe(detailContent);
        observer.observe(eventDialog);
    }

    updateStarScrollbar();
}

function updateStarScrollbar() {
    if (!starRail || !starThumb || !detailContent) return;

    const maxScroll =
        detailContent.scrollHeight - detailContent.clientHeight;
    const maxTravel =
        starRail.clientHeight - starThumb.offsetHeight;

    if (maxScroll <= 2 || maxTravel <= 0) {
        starRail.style.display = "none";
        return;
    }

    starRail.style.display = "block";

    const progress = Math.max(
        0,
        Math.min(1, detailContent.scrollTop / maxScroll)
    );

    starThumb.style.top = `${progress * maxTravel}px`;

    starThumb.setAttribute("aria-valuemin", "0");
    starThumb.setAttribute("aria-valuemax", String(maxScroll));
    starThumb.setAttribute(
        "aria-valuenow",
        String(Math.round(detailContent.scrollTop))
    );
}

installStarScrollbar();


/* =========================================
   SCROLL REVEALS
========================================= */

function observeReveals() {
    const elements = document.querySelectorAll(
        "#main-site .reveal:not(.in-view)"
    );

    if (
        reducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        elements.forEach(element => element.classList.add("in-view"));
        return;
    }

    if (revealObserver) revealObserver.disconnect();

    revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px"
    });

    elements.forEach(element => revealObserver.observe(element));
}


/* =========================================
   INITIAL STATE
========================================= */

if (reducedMotion && intro) {
    intro.classList.add("reduced-motion");
}

if (mainSite && mainSite.classList.contains("visible")) {
    observeReveals();
}

/* CINEMATIC OPENING: STAR → ZOOM → WHITEOUT → INTRO */
(function startCelestiusOpening() {
    const intro = document.getElementById("intro");

    if (!intro) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        intro.classList.add("intro-ready");
        return;
    }

    const star = document.createElement("div");
    star.className = "intro-shooting-star";
    star.setAttribute("aria-hidden", "true");
    intro.appendChild(star);

    const whiteout = document.createElement("div");
    whiteout.id = "intro-whiteout";
    whiteout.setAttribute("aria-hidden", "true");
    intro.appendChild(whiteout);

    // 1. The star rushes across the galaxy.
    requestAnimationFrame(() => {
        intro.classList.add("cinematic-flight");
    });

    // 2. Camera zooms toward the moving star.
    window.setTimeout(() => {
        intro.classList.add("cinematic-zoom");
    }, 650);

    // 3. The screen becomes completely white.
    window.setTimeout(() => {
        whiteout.classList.remove("flash");
        void whiteout.offsetWidth;
        whiteout.classList.add("flash");
    }, 1900);

    // 4. The white fades away and reveals the intro title/button.
    window.setTimeout(() => {
    star.remove();
    intro.classList.remove("cinematic-flight", "cinematic-zoom");

    // Wait until the white flash has almost finished.
    window.setTimeout(() => {
        intro.classList.add("intro-ready");
    }, 350);
}, 2800);
})();
