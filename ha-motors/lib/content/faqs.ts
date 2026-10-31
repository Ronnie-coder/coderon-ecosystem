import { business } from "../business";

export type Faq = { q: string; a: string };

const r = business.rental;

export const homeFaqs: Faq[] = [
  { q: "Do you work on all brands?", a: "Yes. We work on all brands of motorcycles, scooters and quad bikes." },
  { q: "Do you come to me?", a: `Yes. ${business.owner} does call-outs anywhere in ${business.area.city}. You can also arrange to drop your bike off.` },
  { q: "Is there a call-out fee?", a: "It depends on distance, and we include it in your quote upfront. No surprises." },
  { q: "How do I get a price?", a: "WhatsApp us the make, model and the problem, with a photo if you can. We'll come back to you with a quote." },
  { q: "Can I book during the week?", a: `Yes, by appointment. We're open ${business.hours.weekend}, and Monday to Friday by appointment.` },
  { q: "What do I need to rent a scooter?", a: "A valid ID, a valid driver's licence and proof of address. We check the documents in person." },
  { q: `What does ${r.priceDisplay} a week include?`, a: "The scooter, with maintenance and servicing included. Damage or repairs caused by negligence are for the rider's account." },
  { q: "Are the rental scooters insured?", a: "Yes. Damage caused by rider negligence is for the rider's account." },
];

export const motorcycleFaqs: Faq[] = [
  { q: "Can you service my motorcycle at my house?", a: `Yes. Most services and many repairs can be done where your bike is, anywhere in ${business.area.city}. Bigger engine jobs may need a drop-off, and we'll tell you upfront.` },
  { q: "Do you rebuild carburettors?", a: "Yes. We strip, clean and rebuild carburettors, and set them up so the bike idles and pulls properly." },
  { q: "Do you sell parts or bikes?", a: "No. We fix bikes. If your repair needs parts, we'll explain what's needed in your quote." },
  { q: "My delivery bike is my income. How fast can you help?", a: "WhatsApp a photo and the problem straight away. We know downtime costs you money, so we'll give you a quote and the earliest time we can get to you." },
];

export const scooterFaqs: Faq[] = [
  { q: "Which scooters do you repair?", a: "All brands and sizes, from small commuter scooters to 200cc delivery scooters." },
  { q: "My scooter won't start. Can you come to me?", a: `Yes. We do call-outs anywhere in ${business.area.city}. Send us a message with what happens when you try to start it.` },
  { q: "How often should a scooter be serviced?", a: "It depends on the scooter and how hard it works. Delivery scooters doing long days need checks far more often than a weekend runabout. Ask us and we'll suggest a schedule for your use." },
  { q: "Can I rent a scooter while mine is being fixed?", a: `We rent ${r.model} scooters at ${r.priceDisplay} per week, subject to availability. ${r.scarcity}` },
];

export const quadFaqs: Faq[] = [
  { q: "Do you work on sport and utility quads?", a: "Yes. Sport quads and utility quads, all brands." },
  { q: "Can you fix quad brakes and winches?", a: "Yes. We regularly strip quad front ends for brake work and winch repairs." },
  { q: "Can you come to my plot or farm?", a: `We do call-outs anywhere in ${business.area.city}. The call-out fee depends on distance and is included in your quote. Tell us where the quad is when you ask for a quote.` },
  { q: "Do you sell quads or parts?", a: "No. We repair and service quads. Any parts needed are explained in your quote." },
];

export const rentalFaqs: Faq[] = [
  { q: `How much is a scooter to rent?`, a: `${r.priceDisplay} per week for a ${r.model}.` },
  { q: "What's included?", a: "The scooter, maintenance, servicing and insurance. Damage or repairs caused by rider negligence are for the rider's account." },
  { q: "What documents do I need?", a: "A valid ID, a valid driver's licence and proof of address. Bring them along when you collect. We don't ask for documents online." },
  { q: "Can I use it for food and grocery delivery?", a: "Yes. Most of our riders use the scooters for delivery work or for commuting." },
  { q: "Is a scooter available now?", a: `We only have ${r.fleetSize}, so availability changes. WhatsApp us or send the form and we'll let you know.` },
];
