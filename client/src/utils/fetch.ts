import { apiRequest } from "./apiRequest";

export const fetchPins = async (
  pageParam: number,
  search: string | null | undefined,
  userId: string | null | undefined,
  board_id: string | null | undefined
) => {
  const res = await apiRequest.get(
    `/pins?cursor=${pageParam}&search=${search || ""}&userId=${
      userId || ""
    }&boardId=${board_id || ""}`
  );
  return res.data;
};

export const fetchPin = async (id: string | undefined) => {
  const res = await apiRequest.get(`/pins/${id}`);
  return res.data;
};

export const fetchProfile = async (username: string | undefined) => {
  if (!username) return;
  const res = await apiRequest.get(`/users/${username}`);
  return res.data;
};

export const fetchBoards = async (userId: string) => {
  if (!userId) return;
  const res = await apiRequest.get(`/boards/${userId}`);
  return res.data;
};

export const fetchComments = async (pinId: string) => {
  const res = await apiRequest.get(`/comments?pinId=${pinId || ""}`);
  return res.data;
};

export const fetchFollow = async (userId: string) => {
  const res = await apiRequest.get(`/follow/${userId}`);
  return res.data;
};

export const InterActionFn = async (id: string | undefined) => {
  if (!id) return;
  const res = await apiRequest.get(`/pins/interaction-pin/${id}`);
  return res.data;
};

export const createPin = async (data) => {
  const res = await apiRequest.post('/pins/create', data)
  return res.data;
};