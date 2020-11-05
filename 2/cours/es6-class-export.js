class Animal {
  constructor(nbPattes, cri) {
    this.nbPattes = nbPattes;
    this.cri = cri;
  }

  crier() {
    console.log(this.cri);
  }
}

export class Chat extends Animal {
  constructor(nom) {
    super(4, "Miaou !");
    this.nom = nom;
  }

  crier() {
    return `${this.nom} ne s'abaissera pas à dire "${this.cri}", les chats sont bien trop fiers !`;
  }
}

export class Humain extends Animal {
  constructor(nom) {
    super(2, "Aaaaaaaaaah !");
    this.nom = nom;
  }

  crier() {
    return `${this.nom} dit "${this.cri}"`;
  }
}

const mDurand = new Humain("M. Durand");
export default mDurand;
