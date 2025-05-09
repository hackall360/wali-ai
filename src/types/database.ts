/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum LocalizationField {
  ListingTitle = "ListingTitle",
  ListingDescription = "ListingDescription",
  DetailsTitle = "DetailsTitle",
  DetailsDescription = "DetailsDescription",
}

export enum Language {
  En = "En",
}

export enum EntityType {
  None = "None",
  Unknown = "Unknown",
  Any = "Any",
  Item = "Item",
  Recipe = "Recipe",
  TechTree = "TechTree",
  BuildableUnlockableSet = "BuildableUnlockableSet",
  Placeable = "Placeable",
  Npc = "Npc",
  Faction = "Faction",
  Contract = "Contract",
  Dialogue = "Dialogue",
  JourneyStory = "JourneyStory",
  LootContainer = "LootContainer",
  LootSpawner = "LootSpawner",
  Skill = "Skill",
  Research = "Research",
}

export enum EVectorQuantization {
  None = "None",
  RoundWholeNumber = "RoundWholeNumber",
  RoundOneDecimal = "RoundOneDecimal",
  RoundTwoDecimals = "RoundTwoDecimals",
}

export enum ETickingGroup {
  None = "None",
  TGPrePhysics = "TG_PrePhysics",
  TGStartPhysics = "TG_StartPhysics",
  TGDuringPhysics = "TG_DuringPhysics",
  TGEndPhysics = "TG_EndPhysics",
  TGPostPhysics = "TG_PostPhysics",
  TGPostUpdateWork = "TG_PostUpdateWork",
  TGLastDemotable = "TG_LastDemotable",
  TGNewlySpawned = "TG_NewlySpawned",
  TG_MAX = "TG_MAX",
}

export enum ESurfaceSnappingType {
  None = "None",
  ToSurface = "ToSurface",
  ToSurfaceNormal = "ToSurfaceNormal",
  ToLowestSurfaceInArea = "ToLowestSurfaceInArea",
  ToTopmostSurfaceInArea = "ToTopmostSurfaceInArea",
}

export enum ESpawnActorCollisionHandlingMethod {
  None = "None",
  Undefined = "Undefined",
  AlwaysSpawn = "AlwaysSpawn",
  AdjustIfPossibleButAlwaysSpawn = "AdjustIfPossibleButAlwaysSpawn",
  AdjustIfPossibleButDontSpawnIfColliding = "AdjustIfPossibleButDontSpawnIfColliding",
  DontSpawnIfColliding = "DontSpawnIfColliding",
}

export enum ESkillType {
  None = "None",
  Ability = "Ability",
  Technique = "Technique",
  Attribute = "Attribute",
}

export enum ESkillTree {
  None = "None",
  Hidden = "Hidden",
  BeneGesserit = "BeneGesserit",
  Mentat = "Mentat",
  Trooper = "Trooper",
  Swordmaster = "Swordmaster",
  Planetologist = "Planetologist",
  MAX = "MAX",
}

export enum ES2SCull {
  None = "None",
  Players = "Players",
  DistanceOnly = "DistanceOnly",
  Off = "Off",
}

export enum ERotatorQuantization {
  None = "None",
  ByteComponents = "ByteComponents",
  ShortComponents = "ShortComponents",
}

export enum ERangeBoundTypes {
  None = "None",
  Exclusive = "Exclusive",
  Inclusive = "Inclusive",
  Open = "Open",
}

export enum EObjectNeedsLoadFor {
  None = "None",
  ClientAndServer = "ClientAndServer",
  ClientOnly = "ClientOnly",
  ServerOnly = "ServerOnly",
  EditorOnly = "EditorOnly",
}

export enum ENetRole {
  None = "None",
  ROLENone = "ROLE_None",
  ROLESimulatedProxy = "ROLE_SimulatedProxy",
  ROLEAutonomousProxy = "ROLE_AutonomousProxy",
  ROLEAuthority = "ROLE_Authority",
  ROLE_MAX = "ROLE_MAX",
}

export enum ENetDormancy {
  None = "None",
  DORMNever = "DORM_Never",
  DORMAwake = "DORM_Awake",
  DORMDormantAll = "DORM_DormantAll",
  DORMDormantPartial = "DORM_DormantPartial",
  DORMInitial = "DORM_Initial",
  DORM_MAX = "DORM_MAX",
}

export enum ELootTableItemVariety {
  None = "None",
  RandomItems = "RandomItems",
  LockFirstRandomItem = "LockFirstRandomItem",
  Unique = "Unique",
}

export enum EJourneyNodeEventState {
  None = "None",
  Hidden = "Hidden",
  Revealed = "Revealed",
  Completed = "Completed",
}

export enum EHostilityType {
  None = "None",
  Neutral = "Neutral",
  Hostile = "Hostile",
}

export enum EGameplayModOp {
  None = "None",
  Additive = "Additive",
  Multiplicitive = "Multiplicitive",
  Division = "Division",
  Override = "Override",
  Max = "Max",
}

export enum EContractConditionType {
  None = "None",
  Invalid = "Invalid",
  KillNumber = "KillNumber",
  ClearArea = "ClearArea",
  DeliverItemById = "DeliverItemById",
  ReceiveItemById = "ReceiveItemById",
  Interact = "Interact",
  GoToLocation = "GoToLocation",
  ScanObject = "ScanObject",
  UseAbility = "UseAbility",
  PlayerHasFlags = "PlayerHasFlags",
  HandInContract = "HandInContract",
  ContactIssuer = "ContactIssuer",
  Exsanguination = "Exsanguination",
}

export enum ECompositeConditionType {
  None = "None",
  And = "And",
  Or = "Or",
}

export enum EAutoReceiveInput {
  None = "None",
  Disabled = "Disabled",
  Player0 = "Player0",
  Player1 = "Player1",
  Player2 = "Player2",
  Player3 = "Player3",
  Player4 = "Player4",
  Player5 = "Player5",
  Player6 = "Player6",
  Player7 = "Player7",
}

export enum EAuthorityTransferState {
  None = "None",
  AUTHTRANSFERNone = "AUTHTRANSFER_None",
  AUTHTRANSFERTransferring = "AUTHTRANSFER_Transferring",
  AUTHTRANSFERFixed = "AUTHTRANSFER_Fixed",
  AUTHTRANSFERSerializing = "AUTHTRANSFER_Serializing",
  AUTHTRANSFER_MAX = "AUTHTRANSFER_MAX",
}

export enum EActorUpdateOverlapsMethod {
  None = "None",
  UseConfigDefault = "UseConfigDefault",
  AlwaysUpdate = "AlwaysUpdate",
  OnlyUpdateMovable = "OnlyUpdateMovable",
  NeverUpdate = "NeverUpdate",
}

