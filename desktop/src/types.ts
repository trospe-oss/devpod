import { UseMutationResult } from "@tanstack/react-query"

type TMaybe<T> = T | null | undefined
export type TUnsubscribeFn = VoidFunction
export type TComparable<T> = Readonly<{ eq(b: T): boolean }>
export type TIdentifiable = Readonly<{ id: string }>
export type TStreamID = string
export type TDeepNonNullable<T> = {
  [K in keyof T]-?: T[K] extends object ? TDeepNonNullable<T[K]> : Required<NonNullable<T[K]>>
}

//#region Shared
export type TLogOutput = Readonly<{ time: Date; message?: string; level: string }>
export type TQueryResult<TData extends Readonly<object>> = [
  TData | undefined,
  Pick<UseMutationResult, "status" | "error">
]
export type TRunnable<TRunConfig> = Readonly<{ run(config: TRunConfig): void }>
//#endregion

//#region IDE
export type TIDEs = readonly TIDE[]
export type TIDE = Readonly<{
  name: TMaybe<string>
  displayName: string
  default: TMaybe<boolean>
  icon: TMaybe<string>
  experimental: TMaybe<boolean>
}>
//#endregion

//#region Provider
export type TProviderID = string
export type TOptionID = string
export type TWithProviderID = Readonly<{ providerID: TProviderID }>
export type TProviders = Record<TProviderID, TProvider>
export type TProvider = Readonly<{
  config: TMaybe<TProviderConfig>
  default: TMaybe<boolean>
  state: TMaybe<
    Readonly<{
      initialized: TMaybe<boolean>
      singleMachine: TMaybe<boolean>
      creationTimestamp: TMaybe<string>
      options: TMaybe<TProviderOptions>
    }>
  >
}>
export type TNamedProvider = TProvider & Readonly<{ name: string }>
export type TProviderConfig = Readonly<{
  name: TMaybe<string>
  version: TMaybe<string>
  source: TMaybe<TProviderSource>
  description: TMaybe<string>
  optionGroups: TProviderOptionGroup[]
  options: TProviderOptions
  icon: TMaybe<string>
  home: TMaybe<string>
  exec: TMaybe<Record<string, readonly string[]>>
}>
export type TProviderOptionGroup = Readonly<{
  name: TMaybe<string>
  options: TMaybe<string[]>
  defaultVisible: TMaybe<boolean>
}>
export type TProviderSource = Readonly<{
  internal: TMaybe<boolean>
  github: TMaybe<string>
  file: TMaybe<string>
  url: TMaybe<string>
  raw: TMaybe<string>
}>
export type TProviderOptions = Record<string, TProviderOption>
export type TProviderOption = Readonly<{
  // Value is the options current value
  value: TMaybe<string>
  // If value is a password
  password: TMaybe<boolean>
  // A description of the option displayed to the user by a supporting tool.
  description: TMaybe<string>
  // If required is true and the user doesn't supply a value, devpod will ask the user
  required: TMaybe<boolean>
  // Allowed values for this option.
  enum: TMaybe<string[]>
  // Suggestions are suggestions to show in the DevPod UI for this option
  suggestions: TMaybe<string[]>
  // Hidden specifies if the option should be hidden
  hidden: TMaybe<boolean>
  // Local means the variable is not resolved immediately and instead later when the workspace / machine was created.
  local: TMaybe<boolean>
  // Default value if the user omits this option from their configuration.
  default: TMaybe<string>
  // Command is the command to run to specify an option
  command: TMaybe<string>
  // Type is the provider option type. Can be one of: string, duration, number or boolean. Defaults to string
  type: TMaybe<"string" | "duration" | "number" | "boolean">
}>

export type TAddProviderConfig = Readonly<{
  name?: TProviderConfig["name"]
}>
export type TConfigureProviderConfig = Readonly<{
  options: Record<string, unknown>
  useAsDefaultProvider: boolean
  reuseMachine: boolean
}>
export type TProviderManager = Readonly<{
  remove: TRunnable<TWithProviderID> &
    Pick<UseMutationResult, "status" | "error"> & { target: TWithProviderID | undefined }
}>
export type TCheckProviderUpdateResult = Readonly<{
  updateAvailable: boolean
  latestVersion?: string
}>
//#endregion

//#region Workspace
export type TWorkspaceID = NonNullable<TWorkspace["id"]>
export type TWithWorkspaceID = Readonly<{ workspaceID: TWorkspaceID }>
export type TWorkspace = Readonly<{
  id: string
  picture: TMaybe<string>
  provider: TMaybe<Readonly<{ name: TMaybe<string> }>>
  status: TMaybe<"Running" | "Busy" | "Stopped" | "NotFound">
  ide: TMaybe<{
    name: TMaybe<string>
  }>
  creationTimestamp: string
  lastUsed: string
  source: TMaybe<{
    gitRepository: TMaybe<string>
    gitBranch: TMaybe<string>
    localFolder: TMaybe<string>
    image: TMaybe<string>
  }>
}>
export type TWorkspaceWithoutStatus = Omit<TWorkspace, "status"> & Readonly<{ status: null }>
export type TWorkspaceStatusResult = Readonly<{
  id: TMaybe<string>
  context: TMaybe<string>
  provider: TMaybe<string>
  state: TMaybe<TWorkspace["status"]>
}>
export type TWorkspaceStartConfig = Readonly<{
  id: string
  prebuildRepositories?: string[]
  devcontainerPath?: string
  ideConfig?: TWorkspace["ide"]
  providerConfig?: Readonly<{ providerID?: TProviderID }>
  // Instead of starting a workspace just by ID, the sourceConfig starts it with a `source/ID` combination
  sourceConfig?: Readonly<{
    source: string
  }>
}>
export const SUPPORTED_IDES = ["vscode", "intellj"] as const
export type TSupportedIDE = (typeof SUPPORTED_IDES)[number]
//#endregion

//#region Context
export type TContextOptions = Record<TContextOptionName, TContextOption>
// See pkg/config/context.go
export type TContextOptionName = "AGENT_URL"
export type TContextOption = Readonly<{
  name: TContextOptionName
  description: string | null | undefined
  default: string | null | undefined
  enum: readonly string[] | null | undefined
  value: string | null | undefined
}>
//#endregion

export type TDevcontainerSetup = Readonly<{
  isGitRepository: boolean
  isLocal: boolean
  isImage: boolean
  configPaths: string[]
}>
//#region CommunityContributions
export type TCommunityContributions = Readonly<{
  providers: readonly TCommunityProvider[]
}>
export type TCommunityProvider = Readonly<{
  repository: string
}>
//#endregion

export function isWithWorkspaceID(arg: unknown): arg is TWithWorkspaceID {
  return typeof arg === "object" && arg !== null && "workspaceID" in arg
}
