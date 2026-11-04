import type { IconName } from "@/components/ui/Icon";

/** Plain-language detail for each repair service (used on /repairs and in summaries). */
export type ServiceDetail = {
  key: "service" | "electrical" | "engine" | "tyres";
  icon: IconName;
  title: string;
  summary: string;
  covers: string[];
  signs: string[];
};

export const serviceDetails: ServiceDetail[] = [
  {
    key: "service",
    icon: "wrench",
    title: "Services and maintenance",
    summary: "Regular care that stops small problems turning into big bills.",
    covers: [
      "Engine oil and oil filter",
      "Air filter and spark plug",
      "Chain cleaned, adjusted and lubed (or drive belt checked on scooters)",
      "Brake pads, brake fluid and cables",
      "Lights, tyres and a test ride",
    ],
    signs: ["It's been months since the last service", "Brakes feel soft or noisy", "The chain is noisy or loose"],
  },
  {
    key: "electrical",
    icon: "bolt",
    title: "Electrical faults",
    summary: "We find the real cause, so you don't keep buying batteries.",
    covers: [
      "Battery keeps going flat",
      "Charging problems",
      "Lights, indicators and hooter not working",
      "Starter that clicks but won't turn",
      "Broken or corroded wiring",
    ],
    signs: ["Bike won't start", "Lights flicker or dim", "Fuses keep blowing"],
  },
  {
    key: "engine",
    icon: "engine",
    title: "Engine repairs",
    summary: "From a dirty carburettor to a full top-end rebuild.",
    covers: [
      "Carburettor strip, clean and rebuild",
      "Top-end rebuilds (piston, rings, valves and the cylinder head)",
      "Oil leaks: seals and gaskets replaced",
      "Getting bikes that have been standing running again",
    ],
    signs: ["Smoke from the exhaust", "Oil leaking", "Knocking or ticking noise", "Loses power when hot"],
  },
  {
    key: "tyres",
    icon: "tyre",
    title: "Tyres",
    summary: "Grip you can trust, whether you commute or deliver all day.",
    covers: ["Tyre changes", "Checks for wear, damage and pressure", "Honest advice on when to replace"],
    signs: ["Tread is worn smooth", "Cracks in the rubber", "Bike feels slippery in the wet"],
  },
];
