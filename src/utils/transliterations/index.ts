import { alaLc as alaLcRu } from "./ru";
import { alaLc as alaLcUk } from "./uk";

const transliterations = Object.fromEntries([alaLcRu, alaLcUk].map(system => [system.id, system]));
export default transliterations;
