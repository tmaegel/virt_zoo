export type Animal = {
  id: Number;
  name: string;
  weight: Number;
  capability: string;
  extinctSince: Date;
};

export type AnimalPayload = {
  id: Number;
  name: string;
  weight: Number;
  capability: string;
  extinct_since: string;
};

export function serialize(animal: Animal): AnimalPayload {
  const { extinctSince, ...rest } = animal;
  return {
    extinct_since: extinctSince.toISOString(),
    ...rest,
  };
}

export function deserialize(animalPayload: AnimalPayload): Animal {
  const { extinct_since, ...rest } = animalPayload;
  return {
    extinctSince: new Date(extinct_since),
    ...rest,
  };
}
