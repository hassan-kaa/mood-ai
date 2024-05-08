import { revalidatePath } from "next/cache";

const createURL = (path: string) => {
  return window.location.origin + path;
};

export const createNewEntry = async (content: string) => {
  const res = await fetch(
    new Request(createURL("/api/journal"), {
      method: "POST",
      body: JSON.stringify({ content }),
    })
  );
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

export const updateEntry = async (id: string, content: string) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: "PATCH",
      body: JSON.stringify({ content }),
    })
  );
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
  revalidatePath(`/api/journal/${id}`);
};

export const deleteEntry = async (id: string) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: "DELETE",
    })
  );
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};
