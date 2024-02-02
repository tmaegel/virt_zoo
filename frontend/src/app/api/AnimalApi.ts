import { Animal, deserialize, serialize } from "../models/Animal";

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function list(): Promise<Animal[]> {
  return fetch(`http://127.0.0.1:8000/api/animal`)
    .then(async (res) => {
      if (res.ok) {
        return (await res.json()).map(deserialize);
      } else {
        // DRF returns json with possible multiple errors.
        // For simplicity just print json out.
        const err = JSON.stringify(await res.json());
        return new ApiError(`ERROR: ${err}`);
      }
    })
    .catch((err) => {
      return new ApiError(`ERROR: ${err}`);
    });
}

export async function create(model: Animal): Promise<Animal | ApiError> {
  return fetch("http://127.0.0.1:8000/api/animal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(serialize(model)),
  })
    .then(async (res) => {
      if (res.ok) {
        return deserialize(await res.json());
      } else {
        // DRF returns json with possible multiple errors.
        // For simplicity just print json out.
        const err = JSON.stringify(await res.json());
        return new ApiError(`ERROR: ${err}`);
      }
    })
    .catch((err) => {
      return new ApiError(`ERROR: ${err}`);
    });
}

export async function update(model: Animal): Promise<Animal | ApiError> {
  return fetch(`http://127.0.0.1:8000/api/animal/${model.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(serialize(model)),
  })
    .then(async (res) => {
      if (res.ok) {
        return deserialize(await res.json());
      } else {
        // DRF returns json with possible multiple errors.
        // For simplicity just print json out.
        const err = JSON.stringify(await res.json());
        return new ApiError(`ERROR: ${err}`);
      }
    })
    .catch((err) => {
      return new ApiError(`ERROR: ${err}`);
    });
}

export async function remove(model: Animal): Promise<ApiError | void> {
  return fetch(`http://127.0.0.1:8000/api/animal/${model.id}`, {
    method: "DELETE",
  })
    .then(async (res) => {
      if (!res.ok) {
        // DRF returns json with possible multiple errors.
        // For simplicity just print json out.
        const err = JSON.stringify(await res.json());
        return new ApiError(`ERROR: ${err}`);
      }
    })
    .catch((err) => {
      return new ApiError(`ERROR: ${err}`);
    });
}
