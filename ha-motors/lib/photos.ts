import manifest from "./photo-manifest.json";

export type PhotoKey =
  | "adrich-bmw-workshop"
  | "adrich-kawasaki-ninja"
  | "carburettor-rebuild"
  | "motorcycle-wiring-repair"
  | "cylinder-head-removed"
  | "piston-new-gasket"
  | "oil-seal-replacement"
  | "honda-delivery-bike-teardown"
  | "scooter-stripped"
  | "scooter-reassembly"
  | "honda-scooter-finished"
  | "yamaha-quad"
  | "quad-front-teardown"
  | "utility-quad-workshop"
  | "sym-jet14-front"
  | "sym-jet14-side";

type PhotoMeta = { alt: string; caption: string; work: boolean };

export const photoMeta: Record<PhotoKey, PhotoMeta> = {
  "adrich-bmw-workshop": {
    alt: "Adrich from H A Motors test-riding a motorcycle after a repair",
    caption: "Test ride after a repair",
    work: false,
  },
  "adrich-kawasaki-ninja": {
    alt: "Adrich, mechanic at H A Motors in Bloemfontein",
    caption: "Adrich, the mechanic behind H A Motors",
    work: false,
  },
  "carburettor-rebuild": {
    alt: "Motorcycle carburettor stripped for a full rebuild",
    caption: "Carburettor stripped for a full rebuild",
    work: true,
  },
  "motorcycle-wiring-repair": {
    alt: "Motorcycle wiring harness exposed for electrical fault finding",
    caption: "Electrical fault finding on a cruiser",
    work: true,
  },
  "cylinder-head-removed": {
    alt: "Cylinder head removed during an engine repair",
    caption: "Cylinder head off for an engine repair",
    work: true,
  },
  "piston-new-gasket": {
    alt: "Piston and cylinder fitted with a new head gasket",
    caption: "New head gasket fitted",
    work: true,
  },
  "oil-seal-replacement": {
    alt: "Replacing a worn oil seal on a motorcycle",
    caption: "Replacing a worn oil seal",
    work: true,
  },
  "honda-delivery-bike-teardown": {
    alt: "Delivery motorcycle stripped down for repairs",
    caption: "Delivery bike stripped down for repairs",
    work: true,
  },
  "scooter-stripped": {
    alt: "Scooter stripped to the frame for a full repair",
    caption: "Work in progress: stripped to the frame",
    work: true,
  },
  "scooter-reassembly": {
    alt: "Scooter being reassembled after repairs",
    caption: "Work in progress: going back together",
    work: true,
  },
  "honda-scooter-finished": {
    alt: "White Honda scooter after a service",
    caption: "Honda scooter after a service",
    work: true,
  },
  "yamaha-quad": { alt: "Yamaha sport quad bike", caption: "Yamaha sport quad", work: true },
  "quad-front-teardown": {
    alt: "Utility quad bike front end stripped for brake and winch repairs",
    caption: "Quad front end stripped for brake and winch repairs",
    work: true,
  },
  "utility-quad-workshop": {
    alt: "Utility quad bike in for a service",
    caption: "Utility quad in for a service",
    work: true,
  },
  "sym-jet14-front": {
    alt: "SYM Jet 14 200cc rental scooter, front view",
    caption: "SYM Jet 14 200cc, front",
    work: false,
  },
  "sym-jet14-side": {
    alt: "SYM Jet 14 200cc rental scooter, side view",
    caption: "SYM Jet 14 200cc, side",
    work: false,
  },
};

export type Photo = PhotoMeta & {
  key: PhotoKey;
  src: string;
  width: number;
  height: number;
  /** false until the real file has been processed by scripts/optimize-images.ts */
  ready: boolean;
};

const dims = manifest as Partial<Record<PhotoKey, { width: number; height: number }>>;

export function getPhoto(key: PhotoKey): Photo {
  const d = dims[key];
  return {
    key,
    ...photoMeta[key],
    src: `/images/${key}.jpg`,
    width: d?.width ?? 1200,
    height: d?.height ?? 900,
    ready: Boolean(d),
  };
}

export const workPhotoKeys = (Object.keys(photoMeta) as PhotoKey[]).filter((k) => photoMeta[k].work);
