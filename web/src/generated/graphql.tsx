import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  ads: PaginatedAds;
  ad: AdResponse;
  hello: Scalars['String'];
  me?: Maybe<User>;
  getUsers: PaginatedUsers;
};


export type QueryAdsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryAdArgs = {
  id: Scalars['Int'];
};


export type QueryGetUsersArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type PaginatedAds = {
  __typename?: 'PaginatedAds';
  ads: Array<Ad>;
  hasMore: Scalars['Boolean'];
};

export type Ad = {
  __typename?: 'Ad';
  id: Scalars['Float'];
  title: Scalars['String'];
  location: Scalars['String'];
  price: Scalars['Float'];
  wear: Scalars['String'];
  category: Scalars['String'];
  subCategory: Scalars['String'];
  owner: User;
  ownerId: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  county?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  banned: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type AdResponse = {
  __typename?: 'AdResponse';
  errors?: Maybe<Array<FieldError>>;
  ad?: Maybe<Ad>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  users: Array<User>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  post: AdResponse;
  register: UserResponse;
  login: UserResponse;
  forgotPassword?: Maybe<FieldError>;
  logout: Scalars['Boolean'];
  uploadAvatar: Scalars['Boolean'];
  changeEmail: UserResponse;
  changeLocation: UserResponse;
  changePassword: UserResponse;
  banUser: Scalars['Boolean'];
  unbanUser: Scalars['Boolean'];
};


export type MutationPostArgs = {
  options: PostInput;
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  username: Scalars['String'];
};


export type MutationUploadAvatarArgs = {
  avatar: Scalars['Upload'];
};


export type MutationChangeEmailArgs = {
  email: Scalars['String'];
};


export type MutationChangeLocationArgs = {
  city?: Maybe<Scalars['String']>;
  county?: Maybe<Scalars['String']>;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationBanUserArgs = {
  id: Scalars['Int'];
};


export type MutationUnbanUserArgs = {
  id: Scalars['Int'];
};

export type PostInput = {
  category: Scalars['String'];
  subCategory: Scalars['String'];
  title: Scalars['String'];
  price: Scalars['Int'];
  wear: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};


export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'avatar'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type BanUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type BanUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'banUser'>
);

export type ChangeEmailMutationVariables = Exact<{
  newEmail: Scalars['String'];
}>;


export type ChangeEmailMutation = (
  { __typename?: 'Mutation' }
  & { changeEmail: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email'>
    )> }
  ) }
);

export type ChangeLocationMutationVariables = Exact<{
  county?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
}>;


export type ChangeLocationMutation = (
  { __typename?: 'Mutation' }
  & { changeLocation: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'county' | 'city'>
    )> }
  ) }
);

export type ChangePasswordMutationVariables = Exact<{
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type UnbanUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UnbanUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'unbanUser'>
);

export type UploadAvatarMutationVariables = Exact<{
  avatar: Scalars['Upload'];
}>;


export type UploadAvatarMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'uploadAvatar'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type MeAvatarQueryVariables = Exact<{ [key: string]: never; }>;


export type MeAvatarQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'avatar'>
  )> }
);

export type MeEmailQueryVariables = Exact<{ [key: string]: never; }>;


export type MeEmailQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email'>
  )> }
);

export type MeFullQueryVariables = Exact<{ [key: string]: never; }>;


export type MeFullQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email' | 'createdAt' | 'updatedAt'>
    & RegularUserFragment
  )> }
);

export type MeLocationQueryVariables = Exact<{ [key: string]: never; }>;


export type MeLocationQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'city' | 'county'>
  )> }
);

export type GetUsersQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { getUsers: (
    { __typename?: 'PaginatedUsers' }
    & Pick<PaginatedUsers, 'hasMore'>
    & { users: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email' | 'banned' | 'avatar'>
    )> }
  ) }
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  avatar
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const BanUserDocument = gql`
    mutation banUser($id: Int!) {
  banUser(id: $id)
}
    `;

export function useBanUserMutation() {
  return Urql.useMutation<BanUserMutation, BanUserMutationVariables>(BanUserDocument);
};
export const ChangeEmailDocument = gql`
    mutation ChangeEmail($newEmail: String!) {
  changeEmail(email: $newEmail) {
    errors {
      field
      message
    }
    user {
      id
      username
      email
    }
  }
}
    `;

export function useChangeEmailMutation() {
  return Urql.useMutation<ChangeEmailMutation, ChangeEmailMutationVariables>(ChangeEmailDocument);
};
export const ChangeLocationDocument = gql`
    mutation ChangeLocation($county: String, $city: String) {
  changeLocation(county: $county, city: $city) {
    errors {
      field
      message
    }
    user {
      id
      username
      county
      city
    }
  }
}
    `;

export function useChangeLocationMutation() {
  return Urql.useMutation<ChangeLocationMutation, ChangeLocationMutationVariables>(ChangeLocationDocument);
};
export const ChangePasswordDocument = gql`
    mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
  changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
    errors {
      field
      message
    }
  }
}
    `;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UnbanUserDocument = gql`
    mutation unbanUser($id: Int!) {
  unbanUser(id: $id)
}
    `;

export function useUnbanUserMutation() {
  return Urql.useMutation<UnbanUserMutation, UnbanUserMutationVariables>(UnbanUserDocument);
};
export const UploadAvatarDocument = gql`
    mutation UploadAvatar($avatar: Upload!) {
  uploadAvatar(avatar: $avatar)
}
    `;

export function useUploadAvatarMutation() {
  return Urql.useMutation<UploadAvatarMutation, UploadAvatarMutationVariables>(UploadAvatarDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MeAvatarDocument = gql`
    query MeAvatar {
  me {
    avatar
  }
}
    `;

export function useMeAvatarQuery(options: Omit<Urql.UseQueryArgs<MeAvatarQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeAvatarQuery>({ query: MeAvatarDocument, ...options });
};
export const MeEmailDocument = gql`
    query MeEmail {
  me {
    email
  }
}
    `;

export function useMeEmailQuery(options: Omit<Urql.UseQueryArgs<MeEmailQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeEmailQuery>({ query: MeEmailDocument, ...options });
};
export const MeFullDocument = gql`
    query MeFull {
  me {
    ...RegularUser
    email
    createdAt
    updatedAt
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeFullQuery(options: Omit<Urql.UseQueryArgs<MeFullQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeFullQuery>({ query: MeFullDocument, ...options });
};
export const MeLocationDocument = gql`
    query MeLocation {
  me {
    city
    county
  }
}
    `;

export function useMeLocationQuery(options: Omit<Urql.UseQueryArgs<MeLocationQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeLocationQuery>({ query: MeLocationDocument, ...options });
};
export const GetUsersDocument = gql`
    query getUsers($limit: Int, $offset: Int) {
  getUsers(limit: $limit, offset: $offset) {
    users {
      id
      username
      email
      banned
      avatar
    }
    hasMore
  }
}
    `;

export function useGetUsersQuery(options: Omit<Urql.UseQueryArgs<GetUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUsersQuery>({ query: GetUsersDocument, ...options });
};