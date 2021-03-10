//Form
export const SHOW_PASSWORD = "Jelszó mutatása";
export const HIDE_PASSWORD = "Jelszó elrejtése";
export const USERNAME_LABEL_REQUIRED = "Felhasználónév*";
export const USERNAME_LABEL = "Felhasználónév";
export const EMAIL_LABEL_REQUIRED = "E-mail cím*";
export const EMAIL_LABEL = "E-mail cím";
export const PASSWORD_LABEL = "Jelszó";
export const PASSWORD_LABEL_REQUIRED = "Jelszó*";
export const CONFIRM_PASSWORD_LABEL = "Jelszó ismét*";
export const PASSWORD_HINT =
  "Olyan jelszavat adjon meg amelyet még nem használ máshol.";
export const REQUIRED_FIELDS_HINT =
  "* A csillaggal jelölt mezők kitöltése kötelező.";
export const LOGIN_LABEL = "Bejelentkezés";
export const REGISTER_LABEL = "Regisztráció";
export const REGISTER_BUTTON_LABEL = "Regisztrálok";
export const CANCEL_LABEL = "Mégsem";
export const FORGOTTEN_PASSWORD_LABEL = "Elfelejtett jelszó";
export const USERNAME_OR_EMAIL_LABEL = "Felhasználónév vagy e-mail";
export const REGISTER_USERNAME_HINT = "5-20 karakter";
export const REGISTER_PASSWORD_HINT = "8-32 karakter, legalább 1 nagy betű.";
export const LOGOUT_LABEL = "Kijelentkezés";
export const PASSWORD_PLACEHOLDER = "Jelszó12345.";
export const NEW_EMAIL_LABEL = "Új e-mail cím";
export const CONFIRM_CHANGE_LABEL = "Megváltoztat";
export const NEW_AVATAR_LABEL = "Új avatar";
export const CURRENT_AVATAR_LABEL = "Jelenlegi avatar:";
export const AVATAR_PREVIEW_LABEL = "Előnézet";
export const INVALID_IMAGE_FORMAT = "Helytelen formátum";
export const CHANGE_PASSWORD_LABEL = "Jelszó megváltoztatása";
export const NEW_PASSWORD_LABEL = "Új jelszó";
export const CURRENT_PASSWORD_LABEL = "Jelenlegi jelszó";
export const NEW_COUNTY_LABEL = "Új megye";
export const NEW_CITY_LABEL = "Új város";
export const CHANGE_LOCATION_LABEL = "Helység megváltoztatása";
export const CHANGE_CONTACTS_LABEL = "Elérhetőségek megváltoztatása";
export const CHANGE_AVATAR_LABEL = "Avatar megváltoztatása";
export const CURRENT_LOCATION_LABEL = "Jelenlegi helység: ";
export const COUNTY_PLACEHOLDER = "Válasszon megyét...";
export const CURRENT_MESSENGER_LABEL = "Jelenlegi messenger: ";
export const CURRENT_PHONE_LABEL = "Jelenlegi telefonszám: ";
export const DATA_NOT_SUPPLIED = "Nincs megadva.";
export const NEW_MESSENGER_LABEL = "Új messenger";
export const NEW_PHONE_LABEL = "Új telefonszám";

//Toast
export const REGISTER_SUCCESS_LABEL = "Sikeres regisztráció";
export const REDIRECT_MESSAGE = "Átirányítottuk a főoldalra.";
export const LOGIN_SUCCESS_LABEL = "Sikeres bejelentkezés";
export const WELCOME_USER = "Üdv újra, ";
export const USER_BANNED = " nevű felhasználó ki lett tiltva.";
export const USER_UNBANNED = " nevű felhasználó tiltása feloldásra került.";
export const EDIT_PROFILE_LABEL = "Profil szerkesztése";
export const CURRENT_EMAIL_LABEL = "Jelenlegi e-mail: ";
export const CHANGE_EMAIL_SUCCESS =
  "Sikeresen megváltoztattad az e-mail címed.";
export const CHANGE_CONTACTS_SUCCESS =
  "Sikeresen megváltoztattad az elérhetőségeidet.";
export const CHANGE_PASSWORD_SUCCESS = "Sikeresen megváltoztattad a jelszavad.";
export const CHANGE_AVATAR_SUCCESS = "Sikeresen megváltoztattad az avatarod.";
export const CHANGE_LOCATION_SUCCESS =
  "Sikeresen megváltoztattad a helységedet.";
export const ERROR_GENERIC = "Hiba";
export const ERROR_NOT_AUTHORIZED =
  "A kért oldal megtekintéséhez jelentkezzen be.";
export const ACCESS_DENIED = "A kért oldal megtekintéséhez nincsen engedélye.";