export enum DepthType {
  Cv8U = "Cv8U",
  Cv8S = "Cv8S",
  Cv16U = "Cv16U",
  Cv16S = "Cv16S",
  Cv32S = "Cv32S",
  Cv32F = "Cv32F",
  Cv64F = "Cv64F",
  Default = "Default",
}

export enum BindingFlags {
  Default = "Default",
  IgnoreCase = "IgnoreCase",
  DeclaredOnly = "DeclaredOnly",
  Instance = "Instance",
  Static = "Static",
  Public = "Public",
  NonPublic = "NonPublic",
  FlattenHierarchy = "FlattenHierarchy",
  InvokeMethod = "InvokeMethod",
  CreateInstance = "CreateInstance",
  GetField = "GetField",
  SetField = "SetField",
  GetProperty = "GetProperty",
  SetProperty = "SetProperty",
  PutDispProperty = "PutDispProperty",
  PutRefDispProperty = "PutRefDispProperty",
  ExactBinding = "ExactBinding",
  SuppressChangeType = "SuppressChangeType",
  OptionalParamBinding = "OptionalParamBinding",
  IgnoreReturn = "IgnoreReturn",
  DoNotWrapExceptions = "DoNotWrapExceptions",
}

export interface ActorTickFunction {
  tickGroup?: ETickingGroup;
  endTickGroup?: ETickingGroup;
  bTickEvenWhenPaused?: boolean;
  bCanEverTick?: boolean;
  bStartWithTickEnabled?: boolean;
  bAllowTickOnDedicatedServer?: boolean;
  bAllowAggregation?: boolean;
  bTickWithOwner?: boolean;
  /** @format int32 */
  priorityGroup?: number;
  /** @format float */
  priorityTime?: number;
  tickClass?: ObjectProperty;
  /** @format float */
  tickInterval?: number;
}

export interface AlwaysSerializeAttribute {
  typeId?: any;
}

export interface ApiExcludeAttribute {
  typeId?: any;
}

export interface ArmorItemStats {
  /** @format float */
  coldDamageMitigationArmor?: number;
  /** @format float */
  coriolisDamageMitigationArmor?: number;
  /** @format float */
  dartDamageMitigationArmor?: number;
  /** @format float */
  energyDamageMitigationArmor?: number;
  /** @format float */
  explosiveDamageMitigationArmor?: number;
  /** @format float */
  harvestDamageMitigationArmor?: number;
  /** @format float */
  heatDamageMitigationArmor?: number;
  /** @format float */
  meleeDamageMitigationArmor?: number;
  /** @format float */
  physicalDamageMitigationArmor?: number;
  /** @format float */
  poisonDamageMitigationArmor?: number;
  /** @format float */
  radiationDamageMitigationArmor?: number;
  /** @format float */
  repairDamageMitigationArmor?: number;
  /** @format float */
  sandstormDamageMitigationLevel1Armor?: number;
  /** @format float */
  sandstormDamageMitigationLevel2Armor?: number;
  /** @format float */
  sandstormDamageMitigationLevel3Armor?: number;
  /** @format float */
  healingDamageMitigationArmor?: number;
  /** @format float */
  heavyDartDamageMitigationArmor?: number;
  /** @format int32 */
  armorValue?: number;
}

export interface AssetEntryLink {
  assetPath?: string;
  assetEntryName?: string;
  assetEntryType?: string;
  /** @format int32 */
  assetEntryIndex?: number;
}

export interface BPAiSpawnLocationC {
  m_bIsStatic?: boolean;
  npcType?: DataTableRowReference;
  rootComponent?: ObjectProperty;
  arrow?: ObjectProperty;
}

export interface BPContractGoToTargetC {
  contractContent?: ObjectProperty;
  rootComponent?: ObjectProperty;
}

export interface BPContractInteractionTargetC {
  contractContent?: ObjectProperty;
  rootComponent?: ObjectProperty;
}

export interface BPRoomDescriptorC {
  m_SpawnLocations?: ObjectProperty[] | null;
  rootComponent?: ObjectProperty;
}

