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
export const CHANGE_EMAIL_PLACEHOLDER = "teszt.elek@teszt.hu";
export const CHANGE_MESSENGER_PLACEHOLDER = "Teszt Elek";
export const CHANGE_PHONE_PLACEHOLDER = "301234567";
export const SEND_LABEL = "Küldés";

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
export const ERROR_NOT_AUTHENTICATED =
  "A kért oldal megtekintéséhez jelentkezzen be.";
export const ERROR_NOT_AUTHORIZED =
  "A kért oldal megtekintéséhez nincsen engedélye.";
export const FORGOT_PASSWORD_EMAIL_SENT =
  "A megadott e-mail címre elküldtük a jelszó visszaállításához szükséges linket.";
export const SUCCESS = "Siker";
export const EDIT_AD_SUCCESS = "Sikeresen módosította az apróhirdetést.";
export const DELETE_AD_SUCCESS = "Sikeresen törölte az apróhirdetést.";
export const DELETE_IMAGE_SUCCESS = "Sikeresen törölte a fényképet.";
export const IMAGE_UPLOAD_FAIL = "Hiba történt a képek feltöltése során.";
export const IMAGE_UPLOAD_SUCCESS = "Sikeresen feltöltötte a képeket.";
export const FEEDBACK_SUGGESTION_LABEL =
  "Megvásárolta a terméket? Értékelje az eladót!";

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

//Contact validation
export const INCORRECT_PHONE_FORMAT = "Helytelen telefonszám formátum.";
export const INCORRECT_PHONE_LENGTH = "Helytelen telefonszám hossz.";

//Ad validation
export const PRICE_TOO_LOW = "Az ár túl alacsony.";
export const PRICE_TOO_HIGH = "Az ár túl magas.";
export const TITLE_TOO_SHORT = "A címnek legalább 5 karakterből kell állnia.";
export const TITLE_TOO_LONG = "A cím legfeljebb 60 karakterből állhat.";

//Ad misc.
export const AD_NOT_FOUND = "Hirdetés nem található.";
export const PHOTOS_LABEL = "Fényképek feltöltése";
export const DELETE_IMAGE = "Fénykép törlése";

//UI
export const POST_AD_TITLE = "Hirdetés feladása";
export const POST_LABEL = "Hirdetés feladása";
export const CONTINUE_BUTTON = "Tovább";
export const BACK_BUTTON = "Vissza";
export const DROPZONE_TEXT = "Húzza ide a fájlokat vagy kattintson ide...";
export const OTHER_ADS_LABEL = "további apróhirdetési";
export const USERS_ADS_LABEL = "apróhirdetési";
export const PROFILE_VIEW_LABEL = "Profil";
export const MY_AD_LABEL = "Apróhirdetéseim";
export const SEND_MESSAGE_LABEL = "Üzenet küldése";
export const LEAVE_FEEDBACK_LABEL = "Értékelés hagyása";
export const CONTACTS_LABEL = "Elérhetőségek";
export const PHONE_LABEL = "Telefonszám";
export const MESSENGER_LABEL = "Messenger";
export const LOCATION_LABEL = "Tartózkodási hely";
export const PROFILE_EDIT_LABEL = "Profil szerkesztése";
export const USERS_RECENT_ADS_LABEL = "legutóbbi apróhirdetési";
export const OTHERS_LABEL = "Továbbiak...";
export const LOADING_TITLE = "Betöltés...";
export const RESULTS_LABEL = "Találatok";
export const SORT_BY_UPLOAD_LABEL = "Rendezés feltöltési idő alapján";
export const SORT_BY_PRICE_LABEL = "Rendezés ár alapján";
export const ORDER_ASCENDING_LABEL = "Rendezés növekvő sorrendben";
export const ORDER_DESCENDING_LABEL = "Rendezés csökkenő sorrendben";
export const FILTERS_LABEL = "Szűrők";
export const PRICE_UPPER_LABEL = "Ár maximum";
export const PRICE_LOWER_LABEL = "Ár minimum";
export const COUNTY_LABEL = "Megye";
export const CITY_LABEL = "Város";
export const FILTER_LABEL = "Szűrés";
export const CLEAR_FILTER_LABEL = "Szűrők törlése";
export const PREVIOUS_PAGE_LABEL = "Előző oldal";
export const NEXT_PAGE_LABEL = "Következő oldal";
export const PAGE_LABEL = "oldal";
export const LOAD_MORE_BUTTON = "Több betöltése...";
export const NO_IMAGES = "Nincsenek képek";
export const FEATURED_LABEL = "Kiemelt";
export const SEARCH_AD_PAGE_TITLE = "Hirdetések";
export const NO_LOCATION_PROVIDED = "Nincsen tartózkodási hely megadva.";
export const NO_OTHER_RECENT_ADS =
  "A felhasználónak nincsenek további hirdetései.";
export const ADVERTISE_LABEL = "Hirdetne?";
export const SHOP_LABEL = "Vásárolna?";
export const BROWSE_ADS_LABEL = "Hirdetések böngészése";
export const RECENT_ADS = "Legutóbbi apróhirdetések";
export const THIS_AD_IS_YOURS = "Ez a hirdetés a tied.";
export const EDIT_LABEL = "Szerkesztés";
export const DELETE_LABEL = "Törlés";
export const HANDLE_IMAGES = "Fényképek kezelése";
export const MESSAGES_LABEL = "Privát üzenetek";
export const GIVING_FEEDBACK_LABEL = "értékelése";
export const USER_NOT_FOUND = "A felhasználó nem található.";

//Post ad
export const CHOOSE_CATEGORY_LABEL = "Kategória kiválasztása";
export const CHOOSE_SUBCATEGORY_LABEL = "Alkategória kiválasztása";
export const BASIC_DETAILS_LABEL = "Alap adatok";
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

export const WearValuesSearch = [
  "",
  "Erősen használt",
  "Használt",
  "Megkímélt",
  "Újszerű",
  "Új",
];

//Misc.
export const counties: string[] = [
  "",
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

//Karma
export const SATISFIED_BUTTON_LABEL = "Elégedett voltam";
export const UNSATISFIED_BUTTON_LABEL = "Nem voltam elégedett";
export const WERE_YOU_SATISFIED = "Elégedett volt a felhasználóval?";
export const FEEDBACK_AD_LABEL = "Melyik terméket vásárolta meg?";
export const USER_HAS_NO_ADS = "A felhasználónak nincsenek apróhirdetései.";
export const COMMENT_LABEL = "További megjegyzés hagyása";
export const LEAVE_FEEDBACK_SUCCESS = "Sikeresen elküldte az értékelést.";
export const ERROR_CANNOT_RATE_SELF = "Nem értékelheted saját magadat.";
export const FEEDBACKS_LABEL = "Értékelések";
export const USERS_FEEDBACK_LABEL = "felhasználó értékelése";
