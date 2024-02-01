export type Animal = {
  id: Number | undefined;
  name: string;
  weight: Number;
  capability: string;
  extinctSince: Number;
};

export type AnimalPayload = {
  id: Number | undefined;
  name: string;
  weight: Number;
  capability: string;
  extinct_since: Number;
};

export function serialize(animal: Animal): AnimalPayload {
  const { extinctSince, ...rest } = animal;
  return {
    extinct_since: extinctSince,
    ...rest,
  };
}

export function deserialize(animalPayload: AnimalPayload): Animal {
  const { extinct_since, ...rest } = animalPayload;
  return {
    extinctSince: extinct_since,
    ...rest,
  };
}
