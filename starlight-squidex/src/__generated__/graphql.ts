/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `DateTime` scalar type represents a date and time. `DateTime` expects timestamps to be formatted in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
  Instant: { input: any; output: any; }
  /** Unstructured Json object */
  JsonScalar: { input: any; output: any; }
  Long: { input: any; output: any; }
};

export type AllContents = Hotels | Pages | Posts | Test;

/** The app mutations. */
export type ApplicationMutations = {
  __typename?: 'ApplicationMutations';
  /** Change a Hotels content. */
  changeHotelsContent?: Maybe<Hotels>;
  /** Change a Pages content. */
  changePagesContent?: Maybe<Pages>;
  /** Change a Posts content. */
  changePostsContent?: Maybe<Posts>;
  /** Change a test content. */
  changeTestContent?: Maybe<Test>;
  /** Creates an Hotels content. */
  createHotelsContent?: Maybe<Hotels>;
  /** Creates an Pages content. */
  createPagesContent?: Maybe<Pages>;
  /** Creates an Posts content. */
  createPostsContent?: Maybe<Posts>;
  /** Creates an test content. */
  createTestContent?: Maybe<Test>;
  /** Delete an Hotels content. */
  deleteHotelsContent: EntitySavedResultDto;
  /** Delete an Pages content. */
  deletePagesContent: EntitySavedResultDto;
  /** Delete an Posts content. */
  deletePostsContent: EntitySavedResultDto;
  /** Delete an test content. */
  deleteTestContent: EntitySavedResultDto;
  /** Patch an Hotels content by id. */
  patchHotelsContent?: Maybe<Hotels>;
  /** Patch an Pages content by id. */
  patchPagesContent?: Maybe<Pages>;
  /** Patch an Posts content by id. */
  patchPostsContent?: Maybe<Posts>;
  /** Patch an test content by id. */
  patchTestContent?: Maybe<Test>;
  /**
   * Publish a Hotels content.
   * @deprecated Use 'changeHotelsContent' instead
   */
  publishHotelsContent?: Maybe<Hotels>;
  /**
   * Publish a Pages content.
   * @deprecated Use 'changePagesContent' instead
   */
  publishPagesContent?: Maybe<Pages>;
  /**
   * Publish a Posts content.
   * @deprecated Use 'changePostsContent' instead
   */
  publishPostsContent?: Maybe<Posts>;
  /**
   * Publish a test content.
   * @deprecated Use 'changeTestContent' instead
   */
  publishTestContent?: Maybe<Test>;
  /** Update an Hotels content by id. */
  updateHotelsContent?: Maybe<Hotels>;
  /** Update an Pages content by id. */
  updatePagesContent?: Maybe<Pages>;
  /** Update an Posts content by id. */
  updatePostsContent?: Maybe<Posts>;
  /** Update an test content by id. */
  updateTestContent?: Maybe<Test>;
  /** Upsert an Hotels content by id. */
  upsertHotelsContent?: Maybe<Hotels>;
  /** Upsert an Pages content by id. */
  upsertPagesContent?: Maybe<Pages>;
  /** Upsert an Posts content by id. */
  upsertPostsContent?: Maybe<Posts>;
  /** Upsert an test content by id. */
  upsertTestContent?: Maybe<Test>;
};


