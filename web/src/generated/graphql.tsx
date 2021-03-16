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
  userAds: PaginatedAds;
  me?: Maybe<User>;
  user: User;
  getUsers: PaginatedUsers;
};


export type QueryAdsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryAdArgs = {
  id: Scalars['Int'];
};


export type QueryUserAdsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  userId: Scalars['Int'];
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryGetUsersArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type PaginatedAds = {
  __typename?: 'PaginatedAds';
  owner?: Maybe<User>;
  ads: Array<Ad>;
  hasMore: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  county?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  messenger?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  banned: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  adCount: Scalars['Int'];
  recent: Array<Ad>;
  coords?: Maybe<Array<Scalars['Float']>>;
};

export type Ad = {
  __typename?: 'Ad';
  id: Scalars['Float'];
  title: Scalars['String'];
  price: Scalars['Float'];
  desc?: Maybe<Scalars['String']>;
  wear: Scalars['String'];
  category: Scalars['String'];
  subCategory: Scalars['String'];
  owner: User;
  ownerId: Scalars['Float'];
  featured: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  thumbnail?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Scalars['String']>>;
  recent: Array<Ad>;
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
  changeContacts: UserResponse;
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


export type MutationChangeContactsArgs = {
  contacts: ContactsInput;
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
  desc?: Maybe<Scalars['String']>;
  wear: Scalars['String'];
  images?: Maybe<Array<Scalars['Upload']>>;
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

export type ContactsInput = {
  email?: Maybe<Scalars['String']>;
  messenger?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type AdDetailsFragment = (
  { __typename?: 'Ad' }
  & Pick<Ad, 'id' | 'title' | 'price' | 'wear' | 'createdAt' | 'updatedAt'>
  & CategoriesFragment
);

export type AdOwnerFragment = (
  { __typename?: 'Ad' }
  & { owner: (
    { __typename?: 'User' }
    & RegularUserFragment
    & UserContactsFragment
    & UserLocationFragment
  ) }
);

export type AdRecentFragment = (
  { __typename?: 'Ad' }
  & { recent: Array<(
    { __typename?: 'Ad' }
    & Pick<Ad, 'id' | 'title' | 'price' | 'thumbnail'>
  )> }
);

export type AdSnippetFragment = (
  { __typename?: 'Ad' }
  & Pick<Ad, 'thumbnail'>
  & AdDetailsFragment
  & AdOwnerFragment
);

export type CategoriesFragment = (
  { __typename?: 'Ad' }
  & Pick<Ad, 'category' | 'subCategory'>
);

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

export type UserContactsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'email' | 'messenger' | 'phone'>
);

export type UserLocationFragment = (
  { __typename?: 'User' }
  & Pick<User, 'county' | 'city' | 'coords'>
);

export type UserRecentFragment = (
  { __typename?: 'Ad' }
  & Pick<Ad, 'id' | 'title' | 'price' | 'thumbnail'>
);

export type BanUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type BanUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'banUser'>
);

export type ChangeContactsMutationVariables = Exact<{
  contacts: ContactsInput;
}>;


export type ChangeContactsMutation = (
  { __typename?: 'Mutation' }
  & { changeContacts: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
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

export type PostMutationVariables = Exact<{
  category: Scalars['String'];
  subCategory: Scalars['String'];
  title: Scalars['String'];
  price: Scalars['Int'];
  desc?: Maybe<Scalars['String']>;
  wear: Scalars['String'];
  images?: Maybe<Array<Scalars['Upload']> | Scalars['Upload']>;
}>;


export type PostMutation = (
  { __typename?: 'Mutation' }
  & { post: (
    { __typename?: 'AdResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, ad?: Maybe<(
      { __typename?: 'Ad' }
      & Pick<Ad, 'id'>
    )> }
  ) }
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

export type AdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type AdQuery = (
  { __typename?: 'Query' }
  & { ad: (
    { __typename?: 'AdResponse' }
    & { ad?: Maybe<(
      { __typename?: 'Ad' }
      & Pick<Ad, 'images' | 'desc'>
      & AdDetailsFragment
      & AdOwnerFragment
      & AdRecentFragment
    )> }
  ) }
);

export type AdsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type AdsQuery = (
  { __typename?: 'Query' }
  & { ads: (
    { __typename?: 'PaginatedAds' }
    & Pick<PaginatedAds, 'hasMore'>
    & { ads: Array<(
      { __typename?: 'Ad' }
      & AdSnippetFragment
    )> }
  ) }
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

export type MeContactsQueryVariables = Exact<{ [key: string]: never; }>;


export type MeContactsQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserContactsFragment
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
    & Pick<User, 'createdAt' | 'updatedAt'>
    & RegularUserFragment
    & UserContactsFragment
    & UserLocationFragment
  )> }
);

export type MeIdQueryVariables = Exact<{ [key: string]: never; }>;


export type MeIdQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type MeLocationQueryVariables = Exact<{ [key: string]: never; }>;


export type MeLocationQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserLocationFragment
  )> }
);

