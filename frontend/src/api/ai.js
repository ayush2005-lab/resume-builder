import axiosClient from "./axiosClient";

export async function improveResume(resume) {
  const { data } = await axiosClient.post("/ai/improve", {
    resume,
  });

  return data;
}