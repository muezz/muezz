type Props = {
  index: string;
  label: string;
  aside?: string;
  dark?: boolean;
};

/** The ruled running head that opens every chapter: (02) — Services ……… aside */
export function SectionHead({ index, label, aside, dark }: Props) {
  return (
    <div
      className={`label flex items-baseline justify-between border-t pt-3 ${
        dark ? "border-line-dark text-mute-dark" : "border-line text-mute"
      }`}
    >
      <div className="flex items-baseline">
        <span className={dark ? "text-paper" : "text-ink"}>({index})</span>
        <h2 className="ml-3 font-normal">{label}</h2>
      </div>
      {aside && <span className="text-right">{aside}</span>}
    </div>
  );
}