export type MePreviewQueryVariables = Exact<{ [key: string]: never; }>;


export type MePreviewQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
    & UserContactsFragment
    & UserLocationFragment
  )> }
);

export type UserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'adCount'>
    & { recent: Array<(
      { __typename?: 'Ad' }
      & UserRecentFragment
    )> }
    & RegularUserFragment
    & UserContactsFragment
    & UserLocationFragment
  ) }
);

export type UserAdsQueryVariables = Exact<{
  userId: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type UserAdsQuery = (
  { __typename?: 'Query' }
  & { userAds: (
    { __typename?: 'PaginatedAds' }
    & Pick<PaginatedAds, 'hasMore'>
    & { owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )>, ads: Array<(
      { __typename?: 'Ad' }
      & AdSnippetFragment
    )> }
  ) }
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

export const AdRecentFragmentDoc = gql`
    fragment AdRecent on Ad {
  recent {
    id
    title
    price
    thumbnail
  }
}
    `;
export const CategoriesFragmentDoc = gql`
    fragment Categories on Ad {
  category
  subCategory
}
    `;
export const AdDetailsFragmentDoc = gql`
    fragment AdDetails on Ad {
  id
  title
  price
  wear
  ...Categories
  createdAt
  updatedAt
}
    ${CategoriesFragmentDoc}`;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  avatar
}
    `;
export const UserContactsFragmentDoc = gql`
    fragment UserContacts on User {
  email
  messenger
  phone
}
    `;
export const UserLocationFragmentDoc = gql`
    fragment UserLocation on User {
  county
  city
  coords
}
    `;
export const AdOwnerFragmentDoc = gql`
    fragment AdOwner on Ad {
  owner {
    ...RegularUser
    ...UserContacts
    ...UserLocation
  }
}
    ${RegularUserFragmentDoc}
${UserContactsFragmentDoc}
${UserLocationFragmentDoc}`;
export const AdSnippetFragmentDoc = gql`
    fragment AdSnippet on Ad {
  ...AdDetails
  ...AdOwner
  thumbnail
}
    ${AdDetailsFragmentDoc}
${AdOwnerFragmentDoc}`;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
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
export const UserRecentFragmentDoc = gql`
    fragment UserRecent on Ad {
  id
  title
  price
  thumbnail
}
    `;
export const BanUserDocument = gql`
    mutation banUser($id: Int!) {
  banUser(id: $id)
}
    `;

export function useBanUserMutation() {
  return Urql.useMutation<BanUserMutation, BanUserMutationVariables>(BanUserDocument);
};
export const ChangeContactsDocument = gql`
    mutation ChangeContacts($contacts: ContactsInput!) {
  changeContacts(contacts: $contacts) {
    errors {
      field
      message
    }
  }
}
    `;

export function useChangeContactsMutation() {
  return Urql.useMutation<ChangeContactsMutation, ChangeContactsMutationVariables>(ChangeContactsDocument);
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
export const PostDocument = gql`
    mutation Post($category: String!, $subCategory: String!, $title: String!, $price: Int!, $desc: String, $wear: String!, $images: [Upload!]) {
  post(
    options: {category: $category, subCategory: $subCategory, title: $title, price: $price, wear: $wear, desc: $desc, images: $images}
  ) {
    errors {
      field
      message
    }
    ad {
      id
    }
  }
}
    `;

export function usePostMutation() {
  return Urql.useMutation<PostMutation, PostMutationVariables>(PostDocument);
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
export const AdDocument = gql`
    query Ad($id: Int!) {
  ad(id: $id) {
    ad {
      ...AdDetails
      ...AdOwner
      ...AdRecent
      images
      desc
    }
  }
}
    ${AdDetailsFragmentDoc}