//Register validation
export const INCORRECT_EMAIL_FORMAT = "Helytelen e-mail formátum.";
export const USERNAME_TOO_SHORT =
  "A felhasználónévnek legalább 5 karakterből kell állnia.";
export const USERNAME_TOO_LONG =
  "A felhasználónév legfeljebb 20 karakterből állhat.";
export const USERNAME_CONTAINS_FORBIDDEN =
  "A felhasználónévben nem megengedett karakter szerepel.";
export const PASSWORD_TOO_SHORT =
  "A jelszónak legalább 8 karakterből kell állnia.";
export const PASSWORD_TOO_LONG = "A jelszó legfeljebb 20 karakterből állhat.";
export const USERNAME_TAKEN = "Ez a felhasználónév már foglalt.";
export const UNKNOWN_ERROR_SERVER = "Ismeretlen hiba történt a szerveren.";
export const FIELD_REQUIRED = "Ennek a mezőnek a kitöltése kötelező.";
export const PASSWORD_DOESNT_CONTAIN_CAPITAL =
  "A jelszónak legalább egy nagy betűt kell tartalmaznia.";
export const PASSWORDS_MUST_MATCH = "A jelszavaknak meg kell egyezniük.";

//Ad types
export type WearValue =
  | "Törött/Elromlott"
  | "Használt"
  | "Megkímélt"
  | "Újszerű"
  | "Új";
export type MainCategoryValue =
  | "OTTHON"
  | "SZAMTECH"
  | "MUSZAKI"
  | "RUHAZAT"
  | "JARMU"
  | "SZABADIDO"
  | "INGATLAN";

export const MainCategoryRoutes = {
  OTTHON: "otthon",
  SZAMTECH: "szamtech",
  MUSZAKI: "muszaki",
  RUHAZAT: "ruhazat",
  JARMU: "jarmu",
  SZABADIDO: "szabadido",
  INGATLAN: "ingatlan",
};

export const SubCategoryRoutes = {
  OTTHON: "otthon",
  SZAMTECH: "szamtech",
  MUSZAKI: "muszaki",
  RUHAZAT: "ruhazat",
  JARMU: "jarmu",
  SZABADIDO: "szabadido",
  INGATLAN: "ingatlan",
};

//Ad validation
export const PRICE_TOO_LOW = "Az ár túl alacsony.";
export const PRICE_TOO_HIGH = "Az ár túl magas.";
export const TITLE_TOO_SHORT = "A címnek legalább 5 karakterből kell állnia.";
export const TITLE_TOO_LONG = "A cím legfeljebb 60 karakterből állhat.";

//Ad misc.
export const AD_NOT_FOUND = "Hirdetés nem található.";
export const PHOTOS_LABEL = "Fényképek feltöltése";

//UI
export const POST_AD_TITLE = "Hirdetés feladása";
export const POST_LABEL = "Hirdetés feladása";
export const CONTINUE_BUTTON = "Tovább";
export const BACK_BUTTON = "Vissza";
export const DROPZONE_TEXT = "Húzza ide a fájlokat vagy kattintson ide...";

//Post ad
export const CHOOSE_CATEGORY_LABEL = "Kategória kiválasztása";
export const CHOOSE_SUBCATEGORY_LABEL = "Alkategória kiválasztása";
export const BASIC_DETAILS_LABEL = "Alap adatok megadása";
export const UPLOAD_IMAGE_LABEL = "Képek feltöltése";
export const FINALIZE_LABEL = "Véglegesítés";
export const TITLE_LABEL = "Cím";
export const TITLE_PLACEHOLDER = "Az apróhirdetés címe...";
export const PRICE_LABEL = "Ár";
export const PRICE_PLACEHOLDER = "9.999 Ft";
export const WEAR_LABEL = "Állapot";
export const WearValues = [
  "Erősen használt",
  "Használt",
  "Megkímélt",
  "Újszerű",
  "Új",
];
export const PRICE_CONTAINS_FORBIDDEN =
  "Az ár nem megengedett karaktereket tartalmaz.";
export const DESC_LABEL = "Leírás";
export const SUBMIT_BUTTON = "Elküld";

//Misc.
export const counties: string[] = [
  "Bács-Kiskun",
  "Baranya",
  "Békés",
  "Borsod-Abaúj-Zemplén",
  "Budapest",
  "Csongrád-Csanád",
  "Fejér",
  "Győr-Moson-Sopron",
  "Hajdú-Bihar",
  "Heves",
  "Jász-Nagykun-Szolnok",
  "Komárom-Esztergom",
  "Nógrád",
  "Pest",
  "Somogy",
  "Szabolcs-Szatmár-Bereg",
  "Tolna",
  "Vas",
  "Veszprém",
  "Zala",
];

export const LAST_UPDATE_AT = "Utoljára frissítve";
export const SENT_IN_BY = "Beküldte";
export const HOME_PAGE = "Főoldal";
