import { create } from "zustand";

const useFriends= create((set) => ({
	selectedFriends: null,
	setSelectedFriends: (selectedFriends) => set({ selectedFriends }),
}));

export default useFriends;