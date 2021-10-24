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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  ads: PaginatedAds;
  ad: AdResponse;
  recentConversations?: Maybe<PaginatedConversations>;
  conversation?: Maybe<Conversation>;
  delivery?: Maybe<Delivery>;
  nearbyDrivers?: Maybe<Array<NearbyDriver>>;
  sentDeliveryRequests: Array<Delivery>;
  incomingDeliveryRequests: Array<Delivery>;
  incomingDriverRequests: Array<Delivery>;
  deliveryHistory: Array<Delivery>;
  feedbacks: PaginatedFeedbacks;
  messages?: Maybe<PaginatedMessages>;
  userAds: PaginatedAds;
  me?: Maybe<User>;
  user: User;
  getUsers: PaginatedUsers;
};


export type QueryAdsArgs = {
  priceCursor?: Maybe<Scalars['String']>;
  dateCursor?: Maybe<Scalars['String']>;
  sortBy: AdSortingOptions;
  search: AdSearch;
  first?: Maybe<Scalars['Int']>;
};


export type QueryAdArgs = {
  id: Scalars['Int'];
};


export type QueryRecentConversationsArgs = {
  partnerUsernameFilter?: Maybe<Scalars['String']>;
  cursor?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
};


export type QueryConversationArgs = {
  conversationId: Scalars['Int'];
};


export type QueryDeliveryArgs = {
  id: Scalars['Int'];
};


export type QueryNearbyDriversArgs = {
  sellerId: Scalars['Int'];
};


export type QuerySentDeliveryRequestsArgs = {
  page: Scalars['Int'];
};


export type QueryIncomingDeliveryRequestsArgs = {
  page: Scalars['Int'];
};


export type QueryIncomingDriverRequestsArgs = {
  page: Scalars['Int'];
};


export type QueryDeliveryHistoryArgs = {
  page: Scalars['Int'];
};


export type QueryFeedbacksArgs = {
  satisified?: Maybe<Scalars['Boolean']>;
  cursor?: Maybe<Scalars['String']>;
  recipientId?: Maybe<Scalars['Int']>;
  authorId?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
};


export type QueryMessagesArgs = {
  cursor?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  conversationId: Scalars['Int'];
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
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  county?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  messenger?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  banned: Scalars['Boolean'];
  delivers: Scalars['Boolean'];
  adCount: Scalars['Int'];
  karma: KarmaResponse;
  ads: Array<Ad>;
  recent: Array<Ad>;
};

export type KarmaResponse = {
  __typename?: 'KarmaResponse';
  satisfied: Scalars['Int'];
  unsatisfied: Scalars['Int'];
};

export type Ad = {
  __typename?: 'Ad';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
  price: Scalars['Float'];
  desc?: Maybe<Scalars['String']>;
  wear: Scalars['String'];
  category: Scalars['String'];
  subCategory: Scalars['String'];
  owner: User;
  ownerId: Scalars['Float'];
  featured: Scalars['Boolean'];
  archieved: Scalars['Boolean'];
  thumbnail?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Scalars['String']>>;
  recent: Array<Ad>;
};

export type AdSortingOptions = {
  sortBy?: Maybe<SortByOption>;
  order?: Maybe<OrderOption>;
};

/** Options for sorting ads */
export enum SortByOption {
  CreatedAt = 'createdAt',
  Price = 'price',
  UpdatedAt = 'updatedAt'
}

export enum OrderOption {
  Desc = 'DESC',
  Asc = 'ASC'
}

