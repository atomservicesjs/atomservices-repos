import { IServicesContainer } from "atomservices";
import scope from "./Scope";
import UserAccounts from "./UserAccounts/ContainizedService";
import UserAuths from "./UserAuths/ContainizedService";

const Services = {
  UserAccounts,
  UserAuths,
};

const ServicesContainer: IServicesContainer = {
  scope,
  Services,
};

export default ServicesContainer;
