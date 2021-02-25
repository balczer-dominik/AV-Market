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
    FaTshirt,
    FaTv
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
    GiPostStamp
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
    MdToys
} from "react-icons/md";
import {
    RiArchiveDrawerFill,
    RiCpuLine,
    RiFridgeFill,
    RiHardDrive2Fill,
    RiPlantFill
} from "react-icons/ri";
import { VscCircuitBoard } from "react-icons/vsc";

export interface Category {
  title: string;
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

export const Categories: Record<MainCategory, Category> = {
  OTTHON: {
    title: "Otthon, bútor",
    icon: FaTools,
    route: "/",
    subcategories: [
      {
        title: "Bútor",
        icon: RiArchiveDrawerFill,
        route: "/",
      },
      {
        title: "Világítás",
        icon: GiBedLamp,
        route: "/",
      },
      {
        title: "Háztartási kisgép",
        icon: GiKitchenScale,
        route: "/",
      },
      {
        title: "Háztartási nagygép",
        icon: RiFridgeFill,
        route: "/",
      },
      {
        title: "Építőanyag",
        icon: GiBrickWall,
        route: "/",
      },
      {
        title: "Szerszám",
        icon: AiFillTool,
        route: "/",
      },
      {
        title: "Növény",
        icon: RiPlantFill,
        route: "/",
      },
    ],
  },
  SZAMTECH: {
    title: "Számítástechnika",
    icon: FaDesktop,
    route: "/",
    subcategories: [
      {
        title: "Notebook",
        icon: BsLaptop,
        route: "/",
      },
      {
        title: "Komplett PC",
        icon: HiCube,
        route: "/",
      },
      {
        title: "Alaplap",
        icon: VscCircuitBoard,
        route: "/",
      },
      {
        title: "Processzor",
        icon: RiCpuLine,
        route: "/",
      },
      {
        title: "Memória",
        icon: FaMemory,
        route: "",
      },
      {
        title: "Hűtés",
        icon: GiComputerFan,
        route: "/",
      },
      {
        title: "Ház, táp",
        icon: ImPowerCord,
        route: "/",
      },
      {
        title: "Videókártya",
        icon: IoHardwareChip,
        route: "/",
      },
      {
        title: "Monitor",
        icon: ImDisplay,
        route: "/",
      },
      {
        title: "Háttértár",
        icon: RiHardDrive2Fill,
        route: "/",
      },
      {
        title: "Hálózat",
        icon: CgEthernet,
        route: "/",
      },
      {
        title: "Periféria",
        icon: FaRegKeyboard,
        route: "/",
      },
      {
        title: "Szotfver",
        icon: FaMicrosoft,
        route: "/",
      },
    ],
  },
  MUSZAKI: {
    title: "Műszaki cikk",
    icon: MdSmartphone,
    route: "/",
    subcategories: [
      {
        title: "Tablet PC",
        icon: MdTabletMac,
        route: "",
      },
      {
        title: "Mobiltelefon",
        icon: MdSmartphone,
        route: "",
      },
      {
        title: "Fotó, videó",
        icon: FaCamera,
        route: "",
      },
      {
        title: "Konzol",
        icon: GiConsoleController,
        route: "",
      },
      {
        title: "TV, Audió",
        icon: FaTv,
        route: "/",
      },
      {
        title: "Egyéb",
        icon: MdDevicesOther,
        route: "/",
      },
    ],
  },
  RUHAZAT: {
    title: "Ruházat",
    icon: FaTshirt,
    route: "",
    subcategories: [
      {
        title: "Férfi",
        icon: FaMale,
        route: "/",
      },
      {
        title: "Női",
        icon: FaFemale,
        route: "/",
      },
      {
        title: "Gyermek",
        icon: FaChild,
        route: "/",
      },
    ],
  },
  JARMU: {
    title: "Jármű",
    icon: FaCar,
    route: "/",
    subcategories: [
      {
        title: "Személygépjármű",
        icon: FaCar,
        route: "/",
      },
      {
        title: "Motor, robogó",
        icon: FaMotorcycle,
        route: "/",
      },
      {
        title: "Haszongépjármű",
        icon: FaTractor,
        route: "",
      },
      {
        title: "Alkatrész",
        icon: GiCarWheel,
        route: "",
      },
      {
        title: "Egyéb",
        icon: IoBoat,
        route: "/",
      },
    ],
  },
  SZABADIDO: {
    title: "Sport és szabadidő",
    icon: IoIosTennisball,
    route: "/",
    subcategories: [
      {
        title: "Kerékpár",
        icon: FaBicycle,
        route: "/",
      },
      {
        title: "Állattartási kellék",
        icon: FaDog,
        route: "/",
      },
      {
        title: "Hangszer",
        icon: FaGuitar,
        route: "/",
      },
      {
        title: "Könyv, zene, film",
        icon: FaBook,
        route: "/",
      },
      {
        title: "Sporteszköz",
        icon: GiHockey,
        route: "/",
      },
      {
        title: "Játék",
        icon: MdToys,
        route: "/",
      },
      {
        title: "Hobbi",
        icon: GiPostStamp,
        route: "/",
      },
    ],
  },
  INGATLAN: {
    title: "Ingatlan",
    icon: BsFillHouseDoorFill,
    route: "/",
    subcategories: [
      {
        title: "Albérlet",
        icon: MdAirlineSeatFlat,
        route: "/",
      },
      {
        title: "Lakás",
        icon: FaKey,
        route: "/",
      },
      {
        title: "Ház",
        icon: BsFillHouseFill,
        route: "/",
      },
      {
        title: "Telek",
        icon: GiFarmer,
        route: "/",
      },
    ],
  },
};
