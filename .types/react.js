declare type SyntheticEvent<E> = {
  target: E,
  currentTarget: {
    id: string
  }
} & Event;

declare type SyntheticInputEvent = SyntheticEvent<HTMLInputElement>;
