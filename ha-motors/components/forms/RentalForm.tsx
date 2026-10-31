import { business } from "@/lib/business";
import { ConsentCheckbox, RadioGroup, Select, TextField } from "./Fields";
import { EnquiryForm } from "./EnquiryForm";

/** Deliberately no ID numbers or uploads: documents are checked in person (POPIA minimisation). */
export function RentalForm() {
  return (
    <EnquiryForm
      intent="rental"
      subject="New scooter rental enquiry - H A Motors"
      labels={{
        "r-name": "Name",
        "r-phone": "WhatsApp number",
        "r-start": "Preferred start date",
        "r-purpose": "Purpose",
        "r-licence": "Valid driver's licence",
        "r-consent": "Consent to be contacted",
      }}
      whatsappIntro={`Hi ${business.owner}, I'd like to rent a scooter. Is one available?`}
      submitLabel="Check Availability"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Name" id="r-name" autoComplete="name" />
        <TextField label="WhatsApp number" id="r-phone" type="tel" autoComplete="tel" inputMode="tel" pattern="[0-9+() \-]{9,18}" placeholder="061 234 5678" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Preferred start date" id="r-start" type="date" />
        <Select
          label="What will you use it for?"
          id="r-purpose"
          options={[
            { value: "Delivery", label: "Delivery work" },
            { value: "Commuting", label: "Commuting" },
            { value: "Other", label: "Other" },
          ]}
        />
      </div>
      <RadioGroup
        legend="Do you have a valid driver's licence?"
        name="r-licence"
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
      />
      <ConsentCheckbox id="r-consent" />
    </EnquiryForm>
  );
}
