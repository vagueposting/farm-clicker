import { usePlayerStore } from "../stores/player-store";

export function PlayerStats() {
  const { wallet } = usePlayerStore();

  return (
    <>
      <p>
        <b>Money:</b> ${wallet.money}
      </p>
      <p>
        <b>Diamonds:</b> 💎{wallet.diamonds}
      </p>
    </>
  );
}
