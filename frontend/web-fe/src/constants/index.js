// Change the values depending on the back-end's settings and data URLs.

export const API_ROOT = "http://127.0.0.1:8000";

export const API_GAMES_URL = API_ROOT + "/wagtail-api/games/";
export const API_GAMEBLOGPAGES_WITH_THUMBNAIL_URL =
  API_ROOT + "/wagtail-api/pages/?type=blog.GameBlogPage&fields=album_image";
export const API_GAMEINDEXPAGES_WITH_FIELDS =
  API_ROOT +
  "/wagtail-api/pages/?type=blog.GameIndexPage&fields=title,introduction,image";

export const API_MAIN_HOMEPAGE_URL = API_ROOT + "/wagtail-api/pages/8";
