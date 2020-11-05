class Animal {
  constructor(nbPattes, cri) {
    this.nbPattes = nbPattes;
    this.cri = cri;
  }

  crier() {
    console.log(this.cri);
  }
  avancer() {
    const pattes = Array(this.nbPattes + 1);
    console.log(pattes.join("."));
  }
}

// La classe "Chien" hérite de la classe "Animal"
class Chien extends Animal {
  constructor(nom) {
    // Appel du constructeur de la classe mère
    super(4, "Ouaf !");
    this.nom = nom;
  }

  // Surcharge de la méthode de la classe mère
  crier() {
    console.log(`${this.nom} dit "${this.cri}"`);
  }
}

// La classe "Humain" hérite de la classe "Animal"
class Humain extends Animal {
  constructor(nom) {
    // Appel du constructeur de la classe mère
    super(2, "Aaaaaaaaaah !");
    this.nom = nom;
  }

  // Surcharge de la méthode de la classe mère
  crier() {
    console.log(`${this.nom} dit "${this.cri}"`);
  }
}

const medor = new Chien("Médor");
medor.crier();
medor.avancer();

const mDurand = new Humain("M. Durand");
mDurand.crier();
mDurand.avancer();

console.log(mDurand);
