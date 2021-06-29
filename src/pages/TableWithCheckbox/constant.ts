/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TODO, RoleMenu, RoleMenuItem, RoleAuthConfigParams } from './types';

/* Modal配置 */
export const LAYOUT = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

/* 角色管理模块初始化数据 */
export const initialRoleModule = {
  roleMenuList: [],
  roleFeatureList: [],
  roleFeatureListSaved: false,
  currentRoleMenuItem: {},
};

export const initialRoleState = {
  roleMenuList: [] as RoleMenu[],
  roleFeatureListSaved: false,
  defaultRole: { name: '', title: null, id: 0 } as RoleMenuItem,
  currentRole: { name: '', title: null, id: 0 } as RoleMenuItem,
  fetchRoleMenuList: () => {},
  fetchRoleFeatureList: (args: RoleAuthConfigParams) => {},
  setRoleFeatureListSaved: (saved: boolean) => {},
  setCurrentRole: (role: RoleMenuItem) => {},
  setDefaultRole: (role: RoleMenuItem) => {},
  setRoleMenuList: (list: RoleMenu[]) => {},
  authConfig: [],
  setAuthConfig: (list: TODO) => {},
};

export const CreateBtnStyle = {
  color: '#4067CF',
  border: '1px solid #4067CF',
};

export enum CONSTANTS {
  UNSET_TITLE = '未分配',
  CREATE_ROLE = '新建角色',
  CREATE_ROLE_SUCCESS = '添加成功！',
  CREATE_ROLE_FAILED = '添加失败，请重试',
  EDIT_ROLE = '编辑角色',
  EDIT_ROLE_SUCCESS = '编辑角色成功',
  EDIT_ROLE_FAILED = '编辑角色失败，请重试',
  COPY_ROLE = '复制角色',
  COPY_ROLE_SUCCESS = '复制角色成功',
  COPY_ROLE_FAILED = '复制角色失败，请重试',
  DELETE_ROLE_SUCCESS = '删除成功',
  DELETE_ROLE_FAILED = '当前角色已有分配用户，删除失败！',
  CHECKOUT_TITLE = '当前角色变更未保存',
  SAVE_TIP = '提示：修改保存后才可生效！',
  SAVE_SUCCESS_TIP = '保存成功！',
  SAVE_FAILED_TIP = '保存失败，请重试',
  UNSAVED_TIP = '请确认是否保存',
  INPUT_ROLE_NAME = '请输入角色名称',
  DUPLICATE_ROLE_NAME = '角色名称已存在',
  OVERLONG_ROLE_NAME = '角色名称不能超过20个字',
  OVERLONG_ROLE_TITLE = '角色标签不能超过20个字',
  TAB_CHANGE_TIP = '确定要离开吗？',
  TAB_CHANGE_TITLE = '当前变更未保存',
}

export const MenuItemStyle = {
  maxWidth: '120px',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
};
