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

export type AllContents = Articles | Authors | Introductions | SchemaTest | Test;

/** The app mutations. */
export type ApplicationMutations = {
  __typename?: 'ApplicationMutations';
  /** Change a articles content. */
  changeArticlesContent?: Maybe<Articles>;
  /** Change a authors content. */
  changeAuthorsContent?: Maybe<Authors>;
  /** Change a introductions content. */
  changeIntroductionsContent?: Maybe<Introductions>;
  /** Change a schema-test content. */
  changeSchemaTestContent?: Maybe<SchemaTest>;
  /** Change a test content. */
  changeTestContent?: Maybe<Test>;
  /** Creates an articles content. */
  createArticlesContent?: Maybe<Articles>;
  /** Creates an authors content. */
  createAuthorsContent?: Maybe<Authors>;
  /** Creates an introductions content. */
  createIntroductionsContent?: Maybe<Introductions>;
  /** Creates an schema-test content. */
  createSchemaTestContent?: Maybe<SchemaTest>;
  /** Creates an test content. */
  createTestContent?: Maybe<Test>;
  /** Delete an articles content. */
  deleteArticlesContent: EntitySavedResultDto;
  /** Delete an authors content. */
  deleteAuthorsContent: EntitySavedResultDto;
  /** Delete an introductions content. */
  deleteIntroductionsContent: EntitySavedResultDto;
  /** Delete an schema-test content. */
  deleteSchemaTestContent: EntitySavedResultDto;
  /** Delete an test content. */
  deleteTestContent: EntitySavedResultDto;
  /** Patch an articles content by id. */
  patchArticlesContent?: Maybe<Articles>;
  /** Patch an authors content by id. */
  patchAuthorsContent?: Maybe<Authors>;
  /** Patch an introductions content by id. */
  patchIntroductionsContent?: Maybe<Introductions>;
  /** Patch an schema-test content by id. */
  patchSchemaTestContent?: Maybe<SchemaTest>;
  /** Patch an test content by id. */
  patchTestContent?: Maybe<Test>;
  /**
   * Publish a articles content.
   * @deprecated Use 'changeArticlesContent' instead
   */
  publishArticlesContent?: Maybe<Articles>;
  /**
   * Publish a authors content.
   * @deprecated Use 'changeAuthorsContent' instead
   */
  publishAuthorsContent?: Maybe<Authors>;
  /**
   * Publish a introductions content.
   * @deprecated Use 'changeIntroductionsContent' instead
   */
  publishIntroductionsContent?: Maybe<Introductions>;
  /**
   * Publish a schema-test content.
   * @deprecated Use 'changeSchemaTestContent' instead
   */
  publishSchemaTestContent?: Maybe<SchemaTest>;
  /**
   * Publish a test content.
   * @deprecated Use 'changeTestContent' instead
   */
  publishTestContent?: Maybe<Test>;
  /** Update an articles content by id. */
  updateArticlesContent?: Maybe<Articles>;
  /** Update an authors content by id. */
  updateAuthorsContent?: Maybe<Authors>;
  /** Update an introductions content by id. */
  updateIntroductionsContent?: Maybe<Introductions>;
  /** Update an schema-test content by id. */
  updateSchemaTestContent?: Maybe<SchemaTest>;
  /** Update an test content by id. */
  updateTestContent?: Maybe<Test>;
  /** Upsert an articles content by id. */
  upsertArticlesContent?: Maybe<Articles>;
  /** Upsert an authors content by id. */
  upsertAuthorsContent?: Maybe<Authors>;
  /** Upsert an introductions content by id. */
  upsertIntroductionsContent?: Maybe<Introductions>;
  /** Upsert an schema-test content by id. */
  upsertSchemaTestContent?: Maybe<SchemaTest>;
  /** Upsert an test content by id. */
  upsertTestContent?: Maybe<Test>;
};