export interface BPTerrainBlockActorC {
  primaryActorTick?: ActorTickFunction;
  bNetTemporary?: boolean;
  bOnlyRelevantToOwner?: boolean;
  bAlwaysRelevant?: boolean;
  bReplicateMovement?: boolean;
  bCallPreReplication?: boolean;
  bCallPreReplicationForReplay?: boolean;
  bHidden?: boolean;
  bTearOff?: boolean;
  bForceNetAddressable?: boolean;
  bExchangedRoles?: boolean;
  bNetLoadOnClient?: boolean;
  bNetUseOwnerRelevancy?: boolean;
  bRelevantForNetworkReplays?: boolean;
  bRelevantForLevelBounds?: boolean;
  bReplayRewindable?: boolean;
  bAllowTickBeforeBeginPlay?: boolean;
  bAutoDestroyWhenFinished?: boolean;
  bCanBeDamaged?: boolean;
  bBlockInput?: boolean;
  bCollideWhenPlacing?: boolean;
  bFindCameraComponentWhenViewTarget?: boolean;
  bGenerateOverlapEventsDuringLevelStreaming?: boolean;
  bIgnoresOriginShifting?: boolean;
  bEnableAutoLODGeneration?: boolean;
  bIsEditorOnlyActor?: boolean;
  bActorSeamlessTraveled?: boolean;
  bUseExtendedRelevancyTimeout?: boolean;
  bIgnoreLevelBoundsClamp?: boolean;
  bUsesFgl?: boolean;
  fglType?: ObjectProperty;
  entityId?: EntityId;
  /** @format int32 */
  m_DimensionIndex?: number;
  actorNeedsLoadFor?: EObjectNeedsLoadFor;
  layoutReplicator?: ReplicatorProxy;
  bReplicates?: boolean;
  bProxyReplicates?: boolean;
  bProxyHasInitialReplication?: boolean;
  s2sCull?: ES2SCull;
  bLostRelevancy?: boolean;
  bNoServerReplicates?: boolean;
  bCanBeInCluster?: boolean;
  bAllowReceiveTickEventOnDedicatedServer?: boolean;
  bReplicateUsingRegisteredSubObjectList?: boolean;
  bActorEnableCollision?: boolean;
  bActorIsBeingDestroyed?: boolean;
  bAsyncPhysicsTickEnabled?: boolean;
  updateOverlapsMethodDuringLevelStreaming?: EActorUpdateOverlapsMethod;
  defaultUpdateOverlapsMethodDuringLevelStreaming?: EActorUpdateOverlapsMethod;
  /** @format float */
  initialLifeSpan?: number;
  /** @format float */
  customTimeDilation?: number;
  remoteRole?: ENetRole;
  /** @format int32 */
  rayTracingGroupId?: number;
  attachmentReplication?: RepAttachment;
  replicatedMovement?: RepMovement;
  owner?: ObjectProperty;
  netDriverName?: string;
  role?: ENetRole;
  netDormancy?: ENetDormancy;
  spawnCollisionHandlingMethod?: ESpawnActorCollisionHandlingMethod;
  autoReceiveInput?: EAutoReceiveInput;
  /** @format int32 */
  inputPriority?: number;
  inputComponent?: ObjectProperty;
  /** @format float */
  netCullDistanceSquared?: number;
  /** @format float */
  viewTargetNetCullDistanceSquared?: number;
  /** @format int32 */
  netTag?: number;
  /** @format float */
  netUpdateFrequency?: number;
  /** @format float */
  minNetUpdateFrequency?: number;
  /** @format float */
  netPriority?: number;
  instigator?: ObjectProperty;
  children?: ObjectProperty[] | null;
  originalActor?: ObjectProperty;
  authorityTransferState?: EAuthorityTransferState;
  bActorIsWaitingForPersistence?: boolean;
  bActorBeingReplaced?: boolean;
  rootComponent?: ObjectProperty;
  layers?: string[] | null;
  parentComponent?: ObjectProperty;
  tags?: string[] | null;
  onTakeAnyDamage?: any;
  onTakePointDamage?: any;
  onTakeRadialDamage?: any;
  onActorBeginOverlap?: any;
  onActorEndOverlap?: any;
  onBeginCursorOver?: any;
  onEndCursorOver?: any;
  onClicked?: any;
  onReleased?: any;
  onInputTouchBegin?: any;
  onInputTouchEnd?: any;
  onInputTouchEnter?: any;
  onInputTouchLeave?: any;
  onActorHit?: any;
  onDestroyed?: any;
  onEndPlay?: any;
  instanceComponents?: ObjectProperty[] | null;
  blueprintCreatedComponents?: ObjectProperty[] | null;
  m_bIsPartOfWorldLayout?: boolean;
  m_bShouldLoadLodOnly?: boolean;
  m_bShouldOverrideSnapType?: boolean;
  m_SnapType?: ESurfaceSnappingType;
  m_bShouldOverrideAdditionalSnappingOffsetByZ?: boolean;
  /** @format float */
  m_AdditionalSnappingOffsetByZ?: number;
  m_SceneComponent?: ObjectProperty;
  m_bWasObjectLoaded?: boolean;
  m_bIsTerrainBlockEnabled?: boolean;
  m_TerrainBlockAsset?: ObjectProperty;
  m_SubLevelGroupsSettings?:
    | KeyValuePairStringTerrainBlockTemplateSubLevelGroupSettings[]
    | null;
  m_SubContentBlocksSettings?:
    | TerrainBlockTemplateSubLevelContentBlockSettings[]
    | null;
  m_bIsVistaOnly?: boolean;
  debugArea?: boolean;
}

export interface BaseModel {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
}

export interface BuildableUnlockableSetModel {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  requiresLearning?: boolean;
  groupInTechTree?: boolean;
  buildables?: RelatedEntity[] | null;
}

export type BuildableUnlockableSetsBuilder = object;

export type BuildablesBuilder = object;

export type Builder = object;

export interface Categories {
  /** @uniqueItems true */
  npcs?: Category[] | null;
  /** @uniqueItems true */
  contracts?: Category[] | null;
  /** @uniqueItems true */
  story?: Category[] | null;
  /** @uniqueItems true */
  research?: Category[] | null;
}

export interface Category {
  id?: string;
  parentId?: string;
  /** @uniqueItems true */
  children?: Category[] | null;
  /** @format int32 */
  entityCount?: number;
}

export interface CategoryDetails {
  name?: Record<string, string>;
  iconPath?: string;
}

export type CategoryEqualityComparer = object;

export type CdnClient = object;

export interface ChannelMat {
  name?: string;
  /** @format int32 */
  x?: number;
  /** @format int32 */
  y?: number;
  mat?: Mat;
}

export type CombinedModel = {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  nodes?: ResearchNodeModel[] | null;
  /** @format int32 */
  intelSpentRequirement?: number;
  entity?: RelatedEntity;
  /** @format int32 */
  intelPointsCost?: number;
  /** @format int32 */
  additionalChargesIntelPointsCost?: number;
  /** @format int32 */
  additionalChargesCount?: number | null;
  /** @format int32 */
  recipeUses?: number | null;
  researchNodeType?: string;
  /** @format int32 */
  tier?: number;
  parents?: string[] | null;
} & {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  tag?: string;
  skillTree?: ESkillTree;
  skillType?: ESkillType;
  /** @format int32 */
  gridX?: number;
  /** @format int32 */
  gridY?: number;
  /** @uniqueItems true */
  preReqs?: string[] | null;
  /** @format int32 */
  maxLevel?: number;
  costPerlevel?: number[] | null;
  attributeBonuses?: SkillAttributeBonusModel[] | null;
  levelRequirements?: string[] | null;
} & {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  ingredients?: EntityQuantityModel[] | null;
  /** @format int32 */
  waterAmount?: number;
  /** @format float */
  craftingTime?: number;
  outputs?: EntityQuantityModel[] | null;
  requiredProductionTypes?: RelatedEntity[] | null;
  outputItem?: RelatedEntity;
  /** @uniqueItems true */
  toughtBySchematics?: RelatedEntity[] | null;
  /** @format int32 */
  totalIngredientsCount?: number;
  actionName?: string;
  researchCategory?: string;
  researchNode?: RelatedEntity;
} & {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  faction?: string;
  buildableTier?: string;
  buildableGroup?: string;
  /** @uniqueItems true */
  recipes?: RelatedEntity[] | null;
  ingredients?: EntityQuantityModel[] | null;
  productionTypes?: string[] | null;
  placeableStats?: PlaceableStats;
  /** @uniqueItems true */
  productionTypeIds?: string[] | null;
  /** @uniqueItems true */
  unlockedByPatents?: RelatedEntity[] | null;
  /** @format float */
  maxHealth?: number;
} & {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  hostilityType?: EHostilityType;
  sellsItems?: VendorItem[] | null;
  locations?: Record<string, Vector2[] | null>;
  isNamed?: boolean;
  /** @uniqueItems true */
  quests?: RelatedEntity[] | null;
  /** @uniqueItems true */
  contracts?: RelatedEntity[] | null;
} & {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  mapId?: string;
  location?: Vector3;
  lootTable?: string;
  lootTier?: string;
  loot?: EntityQuantityRangeModel[] | null;
} & {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  /** @format int32 */
  lifeSpanInSeconds?: number;
  /** @format int32 */
  lifeSpanAfterInteractionInSeconds?: number | null;
  lootDistributionSettings?: LootDistributionSettingsRowBase[] | null;
} & {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  children?: JourneyModel[] | null;
  completionCondition?: JourneyConditionModel;
  revealCondition?: JourneyConditionModel;
  itemRewards?: EntityQuantityModel[] | null;
  /** @format int32 */
  depth?: number;
  /** @uniqueItems true */
  relatedEntities?: RelatedEntity[] | null;
  /** @uniqueItems true */
  allResearchNodeRewards?: RelatedEntity[] | null;
  xpRewardTags?: string[] | null;
  /** @format int64 */
  xpReward?: number;
  /** @format int64 */
  totalXpReward?: number;
} & {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  shortDescription?: string;
  isUnique?: boolean;
  itemTag?: string;
  /** @format int32 */
  tier?: number;
  tierIconPath?: string;
  /** @format int32 */
  lootPool?: number;
  excludeFromLootSystem?: boolean;
  /** @uniqueItems true */
  requiredForRecipe?: RelatedEntity[] | null;
  /** @uniqueItems true */
  requiredForBuilding?: RelatedEntity[] | null;
  /** @uniqueItems true */
  requiredForPlaceable?: RelatedEntity[] | null;
  /** @uniqueItems true */
  requiredForContract?: RelatedEntity[] | null;
  /** @uniqueItems true */
  createdByRecipe?: RelatedEntity[] | null;
  armorStats?: ArmorItemStats;
  weaponStats?: WeaponStats;
  /** @uniqueItems true */
  lootTables?: string[] | null;
  /** @uniqueItems true */
  weightedLootTables?: string[] | null;
  teachesRecipes?: EntityQuantityModel[] | null;
  isDefaultSchematic?: boolean;
  unlocksPlaceables?: RelatedEntity[] | null;
  /** @uniqueItems true */
  soldBy?: RelatedEntity[] | null;
  action?: string;
  infoCard?: string;
  dropLocations?: ItemDropLocation[] | null;
  schematicDropLocations?: ItemDropLocation[] | null;
  heatmaps?: Record<string, string | null>;
} & {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
} & {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  dialogueTree?: TreeNodeDialogueNodeModel[] | null;
} & {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  conditions?: ContractConditionModel[] | null;
  /** @uniqueItems true */
  contractTags?: string[] | null;
  targetNpcs?: RelatedEntity[] | null;
  chainId?: string;
  chainName?: string;
  isChainFinal?: boolean;
  /** @format int32 */
  chainOrder?: number | null;
  chainContracts?: RelatedEntity[] | null;
} & {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  requiresLearning?: boolean;
  groupInTechTree?: boolean;
  buildables?: RelatedEntity[] | null;
};

