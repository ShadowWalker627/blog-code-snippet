import React, { useMemo, useEffect, useCallback, useRef } from 'react';
import { Table, Form } from 'antd';
import _ from 'lodash';
import useGetColumns, { useGetHeadAllCheckboxStatus } from './columns';
import useFormValueChange from './onFormValueChange';
import { mockTableData, pageIdAuthMap } from './mockData';

function FunctionTable() {
  const [form] = Form.useForm();
  const { onValuesChange, authNamesArr, authConfig } = useFormValueChange(form);

  const { allReadUndefined, allWriteUndefined, allWrite, allRead } =
    useGetHeadAllCheckboxStatus(mockTableData);

  const { columns } = useGetColumns(false, allReadUndefined, allWriteUndefined);

  /**
   * 每次从后端获取数据时处理header的选择
   */
  useEffect(() => {
    form.setFieldsValue({ read_all: allRead });
    form.setFieldsValue({ write_all: allWrite });
  }, [form, allRead, allWrite]);

  const setFormValue = useCallback(
    ({ type, id, parentId, value }) => {
      const parentIdStr = parentId ? `_${parentId}` : '';
      const key = `${type}_${id}${parentIdStr}`;
      form.setFieldsValue({ [`${key}`]: value });
    },
    [form],
  );

  /** 递归给单选框赋值 */
  const recursionRoleFeatureList = useCallback(
    (list) => {
      _.forEach(list, (item) => {
        const { read, edit, add, id, parentId } = item;
        if (_.isBoolean(read)) {
          setFormValue({ type: 'read', id, parentId, value: read });
        }
        if (_.isBoolean(add)) {
          setFormValue({ type: 'add', id, parentId, value: add });
        }
        if (_.isBoolean(edit)) {
          setFormValue({ type: 'edit', id, parentId, value: edit });
        }
        if (!_.isEmpty(item.children)) {
          recursionRoleFeatureList(item.children);
        }
      });
    },
    [setFormValue],
  );

  /**
   * 遍历roleFeatureList 设置值
   */
  useEffect(() => {
    recursionRoleFeatureList(mockTableData);
  }, [recursionRoleFeatureList]);

  const expandedRowKeys = useMemo(
    () => _.map(mockTableData, (item) => item.id),
    [],
  );

  // const initialValue = useRef(form.getFieldsValue());

  // useEffect(() => {
  //   const formChanged = !_.isEqual(initialValue.current, authConfig);
  //   onTableChange(formChanged, authConfig, authNamesArr);
  // }, [authConfig, authNamesArr, initialValue, onTableChange]);

  return (
    <div className="roleContentWrapper">
      <Form form={form} onValuesChange={onValuesChange}>
        <Table
          bordered
          rowKey="id"
          expandable={{ expandedRowKeys }}
          dataSource={mockTableData}
          columns={columns}
          pagination={false}
        />
      </Form>
    </div>
  );
}

export default FunctionTable;
