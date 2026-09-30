function nextPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// RUNAWAY "NO" BUTTON 😭

const noButton = document.getElementById("noButton");

function moveNoButton() {
    const x = Math.random() * 220 - 110;
    const y = Math.random() * 120 - 60;

    noButton.style.transform = `translate(${x}px, ${y}px)`;
}

noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("touchstart", moveNoButton);


function wormYes() {
    document.getElementById("wormMessage").innerText =
        "Correct answer. You may keep your girlfriend. 😌❤️";

    setTimeout(() => {
        nextPage("q5");
    }, 1600);
}


// KISSES

function kissAnswer(answer) {
    const message = document.getElementById("kissMessage");

    if (answer === "infinite") {
        message.innerText = "Correct. I was testing you. 😌💋";
    } else {
        message.innerText =
            "Wrong. The correct answer was obviously infinite. 🙄❤️";
    }

    setTimeout(() => {
        nextPage("q8");
    }, 1800);
}


function showFinalIntro() {
    nextPage("finalIntro");
}


// RANDOM LOVE MESSAGES

const loveMessages = [
    "I love you more than you know. ❤️",

    "Yes, I'm probably missing you right now too. 🥺",

    "Come back to me safely, okay? ❤️",

    "Your girl is waiting for you 👀❤️",

    "Virtual forehead kiss delivered. 💋",

    "No matter how far you are, you're still my favorite person.",

    "One day we won't have to say goodnight through a screen. ❤️",

    "I'm so excited for all the boring little everyday moments with you.",

    "Reminder: you're very, very loved.",

    "If today was hard, come here. Imagine I'm giving you the biggest hug.",

    "Distance is temporary. Us? That's the plan. ❤️",

    "You're my favorite notification.",

    "I hope something makes you smile today. Preferably me. 😌",

    "I choose you today too. And tomorrow. And after that.",

    "Okay now stop pressing this button and call me. 🙄❤️"
];


function randomLoveMessage() {
    const randomIndex =
        Math.floor(Math.random() * loveMessages.length);

    document.getElementById("loveMessage").innerText =
        loveMessages[randomIndex];

    createHeartBurst();
}


// HEART BURST

function createHeartBurst() {
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement("div");

        heart.innerHTML = "❤️";
        heart.style.position = "fixed";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = Math.random() * 100 + "vh";
        heart.style.fontSize =
            Math.random() * 20 + 12 + "px";

        heart.style.transition = "1s";
        heart.style.pointerEvents = "none";

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.style.opacity = "0";
            heart.style.transform =
                "translateY(-60px) scale(1.5)";
        }, 50);

        setTimeout(() => {
            heart.remove();
        }, 1100);
    }
}


// BACKGROUND FLOATING HEARTS

function createFloatingHeart() {
    const heart = document.createElement("div");

    const hearts = ["❤️", "💕", "💗", "🤍"];

    heart.innerHTML =
        hearts[Math.floor(Math.random() * hearts.length)];

    heart.classList.add("floating-heart");

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.fontSize =
        Math.random() * 18 + 10 + "px";

    heart.style.animationDuration =
        Math.random() * 4 + 6 + "s";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 10000);
}

setInterval(createFloatingHeart, 700);
// SHOW ALL OF HIS ANSWERS

function getAnswersText() {
    const memory = document.getElementById("memory").value || "No answer 👀";
    const miss = document.getElementById("miss").value || "No answer 👀";
    const place = document.getElementById("place").value || "No answer 👀";
    const smile = document.getElementById("smile").value || "No answer 👀";
    const future = document.getElementById("future").value || "No answer 👀";

    return `My answers for you ❤️

🥺 A moment with you I'd relive forever:
${memory}

💕 What I miss most when we're apart:
${miss}

🌎 Where I'd disappear with you for a week:
${place}

😊 Something you do that secretly makes me smile:
${smile}

💋 How many kisses you owe me:
INFINITE. Obviously.

💍 What I'm most excited about for our future:
${future}

❤️ Love,
Your Bobateaaa`;
}


function showAnswers() {
    const memory = document.getElementById("memory").value || "No answer 👀";
    const miss = document.getElementById("miss").value || "No answer 👀";
    const place = document.getElementById("place").value || "No answer 👀";
    const smile = document.getElementById("smile").value || "No answer 👀";
    const future = document.getElementById("future").value || "No answer 👀";

    document.getElementById("answersText").innerHTML = `
        <p><strong>🥺 A moment I'd relive forever:</strong><br>${escapeHTML(memory)}</p>

        <p><strong>💕 What I miss most:</strong><br>${escapeHTML(miss)}</p>

        <p><strong>🌎 Where I'd disappear with you:</strong><br>${escapeHTML(place)}</p>

        <p><strong>😊 Something you do that makes me smile:</strong><br>${escapeHTML(smile)}</p>

        <p><strong>💋 Kisses you owe me:</strong><br>INFINITE. Obviously.</p>

        <p><strong>💍 What I'm excited about for our future:</strong><br>${escapeHTML(future)}</p>
    `;

    document.getElementById("answersBox").style.display = "block";

    document.getElementById("answersBox").scrollIntoView({
        behavior: "smooth"
    });
}


function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}


// SHARE HIS ANSWERS

async function shareAnswers() {
    const answers = getAnswersText();

    if (navigator.share) {
        try {
            await navigator.share({
                title: "My Answers For You ❤️",
                text: answers
            });
        } catch (error) {
            console.log("Sharing cancelled.");
        }
    } else {
        await navigator.clipboard.writeText(answers);

        alert(
            "Your answers were copied! ❤️ Paste them into a message and send them to me 😌"
        );
    }
}