export type Config = object;

export interface ContractConditionModel {
  name?: string;
  contractItem?: ContractItem;
  conditionType?: EContractConditionType;
  /** @uniqueItems true */
  killNpcs?: RelatedEntity[] | null;
  /** @format int32 */
  number?: number;
  locations?: Record<string, Vector2[] | null>;
  /** @uniqueItems true */
  dialogueNpcs?: RelatedEntity[] | null;
}

export interface ContractGoToTargetModel {
  mapId?: string;
  path?: string;
  location?: SimpleTransform;
  /** @uniqueItems true */
  tags?: string[] | null;
}

export interface ContractItem {
  entity?: RelatedEntity;
  /** @format int32 */
  quantity?: number;
  /** @format float */
  durability?: number;
}

export interface ContractModel {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  conditions?: ContractConditionModel[] | null;
  /** @uniqueItems true */
  contractTags?: string[] | null;
  targetNpcs?: RelatedEntity[] | null;
  chainId?: string;
  chainName?: string;
  isChainFinal?: boolean;
  /** @format int32 */
  chainOrder?: number | null;
  chainContracts?: RelatedEntity[] | null;
}

export type ContractsBuilder = object;

export interface CoordinateModel {
  /** @format double */
  x?: number;
  /** @format double */
  y?: number;
  /** @format double */
  z?: number;
}

export interface DataTableRowReference {
  dataTable?: ObjectProperty;
  rowName?: string;
}

export interface DetailsContractResolver {
  dynamicCodeGeneration?: boolean;
  defaultMembersSearchFlags?: BindingFlags;
  serializeCompilerGeneratedMembers?: boolean;
  ignoreSerializableInterface?: boolean;
  ignoreSerializableAttribute?: boolean;
  ignoreIsSpecifiedMembers?: boolean;
  ignoreShouldSerializeMembers?: boolean;
  namingStrategy?: NamingStrategy;
}

export interface DialogueModel {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  dialogueTree?: TreeNodeDialogueNodeModel[] | null;
}

export interface DialogueNodeModel {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  nodeId?: number;
  text?: string;
  playerNode?: boolean;
  /** @uniqueItems true */
  links?: number[] | null;
}

export type DialoguesBuilder = object;

export interface ELootContainerType {
  name?: string;
}

export interface EntityCount {
  entity?: RelatedEntity;
  count?: T1;
}

export interface EntityId {
  /** @format int64 */
  m_Id?: number;
}

export interface EntityQuantityModel {
  entity?: RelatedEntity;
  /** @format int32 */
  quantity?: number;
}

export interface EntityQuantityRangeModel {
  entity?: RelatedEntity;
  /** @format int32 */
  minQuantity?: number;
  /** @format int32 */
  maxQuantity?: number;
  /** @format float */
  probability?: number;
}

export type EnumLocalizations = object;

export interface ExplorationVolumeModel {
  mapId?: string;
  location?: SimpleTransform;
  path?: string;
  /** @uniqueItems true */
  tags?: string[] | null;
}

export type Extensions = object;

export interface FactionModel {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
}

export type FactionsBuilder = object;

export interface FakeModel {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
}

export interface FloatRange {
  lowerBound?: FloatRangeBound;
  upperBound?: FloatRangeBound;
}

export interface FloatRangeBound {
  type?: ERangeBoundTypes;
  /** @format float */
  value?: number;
}

export interface GameDb {
  uiLocalizations?: UILocalizationsModel;
  buildableUnlockableSets?: BuildableUnlockableSetModel[] | null;
  buildableUnlockableSetsMap?: Record<string, BuildableUnlockableSetModel>;
  items?: ItemModel[] | null;
  itemsMap?: Record<string, ItemModel>;
  placeables?: PlaceableModel[] | null;
  placeablesMap?: Record<string, PlaceableModel>;
  recipes?: RecipeModel[] | null;
  recipesMap?: Record<string, RecipeModel>;
  researchCategories?: ResearchNodeModel[] | null;
  researchCategoriesMap?: Record<string, ResearchNodeModel>;
  npcs?: NpcModel[] | null;
  npcsMap?: Record<string, NpcModel>;
  factions?: FactionModel[] | null;
  factionsMap?: Record<string, FactionModel>;
  contracts?: ContractModel[] | null;
  contractsMap?: Record<string, ContractModel>;
  dialogues?: DialogueModel[] | null;
  dialoguesMap?: Record<string, DialogueModel>;
  journeys?: JourneyModel[] | null;
  journeysMap?: Record<string, JourneyModel>;
  lootContainers?: LootContainerModel[] | null;
  lootContainersMap?: Record<string, LootContainerModel>;
  lootSpawners?: LootSpawnerModel[] | null;
  lootSpawnersMap?: Record<string, LootSpawnerModel>;
  skills?: SkillModel[] | null;
  skillsMap?: Record<string, SkillModel>;
}