${AdOwnerFragmentDoc}
${AdRecentFragmentDoc}`;

export function useAdQuery(options: Omit<Urql.UseQueryArgs<AdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AdQuery>({ query: AdDocument, ...options });
};
export const AdsDocument = gql`
    query Ads($limit: Int, $offset: Int) {
  ads(limit: $limit, offset: $offset) {
    ads {
      ...AdSnippet
    }
    hasMore
  }
}
    ${AdSnippetFragmentDoc}`;

export function useAdsQuery(options: Omit<Urql.UseQueryArgs<AdsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AdsQuery>({ query: AdsDocument, ...options });
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
export const MeContactsDocument = gql`
    query MeContacts {
  me {
    ...UserContacts
  }
}
    ${UserContactsFragmentDoc}`;

export function useMeContactsQuery(options: Omit<Urql.UseQueryArgs<MeContactsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeContactsQuery>({ query: MeContactsDocument, ...options });
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
    ...UserContacts
    ...UserLocation
    createdAt
    updatedAt
  }
}
    ${RegularUserFragmentDoc}
${UserContactsFragmentDoc}
${UserLocationFragmentDoc}`;

export function useMeFullQuery(options: Omit<Urql.UseQueryArgs<MeFullQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeFullQuery>({ query: MeFullDocument, ...options });
};
export const MeIdDocument = gql`
    query MeId {
  me {
    id
  }
}
    `;

export function useMeIdQuery(options: Omit<Urql.UseQueryArgs<MeIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeIdQuery>({ query: MeIdDocument, ...options });
};
export const MeLocationDocument = gql`
    query MeLocation {
  me {
    ...UserLocation
  }
}
    ${UserLocationFragmentDoc}`;

export function useMeLocationQuery(options: Omit<Urql.UseQueryArgs<MeLocationQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeLocationQuery>({ query: MeLocationDocument, ...options });
};
export const MePreviewDocument = gql`
    query MePreview {
  me {
    id
    username
    ...UserContacts
    ...UserLocation
  }
}
    ${UserContactsFragmentDoc}
${UserLocationFragmentDoc}`;

export function useMePreviewQuery(options: Omit<Urql.UseQueryArgs<MePreviewQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MePreviewQuery>({ query: MePreviewDocument, ...options });
};
export const UserDocument = gql`
    query User($id: Int!) {
  user(id: $id) {
    ...RegularUser
    ...UserContacts
    ...UserLocation
    adCount
    recent {
      ...UserRecent
    }
  }
}
    ${RegularUserFragmentDoc}
${UserContactsFragmentDoc}
${UserLocationFragmentDoc}
${UserRecentFragmentDoc}`;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
};
export const UserAdsDocument = gql`
    query UserAds($userId: Int!, $limit: Int, $offset: Int) {
  userAds(userId: $userId, limit: $limit, offset: $offset) {
    owner {
      username
    }
    ads {
      ...AdSnippet
    }
    hasMore
  }
}
    ${AdSnippetFragmentDoc}`;

export function useUserAdsQuery(options: Omit<Urql.UseQueryArgs<UserAdsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserAdsQuery>({ query: UserAdsDocument, ...options });
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