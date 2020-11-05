import mDurand, { Humain, Chat } from "./es6-class-export.js";

const mmeDupuis = new Humain("Mme Dupuis");
const felix = new Chat("Félix");

document.getElementById("humain").innerHTML = mmeDupuis.crier();

document.getElementById("chat").innerHTML = felix.crier();

document.getElementById("humain2").innerHTML = mDurand.crier();