export interface GameplayTag {
  tagName?: string;
}

export interface GameplayTagContainer {
  gameplayTags?: GameplayTag[] | null;
  parentTags?: GameplayTag[] | null;
}

export interface GameplayTagDictionaryConverter {
  canRead?: boolean;
  canWrite?: boolean;
}

export type GatherablesBuilder = object;

export type HeatmapsBuilder = object;

export type IBaseAttribute = object;

export type ImageProcessor = object;

export interface IncludeInDetailsAttribute {
  typeId?: any;
}

export type IntPtr = object;

export type ItemCategoryTreeBuilder = object;

export interface ItemDropLocation {
  name?: string;
  mapId?: string;
  /** @format int32 */
  x?: number;
  /** @format int32 */
  y?: number;
  /** @format int32 */
  z?: number;
  /** @format int32 */
  minQuantity?: number;
  /** @format int32 */
  maxQuantity?: number;
  /** @format float */
  probability?: number;
}

export interface ItemModel {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  shortDescription?: string;
  isUnique?: boolean;
  itemTag?: string;
  /** @format int32 */
  tier?: number;
  tierIconPath?: string;
  /** @format int32 */
  lootPool?: number;
  excludeFromLootSystem?: boolean;
  /** @uniqueItems true */
  requiredForRecipe?: RelatedEntity[] | null;
  /** @uniqueItems true */
  requiredForBuilding?: RelatedEntity[] | null;
  /** @uniqueItems true */
  requiredForPlaceable?: RelatedEntity[] | null;
  /** @uniqueItems true */
  requiredForContract?: RelatedEntity[] | null;
  /** @uniqueItems true */
  createdByRecipe?: RelatedEntity[] | null;
  armorStats?: ArmorItemStats;
  weaponStats?: WeaponStats;
  /** @uniqueItems true */
  lootTables?: string[] | null;
  /** @uniqueItems true */
  weightedLootTables?: string[] | null;
  teachesRecipes?: EntityQuantityModel[] | null;
  isDefaultSchematic?: boolean;
  unlocksPlaceables?: RelatedEntity[] | null;
  /** @uniqueItems true */
  soldBy?: RelatedEntity[] | null;
  action?: string;
  infoCard?: string;
  dropLocations?: ItemDropLocation[] | null;
  schematicDropLocations?: ItemDropLocation[] | null;
  heatmaps?: Record<string, string | null>;
}

export type ItemsBuilder = object;

export interface JourneyConditionDataModel {
  entityQuantity?: EntityQuantityModel;
  entity?: RelatedEntity;
  entities?: RelatedEntity[] | null;
  locations?: Record<string, Vector2[] | null>;
  requiredState?: EJourneyNodeEventState;
}

export interface JourneyConditionModel {
  children?: JourneyConditionModel[] | null;
  type?: string;
  compositeConditionType?: ECompositeConditionType;
  data?: JourneyConditionDataModel;
  rawData?: any;
}

export interface JourneyModel {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  children?: JourneyModel[] | null;
  completionCondition?: JourneyConditionModel;
  revealCondition?: JourneyConditionModel;
  itemRewards?: EntityQuantityModel[] | null;
  /** @format int32 */
  depth?: number;
  /** @uniqueItems true */
  relatedEntities?: RelatedEntity[] | null;
  /** @uniqueItems true */
  allResearchNodeRewards?: RelatedEntity[] | null;
  xpRewardTags?: string[] | null;
  /** @format int64 */
  xpReward?: number;
  /** @format int64 */
  totalXpReward?: number;
}

export type JourneysBuilder = object;

export type JsonHelper = object;

export type KeyBuilder = object;

export interface KeyValuePairStringTerrainBlockTemplateSubLevelGroupSettings {
  key?: string;
  value?: TerrainBlockTemplateSubLevelGroupSettings;
}

export type LanguageExtensions = object;

export interface LevelBoundsModel {
  path?: string;
  transform?: SimpleTransform;
}

export type Line = object;

export interface LocalizationAttribute {
  typeId?: any;
  defaultValue?: string;
  localizationKey?: string;
}

export interface LocalizedEntryConverter {
  canRead?: boolean;
  canWrite?: boolean;
}

export interface LocalizedEnumConverter {
  canRead?: boolean;
  canWrite?: boolean;
  /** @deprecated */
  camelCaseText?: boolean;
  namingStrategy?: NamingStrategy;
  allowIntegerValues?: boolean;
}

export interface LootContainerModel {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  /** @format int32 */
  lifeSpanInSeconds?: number;
  /** @format int32 */
  lifeSpanAfterInteractionInSeconds?: number | null;
  lootDistributionSettings?: LootDistributionSettingsRowBase[] | null;
}

export type LootContainersBuilder = object;

export interface LootDistributionSettingsRowBase {
  bIsEnabled?: boolean;
  /** @format int32 */
  priority?: number;
  requiredTags?: GameplayTagContainer;
  forbiddenTags?: GameplayTagContainer;
  lootContainerType?: ELootContainerType;
  lootTable?: SoftObjectProperty;
  lootWeightedTable?: SoftObjectProperty;
  /** @format int32 */
  minimumRespawnTimeInSec?: number;
  /** @format int32 */
  maximumRespawnTimeInSec?: number;
  bOverrideLifespanAfterInteractionIfShared?: boolean;
  lifespanAfterInteractionInSecOverrideIfShared?: FloatRange;
  bOverrideLifespanAfterInteractionIfInstanced?: boolean;
  lifespanAfterInteractionInSecOverrideIfInstanced?: FloatRange;
  containedWater?: FloatRange;
}

export interface LootEntryModel {
  entity?: RelatedEntity;
  /** @format float */
  chance?: number;
  /** @format int32 */
  minRolls?: number;
  /** @format int32 */
  maxRolls?: number;
}

export interface LootSpawnerModel {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  mapId?: string;
  location?: Vector3;
  lootTable?: string;
  lootTier?: string;
  loot?: EntityQuantityRangeModel[] | null;
}

