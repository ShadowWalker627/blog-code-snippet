import React, { useMemo, useCallback } from 'react';
import _ from 'lodash';
import { Form, Checkbox } from 'antd';

export enum AuthTableDataIndex {
  Read = 'read',
  Write = 'write',
}

const useGetColumns = (
  disabled: boolean,
  allReadUndefined: boolean,
  allWriteUndefined: boolean,
) => {
  const getNodeName = useCallback(
    (id, parentId, type) =>
      parentId ? `${type}_${id}_${parentId}` : `${type}_${id}`,
    [],
  );

  const readTitle = useMemo(() => {
    if (allReadUndefined) {
      return '读';
    }
    return (
      <Form.Item
        style={{ display: allReadUndefined ? 'none' : 'flex' }}
        name="read_all"
        valuePropName="checked"
      >
        <Checkbox disabled={disabled} data-name="read">
          读
        </Checkbox>
      </Form.Item>
    );
  }, [allReadUndefined, disabled]);

  const writeTitle = useMemo(() => {
    if (allWriteUndefined) {
      return '写';
    }
    return (
      <Form.Item name="write_all" valuePropName="checked">
        <Checkbox disabled={disabled} data-name="write">
          写
        </Checkbox>
      </Form.Item>
    );
  }, [allWriteUndefined, disabled]);

  const columns = [
    {
      title: '功能名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: readTitle,
      dataIndex: AuthTableDataIndex.Read,
      key: AuthTableDataIndex.Read,
      render: (text, record) => {
        if (!_.isBoolean(text)) {
          return null;
        }
        const name = getNodeName(record.id, record.parentId, 'read');
        const initialValue = text;

        return (
          <Form.Item
            name={name}
            valuePropName="checked"
            initialValue={initialValue}
          >
            <Checkbox disabled={disabled} />
          </Form.Item>
        );
      },
    },
    {
      title: writeTitle,
      dataIndex: AuthTableDataIndex.Write,
      key: AuthTableDataIndex.Write,
      render: (text, record) => {
        const newName = getNodeName(record.id, record.parentId, 'add');
        const editName = getNodeName(record.id, record.parentId, 'edit');
        const initialAddValue = record.add;
        const initialEditValue = record.edit;
        let addCheck = (
          <Form.Item
            name={newName}
            valuePropName="checked"
            initialValue={initialAddValue}
          >
            <Checkbox disabled={disabled}>新建</Checkbox>
          </Form.Item>
        );
        let editCheck = (
          <Form.Item
            name={editName}
            valuePropName="checked"
            initialValue={initialEditValue}
          >
            <Checkbox disabled={disabled}>
              {record.editLabelName || '编辑'}
            </Checkbox>
          </Form.Item>
        );
        if (!_.isBoolean(initialAddValue)) {
          addCheck = <></>;
        }

        if (!_.isBoolean(initialEditValue)) {
          editCheck = <></>;
        }

        return (
          <>
            {addCheck}
            {editCheck}
          </>
        );
      },
    },
  ];

  return { columns };
};

export default useGetColumns;

export const useGetHeadAllCheckboxStatus = (roleFeatureList) => {
  const firstLevelRead = useMemo(
    () => _.map(roleFeatureList, (item) => item.read),
    [],
  );

  const allRead = useMemo(
    () => !_.isEmpty(firstLevelRead) && _.every(firstLevelRead),
    [firstLevelRead],
  );
  const allReadUndefined = useMemo(
    () => _.every(firstLevelRead, (read) => _.isNil(read)),
    [firstLevelRead],
  );
  const allAdd = useMemo(() => _.map(roleFeatureList, (item) => item.add), []);
  const allEdit = useMemo(
    () => _.map(roleFeatureList, (item) => item.edit),
    [],
  );
  const allWrite = useMemo(
    () => _.every(_.concat(allAdd, allEdit)),
    [allAdd, allEdit],
  );

  const allAddUndefined = useMemo(
    () => _.every(allAdd, (add) => _.isNil(add)),
    [allAdd],
  );
  const allEditUndefined = useMemo(
    () => _.every(allEdit, (add) => _.isNil(add)),
    [allEdit],
  );
  const allWriteUndefined = useMemo(
    () => allAddUndefined && allEditUndefined,
    [allAddUndefined, allEditUndefined],
  );
  return {
    /** 不显示读全选 */
    allReadUndefined,
    /** 不显示写全选 */
    allWriteUndefined,
    /** 写全选 */
    allWrite,
    /** 读全选 */
    allRead,
  };
};
