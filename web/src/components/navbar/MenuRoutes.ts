import { IconType } from "react-icons";
import { AiFillTool } from "react-icons/ai";
import { BsFillHouseDoorFill, BsFillHouseFill, BsLaptop } from "react-icons/bs";
import { CgEthernet } from "react-icons/cg";
import {
  FaBicycle,
  FaBook,
  FaCamera,
  FaCar,
  FaChild,
  FaDesktop,
  FaDog,
  FaFemale,
  FaGuitar,
  FaKey,
  FaMale,
  FaMemory,
  FaMicrosoft,
  FaMotorcycle,
  FaRegKeyboard,
  FaTools,
  FaTractor,
  FaTransgender,
  FaTshirt,
  FaTv,
} from "react-icons/fa";
import {
  GiBedLamp,
  GiBrickWall,
  GiCarWheel,
  GiComputerFan,
  GiConsoleController,
  GiFarmer,
  GiHockey,
  GiKitchenScale,
  GiPostStamp,
} from "react-icons/gi";
import { HiCube } from "react-icons/hi";
import { ImDisplay, ImPowerCord } from "react-icons/im";
import { IoIosTennisball } from "react-icons/io";
import { IoBoat, IoHardwareChip } from "react-icons/io5";
import {
  MdAirlineSeatFlat,
  MdDevicesOther,
  MdSmartphone,
  MdTabletMac,
  MdToys,
} from "react-icons/md";
import {
  RiArchiveDrawerFill,
  RiCpuLine,
  RiFridgeFill,
  RiHardDrive2Fill,
  RiPlantFill,
} from "react-icons/ri";
import { VscCircuitBoard } from "react-icons/vsc";

