import { AgGridReact } from 'ag-grid-react';
import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './Aggrid.scss';

ModuleRegistry.registerModules([AllCommunityModule]);

type GridRow = {
  headRowMerge?: string;
  headMain: string;
  headSub: string;
  h2?: string;
  h3?: string;
  h4?: string;
  h5?: string;
};

const isFullHeadRow = (data?: GridRow) => !data?.headRowMerge && !data?.headSub;

const defaultColDef: ColDef<GridRow> = {
  sortable: false,
  filter: false,
  resizable: false,
  suppressMovable: true,
  wrapText: true,
  autoHeight: true,
};

const columnDefs: ColDef<GridRow>[] = [
  {
    field: 'headMain',
    headerName: 'H1',
    width: 90,
    cellClassRules: { 'aggrid-head-wide': ({ data }) => isFullHeadRow(data) },
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
    width: 90,
    cellClassRules: {
      'aggrid-head-sub-hidden': ({ data }) => isFullHeadRow(data),
    },
    pinned: 'left',
  },
  { field: 'h2', headerName: 'H2', flex: 1, minWidth: 160 },
  { field: 'h3', headerName: 'H3', flex: 1, minWidth: 160 },
  { field: 'h4', headerName: 'H4', flex: 1, minWidth: 160 },
  { field: 'h5', headerName: 'H5', flex: 1, minWidth: 160 },
];

const rowData: GridRow[] = [
  {
    headRowMerge: 'block-1',
    headMain: 'H1-1',
    headSub: 'H1-1a',
    h2: 'H2-1a',
    h3: 'H3-1a',
    h4: 'H4-1a',
    h5: 'H5-1a',
  },
  {
    headRowMerge: 'block-1',
    headMain: '',
    headSub: 'H1-1b',
    h2: 'H2-1b',
    h3: 'H3-1b',
    h4: 'H4-1b',
    h5: 'H5-1b',
  },
  {
    headRowMerge: 'block-1',
    headMain: '',
    headSub: 'H1-1c',
    h2: 'H2-1c',
    h3: 'H3-1c',
    h4: 'H4-1c',
    h5: 'H5-1c',
  },
  {
    headMain: 'H1-2',
    headSub: '',
    h2: 'H2-2',
    h3: 'H3-2',
    h4: 'H4-2',
    h5: 'H5-2',
  },
  {
    headMain: 'H1-3',
    headSub: '',
    h2: 'H2-3',
    h3: 'H3-3',
    h4: 'H4-3',
    h5: 'H5-3',
  },
  {
    headMain: 'H1-4',
    headSub: '',
    h2: 'H2-4',
    h3: 'H3-4',
    h4: 'H4-4',
    h5: 'H5-4',
  },
];

export function Aggrid() {
  return (
    <div
      className="ag-theme-quartz aggrid-custom-header"
      style={{ width: '100%', height: 360 }}
    >
      <AgGridReact<GridRow>
        rowData={rowData}
        columnDefs={columnDefs}
        enableCellSpan
        defaultColDef={defaultColDef}
      />
    </div>
  );
}