export type AdSearch = {
  title?: Maybe<Scalars['String']>;
  wear?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  subcategory?: Maybe<Scalars['String']>;
  priceLower?: Maybe<Scalars['Int']>;
  priceUpper?: Maybe<Scalars['Int']>;
  county?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
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

export type PaginatedConversations = {
  __typename?: 'PaginatedConversations';
  conversations: Array<Conversation>;
  hasMore?: Maybe<Scalars['Boolean']>;
};

export type Conversation = {
  __typename?: 'Conversation';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  participants: Array<User>;
  messages?: Maybe<Array<Message>>;
  latest: Message;
  partner: User;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  author: User;
  conversation: Conversation;
  authorId: Scalars['Float'];
  conversationId: Scalars['Float'];
  content: Scalars['String'];
  read?: Maybe<Scalars['Boolean']>;
};

export type Delivery = {
  __typename?: 'Delivery';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  seller: User;
  sellerId: Scalars['Float'];
  buyer: User;
  buyerId: Scalars['Float'];
  driver: User;
  driverId: Scalars['Float'];
  sellerApproval?: Maybe<Scalars['Boolean']>;
  driverApproval?: Maybe<Scalars['Boolean']>;
  buyerApproval?: Maybe<Scalars['Boolean']>;
  ad: Ad;
  adId: Scalars['Float'];
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
  notes: Scalars['String'];
  time: Scalars['DateTime'];
};


export type NearbyDriver = {
  __typename?: 'NearbyDriver';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  county?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  messenger?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  banned: Scalars['Boolean'];
  delivers: Scalars['Boolean'];
  adCount: Scalars['Int'];
  karma: KarmaResponse;
  ads: Array<Ad>;
  recent: Array<Ad>;
  distance?: Maybe<Scalars['Float']>;
};

export type PaginatedFeedbacks = {
  __typename?: 'PaginatedFeedbacks';
  feedbacks: Array<Feedback>;
  hasMore: Scalars['Boolean'];
};

export type Feedback = {
  __typename?: 'Feedback';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  author: User;
  recipient: User;
  ad: Ad;
  authorId: Scalars['Float'];
  recipientId: Scalars['Float'];
  adId: Scalars['Float'];
  satisfied: Scalars['Boolean'];
  comment?: Maybe<Scalars['String']>;
};

export type PaginatedMessages = {
  __typename?: 'PaginatedMessages';
  messages: Array<Message>;
  partner?: Maybe<User>;
  hasMore?: Maybe<Scalars['Boolean']>;
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  users: Array<User>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  post: AdResponse;
  editAd: AdResponse;
  deleteAd: Scalars['Boolean'];
  deleteAdImage: Scalars['Boolean'];
  uploadAdImages: Array<Scalars['String']>;
  readConversation: Scalars['Boolean'];
  toggleDelivers: Scalars['Boolean'];
  submitDeliveryRequest: DeliveryResponse;
  approveDeliveryBySeller: Scalars['Boolean'];
  approveDeliveryByDriver: Scalars['Boolean'];
  finalizeDelivery: Scalars['Boolean'];
  leaveFeedback: FeedbackResponse;
  deleteFeedback?: Maybe<FieldError>;
  sendMessage: MessageResponse;
  readMessages: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  forgotPassword?: Maybe<FieldError>;
  resetPassword: UserResponse;
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


export type MutationEditAdArgs = {
  options: PostInput;
  adId: Scalars['Int'];
};


export type MutationDeleteAdArgs = {
  adId: Scalars['Int'];
};


export type MutationDeleteAdImageArgs = {
  src: Scalars['String'];
};


export type MutationUploadAdImagesArgs = {
  adId: Scalars['Int'];
  images: Array<Scalars['Upload']>;
};


export type MutationReadConversationArgs = {
  conversationId: Scalars['Int'];
};


export type MutationToggleDeliversArgs = {
  to: Scalars['Boolean'];
};


export type MutationSubmitDeliveryRequestArgs = {
  input: DeliveryInput;
};


export type MutationApproveDeliveryBySellerArgs = {
  id: Scalars['Int'];
};


export type MutationApproveDeliveryByDriverArgs = {
  id: Scalars['Int'];
};


export type MutationFinalizeDeliveryArgs = {
  id: Scalars['Int'];
};


export type MutationLeaveFeedbackArgs = {
  options: FeedbackInput;
};


export type MutationDeleteFeedbackArgs = {
  id: Scalars['Int'];
};


export type MutationSendMessageArgs = {
  conversationId?: Maybe<Scalars['Int']>;
  partnerUsername?: Maybe<Scalars['String']>;
  content: Scalars['String'];
};


export type MutationReadMessagesArgs = {
  conversationId: Scalars['Int'];
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


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
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


export type DeliveryResponse = {
  __typename?: 'DeliveryResponse';
  errors?: Maybe<Array<FieldError>>;
  delivery?: Maybe<Delivery>;
};

export type DeliveryInput = {
  sellerId: Scalars['Float'];
  driverId: Scalars['Float'];
  adId: Scalars['Float'];
  time: Scalars['String'];
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
  notes: Scalars['String'];
};

export type FeedbackResponse = {
  __typename?: 'FeedbackResponse';
  errors?: Maybe<Array<FieldError>>;
  feedback?: Maybe<Feedback>;
};

export type FeedbackInput = {
  recipientId: Scalars['Float'];
  adId: Scalars['Float'];
  satisfied: Scalars['Boolean'];
  comment?: Maybe<Scalars['String']>;
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Message>;
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

export type Subscription = {
  __typename?: 'Subscription';
  messageNotification: Message;
};

export type AdDetailsFragment = (
  { __typename?: 'Ad' }
  & Pick<Ad, 'id' | 'title' | 'price' | 'wear' | 'featured' | 'createdAt' | 'updatedAt'>
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

export type KarmaFragment = (
  { __typename?: 'User' }
  & { karma: (
    { __typename?: 'KarmaResponse' }
    & Pick<KarmaResponse, 'satisfied' | 'unsatisfied'>
  ) }
);

export type RecentMessageFragment = (
  { __typename?: 'Message' }
  & Pick<Message, 'id' | 'authorId' | 'content' | 'read' | 'createdAt'>
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

export type UserAddressFragment = (
  { __typename?: 'User' }
  & Pick<User, 'county' | 'city'>
);

export type UserContactsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'email' | 'messenger' | 'phone'>
);

export type UserLocationFragment = (
  { __typename?: 'User' }
  & Pick<User, 'longitude' | 'latitude'>
  & UserAddressFragment
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

export type DeleteAdMutationVariables = Exact<{
  adId: Scalars['Int'];
}>;


export type DeleteAdMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteAd'>
);

export type DeleteAdImageMutationVariables = Exact<{
  src: Scalars['String'];
}>;


export type DeleteAdImageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteAdImage'>
);

export type EditAdMutationVariables = Exact<{
  adId: Scalars['Int'];
  options: PostInput;
}>;


export type EditAdMutation = (
  { __typename?: 'Mutation' }
  & { editAd: (
    { __typename?: 'AdResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgotPassword?: Maybe<(
    { __typename?: 'FieldError' }
    & Pick<FieldError, 'field' | 'message'>
  )> }
);

export type LeaveFeedbackMutationVariables = Exact<{
  options: FeedbackInput;
}>;


export type LeaveFeedbackMutation = (
  { __typename?: 'Mutation' }
  & { leaveFeedback: (
    { __typename?: 'FeedbackResponse' }
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

export type ReadConversationMutationVariables = Exact<{
  conversationId: Scalars['Int'];
}>;


export type ReadConversationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'readConversation'>
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

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type SendMessageMutationVariables = Exact<{
  partnerUsername?: Maybe<Scalars['String']>;
  conversationId?: Maybe<Scalars['Int']>;
  content: Scalars['String'];
}>;


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & { sendMessage: (
    { __typename?: 'MessageResponse' }
    & { message?: Maybe<(
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'createdAt' | 'content'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'avatar'>
      ) }
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>> }
  ) }
);

export type SubmitDeliveryRequestMutationVariables = Exact<{
  input: DeliveryInput;
}>;


export type SubmitDeliveryRequestMutation = (
  { __typename?: 'Mutation' }
  & { submitDeliveryRequest: (
    { __typename?: 'DeliveryResponse' }
    & { delivery?: Maybe<(
      { __typename?: 'Delivery' }
      & Pick<Delivery, 'id'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type ToggleDeliversMutationVariables = Exact<{
  to: Scalars['Boolean'];
}>;


export type ToggleDeliversMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'toggleDelivers'>
);

export type UnbanUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UnbanUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'unbanUser'>
);

export type UploadAdImagesMutationVariables = Exact<{
  adId: Scalars['Int'];
  images: Array<Scalars['Upload']> | Scalars['Upload'];
}>;


export type UploadAdImagesMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'uploadAdImages'>
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

export type AdPreviewQueryVariables = Exact<{
  adId: Scalars['Int'];
}>;


export type AdPreviewQuery = (
  { __typename?: 'Query' }
  & { ad: (
    { __typename?: 'AdResponse' }
    & { ad?: Maybe<(
      { __typename?: 'Ad' }
      & Pick<Ad, 'id' | 'title' | 'price' | 'createdAt' | 'updatedAt' | 'thumbnail'>
      & { owner: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
        & UserLocationFragment
      ) }
    )> }
  ) }
);

export type AdsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  dateCursor?: Maybe<Scalars['String']>;
  priceCursor?: Maybe<Scalars['String']>;
  search: AdSearch;
  sortBy: AdSortingOptions;
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

export type ConversationPartnerQueryVariables = Exact<{
  conversationId: Scalars['Int'];
}>;


export type ConversationPartnerQuery = (
  { __typename?: 'Query' }
  & { conversation?: Maybe<(
    { __typename?: 'Conversation' }
    & { partner: (
      { __typename?: 'User' }
      & RegularUserFragment
    ) }
  )> }
);

export type ConversationPartnerDetailsQueryVariables = Exact<{
  conversationId: Scalars['Int'];
}>;


export type ConversationPartnerDetailsQuery = (
  { __typename?: 'Query' }
  & { conversation?: Maybe<(
    { __typename?: 'Conversation' }
    & { partner: (
      { __typename?: 'User' }
      & RegularUserFragment
      & UserContactsFragment
      & UserAddressFragment
      & KarmaFragment
    ) }
  )> }
);

export type KarmaQueryVariables = Exact<{
  recipientId?: Maybe<Scalars['Int']>;
  satisfied?: Maybe<Scalars['Boolean']>;
  cursor?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
}>;


export type KarmaQuery = (
  { __typename?: 'Query' }
  & { feedbacks: (
    { __typename?: 'PaginatedFeedbacks' }
    & Pick<PaginatedFeedbacks, 'hasMore'>
    & { feedbacks: Array<(
      { __typename?: 'Feedback' }
      & Pick<Feedback, 'id' | 'comment' | 'satisfied' | 'createdAt'>
      & { ad: (
        { __typename?: 'Ad' }
        & Pick<Ad, 'id' | 'title' | 'thumbnail'>
      ), author: (
        { __typename?: 'User' }
        & RegularUserFragment
      ) }
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

export type MeDeliversQueryVariables = Exact<{ [key: string]: never; }>;


export type MeDeliversQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'delivers'>
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

export type MessagesQueryVariables = Exact<{
  cursor?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  conversationId: Scalars['Int'];
}>;


export type MessagesQuery = (
  { __typename?: 'Query' }
  & { messages?: Maybe<(
    { __typename?: 'PaginatedMessages' }
    & Pick<PaginatedMessages, 'hasMore'>
    & { messages: Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'conversationId' | 'content' | 'createdAt'>
      & { author: (
        { __typename?: 'User' }
        & RegularUserFragment
      ) }
    )>, partner?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  )> }
);

export type NearbyDriversQueryVariables = Exact<{
  sellerId: Scalars['Int'];
}>;


export type NearbyDriversQuery = (
  { __typename?: 'Query' }
  & { nearbyDrivers?: Maybe<Array<(
    { __typename?: 'NearbyDriver' }
    & Pick<NearbyDriver, 'id' | 'username' | 'avatar' | 'city' | 'county' | 'longitude' | 'latitude' | 'distance'>
  )>> }
);

export type RecentConversationsQueryVariables = Exact<{
  cursor?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  partnerUsernameFilter?: Maybe<Scalars['String']>;
}>;


export type RecentConversationsQuery = (
  { __typename?: 'Query' }
  & { recentConversations?: Maybe<(
    { __typename?: 'PaginatedConversations' }
    & Pick<PaginatedConversations, 'hasMore'>
    & { conversations: Array<(
      { __typename?: 'Conversation' }
      & Pick<Conversation, 'id'>
      & { latest: (
        { __typename?: 'Message' }
        & RecentMessageFragment
      ), partner: (
        { __typename?: 'User' }
        & RegularUserFragment
      ) }
    )> }
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
    & KarmaFragment
  ) }
);

export type UserLeaveFeedbackQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserLeaveFeedbackQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'banned'>
    & { ads: Array<(
      { __typename?: 'Ad' }
      & Pick<Ad, 'id' | 'title'>
    )> }
    & RegularUserFragment
    & KarmaFragment
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

export type MessageNotificationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MessageNotificationSubscription = (
  { __typename?: 'Subscription' }
  & { messageNotification: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'conversationId' | 'content' | 'createdAt'>
    & { author: (
      { __typename?: 'User' }
      & RegularUserFragment
    ) }
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
  featured
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
export const UserAddressFragmentDoc = gql`
    fragment UserAddress on User {
  county
  city
}
    `;
export const UserLocationFragmentDoc = gql`
    fragment UserLocation on User {
  ...UserAddress
  longitude
  latitude
}
    ${UserAddressFragmentDoc}`;
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
export const KarmaFragmentDoc = gql`
    fragment Karma on User {
  karma {
    satisfied
    unsatisfied
  }
}
    `;
export const RecentMessageFragmentDoc = gql`
    fragment RecentMessage on Message {
  id
  authorId
  content
  read
  createdAt
}
    `;
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
export const DeleteAdDocument = gql`
    mutation DeleteAd($adId: Int!) {
  deleteAd(adId: $adId)
}
    `;

export function useDeleteAdMutation() {
  return Urql.useMutation<DeleteAdMutation, DeleteAdMutationVariables>(DeleteAdDocument);
};
export const DeleteAdImageDocument = gql`
    mutation DeleteAdImage($src: String!) {
  deleteAdImage(src: $src)
}
    `;

export function useDeleteAdImageMutation() {
  return Urql.useMutation<DeleteAdImageMutation, DeleteAdImageMutationVariables>(DeleteAdImageDocument);
};
export const EditAdDocument = gql`
    mutation EditAd($adId: Int!, $options: PostInput!) {
  editAd(adId: $adId, options: $options) {
    errors {
      field
      message
    }
  }
}
    `;

export function useEditAdMutation() {
  return Urql.useMutation<EditAdMutation, EditAdMutationVariables>(EditAdDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($username: String!) {
  forgotPassword(username: $username) {
    field
    message
  }
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LeaveFeedbackDocument = gql`
    mutation LeaveFeedback($options: FeedbackInput!) {
  leaveFeedback(options: $options) {
    errors {
      field
      message
    }
  }
}
    `;

export function useLeaveFeedbackMutation() {
  return Urql.useMutation<LeaveFeedbackMutation, LeaveFeedbackMutationVariables>(LeaveFeedbackDocument);
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
export const ReadConversationDocument = gql`
    mutation ReadConversation($conversationId: Int!) {
  readConversation(conversationId: $conversationId)
}
    `;

export function useReadConversationMutation() {
  return Urql.useMutation<ReadConversationMutation, ReadConversationMutationVariables>(ReadConversationDocument);
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
export const ResetPasswordDocument = gql`
    mutation ResetPassword($token: String!, $newPassword: String!) {
  resetPassword(token: $token, newPassword: $newPassword) {
    errors {
      field
      message
    }
  }
}
    `;

export function useResetPasswordMutation() {
  return Urql.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument);
};
export const SendMessageDocument = gql`
    mutation SendMessage($partnerUsername: String, $conversationId: Int, $content: String!) {
  sendMessage(
    partnerUsername: $partnerUsername
    conversationId: $conversationId
    content: $content
  ) {
    message {
      id
      author {
        id
        avatar
      }
      createdAt
      content
    }
    errors {
      ...RegularError
    }
  }
}
    ${RegularErrorFragmentDoc}`;

export function useSendMessageMutation() {
  return Urql.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument);
};
export const SubmitDeliveryRequestDocument = gql`
    mutation SubmitDeliveryRequest($input: DeliveryInput!) {
  submitDeliveryRequest(input: $input) {
    delivery {
      id
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useSubmitDeliveryRequestMutation() {
  return Urql.useMutation<SubmitDeliveryRequestMutation, SubmitDeliveryRequestMutationVariables>(SubmitDeliveryRequestDocument);
};
export const ToggleDeliversDocument = gql`
    mutation ToggleDelivers($to: Boolean!) {
  toggleDelivers(to: $to)
}
    `;

export function useToggleDeliversMutation() {
  return Urql.useMutation<ToggleDeliversMutation, ToggleDeliversMutationVariables>(ToggleDeliversDocument);
};
export const UnbanUserDocument = gql`
    mutation unbanUser($id: Int!) {
  unbanUser(id: $id)
}
    `;

export function useUnbanUserMutation() {
  return Urql.useMutation<UnbanUserMutation, UnbanUserMutationVariables>(UnbanUserDocument);
};
export const UploadAdImagesDocument = gql`
    mutation UploadAdImages($adId: Int!, $images: [Upload!]!) {
  uploadAdImages(adId: $adId, images: $images)
}
    `;

export function useUploadAdImagesMutation() {
  return Urql.useMutation<UploadAdImagesMutation, UploadAdImagesMutationVariables>(UploadAdImagesDocument);
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
export const AdPreviewDocument = gql`
    query AdPreview($adId: Int!) {
  ad(id: $adId) {
    ad {
      id
      title
      price
      createdAt
      updatedAt
      thumbnail
      owner {
        id
        username
        ...UserLocation
      }
    }
  }
}
    ${UserLocationFragmentDoc}`;

export function useAdPreviewQuery(options: Omit<Urql.UseQueryArgs<AdPreviewQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AdPreviewQuery>({ query: AdPreviewDocument, ...options });
};
export const AdsDocument = gql`
    query Ads($first: Int, $dateCursor: String, $priceCursor: String, $search: AdSearch!, $sortBy: AdSortingOptions!) {
  ads(
    first: $first
    dateCursor: $dateCursor
    priceCursor: $priceCursor
    search: $search
    sortBy: $sortBy
  ) {
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
export const ConversationPartnerDocument = gql`
    query ConversationPartner($conversationId: Int!) {
  conversation(conversationId: $conversationId) {
    partner {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useConversationPartnerQuery(options: Omit<Urql.UseQueryArgs<ConversationPartnerQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ConversationPartnerQuery>({ query: ConversationPartnerDocument, ...options });
};
export const ConversationPartnerDetailsDocument = gql`
    query ConversationPartnerDetails($conversationId: Int!) {
  conversation(conversationId: $conversationId) {
    partner {
      ...RegularUser
      ...UserContacts
      ...UserAddress
      ...Karma
    }
  }
}
    ${RegularUserFragmentDoc}
${UserContactsFragmentDoc}
${UserAddressFragmentDoc}
${KarmaFragmentDoc}`;

export function useConversationPartnerDetailsQuery(options: Omit<Urql.UseQueryArgs<ConversationPartnerDetailsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ConversationPartnerDetailsQuery>({ query: ConversationPartnerDetailsDocument, ...options });
};
export const KarmaDocument = gql`
    query Karma($recipientId: Int, $satisfied: Boolean, $cursor: String, $first: Int) {
  feedbacks(
    recipientId: $recipientId
    satisified: $satisfied
    cursor: $cursor
    first: $first
  ) {
    feedbacks {
      id
      ad {
        id
        title
        thumbnail
      }
      author {
        ...RegularUser
      }
      comment
      satisfied
      createdAt
    }
    hasMore
  }
}
    ${RegularUserFragmentDoc}`;

export function useKarmaQuery(options: Omit<Urql.UseQueryArgs<KarmaQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<KarmaQuery>({ query: KarmaDocument, ...options });
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
export const MeDeliversDocument = gql`
    query MeDelivers {
  me {
    delivers
  }
}
    `;

export function useMeDeliversQuery(options: Omit<Urql.UseQueryArgs<MeDeliversQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeDeliversQuery>({ query: MeDeliversDocument, ...options });
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
export const MessagesDocument = gql`
    query Messages($cursor: String, $first: Int, $conversationId: Int!) {
  messages(cursor: $cursor, first: $first, conversationId: $conversationId) {
    messages {
      id
      author {
        ...RegularUser
      }
      conversationId
      content
      createdAt
    }
    hasMore
    partner {
      username
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useMessagesQuery(options: Omit<Urql.UseQueryArgs<MessagesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MessagesQuery>({ query: MessagesDocument, ...options });
};
export const NearbyDriversDocument = gql`
    query NearbyDrivers($sellerId: Int!) {
  nearbyDrivers(sellerId: $sellerId) {
    id
    username
    avatar
    city
    county
    longitude
    latitude
    distance
  }
}
    `;

export function useNearbyDriversQuery(options: Omit<Urql.UseQueryArgs<NearbyDriversQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<NearbyDriversQuery>({ query: NearbyDriversDocument, ...options });
};
export const RecentConversationsDocument = gql`
    query RecentConversations($cursor: String, $first: Int, $partnerUsernameFilter: String) {
  recentConversations(
    cursor: $cursor
    first: $first
    partnerUsernameFilter: $partnerUsernameFilter
  ) {
    conversations {
      id
      latest {
        ...RecentMessage
      }
      partner {
        ...RegularUser
      }
    }
    hasMore
  }
}
    ${RecentMessageFragmentDoc}
${RegularUserFragmentDoc}`;

export function useRecentConversationsQuery(options: Omit<Urql.UseQueryArgs<RecentConversationsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RecentConversationsQuery>({ query: RecentConversationsDocument, ...options });
};
export const UserDocument = gql`
    query User($id: Int!) {
  user(id: $id) {
    ...RegularUser
    ...UserContacts
    ...UserLocation
    ...Karma
    adCount
    recent {
      ...UserRecent
    }
  }
}
    ${RegularUserFragmentDoc}
${UserContactsFragmentDoc}
${UserLocationFragmentDoc}
${KarmaFragmentDoc}
${UserRecentFragmentDoc}`;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
};
export const UserLeaveFeedbackDocument = gql`
    query UserLeaveFeedback($id: Int!) {
  user(id: $id) {
    ...RegularUser
    ...Karma
    banned
    ads {
      id
      title
    }
  }
}
    ${RegularUserFragmentDoc}
${KarmaFragmentDoc}`;

export function useUserLeaveFeedbackQuery(options: Omit<Urql.UseQueryArgs<UserLeaveFeedbackQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserLeaveFeedbackQuery>({ query: UserLeaveFeedbackDocument, ...options });
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
export const MessageNotificationDocument = gql`
    subscription MessageNotification {
  messageNotification {
    id
    author {
      ...RegularUser
    }
    conversationId
    content
    createdAt
  }
}
    ${RegularUserFragmentDoc}`;

export function useMessageNotificationSubscription<TData = MessageNotificationSubscription>(options: Omit<Urql.UseSubscriptionArgs<MessageNotificationSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<MessageNotificationSubscription, TData>) {
  return Urql.useSubscription<MessageNotificationSubscription, TData, MessageNotificationSubscriptionVariables>({ query: MessageNotificationDocument, ...options }, handler);
};