import axios from "@/config/axios";

export const upcomingProgramsByLocationApi = async () => {
  // return await axios.get(`upcoming-programs/${data.location}`);
  return await axios.get("all-upcoming-programs");
};

export const programListCategoryApi = async () => {
  return await axios.get("program-category-list");
};

export const featuredMoviesApi = async () => {
  return await axios.get("featured-movies");
};

export const upcomingMoviesApi = async () => {
  return await axios.get("upcoming-movies");
};

export const programScheduleByDateApi = async (data) => {
  return await axios.post("program-schedules-by-date", data);
};

export const todayScheduledMoviesApi = async () => {
  return await axios.get("today-movies-schedules");
};

export const todayScheduledTalkShowsApi = async () => {
  return await axios.get("today-talk-shows-schedules");
};

export const upcomingTalkShowsApi = async () => {
  return await axios.get("upcoming-talk-shows");
};

export const allMoviesApi = async () => {
  return await axios.get("all-movies");
};

export const allSeriesApi = async () => {
  return await axios.get("all-series");
};

export const allTalkShowsApi = async () => {
  return await axios.get("all-talk-shows");
};

export const subscribeApi = async (data) => {
  return await axios.post("subscribe", data);
};

export const movieSubCategoryApi = async () => {
  return await axios.get("movie-subcategory");
};

export const talkShowSubCategoryApi = async () => {
  return await axios.get("talk-show-subcategory");
};

export const advertiseWithUsApi = async (data) => {
  return await axios.post("advertise", data);
};
