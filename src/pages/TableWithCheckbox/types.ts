export interface RoleMenu {
  name: string;
  title: string | null;
  children?: RoleMenuItem[];
}
export interface RoleMenuItem {
  id: number; // roleId
  name: string; // roleName
  title: string | null; // roleTitle
}
export interface Values {
  title: string;
  description: string;
  modifier: string;
}
export interface RoleOptions {
  key: string;
  value: string;
}

export interface CollectionCreateFormProps {
  visible: boolean;
  title: string;
  roleData: RoleMenuItem;
  onConfirm: (
    values: RoleMenuItem,
    type: string,
    roleData: RoleMenuItem,
  ) => void;
  onCancel: () => void;
  roleOptions: RoleOptions[];
}

export interface CollectionConfirmFormProps {
  visible: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  content: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TODO = any;

export interface CreateRoleProviderProps {
  children: React.ReactElement[];
}
// 查询所有角色
export interface QueryRoleRequest {
  keyWord: string;
}
export interface QueryRoleResponse {
  code?: number;
  data?: TODO;
  dataList: RoleMenuItem[];
  message: string;
  success: boolean;
  total: number;
}

// 创建角色
export interface CreateRoleRequest {
  role: CreateRoleParams;
}
export interface CreateRoleParams {
  name: string;
  title: string | null;
  status: number;
}

export interface ResponseData {
  id: number;
  name: string;
  title: string;
  description: string;
  status: number;
  createTime: string;
  updateTime: string;
  authorizeDepartmentList: string;
  authorizeUserList: string;
  copyFrom: string;
}

export interface CreateRoleResponse {
  code?: number;
  data: ResponseData;
  dataList?: RoleMenuItem[];
  message: string;
  success: boolean;
  total?: number;
}
// 更新角色
export interface UpdateRoleRequest {
  role: string;
}
export interface UpdateRoleParams {
  id: number;
  title: string | null;
  name: string;
  status: number;
  copyFrom?: number;
}
export interface UpdateRoleResponse {
  code?: number;
  data?: TODO;
  dataList: RoleMenuItem[];
  message: string;
  success: boolean;
  total: number;
}
export interface CopyRoleParams {
  id?: number;
  title: string | null;
  name: string;
  status: number;
  copyFrom: number;
}
export interface CopyRoleResponse {
  code?: number;
  data?: TODO;
  dataList: RoleMenuItem[];
  message: string;
  success: boolean;
  total: number;
}
// 修改授权
export interface ModifyRoleAuthRequest {
  authorizeList: ModifyRoleAuthParams;
}
export interface ModifyRoleAuthParams {
  authorizeDepartmentList: number[];
  authorizeUserList: string[];
  id: number;
}
export interface ModifyRoleAuthResponse {
  code?: number;
  data?: TODO;
  dataList: RoleMenuItem[];
  message: string;
  success: boolean;
  total: number;
}
// 增加授权
export interface AddRoleAuthRequest {
  roleAuthorize: RoleAuthorizeParams;
}
export interface RoleAuthorizeParams {
  departmentId: number;
  startTime: string;
  endTime: string;
  id: number;
  roleId: number;
  userId: string;
}
export interface AddRoleAuthResponse {
  code?: number;
  data?: TODO;
  dataList: RoleMenuItem[];
  message: string;
  success: boolean;
  total: number;
}
// 修改授权配置
export interface ModifyRoleAuthConfigRequest {
  roleAuthorize: ModifyRoleAuthConfigParams;
}
export interface ModifyRoleAuthConfigParams {
  departmentId: number;
  endTime: string;
  id: number;
  roleId: number;
  startTime: string;
  userId: string;
}
export interface ModifyRoleAuthConfigResponse {
  code?: number;
  data?: TODO;
  dataList: RoleMenuItem[];
  message: string;
  success: boolean;
  total: number;
}
// name查重
export interface RoleIsNameUniqueRequest {
  id: number; // 角色id，不传表示新增角色
  name: string; // 角色姓名
}
export interface RoleIsNameUniqueResponse {
  code?: number;
  data?: TODO;
  dataList: RoleMenuItem[];
  message: string;
  success: boolean;
  total: number;
}
// 批量查询角色下的用户
export interface QueryRoleGroupRequest {
  roleIdList: number[];
}
export interface QueryRoleGroupResponse {
  code?: number;
  data?: TODO;
  dataList: RoleMenuItem[];
  message: string;
  success: boolean;
  total: number;
}
// 查询所有标签
export interface QueryRoleTitleRequest {
  keyWord: string;
}
export interface QueryRoleTitleResponse {
  code?: number;
  data?: TODO;
  dataList: RoleMenuItem[];
  message: string;
  success: boolean;
  total: number;
}
// 删除角色
export interface DeleteRoleRequest {
  roleId: number;
}
export interface DeleteRoleResponse {
  code?: number;
  data?: TODO;
  dataList: RoleMenuItem[];
  message: string;
  success: boolean;
  total: number;
}
// 查询角色by id
export interface QueryRoleByIdRequest {
  roleId: number;
}
export interface QueryRoleByIdResponse {
  code?: number;
  data?: TODO;
  dataList: RoleMenuItem[];
  message: string;
  success: boolean;
  total: number;
}
// 查询权限列表
export interface QueryAuthorityPageRequest {
  keyword?: string;
}

export interface AuthorityIdList {
  id: string;
  name: string;
  type: null;
  pageId: null;
  category: number;
}

/** 权限列表后端数据 */
export interface BackendPageAuthItem {
  id: string;
  name: string;
  parentId: string | null;
  childrenPageList: BackendPageAuthItem[] | null;
  authorityList: AuthorityIdList[];
}

export interface QueryAuthorityPageResponse {
  code?: number;
  data?: TODO;
  dataList: BackendPageAuthItem[];
  message: string;
  success: boolean;
  total: number;
}

export interface PageAuth {
  id: string;
  // key: string,
  name: string;
  read: boolean;
  add: boolean;
  edit: boolean;
  childrenIds?: string[];
}

/** 权限列表前端结构 */
export interface PageAuthItem extends PageAuth {
  isParent: boolean;
  children: PageAuth[];
}

export interface AuthInfoFromBackend {
  /** 所有的第一层级的id */
  AllLevel1Ids: string[];
  /** 所有的层级的id */
  AllLevelIds: string[];
}

export interface RoleAuthConfigParams {
  keyword?: string;
  roleId: number;
}

export interface PageIdAuthMap {
  [index: string]: string;
}
export interface AuthConfigInitialState {
  roleFeatureList: PageAuthItem[];
  fetchRoleFeatureList: (params: RoleAuthConfigParams) => void;
  loading: boolean;
  pageIdAuthMap: PageIdAuthMap;
}

export interface UpdateRoleFeatureParams {
  authorityIdList: string[]; // 权限码列表
  roleId: number; // 角色id
}
