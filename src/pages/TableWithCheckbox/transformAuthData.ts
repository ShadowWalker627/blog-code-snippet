import _ from 'lodash';

/**
 * 处理第一层的权限
 */
const getAuthOfLevel = (
  { authorityList, id, parentId },
  roleAuth,
  pageIdAuthMap,
) => {
  let read;
  let add;
  let edit;
  let editLabelName = '';
  _.forEach(authorityList, (item) => {
    let authKeyId = '';
    const hasAuth = _.includes(roleAuth, item.id);
    if (item.name === '查看') {
      authKeyId = `read_${id}_${parentId}`;
      read = hasAuth;
    }
    if (item.name === '新建') {
      authKeyId = `add_${id}_${parentId}`;
      add = hasAuth;
    }
    if (item.category === 1) {
      authKeyId = `edit_${id}_${parentId}`;
      edit = hasAuth;
      editLabelName = item.name;
    }
    if (authKeyId) {
      // eslint-disable-next-line no-param-reassign
      pageIdAuthMap[`${authKeyId}`] = item.id;
    }
  });
  return { read, add, edit, editLabelName };
};

/** 将后端数据进行格式化转换 */
const recursionFormatData = (
  authData,
  isParent: boolean,
  roleAuth: string[],
  pageIdAuthMap,
) => {
  // console.log(authData);
  if (_.isEmpty(authData)) {
    return null;
  }
  const newAuthData = _.map(authData, (aData) => {
    const { id, name, childrenPageList, parentId } = aData;
    const { read, add, edit, editLabelName } = getAuthOfLevel(
      aData,
      roleAuth,
      pageIdAuthMap,
    );
    return {
      id,
      name,
      read,
      add,
      edit,
      editLabelName,
      isParent,
      parentId,
      children: recursionFormatData(
        childrenPageList,
        false,
        roleAuth,
        pageIdAuthMap,
      ),
    };
  });
  // console.log(`newAuthData:`, newAuthData);
  return newAuthData;
};

const getFirstLevelChecked = (children) => {
  const childrenRead: boolean[] = [];
  const childrenAdd: boolean[] = [];
  const childrenEdit: boolean[] = [];

  _.forEach(children, (child) => {
    const { read, edit, add } = child;
    if (_.isBoolean(read)) {
      childrenRead.push(read);
    }
    if (_.isBoolean(add)) {
      childrenAdd.push(add);
    }
    if (_.isBoolean(edit)) {
      childrenEdit.push(edit);
    }
  });
  const read = _.size(childrenRead) ? _.every(childrenRead) : undefined;
  const add = _.size(childrenAdd) ? _.every(childrenAdd) : undefined;
  const edit = _.size(childrenEdit) ? _.every(childrenEdit) : undefined;
  return { read, add, edit };
};

const transformAuthData = (authData, roleAuth) => {
  // console.log(`authData:`, authData);
  const pageIdAuthMap = {};
  const tempAuthData = recursionFormatData(
    authData,
    true,
    roleAuth,
    pageIdAuthMap,
  );
  // console.log(`tempAuthData:`, tempAuthData);
  const newAuthData = _.map(tempAuthData, (aData) => ({
    ...aData,
    ...getFirstLevelChecked(aData.children),
  }));
  // console.log(`newAuthData:----`, newAuthData);
  return { authListByRoleId: newAuthData, pageIdAuthMap };
};

export default transformAuthData;
