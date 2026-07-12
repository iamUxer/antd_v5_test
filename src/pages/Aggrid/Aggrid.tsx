import { useCallback, useMemo, useState, type CSSProperties } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Input, Select } from 'antd';
import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
  type ICellRendererParams,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './Aggrid.scss';

ModuleRegistry.registerModules([AllCommunityModule]);

type GridRow = {
  id: string;
  headRowMerge?: string;
  headMain: string;
  headSub: string;
  h2?: string;
  h3?: string;
  h4?: string;
  h5?: string;
};

type EditableField = 'h2' | 'h3' | 'h4' | 'h5';

const isFullHeadRow = (data?: GridRow) => !data?.headRowMerge && !data?.headSub;
const headMainCellClassRules = {
  'aggrid-head-wide': ({ data }: { data?: GridRow }) => isFullHeadRow(data),
};
const headSubCellClassRules = {
  'aggrid-head-sub-hidden': ({ data }: { data?: GridRow }) => isFullHeadRow(data),
};

const defaultColDef: ColDef<GridRow> = {
  sortable: false,
  filter: false,
  resizable: false,
  suppressMovable: true,
  wrapText: true,
  autoHeight: true,
};

const initialRowData: GridRow[] = [
  {
    id: 'row-1',
    headRowMerge: 'block-1',
    headMain: 'H1-1',
    headSub: 'H1-1a',
    h2: 'H2-1a',
    h3: 'H3-1a',
    h4: 'H4-1a',
    h5: 'H5-1a',
  },
  {
    id: 'row-2',
    headRowMerge: 'block-1',
    headMain: '',
    headSub: 'H1-1b',
    h2: 'H2-1b',
    h3: 'H3-1b',
    h4: 'H4-1b',
    h5: 'H5-1b',
  },
  {
    id: 'row-3',
    headRowMerge: 'block-1',
    headMain: '',
    headSub: 'H1-1c',
    h2: 'H2-1c',
    h3: 'H3-1c',
    h4: 'H4-1c',
    h5: 'H5-1c',
  },
  {
    id: 'row-4',
    headMain: 'H1-2',
    headSub: '',
    h2: 'H2-2',
    h3: 'H3-2',
    h4: 'H4-2',
    h5: 'H5-2',
  },
  {
    id: 'row-5',
    headMain: 'H1-3',
    headSub: '',
    h2: 'H2-3',
    h3: 'H3-3',
    h4: 'H4-3',
    h5: 'H5-3',
  },
  {
    id: 'row-6',
    headMain: 'H1-4',
    headSub: '',
    h2: 'H2-4',
    h3: 'H3-4',
    h4: 'H4-4',
    h5: 'H5-4',
  },
];

type AggridProps = {
  headMainWidth?: number;
  headSubWidth?: number;
  headBgColor?: string;
  height?: number;
};

export function Aggrid({
  headMainWidth = 90,
  headSubWidth = 90,
  height = 360,
}: AggridProps) {
  const [rows, setRows] = useState<GridRow[]>(initialRowData);

  const updateCell = useCallback(
    (rowId: string, field: EditableField, value: string) => {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === rowId
            ? {
                ...row,
                [field]: value,
              }
            : row,
        ),
      );
    },
    [],
  );

  const renderTextField = useCallback(
    (field: 'h2' | 'h4') =>
      (params: ICellRendererParams<GridRow, string>) => {
        const row = params.data;
        if (!row) return null;

        return (
          <Input
            className="aggrid-editor-input"
            value={row[field] ?? ''}
            onChange={(event) => updateCell(row.id, field, event.target.value)}
          />
        );
      },
    [updateCell],
  );

  const renderSelectField = useCallback(
    (field: 'h3' | 'h5') =>
      (params: ICellRendererParams<GridRow, string>) => {
        const row = params.data;
        if (!row) return null;

        const baseOptions = ['Option A', 'Option B', 'Option C'];
        const currentValue = row[field] ?? '';
        const options = baseOptions.includes(currentValue)
          ? baseOptions
          : currentValue
            ? [currentValue, ...baseOptions]
            : baseOptions;

        return (
          <Select
            className="aggrid-editor-select"
            value={currentValue}
            options={options.map((option) => ({ label: option, value: option }))}
            onChange={(value) => updateCell(row.id, field, value)}
            getPopupContainer={(triggerNode) => triggerNode.parentElement ?? document.body}
          >
          </Select>
        );
      },
    [updateCell],
  );

  const columnDefs: ColDef<GridRow>[] = useMemo(
    () => [
      {
        field: 'headMain',
        headerName: 'H1',
        width: headMainWidth,
        cellClassRules: headMainCellClassRules,
        spanRows: ({ nodeA, nodeB }) => {
          const groupA = nodeA?.data?.headRowMerge;
          const groupB = nodeB?.data?.headRowMerge;
          return !!groupA && groupA === groupB;
        },
        pinned: 'left',
      },
      {
        field: 'headSub',
        headerName: '',
        width: headSubWidth,
        cellClassRules: headSubCellClassRules,
        pinned: 'left',
      },
      { field: 'h2', headerName: 'H2', flex: 1, cellRenderer: renderTextField('h2') },
      { field: 'h3', headerName: 'H3', flex: 1, cellRenderer: renderSelectField('h3') },
      { field: 'h4', headerName: 'H4', flex: 1, cellRenderer: renderTextField('h4') },
      { field: 'h5', headerName: 'H5', flex: 1, cellRenderer: renderSelectField('h5') },
    ],
    [headMainWidth, headSubWidth, renderSelectField, renderTextField],
  );

  const containerStyle: CSSProperties & Record<string, string | number> = {
    height,
    '--head-main-width': `${headMainWidth}px`,
  };

  return (
    <div className="aggrid-custom-header" style={containerStyle}>
      <AgGridReact<GridRow>
        rowData={rows}
        columnDefs={columnDefs}
        enableCellSpan
        defaultColDef={defaultColDef}
        getRowId={({ data }) => data.id}
      />
    </div>
  );
}