export interface Category {
  title: string;
  key?: MainCategory;
  icon?: IconType;
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

export const MainCategories = [
  "OTTHON",
  "SZAMTECH",
  "MUSZAKI",
  "RUHAZAT",
  "JARMU",
  "SZABADIDO",
  "INGATLAN",
];

export const Categories: Record<MainCategory, Category> = {
  OTTHON: {
    key: "OTTHON",
    title: "Otthon, bútor",
    icon: FaTools,
    route: "otthon",
    subcategories: [
      {
        title: "Bútor",
        icon: RiArchiveDrawerFill,
        route: "butor",
      },
      {
        title: "Világítás",
        icon: GiBedLamp,
        route: "vilagitas",
      },
      {
        title: "Háztartási kisgép",
        icon: GiKitchenScale,
        route: "haztartasi-kisgep",
      },
      {
        title: "Háztartási nagygép",
        icon: RiFridgeFill,
        route: "haztartasi-nagygep",
      },
      {
        title: "Építőanyag",
        icon: GiBrickWall,
        route: "epitoanyag",
      },
      {
        title: "Szerszám",
        icon: AiFillTool,
        route: "szerszam",
      },
      {
        title: "Növény",
        icon: RiPlantFill,
        route: "noveny",
      },
    ],
  },
  SZAMTECH: {
    key: "SZAMTECH",
    title: "Számítástechnika",
    icon: FaDesktop,
    route: "szamtech",
    subcategories: [
      {
        title: "Notebook",
        icon: BsLaptop,
        route: "notebook",
      },
      {
        title: "Komplett PC",
        icon: HiCube,
        route: "komplett-pc",
      },
      {
        title: "Alaplap",
        icon: VscCircuitBoard,
        route: "alaplap",
      },
      {
        title: "Processzor",
        icon: RiCpuLine,
        route: "processzor",
      },
      {
        title: "Memória",
        icon: FaMemory,
        route: "memoria",
      },
      {
        title: "Hűtés",
        icon: GiComputerFan,
        route: "hutes",
      },
      {
        title: "Ház, táp",
        icon: ImPowerCord,
        route: "haz-tap",
      },
      {
        title: "Videókártya",
        icon: IoHardwareChip,
        route: "videokartya",
      },
      {
        title: "Monitor",
        icon: ImDisplay,
        route: "monitor",
      },
      {
        title: "Háttértár",
        icon: RiHardDrive2Fill,
        route: "hattertar",
      },
      {
        title: "Hálózat",
        icon: CgEthernet,
        route: "halozat",
      },
      {
        title: "Periféria",
        icon: FaRegKeyboard,
        route: "periferia",
      },
      {
        title: "Szoftver",
        icon: FaMicrosoft,
        route: "szoftver",
      },
    ],
  },
  MUSZAKI: {
    key: "MUSZAKI",
    title: "Műszaki cikk",
    icon: MdSmartphone,
    route: "muszaki-cikk",
    subcategories: [
      {
        title: "Tablet PC",
        icon: MdTabletMac,
        route: "tablet",
      },
      {
        title: "Mobiltelefon",
        icon: MdSmartphone,
        route: "mobiltelefon",
      },
      {
        title: "Fotó, videó",
        icon: FaCamera,
        route: "foto-video",
      },
      {
        title: "Konzol",
        icon: GiConsoleController,
        route: "konzol",
      },
      {
        title: "TV, Audió",
        icon: FaTv,
        route: "tv-audio",
      },
      {
        title: "Egyéb",
        icon: MdDevicesOther,
        route: "egyeb",
      },
    ],
  },
  RUHAZAT: {
    key: "RUHAZAT",
    title: "Ruházat",
    icon: FaTshirt,
    route: "ruhazat",
    subcategories: [
      {
        title: "Férfi",
        icon: FaMale,
        route: "ferfi",
      },
      {
        title: "Női",
        icon: FaFemale,
        route: "noi",
      },
      {
        title: "Uniszex",
        icon: FaTransgender,
        route: "uniszex",
      },
      {
        title: "Gyermek",
        icon: FaChild,
        route: "gyermek",
      },
    ],
  },
  JARMU: {
    key: "JARMU",
    title: "Jármű",
    icon: FaCar,
    route: "jarmu",
    subcategories: [
      {
        title: "Személygépjármű",
        icon: FaCar,
        route: "szemelygepjarmu",
      },
      {
        title: "Motor, robogó",
        icon: FaMotorcycle,
        route: "motor-robogo",
      },
      {
        title: "Haszongépjármű",
        icon: FaTractor,
        route: "haszongepjarmu",
      },
      {
        title: "Alkatrész",
        icon: GiCarWheel,
        route: "alkatresz",
      },
      {
        title: "Egyéb",
        icon: IoBoat,
        route: "egyeb",
      },
    ],
  },
  SZABADIDO: {
    key: "SZABADIDO",
    title: "Sport és szabadidő",
    icon: IoIosTennisball,
    route: "sport-es-szabadido",
    subcategories: [
      {
        title: "Kerékpár",
        icon: FaBicycle,
        route: "kerekpar",
      },
      {
        title: "Állattartási kellék",
        icon: FaDog,
        route: "allattartasi-kellek",
      },
      {
        title: "Hangszer",
        icon: FaGuitar,
        route: "hangszer",
      },
      {
        title: "Könyv, zene, film",
        icon: FaBook,
        route: "konyv-zene-film",
      },
      {
        title: "Sporteszköz",
        icon: GiHockey,
        route: "sporteszkoz",
      },
      {
        title: "Játék",
        icon: MdToys,
        route: "jatek",
      },
      {
        title: "Hobbi",
        icon: GiPostStamp,
        route: "hobbi",
      },
    ],
  },
  INGATLAN: {
    key: "INGATLAN",
    title: "Ingatlan",
    icon: BsFillHouseDoorFill,
    route: "ingatlan",
    subcategories: [
      {
        title: "Albérlet",
        icon: MdAirlineSeatFlat,
        route: "alberlet",
      },
      {
        title: "Lakás",
        icon: FaKey,
        route: "lakas",
      },
      {
        title: "Ház",
        icon: BsFillHouseFill,
        route: "haz",
      },
      {
        title: "Telek",
        icon: GiFarmer,
        route: "telek",
      },
    ],
  },
};