export interface LootStats {
  expectation?: Record<string, number | null>;
  variance?: Record<string, number | null>;
  probability?: Record<string, number | null>;
  minPositive?: Record<string, number | null>;
}

export interface LootTable {
  id?: string;
  entries?: LootTableEntry[] | null;
  items?: EntityQuantityRangeModel[] | null;
}

export interface LootTableEntry {
  itemId?: string;
  itemsQuery?: string;
  /** @uniqueItems true */
  requiredTags?: string[] | null;
  /** @uniqueItems true */
  forbiddenTags?: string[] | null;
  lootTable?: LootTable;
  weightedLootTable?: WeightedLootTable;
  variety?: ELootTableItemVariety;
  itemsQueryMatches?: string[] | null;
  /** @format float */
  percentageChance?: number;
  /** @format int32 */
  numRolls?: number;
}

export interface LootTableEntryBase {
  itemId?: string;
  itemsQuery?: string;
  /** @uniqueItems true */
  requiredTags?: string[] | null;
  /** @uniqueItems true */
  forbiddenTags?: string[] | null;
  lootTable?: LootTable;
  weightedLootTable?: WeightedLootTable;
  variety?: ELootTableItemVariety;
  itemsQueryMatches?: string[] | null;
}

export interface LootTierArea {
  mapId?: string;
  lootTier?: string;
  polygons?: Polygon[] | null;
}

export interface MapMarkerModel {
  path?: string;
  name?: string;
  location?: Vector3;
  iconPath?: string;
  /** @uniqueItems true */
  tags?: string[] | null;
  color?: string;
  levelBounds?: PointF[] | null;
}

export type MapTilesBuilder = object;

export type Mappers = object;

export interface Mat {
  ptr?: IntPtr;
  size?: Size;
  /** @format int32 */
  rows?: number;
  /** @format int32 */
  cols?: number;
  dataPointer?: IntPtr;
  /** @format int32 */
  step?: number;
  /** @format int32 */
  elementSize?: number;
  /** @format int32 */
  width?: number;
  /** @format int32 */
  height?: number;
  sizeOfDimension?: number[] | null;
  isContinuous?: boolean;
  isSubmatrix?: boolean;
  depth?: DepthType;
  isEmpty?: boolean;
  /** @format int32 */
  numberOfChannels?: number;
  total?: IntPtr;
  /** @format int32 */
  dims?: number;
}

export interface MeshModel {
  /** @minLength 1 */
  meshPath: string;
  textures: MeshTextureModel[];
}

export type MeshProcessor = object;

export interface MeshTextureModel {
  slot?: string;
  type?: string;
  path?: string;
  colors?: Record<string, string | null>;
}

export interface MetadataModel {
  type?: string;
  name?: string;
  outer?: string;
  /** @format int32 */
  index?: number;
  class?: string;
  rowStruct?: string;
  path?: string;
}

export interface NamingStrategy {
  processDictionaryKeys?: boolean;
  processExtensionDataNames?: boolean;
  overrideSpecifiedNames?: boolean;
}

export interface NpcModel {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  hostilityType?: EHostilityType;
  sellsItems?: VendorItem[] | null;
  locations?: Record<string, Vector2[] | null>;
  isNamed?: boolean;
  /** @uniqueItems true */
  quests?: RelatedEntity[] | null;
  /** @uniqueItems true */
  contracts?: RelatedEntity[] | null;
}

export interface NpcSpawnerModel {
  mapId?: string;
  location?: SimpleTransform;
  path?: string;
  npcId?: string;
  npc?: RelatedEntity;
}

export type NpcsBuilder = object;

export interface ObjectProperty {
  objectName?: string;
  objectPath?: string;
}

export interface ObjectPropertyDictionaryConverter {
  canRead?: boolean;
  canWrite?: boolean;
}

export interface PlaceableModel {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  faction?: string;
  buildableTier?: string;
  buildableGroup?: string;
  /** @uniqueItems true */
  recipes?: RelatedEntity[] | null;
  ingredients?: EntityQuantityModel[] | null;
  productionTypes?: string[] | null;
  placeableStats?: PlaceableStats;
  /** @uniqueItems true */
  productionTypeIds?: string[] | null;
  /** @uniqueItems true */
  unlockedByPatents?: RelatedEntity[] | null;
  /** @format float */
  maxHealth?: number;
}

export interface PlaceableStats {
  /** @format int32 */
  powerProduction?: number;
  /** @format int32 */
  powerConsumption?: number;
  /** @format int32 */
  inventoryMaxItemCount?: number;
  /** @format float */
  inventoryMaxItemVolume?: number;
  /** @format int32 */
  waterCapacity?: number;
  /** @format float */
  waterGenerationPerSecond?: number;
  /** @format int32 */
  capacity?: number;
  /** @format int32 */
  conversionYield?: number;
  /** @format float */
  conversionRate?: number;
  /** @format float */
  totalConversionTimeInSeconds?: number;
  /** @uniqueItems true */
  supportedFuelTypes?: RelatedEntity[] | null;
  /** @format float */
  maxHealth?: number;
}

export type PlaceablesBuilder = object;

export type Pluralizer = object;

export interface Point {
  isEmpty?: boolean;
  /** @format int32 */
  x?: number;
  /** @format int32 */
  y?: number;
}

export interface PointF {
  isEmpty?: boolean;
  /** @format float */
  x?: number;
  /** @format float */
  y?: number;
}

export interface Polygon {
  points?: Point[] | null;
  /** @format double */
  area?: number;
}

export interface RecipeModel {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  ingredients?: EntityQuantityModel[] | null;
  /** @format int32 */
  waterAmount?: number;
  /** @format float */
  craftingTime?: number;
  outputs?: EntityQuantityModel[] | null;
  requiredProductionTypes?: RelatedEntity[] | null;
  outputItem?: RelatedEntity;
  /** @uniqueItems true */
  toughtBySchematics?: RelatedEntity[] | null;
  /** @format int32 */
  totalIngredientsCount?: number;
  actionName?: string;
  researchCategory?: string;
  researchNode?: RelatedEntity;
}

export type RecipesBuilder = object;

export type ReflectionHelpers = object;

