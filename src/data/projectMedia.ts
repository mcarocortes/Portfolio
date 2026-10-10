import handHealth from "../assets/img/Projects/Health/resiplus.mp4";
import healthOpportunityImage from "../assets/img/Projects/Health/health_oppor.png";
import health1 from "../assets/img/Projects/Health/health_1.png";
import health2 from "../assets/img/Projects/Health/health_2.png";
import health3 from "../assets/img/Projects/Health/health_3.png";
import health4 from "../assets/img/Projects/Health/health_4.png";

import handModular from "../assets/img/Projects/modulAR/handModular.mp4";
import modularOpportunity from "../assets/img/Projects/modulAR/modular_Oppor.png";
import modular1 from "../assets/img/Projects/modulAR/modular1.png";
import modular2 from "../assets/img/Projects/modulAR/modular2.png";
import modular3 from "../assets/img/Projects/modulAR/modular3.png";
import modular4 from "../assets/img/Projects/modulAR/modular4.png";

import handVC from "../assets/img/Projects/VC/handVC.mp4";
import vcOpportunity from "../assets/img/Projects/VC/vc_oppor.png";
import vc1 from "../assets/img/Projects/VC/vc_1.png";
import vc2 from "../assets/img/Projects/VC/vc_2.png";
import vc3 from "../assets/img/Projects/VC/vc_3.png";
import vc4 from "../assets/img/Projects/VC/vc_4.png";

import handMenta from "../assets/img/Projects/Menta/handMenta.mp4";
import mentaOpportunity from "../assets/img/Projects/Menta/menta_oppor.png";
import menta1 from "../assets/img/Projects/Menta/menta_1.png";
import menta2 from "../assets/img/Projects/Menta/menta_2.png";
import menta3 from "../assets/img/Projects/Menta/menta_3.png";
import menta4 from "../assets/img/Projects/Menta/menta_4.png";

import handMimi from "../assets/img/Projects/Mimi/handMimi.mp4";
import mimiOpportunity from "../assets/img/Projects/Mimi/mimi1.png";

import handCatamaran from "../assets/img/Projects/Catamaran/catamaranHand.png";
import catOpportunity from "../assets/img/Projects/Catamaran/cata_opport.png";
import cat1 from "../assets/img/Projects/Catamaran/cat1.png";
import cat2 from "../assets/img/Projects/Catamaran/cat2.png";
import cat3 from "../assets/img/Projects/Catamaran/cat3.png";
import cat4 from "../assets/img/Projects/Catamaran/cat4.png";

import type { ProjectCaseKey } from "./projectsCatalog";

/** Hero del case study: mockup Hand + vídeo, o imagen estática (Beyond Code). */
export type ProjectHeroMedia =
  | { type: "hand"; videoSrc: string | null }
  | { type: "image"; src: string | null };

export type ProjectMedia = {
  images: (string | null)[];
  hero: ProjectHeroMedia;
  opportunityImage: string | null;
};

const PROJECT_MEDIA: Record<ProjectCaseKey, ProjectMedia> = {
  healthcare: {
    images: [health1, health2, health3, health4],
    hero: { type: "hand", videoSrc: handHealth },
    opportunityImage: healthOpportunityImage,
  },
  modular: {
    images: [modular1, modular2, modular3, modular4],
    hero: { type: "hand", videoSrc: handModular },
    opportunityImage: modularOpportunity,
  },
  vc: {
    images: [vc1, vc2, vc3, vc4],
    hero: { type: "hand", videoSrc: handVC },
    opportunityImage: vcOpportunity,
  },
  menta: {
    images: [menta1, menta2, menta3, menta4],
    hero: { type: "hand", videoSrc: handMenta },
    opportunityImage: mentaOpportunity,
  },
  mimi: {
    images: [null, null, null, null],
    hero: { type: "hand", videoSrc: handMimi },
    opportunityImage: mimiOpportunity,
  },
  vinos: {
    images: [null, null, null, null],
    hero: { type: "hand", videoSrc: null },
    opportunityImage: null,
  },
  packaging: {
    images: [null, null, null, null],
    hero: { type: "image", src: null },
    opportunityImage: null,
  },
  catamaran: {
    images: [cat1, cat2, cat3, cat4],
    hero: { type: "image", src: handCatamaran },
    opportunityImage: catOpportunity,
  },
};

export function getProjectMedia(key: ProjectCaseKey) {
  return PROJECT_MEDIA[key];
}
