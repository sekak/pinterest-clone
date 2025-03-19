import axios from "axios";

export const fetchPins = async (
  pageParam: number,
  search: string | null | undefined,
  userId: string | null | undefined,
  board_id: string | null | undefined
) => {
  const res = await axios.get(
    `http://localhost:3000/api/pins?cursor=${pageParam}&search=${search || ""}&userId=${userId || ""}&boardId=${board_id || ""}`
  );
  return res.data;
};

export const fetchPin = async (id: string | undefined) => {
  const res = await axios.get(`http://localhost:3000/api/pins/${id}`);
  return res.data;
};

export const fetchProfile = async (username: string | undefined) => {
  if (!username) return;
  const res = await axios.get(`http://localhost:3000/api/users/${username}`);
  return res.data;
};

export const fetchBoards = async (userId: string) => {
  if (!userId) return;
  const res = await axios.get(`http://localhost:3000/api/boards/${userId}`);
  return res.data;
};
