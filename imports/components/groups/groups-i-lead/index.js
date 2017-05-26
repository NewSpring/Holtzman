// @flow
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import Layout from "./Layout";
import { PRELOAD_PERSON } from "../../../data/store/accounts/saga";

export type IPerson = {
  id: number,
  impersonationParameter: string,
  groups: IGroup[],
};

export type IMember = {
  person: IPerson,
  role: string,
};

export const isLeader = (person: IPerson, leaders: IMember[]) =>
  person &&
  Array.isArray(leaders) &&
  leaders.length &&
  Boolean(leaders.filter(x => x.person.id === person.id).length);

export type IGroup = {
  id: number,
  groupType: number,
  name: string,
  photo: string,
  members: IMember[],
};

export const getLeaders = (group: IGroup) =>
  group &&
  group.members &&
  group.members.filter(x => x.role.toLowerCase() === "leader");

export type IData = {
  person: IPerson,
};

export const propsReducer = ({ data }: { data: IData }) => {
  const person = data.person;
  const groups = data.person && data.person.groups;
  const loginParam = person ? person.impersonationParameter : "";
  const ledGroups = groups && groups.length && person
    ? groups
      .map(g => ({...g, members: getLeaders(g)})) // members only shows leaders
      .filter(g => isLeader(person, g.members)) // filter out groups this person isn't leading
    : null;
  return groups ? { groups: ledGroups, loginParam } : { loading: true };
};

export const withGroups = graphql(PRELOAD_PERSON, {
  props: propsReducer
});

export default withGroups(Layout);
