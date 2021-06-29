import styled from 'styled-components';

export const AuthConfigStyled = styled.div`
  flex: 1;
  overflow: auto;
  padding-bottom: 20px;
  .roleContentWrapper {
    max-height: 620px;
    overflow: auto;
    .ant-input-search {
      margin-bottom: 17px;
    }
    .ant-btn {
      height: 32px;
      width: 48px;
    }
  }
  .ant-form-item {
    margin-bottom: 0;
    .ant-form-item-control-input {
      height: 26px;
      line-height: 26px;
      min-height: 26px;
    }
  }
  .ant-checkbox-disabled.ant-checkbox-checked .ant-checkbox-inner::after {
    border-color: ${(props) => props.theme.colorE5E};
  }
  div.ant-table.ant-table-empty .ant-table-tbody > tr > td:last-child {
    display: table-cell !important;
  }
  div.ant-table .ant-table-tbody > tr > td:last-child {
    display: flex;
  }
  .ant-table .ant-table-tbody > tr > td {
    height: 27px;
    line-height: 26px;
    border-bottom: 1px solid ${(props) => props.theme.colorE1};
    padding: 0 4px;
  }
  .ant-form label {
    font-size: 12px;
  }
  .ant-table .ant-table-tbody > tr.ant-table-row:nth-of-type(even) {
    background-color: #f5f8ff;
  }
  .ant-table-thead > tr > th {
    width: 350px;
    border-right: 1px solid rgba(81, 128, 255, 0.15);
    padding: 0 4px;
  }
  .ant-table .ant-table-tbody > tr > td:first-child {
    border-left: 1px solid rgba(81, 128, 255, 0.15);
    border-bottom: 1px solid ${(props) => props.theme.colorE1};
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${(props) => props.theme.color497};
  }
  .ant-tabs-ink-bar {
    background: ${(props) => props.theme.color497};
  }
  .roleSearch {
    width: 360px;
    background-color: ${(props) => props.theme.colorWhite};
    border-color: ${(props) => props.theme.colorE9};
    border-radius: 4px;
    margin-bottom: 16px;
    .ant-input-affix-wrapper {
      padding: 2px 12px;
    }
    .ant-input-search-button {
      padding: 0;
    }
  }
  .roleSave {
    font-size: 14px;
    color: ${(props) => props.theme.font333};
    float: right;
    margin-top: 16px;
    position: sticky;
    .ant-btn {
      background: ${(props) => props.theme.color406};
      border-radius: 4px;
      color: ${(props) => props.theme.colorWhite};
    }
  }
`;

export const SelectStyle = styled.div`
  .ant-select-selector {
    height: 32px !important;
    border-radius: 2px !important;
  }
`;
