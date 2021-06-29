import { useContext, useState, useEffect } from 'react';
import _ from 'lodash';
import { FormInstance } from 'antd';
import { mockTableData, pageIdAuthMap } from './mockData';

export enum TableCheckType {
  Read = 'read',
  ReadAll = 'read_all',
  Write = 'write',
  WriteAll = 'write_all',
  Add = 'add',
  Edit = 'edit',
}

const roleFeatureList = mockTableData;

const useFormValueChange = (form: FormInstance) => {
  const [authConfig, setAuthConfig] = useState({});
  const [authNamesArr, setAuthNamesArr] = useState([] as string[]);

  let tempLevelInfo = { id: '', children: [], parentId: '' };
  /**
   * 根据节点id，获取节点信息
   * @param id
   * @param treeData
   * @returns
   */
  const getLevelInfoById = (id, treeData = roleFeatureList) => {
    for (let i = 0; i < _.size(treeData); i += 1) {
      const itemInfo = _.nth(treeData, i);
      if (!_.isEmpty(itemInfo)) {
        if (itemInfo.id === id) {
          tempLevelInfo = itemInfo;
        }
        if (!_.isEmpty(itemInfo.children)) {
          tempLevelInfo = getLevelInfoById(id, itemInfo.children);
        }
      }
    }
    return tempLevelInfo;
  };

  /**
   * 根据 type id parentId 拼接获取节点id
   * 通过form得到 选中值
   */
  const getValueOfNode = ({ type, id, parentId }) => {
    const key = parentId ? `${type}_${id}_${parentId}` : `${type}_${id}`;

    return form.getFieldValue(key);
  };

  /**
   * 通过form修改checkbox
   */
  const setValue = ({ type, id, parentId, value, isAll = false }) => {
    let key = parentId ? `${type}_${id}_${parentId}` : `${type}_${id}`;
    if (isAll) {
      key = id;
    }
    form.setFieldsValue({ [`${key}`]: value });
  };

  /**
   * 获取第一层节点选中情况
   */
  const getLevel1Values = ({ type, id }) => {
    const allLevel1Auth: string[] = [];
    if (type === TableCheckType.Read) {
      _.forEach(roleFeatureList, (item) => {
        const auth = getValueOfNode({ type, id: item.id, parentId: '' });
        allLevel1Auth.push(auth);
      });
    }
    if ([TableCheckType.Add, TableCheckType.Edit].includes(type)) {
      _.forEach(roleFeatureList, (item) => {
        const authAdd = getValueOfNode({
          type: TableCheckType.Add,
          id: item.id,
          parentId: '',
        });
        const authEdit = getValueOfNode({
          type: TableCheckType.Edit,
          id: item.id,
          parentId: '',
        });
        allLevel1Auth.push(authAdd);
        allLevel1Auth.push(authEdit);
      });
    }

    return _.every(allLevel1Auth.filter((auth) => _.isBoolean(auth)));
  };

  /**
   * 操作第一层，影响header
   */
  const firstLevelEffectHeader = ({ type, id, parentId, value }) => {
    switch (type) {
      case TableCheckType.Read: {
        const otherLevel1Auth = getLevel1Values({ type, id });
        setValue({
          type,
          id: TableCheckType.ReadAll,
          parentId: '',
          value: otherLevel1Auth && value,
          isAll: true,
        });
        break;
      }
      case TableCheckType.Add:
      case TableCheckType.Edit: {
        const otherLevel1Auth = getLevel1Values({ type, id });
        // console.log(otherLevel1Auth);
        setValue({
          type,
          id: TableCheckType.WriteAll,
          parentId: '',
          value: otherLevel1Auth && value,
          isAll: true,
        });
        break;
      }
      default:
        break;
    }
  };

  /** 递归设置子节点的值 */
  const recursionSetChildValue = ({ type, value }, children) => {
    _.forEach(children, (child) => {
      if (_.isBoolean(child[type])) {
        setValue({
          type,
          id: child.id,
          parentId: child.parentId,
          value,
        });
      }
      if (!_.isEmpty(child.children)) {
        recursionSetChildValue({ type, value }, child.children);
      }
    });
  };

  /**
   * 递归设置父节点
   * @param param0
   */
  const recursionSetParentValue = ({ type, id, parentId, value }) => {
    // 父节点信息
    const parentInfo = getLevelInfoById(parentId);
    // 该节点其他兄弟节点
    const siblingNodes = _.filter(
      parentInfo.children,
      (child) => child.id !== id && _.isBoolean(child[type]),
    );
    // 该节点其他兄弟节点的值
    const siblingNodeValues = _.map(siblingNodes, (node) =>
      getValueOfNode({ type, id: node.id, parentId: node.parentId }),
    );
    // 得到父节点值
    const parentValue = value && _.every(siblingNodeValues);
    // 设置父节点的值
    setValue({
      type,
      id: parentId,
      parentId: parentInfo.parentId,
      value: parentValue,
    });
    if (parentInfo.parentId) {
      // 向上处理当前节点的父节点的父节点
      recursionSetParentValue({
        type,
        id: parentId,
        parentId: parentInfo.parentId,
        value: parentValue,
      });
    } else {
      // 当前节点的父节点是第一层节点，那就直接处理表格header的节点
      firstLevelEffectHeader({
        type,
        id: parentId,
        parentId: '',
        value: parentValue,
      });
    }
  };

  /**
   * 改变表单头部
   * 此时只要向下处理所有子节点
   */
  const onHeaderAllChange = ({ type, id, parentId, value }) => {
    switch (type) {
      case TableCheckType.Write:
        recursionSetChildValue(
          { type: TableCheckType.Add, value },
          roleFeatureList,
        );
        recursionSetChildValue(
          { type: TableCheckType.Edit, value },
          roleFeatureList,
        );
        break;
      case TableCheckType.Read:
        recursionSetChildValue({ type, value }, roleFeatureList);
        break;
      default:
        break;
    }
  };

  /**
   * 改变的是第一层节点
   *
   */
  const onFirstLevelChange = ({ type, id, parentId, value }) => {
    const levelInfo = getLevelInfoById(id);
    // 向下处理子节点
    recursionSetChildValue({ type, value }, levelInfo.children);

    // 往上处理表头
    firstLevelEffectHeader({ type, id, parentId, value });
  };

  /**
   * 改变的是中间节点，既有父节点也有子节点
   * @param param0
   */
  const onMiddleLevelChange = ({ type, id, parentId, value }, levelInfo) => {
    // 处理子节点
    recursionSetChildValue({ type, value }, levelInfo.children);

    // 向上冒泡
    recursionSetParentValue({ type, id, parentId, value });
  };

  const getAuthNames = (config) => {
    const authNames: string[] = [];
    _.forIn(config, (checked, authId) => {
      const authKey = pageIdAuthMap[`${authId}`];
      if (checked && authKey) {
        authNames.push(authKey);
      }
    });
    return authNames;
  };

  /**
   * 表单 变动
   * @param changedValues
   * @param allValues
   *
   * type: TableCheckType
   * id: 当前节点id
   * parentId：节点的父节点id
   * value: 节点是否选中 boolean
   */
  const onValuesChange = (changedValues, allValues) => {
    const curFullId = _.head(_.keys(changedValues));
    const [type, id, parentId] = _.split(curFullId, '_');
    const value = _.head(_.values(changedValues));
    const chgedNodeInfo = {
      type,
      id: _.toNumber(id),
      parentId: _.toNumber(parentId),
      value,
    };

    const levelInfo = getLevelInfoById(_.toNumber(id)); // 获取到当前层的节点信息
    // 是表头全选框
    const isHeaderAll = curFullId.includes('all');
    if (isHeaderAll) {
      onHeaderAllChange(chgedNodeInfo);
    }

    // 第一层节点
    const isFirstLevel = _.isNil(parentId) && !_.isEmpty(levelInfo?.children);
    if (isFirstLevel) {
      onFirstLevelChange(chgedNodeInfo);
    }

    // 既是子节点也是父节点 这种要是多层情况下出现
    const hasParentAndChildren = parentId && !_.isEmpty(levelInfo?.children);
    if (hasParentAndChildren) {
      onMiddleLevelChange(chgedNodeInfo, levelInfo);
    }

    // 是叶子节点
    const isLeaf = parentId && _.isEmpty(levelInfo?.children);
    if (isLeaf) {
      recursionSetParentValue(chgedNodeInfo);
    }

    const config = form.getFieldsValue();
    const authNames = getAuthNames(config);
    setAuthConfig(config);
    setAuthNamesArr(authNames);
  };

  return { onValuesChange, authConfig, authNamesArr };
};

export default useFormValueChange;
