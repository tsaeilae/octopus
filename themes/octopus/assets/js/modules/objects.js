const dog1 = {
  name: "Schnupper",
  fein: 8,
  increaseFein: function() {
    dog1.fein++;
    return dog1.fein;
  },
}
console.log(dog1, dog1.name, dog1.fein, dog1.increaseFein());

const dog2 = Object.create(null);
dog2.name = "Puschelohr";
dog2.fein = 9;
dog2.increaseFein = function() {
  dog2.fein++;
  return dog2.fein;
};
console.log(dog2, dog2.name, dog2.fein, dog2.increaseFein());

function dogCreator(name, fein) {
  const dog = {};
  dog.name = name;
  dog.fein = fein;
  dog.increaseFein = function() {
    dog.fein++;
    return dog.fein;
  };
  return dog;
};

const dog3 = dogCreator('Rubi', 10);
console.log(dog3, dog3.name, dog3.fein, dog3.increaseFein());