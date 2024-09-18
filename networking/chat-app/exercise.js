const userId = [1, 2, 3];
const users = [
  { username: "vishal" },
  { username: "bob" },
  { username: "adam" },
];

const newArr = users.map((user, idx) => {
  return {
    ...user,
    id: userId[idx],
  };
});

console.log(newArr);
