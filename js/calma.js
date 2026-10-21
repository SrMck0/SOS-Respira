document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("startBreathing");
  const circle = document.getElementById("breathingCircle");
  const text = document.getElementById("breathingText");
  const title = document.getElementById("breathingTitle");
  const instruction = document.getElementById("breathingInstruction");
  if (!button) return;

  let running = false;
  const steps = [
    { label: "Inspire", seconds: 4, mode: "inhale", note: "Inspire de forma confortável, sem forçar." },
    { label: "Segure", seconds: 2, mode: "hold", note: "Apenas faça uma pequena pausa." },
    { label: "Expire", seconds: 6, mode: "exhale", note: "Solte o ar lentamente, no seu próprio ritmo." }
  ];

  button.addEventListener("click", () => {
    if (running) return;
    running = true;
    button.disabled = true;
    title.textContent = "Acompanhe apenas o seu ritmo";
    let round = 0, step = 0, remaining = steps[0].seconds;

    circle.className = "breathing-circle";
    function tick() {
      const current = steps[step];
      circle.className = "breathing-circle " + current.mode;
      text.textContent = `${current.label} ${remaining}`;
      instruction.textContent = current.note;

      if (remaining > 1) {
        remaining--;
        setTimeout(tick, 1000);
      } else {
        step++;
        if (step >= steps.length) {
          step = 0;
          round++;
        }
        if (round >= 4) {
          circle.className = "breathing-circle";
          text.textContent = "Muito bem";
          instruction.textContent = "O exercício terminou. Volte ao seu ritmo normal e observe como você está.";
          button.disabled = false;
          button.textContent = "Fazer novamente";
          running = false;
          return;
        }
        remaining = steps[step].seconds;
        setTimeout(tick, 1000);
      }
    }
    tick();
  });
});