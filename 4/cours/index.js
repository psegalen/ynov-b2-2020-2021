const faireQuelqueChose = () => {
  trucBizarreAvecTableau();
  // console.log(gererCode("OK"));
  // console.log(gererCode("Peut-être"));
  // compterLesImpairsDansLaConsole(5);
  // remplirVillesUtilisateurs();
};

const trucBizarreAvecTableau = () => {
  const monTableau = [
    { nb: 1 },
    { nb: 2 },
    { nb: 3 },
    { nb: 4 },
    { nb: 5 },
  ]
    .map(({ nb }) => ({
      nb: (nb % 2 === 0 ? nb * 5 : nb * 3).toString(),
    }))
    .sort((a, b) => (a.nb > b.nb ? -1 : 1));
  // WTF ? Que peut-il bien y avoir dans ce tableau ?
  console.debug(
    "Heu ... je ne sais pas trop ce qu'il y a dans ce tableau"
  );
  console.table(monTableau);
};

const gererCode = (code) => {
  switch (code) {
    case "OK":
      return "Tout va bien !";
    case "KO":
      return "Ah zut !";
    default:
      console.warn(
        "Wow ... on est pas sensés avoir ce genre de code : ",
        code
      );
      return "";
  }
};

const compterLesImpairsDansLaConsole = (jusqua) => {
  for (let i = 1; i < jusqua; i++) {
    if (i % 2 === 0) {
      // on passe au suivant
      break;
    }
    console.log(i);
  }
};

const remplirVillesUtilisateurs = () => {
  console.time("Appel à l'API JSON");
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      console.timeEnd("Appel à l'API JSON");
      const villes = [];
      for (let i = 0; i < response.data.length; i++) {
        const utilisateur = response.data[i];
        villes.push(utilisateur.city);
      }
      document.getElementById("racine").innerText = villes.join(
        " / "
      );
    });
};
