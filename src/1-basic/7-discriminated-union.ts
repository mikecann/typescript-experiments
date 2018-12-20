// Not that interesting, but we can use it for some pretty interesting things when
// we thow in type inference.

type Circle = {
  type: "circle";
  area: number;
  radius: number;
};

type Square = {
  type: "square";
  area: string;
  length: number;
};

type Shape = Circle | Square;

// Now we can write this badboy

function logTheShape(shape: Shape) {
  if (shape.type === "circle")
    console.log(
      `Its a circle and its area is ${shape.area} and its radius is ${
        shape.radius
      }`
    );
  else
    console.log(
      `It must be a square with area ${shape.area} and its length of ${
        shape.length
      }`
    );

  // also show never here
}
