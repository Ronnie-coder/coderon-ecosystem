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
  | "sym-jet14-side"
  | "big-boy-cruiser-repair"
  | "clutch-repair"
  | "engine-strip-down"
  | "delivery-bike-finished"
  | "electrical-testing"
  | "stator-wiring";

export type PhotoCategory = "motorcycle" | "scooter" | "quad" | "rental" | "people";
type PhotoMeta = { alt: string; caption: string; work: boolean; category: PhotoCategory };

export const photoMeta: Record<PhotoKey, PhotoMeta> = {
  "adrich-bmw-workshop": {
    alt: "Adrich from H A Motors test-riding a motorcycle after a repair",
    caption: "Test ride after a repair",
    work: false, category: "people",
  },
  "adrich-kawasaki-ninja": {
    alt: "Adrich, mechanic at H A Motors in Bloemfontein",
    caption: "Adrich, the mechanic behind H A Motors",
    work: false, category: "people",
  },
  "carburettor-rebuild": {
    alt: "Motorcycle carburettors stripped into parts on a workbench for a full rebuild",
    caption: "Carburettor stripped for a full rebuild",
    work: true, category: "motorcycle",
  },
  "motorcycle-wiring-repair": {
    alt: "Motorcycle wiring harness exposed for electrical fault finding",
    caption: "Electrical fault finding on a cruiser",
    work: true, category: "motorcycle",
  },
  "cylinder-head-removed": {
    alt: "Motorcycle engine with the cylinder head off and a new carburettor being fitted",
    caption: "Cylinder head off, new carburettor going on",
    work: true, category: "motorcycle",
  },
  "piston-new-gasket": {
    alt: "Piston and cylinder fitted with a new head gasket",
    caption: "New head gasket fitted",
    work: true, category: "motorcycle",
  },
  "oil-seal-replacement": {
    alt: "Replacing a worn oil seal on a motorcycle",
    caption: "Replacing a worn oil seal",
    work: true, category: "motorcycle",
  },
  "honda-delivery-bike-teardown": {
    alt: "Delivery motorcycle stripped down for repairs",
    caption: "Delivery bike stripped down for repairs",
    work: true, category: "motorcycle",
  },
  "scooter-stripped": {
    alt: "Scooter stripped to the frame for a full repair",
    caption: "Work in progress: stripped to the frame",
    work: true, category: "scooter",
  },
  "scooter-reassembly": {
    alt: "Scooter being reassembled after repairs",
    caption: "Work in progress: going back together",
    work: true, category: "scooter",
  },
  "honda-scooter-finished": {
    alt: "White Honda scooter after a service",
    caption: "Honda scooter after a service",
    work: true, category: "scooter",
  },
  "yamaha-quad": { alt: "Yamaha sport quad bike", caption: "Yamaha sport quad", work: true, category: "quad" },
  "quad-front-teardown": {
    alt: "Utility quad bike front end stripped for brake and wiring repairs",
    caption: "Quad front end stripped for brake and wiring repairs",
    work: true, category: "quad",
  },
  "utility-quad-workshop": {
    alt: "Utility quad bike in for a service",
    caption: "Utility quad in for a service",
    work: true, category: "quad",
  },
  "big-boy-cruiser-repair": {
    alt: "Black Big Boy cruiser motorcycle with the exhaust off during engine repairs",
    caption: "Big Boy cruiser in for engine work",
    work: true, category: "motorcycle",
  },
  "clutch-repair": {
    alt: "Close-up of a motorcycle clutch with the engine side cover removed",
    caption: "Clutch work with the side cover off",
    work: true, category: "motorcycle",
  },
  "engine-strip-down": {
    alt: "Motorcycle engine stripped on the workshop floor with the cylinder head and spanners beside it",
    caption: "Engine stripped for a repair",
    work: true, category: "motorcycle",
  },
  "delivery-bike-finished": {
    alt: "White Lifan delivery motorcycle with a carrier rack in the workshop",
    caption: "Lifan delivery bike in the workshop",
    work: true, category: "motorcycle",
  },
  "electrical-testing": {
    alt: "Hand tracing a wire on a motorcycle with a multimeter on the floor",
    caption: "Tracing an electrical fault",
    work: true, category: "motorcycle",
  },
  "stator-wiring": {
    alt: "Close-up of the wiring inside a motorcycle engine cover",
    caption: "Wiring inside the engine cover",
    work: true, category: "motorcycle",
  },
  "sym-jet14-front": {
    alt: "SYM Jet 14 200 rental scooter, front view",
    caption: "SYM Jet 14 200, front",
    work: false, category: "rental",
  },
  "sym-jet14-side": {
    alt: "SYM Jet 14 200 rental scooter, side view",
    caption: "SYM Jet 14 200, side",
    work: false, category: "rental",
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

/** Photos that have a real file. Falls back to the full list so nothing renders empty. */
export function readyPhotos(keys: PhotoKey[]): Photo[] {
  const all = keys.map(getPhoto);
  const ready = all.filter((p) => p.ready);
  return ready.length ? ready : all;
}

/** First key in the list that has a real file (or the first key if none do yet). */
export function firstReady(...keys: PhotoKey[]): PhotoKey {
  return keys.find((k) => Boolean(dims[k])) ?? keys[0]!;
}

export const workPhotoKeys = (Object.keys(photoMeta) as PhotoKey[]).filter((k) => photoMeta[k].work);
