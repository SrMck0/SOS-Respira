document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  if (menu) {
    menu.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      menu.setAttribute("aria-expanded", open);
    });
  }

  const homeQuote = document.getElementById("homeQuote");
  const newQuote = document.getElementById("newQuote");
  const bigQuote = document.getElementById("bigQuote");
  const nextPhrase = document.getElementById("nextPhrase");
  let last = -1;

  function randomPhrase() {
    if (!window.frases?.length) return "";
    let i;
    do { i = Math.floor(Math.random() * frases.length); } while (frases.length > 1 && i === last);
    last = i;
    return frases[i];
  }

  function showQuote(target) {
    if (!target) return;
    target.classList.add("fade");
    setTimeout(() => {
      target.textContent = randomPhrase();
      target.classList.remove("fade");
    }, 150);
  }

  if (newQuote) newQuote.addEventListener("click", () => showQuote(homeQuote));
  if (nextPhrase) nextPhrase.addEventListener("click", () => showQuote(bigQuote));

  const copy = document.getElementById("copyPhrase");
  const status = document.getElementById("copyStatus");
  if (copy && bigQuote) {
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(bigQuote.textContent);
        status.textContent = "Frase copiada.";
      } catch {
        status.textContent = "Não foi possível copiar automaticamente.";
      }
      setTimeout(() => status.textContent = "", 2500);
    });
  }
});