export type RelatedEntity = {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  nodes?: ResearchNodeModel[] | null;
  /** @format int32 */
  intelSpentRequirement?: number;
  entity?: RelatedEntity;
  /** @format int32 */
  intelPointsCost?: number;
  /** @format int32 */
  additionalChargesIntelPointsCost?: number;
  /** @format int32 */
  additionalChargesCount?: number | null;
  /** @format int32 */
  recipeUses?: number | null;
  researchNodeType?: string;
  /** @format int32 */
  tier?: number;
  parents?: string[] | null;
} & {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  tag?: string;
  skillTree?: ESkillTree;
  skillType?: ESkillType;
  /** @format int32 */
  gridX?: number;
  /** @format int32 */
  gridY?: number;
  /** @uniqueItems true */
  preReqs?: string[] | null;
  /** @format int32 */
  maxLevel?: number;
  costPerlevel?: number[] | null;
  attributeBonuses?: SkillAttributeBonusModel[] | null;
  levelRequirements?: string[] | null;
} & {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  ingredients?: EntityQuantityModel[] | null;
  /** @format int32 */
  waterAmount?: number;
  /** @format float */
  craftingTime?: number;
  outputs?: EntityQuantityModel[] | null;
  requiredProductionTypes?: RelatedEntity[] | null;
  outputItem?: RelatedEntity;
  /** @uniqueItems true */
  toughtBySchematics?: RelatedEntity[] | null;
  /** @format int32 */
  totalIngredientsCount?: number;
  actionName?: string;
  researchCategory?: string;
  researchNode?: RelatedEntity;
} & {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  faction?: string;
  buildableTier?: string;
  buildableGroup?: string;
  /** @uniqueItems true */
  recipes?: RelatedEntity[] | null;
  ingredients?: EntityQuantityModel[] | null;
  productionTypes?: string[] | null;
  placeableStats?: PlaceableStats;
  /** @uniqueItems true */
  productionTypeIds?: string[] | null;
  /** @uniqueItems true */
  unlockedByPatents?: RelatedEntity[] | null;
  /** @format float */
  maxHealth?: number;
} & {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  hostilityType?: EHostilityType;
  sellsItems?: VendorItem[] | null;
  locations?: Record<string, Vector2[] | null>;
  isNamed?: boolean;
  /** @uniqueItems true */
  quests?: RelatedEntity[] | null;
  /** @uniqueItems true */
  contracts?: RelatedEntity[] | null;
} & {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  mapId?: string;
  location?: Vector3;
  lootTable?: string;
  lootTier?: string;
  loot?: EntityQuantityRangeModel[] | null;
} & {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  /** @format int32 */
  lifeSpanInSeconds?: number;
  /** @format int32 */
  lifeSpanAfterInteractionInSeconds?: number | null;
  lootDistributionSettings?: LootDistributionSettingsRowBase[] | null;
} & {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  children?: JourneyModel[] | null;
  completionCondition?: JourneyConditionModel;
  revealCondition?: JourneyConditionModel;
  itemRewards?: EntityQuantityModel[] | null;
  /** @format int32 */
  depth?: number;
  /** @uniqueItems true */
  relatedEntities?: RelatedEntity[] | null;
  /** @uniqueItems true */
  allResearchNodeRewards?: RelatedEntity[] | null;
  xpRewardTags?: string[] | null;
  /** @format int64 */
  xpReward?: number;
  /** @format int64 */
  totalXpReward?: number;
} & {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  shortDescription?: string;
  isUnique?: boolean;
  itemTag?: string;
  /** @format int32 */
  tier?: number;
  tierIconPath?: string;
  /** @format int32 */
  lootPool?: number;
  excludeFromLootSystem?: boolean;
  /** @uniqueItems true */
  requiredForRecipe?: RelatedEntity[] | null;
  /** @uniqueItems true */
  requiredForBuilding?: RelatedEntity[] | null;
  /** @uniqueItems true */
  requiredForPlaceable?: RelatedEntity[] | null;
  /** @uniqueItems true */
  requiredForContract?: RelatedEntity[] | null;
  /** @uniqueItems true */
  createdByRecipe?: RelatedEntity[] | null;
  armorStats?: ArmorItemStats;
  weaponStats?: WeaponStats;
  /** @uniqueItems true */
  lootTables?: string[] | null;
  /** @uniqueItems true */
  weightedLootTables?: string[] | null;
  teachesRecipes?: EntityQuantityModel[] | null;
  isDefaultSchematic?: boolean;
  unlocksPlaceables?: RelatedEntity[] | null;
  /** @uniqueItems true */
  soldBy?: RelatedEntity[] | null;
  action?: string;
  infoCard?: string;
  dropLocations?: ItemDropLocation[] | null;
  schematicDropLocations?: ItemDropLocation[] | null;
  heatmaps?: Record<string, string | null>;
} & {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
} & {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  dialogueTree?: TreeNodeDialogueNodeModel[] | null;
} & {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  conditions?: ContractConditionModel[] | null;
  /** @uniqueItems true */
  contractTags?: string[] | null;
  targetNpcs?: RelatedEntity[] | null;
  chainId?: string;
  chainName?: string;
  isChainFinal?: boolean;
  /** @format int32 */
  chainOrder?: number | null;
  chainContracts?: RelatedEntity[] | null;
} & {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  requiresLearning?: boolean;
  groupInTechTree?: boolean;
  buildables?: RelatedEntity[] | null;
};

export type RelatedEntityComparer = object;

export interface RelatedEntityConverter {
  canRead?: boolean;
  canWrite?: boolean;
}

export type RelatedEntityEqualityComparer = object;

export type RelatedEntityExtensions = object;

export interface RelationAttribute {
  typeId?: any;
  entityType?: EntityType;
}

export type RelationExtensions = object;

export interface RepAttachment {
  attachParent?: ObjectProperty;
  locationOffset?: VectorNetQuantize100;
  relativeScale3D?: VectorNetQuantize100;
  rotationOffset?: Rotator;
  attachSocket?: string;
  attachComponent?: ObjectProperty;
}

export interface RepMovement {
  linearVelocity?: Vector;
  angularVelocity?: Vector;
  location?: Vector;
  rotation?: Rotator;
  bSimulatedPhysicSleep?: boolean;
  bRepPhysics?: boolean;
  /** @format int32 */
  serverFrame?: number;
  /** @format int32 */
  serverPhysicsHandle?: number;
  locationQuantizationLevel?: EVectorQuantization;
  velocityQuantizationLevel?: EVectorQuantization;
  rotationQuantizationLevel?: ERotatorQuantization;
}

export type ReplicatorProxy = object;

export interface ResearchNodeModel {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  nodes?: ResearchNodeModel[] | null;
  /** @format int32 */
  intelSpentRequirement?: number;
  entity?: RelatedEntity;
  /** @format int32 */
  intelPointsCost?: number;
  /** @format int32 */
  additionalChargesIntelPointsCost?: number;
  /** @format int32 */
  additionalChargesCount?: number | null;
  /** @format int32 */
  recipeUses?: number | null;
  researchNodeType?: string;
  /** @format int32 */
  tier?: number;
  parents?: string[] | null;
}

export type ResearchNodesBuilder = object;

export type ResponseSerializer = object;

export interface Rotator {
  /** @format double */
  pitch?: number;
  /** @format double */
  yaw?: number;
  /** @format double */
  roll?: number;
}

