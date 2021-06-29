import React, { useCallback, useMemo } from 'react';
import { Tabs, Button } from 'antd';
import _ from 'lodash';
import FunctionTable from './FunctionTable';
import { CONSTANTS } from './constant';
import { AuthConfigStyled } from './styles';

const { TabPane } = Tabs;

interface Props {
  onAuthTableChange: (formChanged: boolean, authConfig, authNamesArr) => void;
  /** 禁用 */
  disabled?: boolean;
  /** 只读是不显示保存按钮 */
  readonly?: boolean;
  roleId: number;
  onSave?: () => void;
}

function AuthConfig(): JSX.Element {
  const OnTabChange = useCallback((tabKey) => {
    console.log(tabKey);
  }, []);

  // /**
  //  * 表格是否有操作
  //  */
  // const onAuthTableChangeFunc = useCallback(
  //   (formChanged, authConfig, authNamesArr) => {
  //     onAuthTableChange(formChanged, authConfig, authNamesArr);
  //   },
  //   [onAuthTableChange],
  // );

  const AllTabs = useMemo(
    () => [
      {
        name: '功能',
        value: 'function',
        content: FunctionTable,
      },
    ],
    [],
  );

  return (
    <AuthConfigStyled className="authConfigContent">
      {/* TODO: Converting circular structure to JSON */}
      <FunctionTable />
    </AuthConfigStyled>
  );
}

export default AuthConfig;
