// Types can be infered or explicit

type MyExplicitObject = {
  someProp: string;
};

const myExplicitObject: MyExplicitObject = {
  // note the error because its missing the explicity required variable
};