export interface SearchEntry {
  path?: string;
  name?: string;
  type?: string;
  iconPath?: string;
  additional?: string;
}

export type SearchIndex = object;

export type SimpleCurveExtensions = object;

export type SimpleTransform = object;

export type SiteMapBuilder = object;

export interface Size {
  isEmpty?: boolean;
  /** @format int32 */
  width?: number;
  /** @format int32 */
  height?: number;
}

export interface SkillAttributeBonusModel {
  /** @format int32 */
  level?: number;
  attributeId?: string;
  /** @format float */
  value?: number;
  operation?: EGameplayModOp;
  name?: string;
  isPercentBased?: boolean;
  internalName?: string;
}

export interface SkillModel {
  /** @minLength 1 */
  id: string;
  entityType: EntityType;
  type?: string;
  name?: string;
  iconPath?: string;
  description?: string;
  mainCategoryId?: string;
  subCategoryId?: string;
  isDev?: boolean;
  /** @uniqueItems true */
  filterCategoryIds: string[];
  tag?: string;
  skillTree?: ESkillTree;
  skillType?: ESkillType;
  /** @format int32 */
  gridX?: number;
  /** @format int32 */
  gridY?: number;
  /** @uniqueItems true */
  preReqs?: string[] | null;
  /** @format int32 */
  maxLevel?: number;
  costPerlevel?: number[] | null;
  attributeBonuses?: SkillAttributeBonusModel[] | null;
  levelRequirements?: string[] | null;
}

export type SkillsBuilder = object;

export interface SoftObjectPath {
  assetPath?: TopLevelAssetPath;
  subPathString?: string;
}

export interface SoftObjectProperty {
  assetPathName?: string;
  subPathString?: string;
}

export interface StringDictionaryConverter {
  canRead?: boolean;
  canWrite?: boolean;
}

export interface SummaryContractResolver {
  dynamicCodeGeneration?: boolean;
  defaultMembersSearchFlags?: BindingFlags;
  serializeCompilerGeneratedMembers?: boolean;
  ignoreSerializableInterface?: boolean;
  ignoreSerializableAttribute?: boolean;
  ignoreIsSpecifiedMembers?: boolean;
  ignoreShouldSerializeMembers?: boolean;
  namingStrategy?: NamingStrategy;
}

export interface SummaryInDetailsContractResolver {
  dynamicCodeGeneration?: boolean;
  defaultMembersSearchFlags?: BindingFlags;
  serializeCompilerGeneratedMembers?: boolean;
  ignoreSerializableInterface?: boolean;
  ignoreSerializableAttribute?: boolean;
  ignoreIsSpecifiedMembers?: boolean;
  ignoreShouldSerializeMembers?: boolean;
  namingStrategy?: NamingStrategy;
}

export interface SummaryIncludeAttribute {
  typeId?: any;
}

export type SummaryMapper = object;

export type T0 = object;

export type T1 = object;

export interface TagBehavior {
  /** @uniqueItems true */
  tags?: string[] | null;
  tagQuery?: string;
}

export type TagQueryEvaluator = object;

export interface TerrainBlockTemplateSubLevelContentBlockSettings {
  alias?: string;
  groupsNames?: string[] | null;
  contentBlockActor?: SoftObjectPath;
  bShouldOverrideIsEnabled?: boolean;
  bIsEnabled?: boolean;
  bShouldOverrideTerrainBlockAsset?: boolean;
  terrainBlockAsset?: ObjectProperty;
  bShouldOverrideSubLevelsGroups?: boolean;
  subLevelsGroupsOverride?:
    | TerrainBlockTemplateSubLevelGroupSettingsOverride[]
    | null;
}

export interface TerrainBlockTemplateSubLevelGroupSettings {
  bIsEnabled?: boolean;
}

export interface TerrainBlockTemplateSubLevelGroupSettingsOverride {
  alias?: string;
  groupName?: string;
  bShouldOverrideIsEnabled?: boolean;
  bIsEnabled?: boolean;
}

export interface TopLevelAssetPath {
  packageName?: string;
  assetName?: string;
}

export type TransformExtensions = object;

export interface TreeNode {
  value?: T0;
  children?: TreeNode[] | null;
}

export interface TreeNodeDialogueNodeModel {
  value?: DialogueNodeModel;
  children?: TreeNodeDialogueNodeModel[] | null;
}

export interface UILocalizationsModel {
  languages: Record<string, string | null>;
  homePage: Record<string, string>;
  items: Record<string, string>;
  recipes: Record<string, string>;
  search: Record<string, string>;
  all: Record<string, string>;
}

export type UploadCounter = object;

export type Uploader = object;

export interface Vector {
  /** @format double */
  x?: number;
  /** @format double */
  y?: number;
  /** @format double */
  z?: number;
}

export type Vector2 = object;

export type Vector3 = object;

export interface Vector3Converter {
  canRead?: boolean;
  canWrite?: boolean;
}

export interface VectorNetQuantize100 {
  /** @format double */
  x?: number;
  /** @format double */
  y?: number;
  /** @format double */
  z?: number;
}

export interface VendorItem {
  entity?: RelatedEntity;
}

export interface WeaponModStats {
  damageType?: string;
  /** @format float */
  damage?: number;
  /** @format float */
  shieldDamage?: number;
  /** @format float */
  minRange?: number;
  /** @format float */
  maxRange?: number;
  /** @format float */
  effectiveRange?: number;
  /** @format float */
  fireRate?: number;
  isSemiAuto?: boolean;
  /** @format float */
  reloadTime?: number;
}

export interface WeaponStats {
  ammo?: WeaponModStats;
  barrel?: WeaponModStats;
  frame?: WeaponModStats;
  perk?: WeaponModStats;
  scope?: WeaponModStats;
}

export interface WeightedLootTable {
  id?: string;
  entries?: WeightedLootTableEntry[] | null;
}

export interface WeightedLootTableEntry {
  itemId?: string;
  itemsQuery?: string;
  /** @uniqueItems true */
  requiredTags?: string[] | null;
  /** @uniqueItems true */
  forbiddenTags?: string[] | null;
  lootTable?: LootTable;
  weightedLootTable?: WeightedLootTable;
  variety?: ELootTableItemVariety;
  itemsQueryMatches?: string[] | null;
  /** @format int32 */
  minRolls?: number;
  /** @format int32 */
  maxRolls?: number;
  /** @format float */
  weight?: number;
}

export interface WorldModel {
  id?: string;
  subWorlds?: WorldModel[] | null;
  subLevels?: string[] | null;
  path?: string;
  parent?: WorldModel;
  fTransform?: SimpleTransform;
  actors?: ObjectProperty[] | null;
  boxTransform?: SimpleTransform;
}
