import type { VehicleType } from "@/lib/business";
import { business } from "@/lib/business";
import { ConsentCheckbox, RadioGroup, Select, TextArea, TextField } from "./Fields";
import { EnquiryForm } from "./EnquiryForm";

const labels = {
  name: "Name",
  phone: "Phone",
  vehicle: "Vehicle type",
  makeModel: "Make and model",
  problem: "Problem",
  suburb: "Location in Bloemfontein",
  service: "Call-out or drop-off",
  consent: "Consent to be contacted",
};

const vehicleValue: Record<VehicleType, string> = { motorcycle: "Motorcycle", scooter: "Scooter", quad: "Quad bike" };

export function QuoteForm({ vehicle, idPrefix = "q" }: { vehicle?: VehicleType; idPrefix?: string }) {
  const id = (n: string) => `${idPrefix}-${n}`;
  return (
    <EnquiryForm
      intent="repair"
      subject="New repair quote request - H A Motors"
      labels={Object.fromEntries(Object.entries(labels).map(([k, v]) => [id(k), v]))}
      whatsappIntro={`Hi ${business.owner}, I found ${business.name} online. I need a quote:`}
      submitLabel="Get a Quote"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Name" id={id("name")} autoComplete="name" />
        <TextField label="Phone (WhatsApp if possible)" id={id("phone")} type="tel" autoComplete="tel" inputMode="tel" pattern="[0-9+() \-]{9,18}" placeholder="061 234 5678" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Select
          label="Vehicle type"
          id={id("vehicle")}
          defaultValue={vehicle ? vehicleValue[vehicle] : ""}
          options={[
            { value: "Motorcycle", label: "Motorcycle" },
            { value: "Scooter", label: "Scooter" },
            { value: "Quad bike", label: "Quad bike" },
          ]}
        />
        <TextField label="Make and model" id={id("makeModel")} placeholder="e.g. Honda Wave 110" />
      </div>
      <TextArea label="What's the problem?" id={id("problem")} placeholder="e.g. Won't start, cuts out when hot, needs a service" />
      <TextField label="Your suburb in Bloemfontein" id={id("suburb")} autoComplete="address-level3" placeholder="e.g. Universitas" />
      <RadioGroup
        legend="Call-out or drop-off?"
        name={id("service")}
        options={[
          { value: "Call-out (come to me)", label: "Call-out, come to me" },
          { value: "Drop-off", label: "I'll drop it off" },
        ]}
      />
      <ConsentCheckbox id={id("consent")} />
    </EnquiryForm>
  );
}
