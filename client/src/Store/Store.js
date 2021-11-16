import create from "zustand";
import { devtools } from "zustand/middleware";
import { omit } from "lodash";
import AuthService from "../Service/Auth.Service";
const useStore = create(
  devtools((set) => ({
    token: "",
    auth: false,
    jobs: [],
    setAuth: async () => set((state) => (state.auth = true)),
    setToken: async () => set((state) => (state.auth = localStorage.getItem("token"))),
    user: "",
    logOut: () => {
      set((state) => (state.auth = false));
      localStorage.removeItem("token");
      set((state) => omit(state, ["user"]), true);
    },
    currentUser: async () => {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        const User = await AuthService.verify(localToken);
        if (User.authenticated !== false) {
          set((state) => (state.auth = true));
          set((state) => (state.token = localToken));
          set((state) => (state.user = User.user.username));
        }
      }
    },
    setJobs: async (Jobs) => {
      set((state) => (state.jobs = Jobs));
    },
  }))
);

export default useStore;
