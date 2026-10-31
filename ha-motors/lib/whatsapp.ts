import { business, whatsappBase, type VehicleType } from "./business";

export const vehicleLabel: Record<VehicleType, string> = {
  motorcycle: "motorcycle",
  scooter: "scooter",
  quad: "quad",
};

export function waLink(message: string): string {
  return `${whatsappBase}?text=${encodeURIComponent(message)}`;
}

export function repairMessage(vehicle?: VehicleType, area?: string): string {
  const v = vehicle ? vehicleLabel[vehicle] : "motorcycle/scooter/quad";
  const a = area?.trim() || business.area.city;
  return `Hi ${business.owner}, I found ${business.name} online. I need a quote for my ${v} in ${a}.`;
}

export const rentalMessage = `Hi ${business.owner}, I'd like to rent a scooter. Is one available?`;

export function repairLink(vehicle?: VehicleType, area?: string): string {
  return waLink(repairMessage(vehicle, area));
}

export const rentalLink = waLink(rentalMessage);

/** Turns form fields into a readable WhatsApp message (used when the form can't send). */
export function formToWhatsApp(intro: string, fields: Record<string, string>): string {
  const lines = Object.entries(fields)
    .filter(([, v]) => v.trim() !== "")
    .map(([k, v]) => `${k}: ${v}`);
  return waLink([intro, "", ...lines].join("\n"));
}
