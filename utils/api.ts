import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
const createURL = (path: string) => {
  return process.env.NEXT_PUBLIC_BASE_URL + path;
};

export const getEntries = async () => {
  const res = await fetch(new Request(createURL("/api/journal")));
  if (res.ok) {
    const data = await res.json();
    return data.data;
  } else {
    console.log("GetEntries Error fetching data");
  }
};

export const getEntry = async (id: string) => {
  const res = await fetch(new Request(createURL(`/api/journal/${id}`)));
  if (res.ok) {
    const data = await res.json();
    return data.data;
  } else {
    console.log("GetEntry Error fetching data");
  }
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
export const pinEntry = async (id: string, pinned: boolean) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: "PATCH",
      body: JSON.stringify({ pinned }),
    })
  );
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }

  revalidatePath(`/api/journal`);
};
export const archiveEntry = async (id: string, archived: boolean) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: "PATCH",
      body: JSON.stringify({ archived }),
    })
  );
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
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

export const register = async (user: User) => {
  return await fetch(createURL("/api/auth/sign-up"), {
    method: "POST",
    body: JSON.stringify(user),
  });
};

export const login = async (user: User) => {
  return await fetch(createURL("/api/auth/sign-in"), {
    method: "POST",
    body: JSON.stringify(user),
  });
};
