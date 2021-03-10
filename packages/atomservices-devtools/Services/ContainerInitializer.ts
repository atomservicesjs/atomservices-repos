import { Containers } from "atomservices";
import ServicesContainer from "./ServicesContainer";
import UserAccounts from "./UserAccounts";
import UserAuths from "./UserAuths";

const ContainerInitializer = Containers.composeContainerInitializer(ServicesContainer, {
  UserAccounts,
  UserAuths,
});

export default ContainerInitializer;
