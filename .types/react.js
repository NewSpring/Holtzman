declare type SyntheticEvent<E> = {
  target: E,
  currentTarget: E
} & Event;

declare type SyntheticInputEvent = SyntheticEvent<HTMLInputElement>;