/** The app mutations. */
export type ApplicationMutationsChangeArticlesContentArgs = {
  dueTime?: InputMaybe<Scalars['Instant']['input']>;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


/** The app mutations. */
export type ApplicationMutationsChangeAuthorsContentArgs = {
  dueTime?: InputMaybe<Scalars['Instant']['input']>;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


/** The app mutations. */
export type ApplicationMutationsChangeIntroductionsContentArgs = {
  dueTime?: InputMaybe<Scalars['Instant']['input']>;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


/** The app mutations. */
export type ApplicationMutationsChangeSchemaTestContentArgs = {
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
export type ApplicationMutationsCreateArticlesContentArgs = {
  data: ArticlesDataInputDto;
  id?: InputMaybe<Scalars['String']['input']>;
  publish?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsCreateAuthorsContentArgs = {
  data: AuthorsDataInputDto;
  id?: InputMaybe<Scalars['String']['input']>;
  publish?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsCreateIntroductionsContentArgs = {
  data: IntroductionsDataInputDto;
  id?: InputMaybe<Scalars['String']['input']>;
  publish?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsCreateSchemaTestContentArgs = {
  data: SchemaTestDataInputDto;
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
export type ApplicationMutationsDeleteArticlesContentArgs = {
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
};


/** The app mutations. */
export type ApplicationMutationsDeleteAuthorsContentArgs = {
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
};


/** The app mutations. */
export type ApplicationMutationsDeleteIntroductionsContentArgs = {
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
};


/** The app mutations. */
export type ApplicationMutationsDeleteSchemaTestContentArgs = {
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
};


/** The app mutations. */
export type ApplicationMutationsDeleteTestContentArgs = {
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
};


/** The app mutations. */
export type ApplicationMutationsPatchArticlesContentArgs = {
  data: ArticlesDataInputDto;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsPatchAuthorsContentArgs = {
  data: AuthorsDataInputDto;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsPatchIntroductionsContentArgs = {
  data: IntroductionsDataInputDto;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsPatchSchemaTestContentArgs = {
  data: SchemaTestDataInputDto;
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
export type ApplicationMutationsPublishArticlesContentArgs = {
  dueTime?: InputMaybe<Scalars['Instant']['input']>;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


/** The app mutations. */
export type ApplicationMutationsPublishAuthorsContentArgs = {
  dueTime?: InputMaybe<Scalars['Instant']['input']>;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


/** The app mutations. */
export type ApplicationMutationsPublishIntroductionsContentArgs = {
  dueTime?: InputMaybe<Scalars['Instant']['input']>;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


/** The app mutations. */
export type ApplicationMutationsPublishSchemaTestContentArgs = {
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
export type ApplicationMutationsUpdateArticlesContentArgs = {
  data: ArticlesDataInputDto;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsUpdateAuthorsContentArgs = {
  data: AuthorsDataInputDto;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsUpdateIntroductionsContentArgs = {
  data: IntroductionsDataInputDto;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsUpdateSchemaTestContentArgs = {
  data: SchemaTestDataInputDto;
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
export type ApplicationMutationsUpsertArticlesContentArgs = {
  data: ArticlesDataInputDto;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  patch?: InputMaybe<Scalars['Boolean']['input']>;
  publish?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsUpsertAuthorsContentArgs = {
  data: AuthorsDataInputDto;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  patch?: InputMaybe<Scalars['Boolean']['input']>;
  publish?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsUpsertIntroductionsContentArgs = {
  data: IntroductionsDataInputDto;
  expectedVersion?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  patch?: InputMaybe<Scalars['Boolean']['input']>;
  publish?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


/** The app mutations. */
export type ApplicationMutationsUpsertSchemaTestContentArgs = {
  data: SchemaTestDataInputDto;
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
  /** Find an articles content by id. */
  findArticlesContent?: Maybe<Articles>;
  /** Find an asset by id. */
  findAsset?: Maybe<Asset>;
  /** Find an authors content by id. */
  findAuthorsContent?: Maybe<Authors>;
  /** Find an introductions content by id. */
  findIntroductionsContent?: Maybe<Introductions>;
  /** Find an schema-test content by id. */
  findSchemaTestContent?: Maybe<SchemaTest>;
  /** Find an test content by id. */
  findTestContent?: Maybe<Test>;
  /** Query articles content items. */
  queryArticlesContents?: Maybe<Array<Articles>>;
  /** Query articles content items with total count. */
  queryArticlesContentsWithTotal?: Maybe<ArticlesResultDto>;
  /** Get assets. */
  queryAssets: Array<Asset>;
  /** Get assets and total count. */
  queryAssetsWithTotal: AssetResultDto;
  /** Query authors content items. */
  queryAuthorsContents?: Maybe<Array<Authors>>;
  /** Query authors content items with total count. */
  queryAuthorsContentsWithTotal?: Maybe<AuthorsResultDto>;
  /** Query content items by IDs across schemeas. */
  queryContentsByIds: Array<AllContents>;
  /** Query introductions content items. */
  queryIntroductionsContents?: Maybe<Array<Introductions>>;
  /** Query introductions content items with total count. */
  queryIntroductionsContentsWithTotal?: Maybe<IntroductionsResultDto>;
  /** Query schema-test content items. */
  querySchemaTestContents?: Maybe<Array<SchemaTest>>;
  /** Query schema-test content items with total count. */
  querySchemaTestContentsWithTotal?: Maybe<SchemaTestResultDto>;
  /** Query test content items. */
  queryTestContents?: Maybe<Array<Test>>;
  /** Query test content items with total count. */
  queryTestContentsWithTotal?: Maybe<TestResultDto>;
};


/** The app queries. */
export type ApplicationQueriesFindArticlesContentArgs = {
  id: Scalars['String']['input'];
  version?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesFindAssetArgs = {
  id: Scalars['String']['input'];
};


/** The app queries. */
export type ApplicationQueriesFindAuthorsContentArgs = {
  id: Scalars['String']['input'];
  version?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesFindIntroductionsContentArgs = {
  id: Scalars['String']['input'];
  version?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesFindSchemaTestContentArgs = {
  id: Scalars['String']['input'];
  version?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesFindTestContentArgs = {
  id: Scalars['String']['input'];
  version?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesQueryArticlesContentsArgs = {
  collation?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  random?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesQueryArticlesContentsWithTotalArgs = {
  collation?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  random?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
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
export type ApplicationQueriesQueryAuthorsContentsArgs = {
  collation?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  random?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesQueryAuthorsContentsWithTotalArgs = {
  collation?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  random?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesQueryContentsByIdsArgs = {
  ids: Array<Scalars['String']['input']>;
};


/** The app queries. */
export type ApplicationQueriesQueryIntroductionsContentsArgs = {
  collation?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  random?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesQueryIntroductionsContentsWithTotalArgs = {
  collation?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  random?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesQuerySchemaTestContentsArgs = {
  collation?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  random?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesQuerySchemaTestContentsWithTotalArgs = {
  collation?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  random?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesQueryTestContentsArgs = {
  collation?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  random?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


/** The app queries. */
export type ApplicationQueriesQueryTestContentsWithTotalArgs = {
  collation?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  random?: InputMaybe<Scalars['Int']['input']>;
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

/** The structure of a articles content type. */
export type Articles = Content & {
  __typename?: 'Articles';
  /** The timestamp when the object was created. */
  created: Scalars['Instant']['output'];
  /** The user who created the object. */
  createdBy: Scalars['String']['output'];
  /** The user who created the object. */
  createdByUser: User;
  /** The data of the content. */
  data: ArticlesDataDto;
  /** The data of the content. */
  data__dynamic?: Maybe<Scalars['JsonScalar']['output']>;
  /** The edit token. */
  editToken?: Maybe<Scalars['String']['output']>;
  /** The flat data of the content. */
  flatData: ArticlesFlatDataDto;
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

/** The structure of the Content field of the articles content type. */
export type ArticlesDataContentDto = {
  __typename?: 'ArticlesDataContentDto';
  iv?: Maybe<Scalars['String']['output']>;
};

/** The structure of the Content field of the articles content input type. */
export type ArticlesDataContentInputDto = {
  iv?: InputMaybe<Scalars['String']['input']>;
};

/** The structure of the articles data type. */
export type ArticlesDataDto = {
  __typename?: 'ArticlesDataDto';
  content?: Maybe<ArticlesDataContentDto>;
  name?: Maybe<ArticlesDataNameDto>;
};

/** The structure of the articles data input type. */
export type ArticlesDataInputDto = {
  content?: InputMaybe<ArticlesDataContentInputDto>;
  name?: InputMaybe<ArticlesDataNameInputDto>;
};

/** The structure of the Name field of the articles content type. */
export type ArticlesDataNameDto = {
  __typename?: 'ArticlesDataNameDto';
  iv?: Maybe<Scalars['String']['output']>;
};

/** The structure of the Name field of the articles content input type. */
export type ArticlesDataNameInputDto = {
  iv?: InputMaybe<Scalars['String']['input']>;
};

/** The structure of the flat articles data type. */
export type ArticlesFlatDataDto = {
  __typename?: 'ArticlesFlatDataDto';
  content?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** List of articles items and total count. */
export type ArticlesResultDto = {
  __typename?: 'ArticlesResultDto';
  /** The contents. */
  items?: Maybe<Array<Articles>>;
  /** The total count of  contents. */
  total: Scalars['Int']['output'];
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

/** The structure of a authors content type. */
export type Authors = Content & {
  __typename?: 'Authors';
  /** The timestamp when the object was created. */
  created: Scalars['Instant']['output'];
  /** The user who created the object. */
  createdBy: Scalars['String']['output'];
  /** The user who created the object. */
  createdByUser: User;
  /** The data of the content. */
  data: AuthorsDataDto;
  /** The data of the content. */
  data__dynamic?: Maybe<Scalars['JsonScalar']['output']>;
  /** The edit token. */
  editToken?: Maybe<Scalars['String']['output']>;
  /** The flat data of the content. */
  flatData: AuthorsFlatDataDto;
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
  /** Query introductions content items. */
  referencingIntroductionsContents?: Maybe<Array<Introductions>>;
  /** Query introductions content items with total count. */
  referencingIntroductionsContentsWithTotal?: Maybe<IntroductionsResultDto>;
  /** Query schema-test content items. */
  referencingSchemaTestContents?: Maybe<Array<SchemaTest>>;
  /** Query schema-test content items with total count. */
  referencingSchemaTestContentsWithTotal?: Maybe<SchemaTestResultDto>;
  /** The status of the content. */
  status: Scalars['String']['output'];
  /** The status color of the content. */
  statusColor: Scalars['String']['output'];
  /** The URL to the content. */
  url: Scalars['String']['output'];
  /** The version of the objec. */
  version: Scalars['Int']['output'];
};


/** The structure of a authors content type. */
export type AuthorsReferencingIntroductionsContentsArgs = {
  collation?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  random?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


/** The structure of a authors content type. */
export type AuthorsReferencingIntroductionsContentsWithTotalArgs = {
  collation?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  random?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


/** The structure of a authors content type. */
export type AuthorsReferencingSchemaTestContentsArgs = {
  collation?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  random?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


/** The structure of a authors content type. */
export type AuthorsReferencingSchemaTestContentsWithTotalArgs = {
  collation?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  random?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};

/** The structure of the Anonymous field of the authors content type. */
export type AuthorsDataAnonymousDto = {
  __typename?: 'AuthorsDataAnonymousDto';
  /** For Right of Publicity, use name's anonymous */
  iv?: Maybe<Scalars['String']['output']>;
};

/** The structure of the Anonymous field of the authors content input type. */
export type AuthorsDataAnonymousInputDto = {
  /** For Right of Publicity, use name's anonymous */
  iv?: InputMaybe<Scalars['String']['input']>;
};

/** The structure of the Avatar field of the authors content type. */
export type AuthorsDataAvatarDto = {
  __typename?: 'AuthorsDataAvatarDto';
  iv?: Maybe<Array<Asset>>;
};

/** The structure of the Avatar field of the authors content input type. */
export type AuthorsDataAvatarInputDto = {
  iv?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** The structure of the authors data type. */
export type AuthorsDataDto = {
  __typename?: 'AuthorsDataDto';
  anonymous?: Maybe<AuthorsDataAnonymousDto>;
  avatar?: Maybe<AuthorsDataAvatarDto>;
  name?: Maybe<AuthorsDataNameDto>;
};

/** The structure of the authors data input type. */
export type AuthorsDataInputDto = {
  anonymous?: InputMaybe<AuthorsDataAnonymousInputDto>;
  avatar?: InputMaybe<AuthorsDataAvatarInputDto>;
  name?: InputMaybe<AuthorsDataNameInputDto>;
};

/** The structure of the Name field of the authors content type. */
export type AuthorsDataNameDto = {
  __typename?: 'AuthorsDataNameDto';
  iv?: Maybe<Scalars['String']['output']>;
};

/** The structure of the Name field of the authors content input type. */
export type AuthorsDataNameInputDto = {
  iv?: InputMaybe<Scalars['String']['input']>;
};

/** The structure of the flat authors data type. */
export type AuthorsFlatDataDto = {
  __typename?: 'AuthorsFlatDataDto';
  /** For Right of Publicity, use name's anonymous */
  anonymous?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Array<Asset>>;
  name?: Maybe<Scalars['String']['output']>;
};

/** List of authors items and total count. */
export type AuthorsResultDto = {
  __typename?: 'AuthorsResultDto';
  /** The contents. */
  items?: Maybe<Array<Authors>>;
  /** The total count of  contents. */
  total: Scalars['Int']['output'];
};

/** The structure of the chapters component schema. */
export type ChaptersComponent = Component & {
  __typename?: 'ChaptersComponent';
  articles?: Maybe<Array<Articles>>;
  /** The ID of the schema. */
  schemaId: Scalars['String']['output'];
  /** The name of the schema. */
  schemaName?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** The structure of all content types. */
export type Component = {
  /** schemaId */
  schemaId: Scalars['String']['output'];
  /** schemaName */
  schemaName?: Maybe<Scalars['String']['output']>;
};

/** The structure of the component1 component schema. */
export type Component1Component = Component & {
  __typename?: 'Component1Component';
  name?: Maybe<Scalars['String']['output']>;
  /** The ID of the schema. */
  schemaId: Scalars['String']['output'];
  /** The name of the schema. */
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

/** The structure of the Hotels component schema. */
export type HotelsComponent = Component & {
  __typename?: 'HotelsComponent';
  description?: Maybe<Scalars['String']['output']>;
  minPrice?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  photos?: Maybe<Array<Asset>>;
  rooms?: Maybe<Scalars['Float']['output']>;
  /** The ID of the schema. */
  schemaId: Scalars['String']['output'];
  /** The name of the schema. */
  schemaName?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
};

/** The structure of a introductions content type. */
export type Introductions = Content & {
  __typename?: 'Introductions';
  /** The timestamp when the object was created. */
  created: Scalars['Instant']['output'];
  /** The user who created the object. */
  createdBy: Scalars['String']['output'];
  /** The user who created the object. */
  createdByUser: User;
  /** The data of the content. */
  data: IntroductionsDataDto;
  /** The data of the content. */
  data__dynamic?: Maybe<Scalars['JsonScalar']['output']>;
  /** The edit token. */
  editToken?: Maybe<Scalars['String']['output']>;
  /** The flat data of the content. */
  flatData: IntroductionsFlatDataDto;
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
  /** Query authors content items. */
  referencesAuthorsContents?: Maybe<Array<Authors>>;
  /** Query authors content items with total count. */
  referencesAuthorsContentsWithTotal?: Maybe<AuthorsResultDto>;
  /** The status of the content. */
  status: Scalars['String']['output'];
  /** The status color of the content. */
  statusColor: Scalars['String']['output'];
  /** The URL to the content. */
  url: Scalars['String']['output'];
  /** The version of the objec. */
  version: Scalars['Int']['output'];
};


/** The structure of a introductions content type. */
export type IntroductionsReferencesAuthorsContentsArgs = {
  collation?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  random?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


/** The structure of a introductions content type. */
export type IntroductionsReferencesAuthorsContentsWithTotalArgs = {
  collation?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  random?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};

/** The structure of the Author field of the introductions content type. */
export type IntroductionsDataAuthorDto = {
  __typename?: 'IntroductionsDataAuthorDto';
  iv?: Maybe<Array<Authors>>;
};

/** The structure of the Author field of the introductions content input type. */
export type IntroductionsDataAuthorInputDto = {
  iv?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** The structure of the Chapters field of the introductions content type. */
export type IntroductionsDataChaptersDto = {
  __typename?: 'IntroductionsDataChaptersDto';
  iv?: Maybe<Array<ChaptersComponent>>;
};

/** The dynamic structure of the Chapters field of the introductions content type. */
export type IntroductionsDataChaptersDto__Dynamic = {
  __typename?: 'IntroductionsDataChaptersDto__Dynamic';
  iv?: Maybe<Scalars['JsonScalar']['output']>;
};


/** The dynamic structure of the Chapters field of the introductions content type. */
export type IntroductionsDataChaptersDto__DynamicIvArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** The structure of the Chapters field of the introductions content input type. */
export type IntroductionsDataChaptersInputDto = {
  iv?: InputMaybe<Scalars['JsonScalar']['input']>;
};

/** The structure of the Content field of the introductions content type. */
export type IntroductionsDataContentDto = {
  __typename?: 'IntroductionsDataContentDto';
  iv?: Maybe<Scalars['String']['output']>;
};

/** The structure of the Content field of the introductions content input type. */
export type IntroductionsDataContentInputDto = {
  iv?: InputMaybe<Scalars['String']['input']>;
};

/** The structure of the Description field of the introductions content type. */
export type IntroductionsDataDescriptionDto = {
  __typename?: 'IntroductionsDataDescriptionDto';
  iv?: Maybe<Scalars['String']['output']>;
};

/** The structure of the Description field of the introductions content input type. */
export type IntroductionsDataDescriptionInputDto = {
  iv?: InputMaybe<Scalars['String']['input']>;
};

/** The structure of the introductions data type. */
export type IntroductionsDataDto = {
  __typename?: 'IntroductionsDataDto';
  author?: Maybe<IntroductionsDataAuthorDto>;
  chapters?: Maybe<IntroductionsDataChaptersDto>;
  chapters__Dynamic?: Maybe<IntroductionsDataChaptersDto__Dynamic>;
  content?: Maybe<IntroductionsDataContentDto>;
  description?: Maybe<IntroductionsDataDescriptionDto>;
  slug?: Maybe<IntroductionsDataSlugDto>;
  title?: Maybe<IntroductionsDataTitleDto>;
};

/** The structure of the introductions data input type. */
export type IntroductionsDataInputDto = {
  author?: InputMaybe<IntroductionsDataAuthorInputDto>;
  chapters?: InputMaybe<IntroductionsDataChaptersInputDto>;
  content?: InputMaybe<IntroductionsDataContentInputDto>;
  description?: InputMaybe<IntroductionsDataDescriptionInputDto>;
  slug?: InputMaybe<IntroductionsDataSlugInputDto>;
  title?: InputMaybe<IntroductionsDataTitleInputDto>;
};

/** The structure of the Slug (Autogenerated) field of the introductions content type. */
export type IntroductionsDataSlugDto = {
  __typename?: 'IntroductionsDataSlugDto';
  iv?: Maybe<Scalars['String']['output']>;
};

/** The structure of the Slug (Autogenerated) field of the introductions content input type. */
export type IntroductionsDataSlugInputDto = {
  iv?: InputMaybe<Scalars['String']['input']>;
};

/** The structure of the Title field of the introductions content type. */
export type IntroductionsDataTitleDto = {
  __typename?: 'IntroductionsDataTitleDto';
  iv?: Maybe<Scalars['String']['output']>;
};

/** The structure of the Title field of the introductions content input type. */
export type IntroductionsDataTitleInputDto = {
  iv?: InputMaybe<Scalars['String']['input']>;
};

/** The structure of the flat introductions data type. */
export type IntroductionsFlatDataDto = {
  __typename?: 'IntroductionsFlatDataDto';
  author?: Maybe<Array<Authors>>;
  chapters?: Maybe<Array<ChaptersComponent>>;
  chapters__Dynamic?: Maybe<Scalars['JsonScalar']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


/** The structure of the flat introductions data type. */
export type IntroductionsFlatDataDtoChapters__DynamicArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** List of introductions items and total count. */
export type IntroductionsResultDto = {
  __typename?: 'IntroductionsResultDto';
  /** The contents. */
  items?: Maybe<Array<Introductions>>;
  /** The total count of  contents. */
  total: Scalars['Int']['output'];
};

/** The structure of a schema-test content type. */
export type SchemaTest = Content & {
  __typename?: 'SchemaTest';
  /** The timestamp when the object was created. */
  created: Scalars['Instant']['output'];
  /** The user who created the object. */
  createdBy: Scalars['String']['output'];
  /** The user who created the object. */
  createdByUser: User;
  /** The data of the content. */
  data: SchemaTestDataDto;
  /** The data of the content. */
  data__dynamic?: Maybe<Scalars['JsonScalar']['output']>;
  /** The edit token. */
  editToken?: Maybe<Scalars['String']['output']>;
  /** The flat data of the content. */
  flatData: SchemaTestFlatDataDto;
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
  /** Query authors content items. */
  referencesAuthorsContents?: Maybe<Array<Authors>>;
  /** Query authors content items with total count. */
  referencesAuthorsContentsWithTotal?: Maybe<AuthorsResultDto>;
  /** The status of the content. */
  status: Scalars['String']['output'];
  /** The status color of the content. */
  statusColor: Scalars['String']['output'];
  /** The URL to the content. */
  url: Scalars['String']['output'];
  /** The version of the objec. */
  version: Scalars['Int']['output'];
};


/** The structure of a schema-test content type. */
export type SchemaTestReferencesAuthorsContentsArgs = {
  collation?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  random?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};


/** The structure of a schema-test content type. */
export type SchemaTestReferencesAuthorsContentsWithTotalArgs = {
  collation?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  orderby?: InputMaybe<Scalars['String']['input']>;
  random?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  top?: InputMaybe<Scalars['Int']['input']>;
};

/** The structure of the Array1 nested schema. */
export type SchemaTestDataArray1ChildDto = {
  __typename?: 'SchemaTestDataArray1ChildDto';
  name?: Maybe<Scalars['String']['output']>;
  otherschema?: Maybe<Array<Authors>>;
};

/** The structure of the Array1 nested schema. */
export type SchemaTestDataArray1ChildInputDto = {
  name?: InputMaybe<Scalars['String']['input']>;
  otherschema?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** The structure of the Array1 field of the schema-test content type. */
export type SchemaTestDataArray1Dto = {
  __typename?: 'SchemaTestDataArray1Dto';
  iv?: Maybe<Array<SchemaTestDataArray1ChildDto>>;
};

/** The structure of the Array1 field of the schema-test content input type. */
export type SchemaTestDataArray1InputDto = {
  iv?: InputMaybe<Array<SchemaTestDataArray1ChildInputDto>>;
};

/** The structure of the Assets1 field of the schema-test content type. */
export type SchemaTestDataAssets1Dto = {
  __typename?: 'SchemaTestDataAssets1Dto';
  iv?: Maybe<Array<Asset>>;
};

/** The structure of the Assets1 field of the schema-test content input type. */
export type SchemaTestDataAssets1InputDto = {
  iv?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** The structure of the Bool1 field of the schema-test content type. */
export type SchemaTestDataBool1Dto = {
  __typename?: 'SchemaTestDataBool1Dto';
  iv?: Maybe<Scalars['Boolean']['output']>;
};

/** The structure of the Bool1 field of the schema-test content input type. */
export type SchemaTestDataBool1InputDto = {
  iv?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SchemaTestDataComponent1ComponentUnionDto = Component1Component | HotelsComponent;

/** The structure of the Component1 field of the schema-test content type. */
export type SchemaTestDataComponent1Dto = {
  __typename?: 'SchemaTestDataComponent1Dto';
  iv?: Maybe<SchemaTestDataComponent1ComponentUnionDto>;
};

/** The dynamic structure of the Component1 field of the schema-test content type. */
export type SchemaTestDataComponent1Dto__Dynamic = {
  __typename?: 'SchemaTestDataComponent1Dto__Dynamic';
  iv?: Maybe<Scalars['JsonScalar']['output']>;
};


/** The dynamic structure of the Component1 field of the schema-test content type. */
export type SchemaTestDataComponent1Dto__DynamicIvArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** The structure of the Component1 field of the schema-test content input type. */
export type SchemaTestDataComponent1InputDto = {
  iv?: InputMaybe<Scalars['JsonScalar']['input']>;
};

/** The dynamic structure of the ComponentEmpty field of the schema-test content type. */
export type SchemaTestDataComponentEmptyDto__Dynamic = {
  __typename?: 'SchemaTestDataComponentEmptyDto__Dynamic';
  iv?: Maybe<Scalars['JsonScalar']['output']>;
};


/** The dynamic structure of the ComponentEmpty field of the schema-test content type. */
export type SchemaTestDataComponentEmptyDto__DynamicIvArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** The structure of the ComponentEmpty field of the schema-test content input type. */
export type SchemaTestDataComponentEmptyInputDto = {
  iv?: InputMaybe<Scalars['JsonScalar']['input']>;
};

export type SchemaTestDataComponents1ComponentUnionDto = ChaptersComponent | Component1Component;

/** The structure of the Components1 field of the schema-test content type. */
export type SchemaTestDataComponents1Dto = {
  __typename?: 'SchemaTestDataComponents1Dto';
  iv?: Maybe<Array<SchemaTestDataComponents1ComponentUnionDto>>;
};

/** The dynamic structure of the Components1 field of the schema-test content type. */
export type SchemaTestDataComponents1Dto__Dynamic = {
  __typename?: 'SchemaTestDataComponents1Dto__Dynamic';
  iv?: Maybe<Scalars['JsonScalar']['output']>;
};


/** The dynamic structure of the Components1 field of the schema-test content type. */
export type SchemaTestDataComponents1Dto__DynamicIvArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** The structure of the Components1 field of the schema-test content input type. */
export type SchemaTestDataComponents1InputDto = {
  iv?: InputMaybe<Scalars['JsonScalar']['input']>;
};

/** The structure of the Date1 field of the schema-test content type. */
export type SchemaTestDataDate1Dto = {
  __typename?: 'SchemaTestDataDate1Dto';
  iv?: Maybe<Scalars['Instant']['output']>;
};

/** The structure of the Date1 field of the schema-test content input type. */
export type SchemaTestDataDate1InputDto = {
  iv?: InputMaybe<Scalars['Instant']['input']>;
};

/** The structure of the schema-test data type. */
export type SchemaTestDataDto = {
  __typename?: 'SchemaTestDataDto';
  array1?: Maybe<SchemaTestDataArray1Dto>;
  assets1?: Maybe<SchemaTestDataAssets1Dto>;
  bool1?: Maybe<SchemaTestDataBool1Dto>;
  component1?: Maybe<SchemaTestDataComponent1Dto>;
  component1__Dynamic?: Maybe<SchemaTestDataComponent1Dto__Dynamic>;
  componentEmpty__Dynamic?: Maybe<SchemaTestDataComponentEmptyDto__Dynamic>;
  components1?: Maybe<SchemaTestDataComponents1Dto>;
  components1__Dynamic?: Maybe<SchemaTestDataComponents1Dto__Dynamic>;
  date1?: Maybe<SchemaTestDataDate1Dto>;
  field1?: Maybe<SchemaTestDataField1Dto>;
  geo1?: Maybe<SchemaTestDataGeo1Dto>;
  json1?: Maybe<SchemaTestDataJson1Dto>;
  number1?: Maybe<SchemaTestDataNumber1Dto>;
  references1?: Maybe<SchemaTestDataReferences1Dto>;
  richText1?: Maybe<SchemaTestDataRichText1Dto>;
  tags1?: Maybe<SchemaTestDataTags1Dto>;
};

/** The structure of the Field1 field of the schema-test content type. */
export type SchemaTestDataField1Dto = {
  __typename?: 'SchemaTestDataField1Dto';
  iv?: Maybe<Scalars['String']['output']>;
};

/** The structure of the Field1 field of the schema-test content input type. */
export type SchemaTestDataField1InputDto = {
  iv?: InputMaybe<Scalars['String']['input']>;
};

/** The structure of the Geo1 field of the schema-test content type. */
export type SchemaTestDataGeo1Dto = {
  __typename?: 'SchemaTestDataGeo1Dto';
  iv?: Maybe<Scalars['JsonScalar']['output']>;
};


/** The structure of the Geo1 field of the schema-test content type. */
export type SchemaTestDataGeo1DtoIvArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** The structure of the Geo1 field of the schema-test content input type. */
export type SchemaTestDataGeo1InputDto = {
  iv?: InputMaybe<Scalars['JsonScalar']['input']>;
};

/** The structure of the schema-test data input type. */
export type SchemaTestDataInputDto = {
  array1?: InputMaybe<SchemaTestDataArray1InputDto>;
  assets1?: InputMaybe<SchemaTestDataAssets1InputDto>;
  bool1?: InputMaybe<SchemaTestDataBool1InputDto>;
  component1?: InputMaybe<SchemaTestDataComponent1InputDto>;
  componentEmpty?: InputMaybe<SchemaTestDataComponentEmptyInputDto>;
  components1?: InputMaybe<SchemaTestDataComponents1InputDto>;
  date1?: InputMaybe<SchemaTestDataDate1InputDto>;
  field1?: InputMaybe<SchemaTestDataField1InputDto>;
  geo1?: InputMaybe<SchemaTestDataGeo1InputDto>;
  json1?: InputMaybe<SchemaTestDataJson1InputDto>;
  number1?: InputMaybe<SchemaTestDataNumber1InputDto>;
  references1?: InputMaybe<SchemaTestDataReferences1InputDto>;
  richText1?: InputMaybe<SchemaTestDataRichText1InputDto>;
  tags1?: InputMaybe<SchemaTestDataTags1InputDto>;
};

/** The structure of the Json1 field of the schema-test content type. */
export type SchemaTestDataJson1Dto = {
  __typename?: 'SchemaTestDataJson1Dto';
  iv?: Maybe<Scalars['JsonScalar']['output']>;
};


/** The structure of the Json1 field of the schema-test content type. */
export type SchemaTestDataJson1DtoIvArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** The structure of the Json1 field of the schema-test content input type. */
export type SchemaTestDataJson1InputDto = {
  iv?: InputMaybe<Scalars['JsonScalar']['input']>;
};

/** The structure of the Number1 field of the schema-test content type. */
export type SchemaTestDataNumber1Dto = {
  __typename?: 'SchemaTestDataNumber1Dto';
  iv?: Maybe<Scalars['Float']['output']>;
};

/** The structure of the Number1 field of the schema-test content input type. */
export type SchemaTestDataNumber1InputDto = {
  iv?: InputMaybe<Scalars['Float']['input']>;
};

/** The structure of the References1 field of the schema-test content type. */
export type SchemaTestDataReferences1Dto = {
  __typename?: 'SchemaTestDataReferences1Dto';
  iv?: Maybe<Array<Authors>>;
};

/** The structure of the References1 field of the schema-test content input type. */
export type SchemaTestDataReferences1InputDto = {
  iv?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** The structure of the RichText1 field of the schema-test content type. */
export type SchemaTestDataRichText1Dto = {
  __typename?: 'SchemaTestDataRichText1Dto';
  iv?: Maybe<SchemaTestDataRichText1RichText>;
};

/** The structure of the RichText1 field of the schema-test content input type. */
export type SchemaTestDataRichText1InputDto = {
  iv?: InputMaybe<Scalars['JsonScalar']['input']>;
};

export type SchemaTestDataRichText1RichText = {
  __typename?: 'SchemaTestDataRichText1RichText';
  /** The referenced assets. */
  assets: Array<Asset>;
  /** The referenced content items. */
  contents: Array<SchemaTestDataRichText1UnionDto>;
  /** The value as HTML. */
  html: Scalars['String']['output'];
  /** The value as markdown. */
  markdown: Scalars['String']['output'];
  /** The value as markdown. */
  text: Scalars['String']['output'];
  /** The raw value. */
  value?: Maybe<Scalars['JsonScalar']['output']>;
};


export type SchemaTestDataRichText1RichTextHtmlArgs = {
  indentation?: InputMaybe<Scalars['Int']['input']>;
};

export type SchemaTestDataRichText1UnionDto = Articles | Authors | Introductions | SchemaTest | Test;

/** The structure of the Tags1 field of the schema-test content type. */
export type SchemaTestDataTags1Dto = {
  __typename?: 'SchemaTestDataTags1Dto';
  iv?: Maybe<Array<Scalars['String']['output']>>;
};

/** The structure of the Tags1 field of the schema-test content input type. */
export type SchemaTestDataTags1InputDto = {
  iv?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** The structure of the flat schema-test data type. */
export type SchemaTestFlatDataDto = {
  __typename?: 'SchemaTestFlatDataDto';
  array1?: Maybe<Array<SchemaTestDataArray1ChildDto>>;
  assets1?: Maybe<Array<Asset>>;
  bool1?: Maybe<Scalars['Boolean']['output']>;
  component1?: Maybe<SchemaTestDataComponent1ComponentUnionDto>;
  component1__Dynamic?: Maybe<Scalars['JsonScalar']['output']>;
  componentEmpty__Dynamic?: Maybe<Scalars['JsonScalar']['output']>;
  components1?: Maybe<Array<SchemaTestDataComponents1ComponentUnionDto>>;
  components1__Dynamic?: Maybe<Scalars['JsonScalar']['output']>;
  date1?: Maybe<Scalars['Instant']['output']>;
  field1?: Maybe<Scalars['String']['output']>;
  geo1?: Maybe<Scalars['JsonScalar']['output']>;
  json1?: Maybe<Scalars['JsonScalar']['output']>;
  number1?: Maybe<Scalars['Float']['output']>;
  references1?: Maybe<Array<Authors>>;
  richText1?: Maybe<SchemaTestDataRichText1RichText>;
  tags1?: Maybe<Array<Scalars['String']['output']>>;
};


/** The structure of the flat schema-test data type. */
export type SchemaTestFlatDataDtoComponent1__DynamicArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** The structure of the flat schema-test data type. */
export type SchemaTestFlatDataDtoComponentEmpty__DynamicArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** The structure of the flat schema-test data type. */
export type SchemaTestFlatDataDtoComponents1__DynamicArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** The structure of the flat schema-test data type. */
export type SchemaTestFlatDataDtoGeo1Args = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** The structure of the flat schema-test data type. */
export type SchemaTestFlatDataDtoJson1Args = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** List of schema-test items and total count. */
export type SchemaTestResultDto = {
  __typename?: 'SchemaTestResultDto';
  /** The contents. */
  items?: Maybe<Array<SchemaTest>>;
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
  localizable?: Maybe<TestDataLocalizableDto>;
  test?: Maybe<TestDataTestDto>;
};

/** The structure of the test data input type. */
export type TestDataInputDto = {
  localizable?: InputMaybe<TestDataLocalizableInputDto>;
  test?: InputMaybe<TestDataTestInputDto>;
};

/** The structure of the Localizable field of the test content type. */
export type TestDataLocalizableDto = {
  __typename?: 'TestDataLocalizableDto';
  en?: Maybe<Scalars['String']['output']>;
  zh?: Maybe<Scalars['String']['output']>;
};

/** The structure of the Localizable field of the test content input type. */
export type TestDataLocalizableInputDto = {
  en?: InputMaybe<Scalars['String']['input']>;
  zh?: InputMaybe<Scalars['String']['input']>;
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
  localizable?: Maybe<Scalars['String']['output']>;
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

export type IntroQueryVariables = Exact<{
  filter: Scalars['String']['input'];
}>;


export type IntroQuery = { __typename?: 'ApplicationQueries', intros?: Array<{ __typename?: 'Introductions', flatData: { __typename?: 'IntroductionsFlatDataDto', title?: string | null, description?: string | null, chapters?: Array<{ __typename?: 'ChaptersComponent', title?: string | null, articles?: Array<{ __typename?: 'Articles', id: string, flatData: { __typename?: 'ArticlesFlatDataDto', name?: string | null } }> | null }> | null } }> | null };

export type ArticleQueryVariables = Exact<{
  filter: Scalars['String']['input'];
}>;


export type ArticleQuery = { __typename?: 'ApplicationQueries', articles?: Array<{ __typename?: 'Articles', flatData: { __typename?: 'ArticlesFlatDataDto', name?: string | null, content?: string | null } }> | null };

export type SidebarQueryVariables = Exact<{
  filter: Scalars['String']['input'];
}>;


export type SidebarQuery = { __typename?: 'ApplicationQueries', sidebars?: Array<{ __typename?: 'Introductions', flatData: { __typename?: 'IntroductionsFlatDataDto', chapters?: Array<{ __typename?: 'ChaptersComponent', title?: string | null, articles?: Array<{ __typename?: 'Articles', id: string, flatData: { __typename?: 'ArticlesFlatDataDto', name?: string | null } }> | null }> | null } }> | null };


export const IntroDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Intro"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"intros"},"name":{"kind":"Name","value":"queryIntroductionsContents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flatData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"chapters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"articles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"flatData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<IntroQuery, IntroQueryVariables>;
export const ArticleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Article"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"articles"},"name":{"kind":"Name","value":"queryArticlesContents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flatData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]}}]} as unknown as DocumentNode<ArticleQuery, ArticleQueryVariables>;
export const SidebarDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Sidebar"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"sidebars"},"name":{"kind":"Name","value":"queryIntroductionsContents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flatData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chapters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"articles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"flatData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SidebarQuery, SidebarQueryVariables>;