/** The app mutations. */
export type ApplicationMutationsChangeHotelsContentArgs = {
  dueTime?: InputMaybe<Scalars['Instant']['input']>;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


/** The app mutations. */
export type ApplicationMutationsChangePagesContentArgs = {
  dueTime?: InputMaybe<Scalars['Instant']['input']>;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


/** The app mutations. */
export type ApplicationMutationsChangePostsContentArgs = {
  dueTime?: InputMaybe<Scalars['Instant']['input']>;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


/** The app mutations. */
export type ApplicationMutationsChangeTestContentArgs = {
  dueTime?: InputMaybe<Scalars['Instant']['input']>;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


/** The app mutations. */
export type ApplicationMutationsCreateHotelsContentArgs = {
  data: HotelsDataInputDto;
  id?: InputMaybe<Scalars['String']['input']>;
  publish?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsCreatePagesContentArgs = {
  data: PagesDataInputDto;
  id?: InputMaybe<Scalars['String']['input']>;
  publish?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsCreatePostsContentArgs = {
  data: PostsDataInputDto;
  id?: InputMaybe<Scalars['String']['input']>;
  publish?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsCreateTestContentArgs = {
  data: TestDataInputDto;
  id?: InputMaybe<Scalars['String']['input']>;
  publish?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsDeleteHotelsContentArgs = {
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
};


/** The app mutations. */
export type ApplicationMutationsDeletePagesContentArgs = {
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
};


/** The app mutations. */
export type ApplicationMutationsDeletePostsContentArgs = {
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
};


/** The app mutations. */
export type ApplicationMutationsDeleteTestContentArgs = {
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
};


/** The app mutations. */
export type ApplicationMutationsPatchHotelsContentArgs = {
  data: HotelsDataInputDto;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsPatchPagesContentArgs = {
  data: PagesDataInputDto;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsPatchPostsContentArgs = {
  data: PostsDataInputDto;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsPatchTestContentArgs = {
  data: TestDataInputDto;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsPublishHotelsContentArgs = {
  dueTime?: InputMaybe<Scalars['Instant']['input']>;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


/** The app mutations. */
export type ApplicationMutationsPublishPagesContentArgs = {
  dueTime?: InputMaybe<Scalars['Instant']['input']>;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


/** The app mutations. */
export type ApplicationMutationsPublishPostsContentArgs = {
  dueTime?: InputMaybe<Scalars['Instant']['input']>;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


/** The app mutations. */
export type ApplicationMutationsPublishTestContentArgs = {
  dueTime?: InputMaybe<Scalars['Instant']['input']>;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


/** The app mutations. */
export type ApplicationMutationsUpdateHotelsContentArgs = {
  data: HotelsDataInputDto;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsUpdatePagesContentArgs = {
  data: PagesDataInputDto;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsUpdatePostsContentArgs = {
  data: PostsDataInputDto;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsUpdateTestContentArgs = {
  data: TestDataInputDto;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsUpsertHotelsContentArgs = {
  data: HotelsDataInputDto;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  patch?: InputMaybe<Scalars['Boolean']['input']>;
  publish?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsUpsertPagesContentArgs = {
  data: PagesDataInputDto;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  patch?: InputMaybe<Scalars['Boolean']['input']>;
  publish?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsUpsertPostsContentArgs = {
  data: PostsDataInputDto;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  patch?: InputMaybe<Scalars['Boolean']['input']>;
  publish?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsUpsertTestContentArgs = {
  data: TestDataInputDto;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  patch?: InputMaybe<Scalars['Boolean']['input']>;
  publish?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** The app queries. */
export type ApplicationQueries = {
  __typename?: 'ApplicationQueries';
  /** Find an asset by id. */
  findAsset?: Maybe<Asset>;
  /** Find an Hotels content by id. */
  findHotelsContent?: Maybe<Hotels>;
  /** Find an Pages content by id. */
  findPagesContent?: Maybe<Pages>;
  /** Find an Posts content by id. */
  findPostsContent?: Maybe<Posts>;
  /** Find an test content by id. */
  findTestContent?: Maybe<Test>;
  /** Get assets. */
  queryAssets: Array<Asset>;
  /** Get assets and total count. */
  queryAssetsWithTotal: AssetResultDto;
  /** Query content items by IDs across schemeas. */
  queryContentsByIds: Array<AllContents>;
  /** Query Hotels content items. */
  queryHotelsContents?: Maybe<Array<Hotels>>;
  /** Query Hotels content items with total count. */
  queryHotelsContentsWithTotal?: Maybe<HotelsResultDto>;
  /** Query Pages content items. */
  queryPagesContents?: Maybe<Array<Pages>>;
  /** Query Pages content items with total count. */
  queryPagesContentsWithTotal?: Maybe<PagesResultDto>;
  /** Query Posts content items. */
  queryPostsContents?: Maybe<Array<Posts>>;
  /** Query Posts content items with total count. */
  queryPostsContentsWithTotal?: Maybe<PostsResultDto>;
  /** Query test content items. */
  queryTestContents?: Maybe<Array<Test>>;
  /** Query test content items with total count. */
  queryTestContentsWithTotal?: Maybe<TestResultDto>;
};


/** The app queries. */
export type ApplicationQueriesFindAssetArgs = {
  id: Scalars['String']['input'];
};


/** The app queries. */
export type ApplicationQueriesFindHotelsContentArgs = {
  id: Scalars['String']['input'];
  version?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesFindPagesContentArgs = {
  id: Scalars['String']['input'];
  version?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesFindPostsContentArgs = {
  id: Scalars['String']['input'];
  version?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesFindTestContentArgs = {
  id: Scalars['String']['input'];
  version?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesQueryAssetsArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesQueryAssetsWithTotalArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesQueryContentsByIdsArgs = {
  ids: Array<Scalars['String']['input']>;
};


/** The app queries. */
export type ApplicationQueriesQueryHotelsContentsArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesQueryHotelsContentsWithTotalArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesQueryPagesContentsArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesQueryPagesContentsWithTotalArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesQueryPostsContentsArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesQueryPostsContentsWithTotalArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesQueryTestContentsArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesQueryTestContentsWithTotalArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};

export type ApplicationSubscriptions = {
  __typename?: 'ApplicationSubscriptions';
  /** Subscribe to asset events. */
  assetChanges?: Maybe<EnrichedAssetEvent>;
  /** Subscribe to content events. */
  contentChanges?: Maybe<EnrichedContentEvent>;
};


export type ApplicationSubscriptionsAssetChangesArgs = {
  type?: InputMaybe<EnrichedAssetEventType>;
};


export type ApplicationSubscriptionsContentChangesArgs = {
  schemaName?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<EnrichedContentEventType>;
};

/** An asset */
export type Asset = {
  __typename?: 'Asset';
  /** The timestamp when the object was created. */
  created: Scalars['Instant']['output'];
  /** The user who created the object. */
  createdBy: Scalars['String']['output'];
  /** The user who created the object. */
  createdByUser: User;
  /** The edit token. */
  editToken?: Maybe<Scalars['String']['output']>;
  /** The hash of the file. Can be null for old files. */
  fileHash: Scalars['String']['output'];
  /** The file name of the asset. */
  fileName: Scalars['String']['output'];
  /** The size of the file in bytes. */
  fileSize: Scalars['Int']['output'];
  /** The file type (file extension) of the asset. */
  fileType: Scalars['String']['output'];
  /** The version of the file. */
  fileVersion: Scalars['Int']['output'];
  /** The ID of the object (usually GUID). */
  id: Scalars['String']['output'];
  /**
   * Determines if the uploaded file is an image.
   * @deprecated Use 'type' field instead.
   */
  isImage: Scalars['Boolean']['output'];
  /** True, when the asset is not public. */
  isProtected: Scalars['Boolean']['output'];
  /** The timestamp when the object was updated the last time. */
  lastModified: Scalars['Instant']['output'];
  /** The user who updated the object the last time. */
  lastModifiedBy: Scalars['String']['output'];
  /** The user who updated the object the last time. */
  lastModifiedByUser: User;
  /** The asset metadata. */
  metadata?: Maybe<Scalars['JsonScalar']['output']>;
  /** The type of the image. */
  metadataText: Scalars['String']['output'];
  /** The mime type. */
  mimeType: Scalars['String']['output'];
  /** The ID of the parent folder. Empty for files without parent. */
  parentId: Scalars['String']['output'];
  /**
   * The height of the image in pixels if the asset is an image.
   * @deprecated Use 'metadata' field instead.
   */
  pixelHeight?: Maybe<Scalars['Int']['output']>;
  /**
   * The width of the image in pixels if the asset is an image.
   * @deprecated Use 'metadata' field instead.
   */
  pixelWidth?: Maybe<Scalars['Int']['output']>;
  /** The file name as slug. */
  slug: Scalars['String']['output'];
  /** The source URL of the asset. */
  sourceUrl?: Maybe<Scalars['String']['output']>;
  /** The asset tags. */
  tags: Array<Scalars['String']['output']>;
  /** The thumbnail URL to the asset. */
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  /** The type of the asset. */
  type: AssetType;
  /** The URL to the asset. */
  url: Scalars['String']['output'];
  /** The version of the objec. */
  version: Scalars['Int']['output'];
};


/** An asset */
export type AssetMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** List of assets and total count of assets. */
export type AssetResultDto = {
  __typename?: 'AssetResultDto';
  /** The assets. */
  items: Array<Asset>;
  /** The total count of assets. */
  total: Scalars['Int']['output'];
};

export enum AssetType {
  Audio = 'AUDIO',
  Image = 'IMAGE',
  Unknown = 'UNKNOWN',
  Video = 'VIDEO'
}

/** The structure of all content types. */
export type Component = {
  /** schemaId */
  schemaId: Scalars['String']['output'];
  /** schemaName */
  schemaName?: Maybe<Scalars['String']['output']>;
};

/** The structure of all content types. */
export type Content = {
  /** created */
  created: Scalars['Instant']['output'];
  /** createdBy */
  createdBy: Scalars['String']['output'];
  /** data__dynamic */
  data__dynamic?: Maybe<Scalars['JsonScalar']['output']>;
  /** editToken */
  editToken?: Maybe<Scalars['String']['output']>;
  /** id */
  id: Scalars['String']['output'];
  /** lastModified */
  lastModified: Scalars['Instant']['output'];
  /** lastModifiedBy */
  lastModifiedBy: Scalars['String']['output'];
  /** newStatus */
  newStatus?: Maybe<Scalars['String']['output']>;
  /** newStatusColor */
  newStatusColor?: Maybe<Scalars['String']['output']>;
  /** status */
  status: Scalars['String']['output'];
  /** statusColor */
  statusColor: Scalars['String']['output'];
  /** url */
  url: Scalars['String']['output'];
  /** version */
  version: Scalars['Int']['output'];
};

/** An asset event */
export type EnrichedAssetEvent = {
  __typename?: 'EnrichedAssetEvent';
  /** The type of the asset. */
  assetType: AssetType;
  /** The timestamp when the object was created. */
  created: Scalars['Instant']['output'];
  /** The user who created the object. */
  createdBy: Scalars['String']['output'];
  /** The user who created the object. */
  createdByUser: User;
  /** The hash of the file. Can be null for old files. */
  fileHash: Scalars['String']['output'];
  /** The file name of the asset. */
  fileName: Scalars['String']['output'];
  /** The size of the file in bytes. */
  fileSize: Scalars['Int']['output'];
  /** The file type (file extension) of the asset. */
  fileType: Scalars['String']['output'];
  /** The version of the file. */
  fileVersion: Scalars['Int']['output'];
  /** The ID of the object (usually GUID). */
  id: Scalars['String']['output'];
  /**
   * Determines if the uploaded file is an image.
   * @deprecated Use 'type' field instead.
   */
  isImage: Scalars['Boolean']['output'];
  /** True, when the asset is not public. */
  isProtected: Scalars['Boolean']['output'];
  /** The timestamp when the object was updated the last time. */
  lastModified: Scalars['Instant']['output'];
  /** The user who updated the object the last time. */
  lastModifiedBy: Scalars['String']['output'];
  /** The user who updated the object the last time. */
  lastModifiedByUser: User;
  /** The asset metadata. */
  metadata?: Maybe<Scalars['JsonScalar']['output']>;
  /** The mime type. */
  mimeType: Scalars['String']['output'];
  /**
   * The height of the image in pixels if the asset is an image.
   * @deprecated Use 'metadata' field instead.
   */
  pixelHeight?: Maybe<Scalars['Int']['output']>;
  /**
   * The width of the image in pixels if the asset is an image.
   * @deprecated Use 'metadata' field instead.
   */
  pixelWidth?: Maybe<Scalars['Int']['output']>;
  /** The file name as slug. */
  slug: Scalars['String']['output'];
  /** The source URL of the asset. */
  sourceUrl: Scalars['String']['output'];
  /** The thumbnail URL to the asset. */
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  /** The type of the event. */
  type?: Maybe<EnrichedAssetEventType>;
  /** The URL to the asset. */
  url: Scalars['String']['output'];
  /** The version of the objec. */
  version: Scalars['Int']['output'];
};


/** An asset event */
export type EnrichedAssetEventMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

export enum EnrichedAssetEventType {
  Annotated = 'ANNOTATED',
  Created = 'CREATED',
  Deleted = 'DELETED',
  Updated = 'UPDATED'
}

/** An content event */
export type EnrichedContentEvent = {
  __typename?: 'EnrichedContentEvent';
  /** The timestamp when the object was created. */
  created: Scalars['Instant']['output'];
  /** The user who created the object. */
  createdBy: Scalars['String']['output'];
  /** The user who created the object. */
  createdByUser: User;
  /** The data of the content. */
  data?: Maybe<Scalars['JsonScalar']['output']>;
  /** The previous data of the content. */
  dataOld?: Maybe<Scalars['JsonScalar']['output']>;
  /** The ID of the object (usually GUID). */
  id: Scalars['String']['output'];
  /** The timestamp when the object was updated the last time. */
  lastModified: Scalars['Instant']['output'];
  /** The user who updated the object the last time. */
  lastModifiedBy: Scalars['String']['output'];
  /** The user who updated the object the last time. */
  lastModifiedByUser: User;
  /** The new status of the content. */
  newStatus?: Maybe<Scalars['String']['output']>;
  /** The status of the content. */
  status: Scalars['String']['output'];
  /** The type of the event. */
  type?: Maybe<EnrichedContentEventType>;
  /** The version of the objec. */
  version: Scalars['Int']['output'];
};

export enum EnrichedContentEventType {
  Created = 'CREATED',
  Deleted = 'DELETED',
  Published = 'PUBLISHED',
  ReferenceUpdated = 'REFERENCE_UPDATED',
  StatusChanged = 'STATUS_CHANGED',
  Unpublished = 'UNPUBLISHED',
  Updated = 'UPDATED'
}

/** The result of a mutation */
export type EntitySavedResultDto = {
  __typename?: 'EntitySavedResultDto';
  /** The new version of the item. */
  version: Scalars['Long']['output'];
};

/** The structure of a Hotels content type. */
export type Hotels = Content & {
  __typename?: 'Hotels';
  /** The timestamp when the object was created. */
  created: Scalars['Instant']['output'];
  /** The user who created the object. */
  createdBy: Scalars['String']['output'];
  /** The user who created the object. */
  createdByUser: User;
  /** The data of the content. */
  data: HotelsDataDto;
  /** The data of the content. */
  data__dynamic?: Maybe<Scalars['JsonScalar']['output']>;
  /** The edit token. */
  editToken?: Maybe<Scalars['String']['output']>;
  /** The flat data of the content. */
  flatData: HotelsFlatDataDto;
  /** The ID of the object (usually GUID). */
  id: Scalars['String']['output'];
  /** The timestamp when the object was updated the last time. */
  lastModified: Scalars['Instant']['output'];
  /** The user who updated the object the last time. */
  lastModifiedBy: Scalars['String']['output'];
  /** The user who updated the object the last time. */
  lastModifiedByUser: User;
  /** The new status of the content. */
  newStatus?: Maybe<Scalars['String']['output']>;
  /** The status color of the content. */
  newStatusColor?: Maybe<Scalars['String']['output']>;
  /** The status of the content. */
  status: Scalars['String']['output'];
  /** The status color of the content. */
  statusColor: Scalars['String']['output'];
  /** The URL to the content. */
  url: Scalars['String']['output'];
  /** The version of the objec. */
  version: Scalars['Int']['output'];
};

/** The structure of the Description field of the Hotels content type. */
export type HotelsDataDescriptionDto = {
  __typename?: 'HotelsDataDescriptionDto';
  iv?: Maybe<Scalars['String']['output']>;
};

/** The structure of the Description field of the Hotels content input type. */
export type HotelsDataDescriptionInputDto = {
  iv?: InputMaybe<Scalars['String']['input']>;
};

/** The structure of the Hotels data type. */
export type HotelsDataDto = {
  __typename?: 'HotelsDataDto';
  description?: Maybe<HotelsDataDescriptionDto>;
  minPrice?: Maybe<HotelsDataMinPriceDto>;
  name?: Maybe<HotelsDataNameDto>;
  photos?: Maybe<HotelsDataPhotosDto>;
  rooms?: Maybe<HotelsDataRoomsDto>;
  slug?: Maybe<HotelsDataSlugDto>;
};

/** The structure of the Hotels data input type. */
export type HotelsDataInputDto = {
  description?: InputMaybe<HotelsDataDescriptionInputDto>;
  minPrice?: InputMaybe<HotelsDataMinPriceInputDto>;
  name?: InputMaybe<HotelsDataNameInputDto>;
  photos?: InputMaybe<HotelsDataPhotosInputDto>;
  rooms?: InputMaybe<HotelsDataRoomsInputDto>;
  slug?: InputMaybe<HotelsDataSlugInputDto>;
};

/** The structure of the Min Price field of the Hotels content type. */
export type HotelsDataMinPriceDto = {
  __typename?: 'HotelsDataMinPriceDto';
  iv?: Maybe<Scalars['Float']['output']>;
};

/** The structure of the Min Price field of the Hotels content input type. */
export type HotelsDataMinPriceInputDto = {
  iv?: InputMaybe<Scalars['Float']['input']>;
};

/** The structure of the Name field of the Hotels content type. */
export type HotelsDataNameDto = {
  __typename?: 'HotelsDataNameDto';
  iv?: Maybe<Scalars['String']['output']>;
};

/** The structure of the Name field of the Hotels content input type. */
export type HotelsDataNameInputDto = {
  iv?: InputMaybe<Scalars['String']['input']>;
};

/** The structure of the Photos field of the Hotels content type. */
export type HotelsDataPhotosDto = {
  __typename?: 'HotelsDataPhotosDto';
  iv?: Maybe<Array<Asset>>;
};

/** The structure of the Photos field of the Hotels content input type. */
export type HotelsDataPhotosInputDto = {
  iv?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** The structure of the Rooms field of the Hotels content type. */
export type HotelsDataRoomsDto = {
  __typename?: 'HotelsDataRoomsDto';
  iv?: Maybe<Scalars['Float']['output']>;
};

/** The structure of the Rooms field of the Hotels content input type. */
export type HotelsDataRoomsInputDto = {
  iv?: InputMaybe<Scalars['Float']['input']>;
};

/** The structure of the Slug (Autogenerated) field of the Hotels content type. */
export type HotelsDataSlugDto = {
  __typename?: 'HotelsDataSlugDto';
  iv?: Maybe<Scalars['String']['output']>;
};

/** The structure of the Slug (Autogenerated) field of the Hotels content input type. */
export type HotelsDataSlugInputDto = {
  iv?: InputMaybe<Scalars['String']['input']>;
};

/** The structure of the flat Hotels data type. */
export type HotelsFlatDataDto = {
  __typename?: 'HotelsFlatDataDto';
  description?: Maybe<Scalars['String']['output']>;
  minPrice?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  photos?: Maybe<Array<Asset>>;
  rooms?: Maybe<Scalars['Float']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
};

/** List of Hotels items and total count. */
export type HotelsResultDto = {
  __typename?: 'HotelsResultDto';
  /** The contents. */
  items?: Maybe<Array<Hotels>>;
  /** The total count of  contents. */
  total: Scalars['Int']['output'];
};

/** The structure of a Pages content type. */
export type Pages = Content & {
  __typename?: 'Pages';
  /** The timestamp when the object was created. */
  created: Scalars['Instant']['output'];
  /** The user who created the object. */
  createdBy: Scalars['String']['output'];
  /** The user who created the object. */
  createdByUser: User;
  /** The data of the content. */
  data: PagesDataDto;
  /** The data of the content. */
  data__dynamic?: Maybe<Scalars['JsonScalar']['output']>;
  /** The edit token. */
  editToken?: Maybe<Scalars['String']['output']>;
  /** The flat data of the content. */
  flatData: PagesFlatDataDto;
  /** The ID of the object (usually GUID). */
  id: Scalars['String']['output'];
  /** The timestamp when the object was updated the last time. */
  lastModified: Scalars['Instant']['output'];
  /** The user who updated the object the last time. */
  lastModifiedBy: Scalars['String']['output'];
  /** The user who updated the object the last time. */
  lastModifiedByUser: User;
  /** The new status of the content. */
  newStatus?: Maybe<Scalars['String']['output']>;
  /** The status color of the content. */
  newStatusColor?: Maybe<Scalars['String']['output']>;
  /** The status of the content. */
  status: Scalars['String']['output'];
  /** The status color of the content. */
  statusColor: Scalars['String']['output'];
  /** The URL to the content. */
  url: Scalars['String']['output'];
  /** The version of the objec. */
  version: Scalars['Int']['output'];
};

/** The structure of the Pages data type. */
export type PagesDataDto = {
  __typename?: 'PagesDataDto';
  slug?: Maybe<PagesDataSlugDto>;
  text?: Maybe<PagesDataTextDto>;
  title?: Maybe<PagesDataTitleDto>;
};

/** The structure of the Pages data input type. */
export type PagesDataInputDto = {
  slug?: InputMaybe<PagesDataSlugInputDto>;
  text?: InputMaybe<PagesDataTextInputDto>;
  title?: InputMaybe<PagesDataTitleInputDto>;
};

/** The structure of the Slug (Autogenerated) field of the Pages content type. */
export type PagesDataSlugDto = {
  __typename?: 'PagesDataSlugDto';
  /** Autogenerated slug that can be used to identity the page. */
  iv?: Maybe<Scalars['String']['output']>;
};

/** The structure of the Slug (Autogenerated) field of the Pages content input type. */
export type PagesDataSlugInputDto = {
  /** Autogenerated slug that can be used to identity the page. */
  iv?: InputMaybe<Scalars['String']['input']>;
};

/** The structure of the Text field of the Pages content type. */
export type PagesDataTextDto = {
  __typename?: 'PagesDataTextDto';
  /** The text of the page. */
  iv?: Maybe<PagesDataTextEmbeddableString>;
};

export type PagesDataTextEmbeddableString = {
  __typename?: 'PagesDataTextEmbeddableString';
  /** The referenced assets. */
  assets: Array<Asset>;
  /** The referenced content items. */
  contents: Array<Hotels>;
  /** The text of this field. */
  text?: Maybe<Scalars['String']['output']>;
};

/** The structure of the Text field of the Pages content input type. */
export type PagesDataTextInputDto = {
  /** The text of the page. */
  iv?: InputMaybe<Scalars['String']['input']>;
};

/** The structure of the Title field of the Pages content type. */
export type PagesDataTitleDto = {
  __typename?: 'PagesDataTitleDto';
  /** The title of the page. */
  iv?: Maybe<Scalars['String']['output']>;
};

/** The structure of the Title field of the Pages content input type. */
export type PagesDataTitleInputDto = {
  /** The title of the page. */
  iv?: InputMaybe<Scalars['String']['input']>;
};

/** The structure of the flat Pages data type. */
export type PagesFlatDataDto = {
  __typename?: 'PagesFlatDataDto';
  /** Autogenerated slug that can be used to identity the page. */
  slug?: Maybe<Scalars['String']['output']>;
  /** The text of the page. */
  text?: Maybe<PagesDataTextEmbeddableString>;
  /** The title of the page. */
  title?: Maybe<Scalars['String']['output']>;
};

/** List of Pages items and total count. */
export type PagesResultDto = {
  __typename?: 'PagesResultDto';
  /** The contents. */
  items?: Maybe<Array<Pages>>;
  /** The total count of  contents. */
  total: Scalars['Int']['output'];
};

/** The structure of a Posts content type. */
export type Posts = Content & {
  __typename?: 'Posts';
  /** The timestamp when the object was created. */
  created: Scalars['Instant']['output'];
  /** The user who created the object. */
  createdBy: Scalars['String']['output'];
  /** The user who created the object. */
  createdByUser: User;
  /** The data of the content. */
  data: PostsDataDto;
  /** The data of the content. */
  data__dynamic?: Maybe<Scalars['JsonScalar']['output']>;
  /** The edit token. */
  editToken?: Maybe<Scalars['String']['output']>;
  /** The flat data of the content. */
  flatData: PostsFlatDataDto;
  /** The ID of the object (usually GUID). */
  id: Scalars['String']['output'];
  /** The timestamp when the object was updated the last time. */
  lastModified: Scalars['Instant']['output'];
  /** The user who updated the object the last time. */
  lastModifiedBy: Scalars['String']['output'];
  /** The user who updated the object the last time. */
  lastModifiedByUser: User;
  /** The new status of the content. */
  newStatus?: Maybe<Scalars['String']['output']>;
  /** The status color of the content. */
  newStatusColor?: Maybe<Scalars['String']['output']>;
  /** The status of the content. */
  status: Scalars['String']['output'];
  /** The status color of the content. */
  statusColor: Scalars['String']['output'];
  /** The URL to the content. */
  url: Scalars['String']['output'];
  /** The version of the objec. */
  version: Scalars['Int']['output'];
};

/** The structure of the Posts data type. */
export type PostsDataDto = {
  __typename?: 'PostsDataDto';
  slug?: Maybe<PostsDataSlugDto>;
  text?: Maybe<PostsDataTextDto>;
  title?: Maybe<PostsDataTitleDto>;
};

/** The structure of the Posts data input type. */
export type PostsDataInputDto = {
  slug?: InputMaybe<PostsDataSlugInputDto>;
  text?: InputMaybe<PostsDataTextInputDto>;
  title?: InputMaybe<PostsDataTitleInputDto>;
};

/** The structure of the Slug (Autogenerated) field of the Posts content type. */
export type PostsDataSlugDto = {
  __typename?: 'PostsDataSlugDto';
  /** Autogenerated slug that can be used to identity the post. */
  iv?: Maybe<Scalars['String']['output']>;
};

/** The structure of the Slug (Autogenerated) field of the Posts content input type. */
export type PostsDataSlugInputDto = {
  /** Autogenerated slug that can be used to identity the post. */
  iv?: InputMaybe<Scalars['String']['input']>;
};

/** The structure of the Text field of the Posts content type. */
export type PostsDataTextDto = {
  __typename?: 'PostsDataTextDto';
  /** The text of the post. */
  iv?: Maybe<PostsDataTextEmbeddableString>;
};

export type PostsDataTextEmbeddableString = {
  __typename?: 'PostsDataTextEmbeddableString';
  /** The referenced assets. */
  assets: Array<Asset>;
  /** The referenced content items. */
  contents: Array<Hotels>;
  /** The text of this field. */
  text?: Maybe<Scalars['String']['output']>;
};

/** The structure of the Text field of the Posts content input type. */
export type PostsDataTextInputDto = {
  /** The text of the post. */
  iv?: InputMaybe<Scalars['String']['input']>;
};

/** The structure of the Title field of the Posts content type. */
export type PostsDataTitleDto = {
  __typename?: 'PostsDataTitleDto';
  /** The title of the post. */
  iv?: Maybe<Scalars['String']['output']>;
};

/** The structure of the Title field of the Posts content input type. */
export type PostsDataTitleInputDto = {
  /** The title of the post. */
  iv?: InputMaybe<Scalars['String']['input']>;
};

/** The structure of the flat Posts data type. */
export type PostsFlatDataDto = {
  __typename?: 'PostsFlatDataDto';
  /** Autogenerated slug that can be used to identity the post. */
  slug?: Maybe<Scalars['String']['output']>;
  /** The text of the post. */
  text?: Maybe<PostsDataTextEmbeddableString>;
  /** The title of the post. */
  title?: Maybe<Scalars['String']['output']>;
};

/** List of Posts items and total count. */
export type PostsResultDto = {
  __typename?: 'PostsResultDto';
  /** The contents. */
  items?: Maybe<Array<Posts>>;
  /** The total count of  contents. */
  total: Scalars['Int']['output'];
};

/** The structure of a test content type. */
export type Test = Content & {
  __typename?: 'Test';
  /** The timestamp when the object was created. */
  created: Scalars['Instant']['output'];
  /** The user who created the object. */
  createdBy: Scalars['String']['output'];
  /** The user who created the object. */
  createdByUser: User;
  /** The data of the content. */
  data: TestDataDto;
  /** The data of the content. */
  data__dynamic?: Maybe<Scalars['JsonScalar']['output']>;
  /** The edit token. */
  editToken?: Maybe<Scalars['String']['output']>;
  /** The flat data of the content. */
  flatData: TestFlatDataDto;
  /** The ID of the object (usually GUID). */
  id: Scalars['String']['output'];
  /** The timestamp when the object was updated the last time. */
  lastModified: Scalars['Instant']['output'];
  /** The user who updated the object the last time. */
  lastModifiedBy: Scalars['String']['output'];
  /** The user who updated the object the last time. */
  lastModifiedByUser: User;
  /** The new status of the content. */
  newStatus?: Maybe<Scalars['String']['output']>;
  /** The status color of the content. */
  newStatusColor?: Maybe<Scalars['String']['output']>;
  /** The status of the content. */
  status: Scalars['String']['output'];
  /** The status color of the content. */
  statusColor: Scalars['String']['output'];
  /** The URL to the content. */
  url: Scalars['String']['output'];
  /** The version of the objec. */
  version: Scalars['Int']['output'];
};

/** The structure of the test data type. */
export type TestDataDto = {
  __typename?: 'TestDataDto';
  test?: Maybe<TestDataTestDto>;
};

/** The structure of the test data input type. */
export type TestDataInputDto = {
  test?: InputMaybe<TestDataTestInputDto>;
};

/** The structure of the Test field of the test content type. */
export type TestDataTestDto = {
  __typename?: 'TestDataTestDto';
  iv?: Maybe<Scalars['String']['output']>;
};

/** The structure of the Test field of the test content input type. */
export type TestDataTestInputDto = {
  iv?: InputMaybe<Scalars['String']['input']>;
};

/** The structure of the flat test data type. */
export type TestFlatDataDto = {
  __typename?: 'TestFlatDataDto';
  test?: Maybe<Scalars['String']['output']>;
};

/** List of test items and total count. */
export type TestResultDto = {
  __typename?: 'TestResultDto';
  /** The contents. */
  items?: Maybe<Array<Test>>;
  /** The total count of  contents. */
  total: Scalars['Int']['output'];
};

/** A user that created or modified a content or asset. */
export type User = {
  __typename?: 'User';
  /** The display name of this user. */
  displayName?: Maybe<Scalars['String']['output']>;
  /** The email address ofthis  user. */
  email?: Maybe<Scalars['String']['output']>;
  /** The ID of this user. */
  id: Scalars['String']['output'];
};

export type IndexQueryVariables = Exact<{ [key: string]: never; }>;


export type IndexQuery = { __typename?: 'ApplicationQueries', contentLayout?: Array<{ __typename?: 'Posts', flatData: { __typename?: 'PostsFlatDataDto', title?: string | null, slug?: string | null, text?: { __typename?: 'PostsDataTextEmbeddableString', contents: Array<{ __typename?: 'Hotels', flatData: { __typename?: 'HotelsFlatDataDto', name?: string | null, slug?: string | null } }> } | null } }> | null };

export type PostQueryVariables = Exact<{
  filter: Scalars['String']['input'];
}>;


export type PostQuery = { __typename?: 'ApplicationQueries', posts?: Array<{ __typename?: 'Hotels', flatData: { __typename?: 'HotelsFlatDataDto', name?: string | null, description?: string | null, photos?: Array<{ __typename?: 'Asset', url: string }> | null } }> | null };


export const IndexDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Index"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"contentLayout"},"name":{"kind":"Name","value":"queryPostsContents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flatData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flatData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<IndexQuery, IndexQueryVariables>;
export const PostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Post"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"posts"},"name":{"kind":"Name","value":"queryHotelsContents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flatData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PostQuery, PostQueryVariables>;