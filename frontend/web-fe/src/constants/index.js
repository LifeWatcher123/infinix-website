// Change the values depending on the back-end's settings and data URLs.

export const API_ROOT = "http://127.0.0.1:8000";

export const API_GAMES_URL = API_ROOT + "/wagtail-api/games/";
export const API_PAGES_URL = API_ROOT + "/wagtail-api/pages/"
export const API_GAMEBLOGPAGES_WITH_THUMBNAIL_URL =
  API_ROOT + "/wagtail-api/pages/?type=blog.GameBlogPage&fields=album_image";
export const API_GAMEINDEXPAGES_WITH_FIELDS =
  API_PAGES_URL +
  "?type=blog.GameIndexPage&fields=_,id,title,introduction,image,children";

export const API_MAIN_HOMEPAGE_URL = API_ROOT + "/wagtail-api/pages/8";


export const COLLAPSE_NAVBAR_ID = "collapsable-navbar-0001";
export const NAVBAR_ID = "navbar-0001"
export const SPINNER_ID = "spinner-0001";
