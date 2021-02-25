export interface Category {
  title: string;
  route: string;
  subcategories?: Category[];
}

export type MainCategory =
  | "OTTHON"
  | "SZAMTECH"
  | "MUSZAKI"
  | "RUHAZAT"
  | "JARMU"
  | "SZABADIDO"
  | "INGATLAN";

export const Categories: Record<MainCategory, Category> = {
  OTTHON: {
    title: "Otthon, bútor",
    route: "/",
    subcategories: [
      {
        title: "Bútor",
        route: "/",
      },
      {
        title: "Világítás",
        route: "/",
      },
      {
        title: "Háztartási kisgép",
        route: "/",
      },
      {
        title: "Háztartási nagygép",
        route: "/",
      },
      {
        title: "Építőanyag",
        route: "/",
      },
      {
        title: "Szerszám",
        route: "/",
      },
      {
        title: "Növény",
        route: "/",
      },
    ],
  },
  SZAMTECH: {
    title: "Számítástechnika",
    route: "/",
    subcategories: [
      {
        title: "Notebook",
        route: "/",
      },
      {
        title: "Komplett PC",
        route: "/",
      },
      {
        title: "Alaplap",
        route: "/",
      },
      {
        title: "Processzor",
        route: "/",
      },
      {
        title: "Memória",
        route: "",
      },
      {
        title: "Hűtés",
        route: "/",
      },
      {
        title: "Ház, táp",
        route: "/",
      },
      {
        title: "Videókártya",
        route: "/",
      },
      {
        title: "Monitor",
        route: "/",
      },
      {
        title: "Háttértár",
        route: "/",
      },
      {
        title: "Hálózat",
        route: "/",
      },
      {
        title: "Periféria",
        route: "/",
      },
      {
        title: "Szotfver",
        route: "/",
      },
    ],
  },
  MUSZAKI: {
    title: "Műszaki cikk",
    route: "/",
    subcategories: [
      {
        title: "Tablet PC",
        route: "",
      },
      {
        title: "Mobiltelefon",
        route: "",
      },
      {
        title: "Fotó, videó",
        route: "",
      },
      {
        title: "Konzol",
        route: "",
      },
      {
        title: "TV, Audió",
        route: "/",
      },
      {
        title: "Egyéb",
        route: "/",
      },
    ],
  },
  RUHAZAT: {
    title: "Ruházat",
    route: "",
    subcategories: [
      {
        title: "Férfi",
        route: "/",
      },
      {
        title: "Női",
        route: "/",
      },
      {
        title: "Gyermek",
        route: "/",
      },
    ],
  },
  JARMU: {
    title: "Jármű",
    route: "/",
    subcategories: [
      {
        title: "Személygépjármű",
        route: "/",
      },
      {
        title: "Motor, robogó",
        route: "/",
      },
      {
        title: "Haszongépjármű",
        route: "",
      },
      {
        title: "Alkatrész",
        route: "",
      },
      {
        title: "Egyéb",
        route: "/",
      },
    ],
  },
  SZABADIDO: {
    title: "Sport és szabadidő",
    route: "/",
    subcategories: [
      {
        title: "Kerékpár",
        route: "/",
      },
      {
        title: "Állattartási kellék",
        route: "/",
      },
      {
        title: "Hangszer",
        route: "/",
      },
      {
        title: "Könyv, zene, film",
        route: "/",
      },
      {
        title: "Sporteszköz",
        route: "/",
      },
      {
        title: "Játék",
        route: "/",
      },
      {
        title: "Hobbi",
        route: "/",
      },
    ],
  },
  INGATLAN: {
    title: "Ingatlan",
    route: "/",
    subcategories: [
      {
        title: "Albérlet",
        route: "/",
      },
      {
        title: "Lakás",
        route: "/",
      },
      {
        title: "Ház",
        route: "/",
      },
      {
        title: "Telek",
        route: "/",
      },
    ],
  },
};

export const menuRoutes = {};
