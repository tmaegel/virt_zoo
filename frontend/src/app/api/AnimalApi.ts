import { Animal, deserialize } from "../models/Animal";

export async function list(): Promise<Animal[]> {
  const res = await fetch("http://127.0.0.1:8000/animal");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return (await res.json()).map(deserialize);
}
