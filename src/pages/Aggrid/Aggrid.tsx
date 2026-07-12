import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Input, Select } from 'antd';
import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
  type GridApi,
  type GridReadyEvent,
  type ICellRendererParams,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
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
  'aggrid-head-sub-hidden': ({ data }: { data?: GridRow }) =>
    isFullHeadRow(data),
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
  {
    id: 'row-7',
    headRowMerge: 'block-2',
    headMain: 'H1-5',
    headSub: 'H1-5a',
    h2: 'H2-5',
    h3: 'H3-5',
    h4: 'H4-5',
    h5: 'H5-5',
  },
  {
    id: 'row-8',
    headRowMerge: 'block-2',
    headMain: '',
    headSub: 'H1-5b',
    h2: 'H2-5',
    h3: 'H3-5',
    h4: 'H4-5',
    h5: 'H5-5',
  },
  {
    id: 'row-9',
    headRowMerge: 'block-2',
    headMain: '',
    headSub: 'H1-5c',
    h2: 'H2-5',
    h3: 'H3-5',
    h4: 'H4-5',
    h5: 'H5-5',
  },
];

/*
  화면 맨 아래에 스크롤과 무관하게 고정되는 합계 로우.
  ag-Grid의 pinnedBottomRowData 기능을 사용하며, headRowMerge/headSub가 없어
  isFullHeadRow가 true가 되어 H1-2~4와 동일한 방식(aggrid-head-wide)으로
  H1 영역 전체를 차지하는 헤더로 렌더링된다.
*/
const pinnedBottomRowData: GridRow[] = [
  {
    id: 'total',
    headMain: 'Total',
    headSub: '',
    h2: '',
    h3: '',
    h4: '',
    h5: '',
  },
];

type AggridProps = {
  headMainWidth?: number;
  headBgColor?: string;
  height?: number;
};

export function Aggrid({
  headMainWidth = 90,
  headBgColor = '#f0f0f0',
  height = 260,
}: AggridProps) {
  const [rows, setRows] = useState<GridRow[]>(initialRowData);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridApiRef = useRef<GridApi<GridRow> | null>(null);

  /*
    headRowMerge로 묶인(2개 이상) 연속 로우들을 블록 단위로 추출.
    ag-Grid의 spanRows + autoHeight 조합은 스팬된 헤더 셀의 높이를
    하위 로우들의 auto height 재계산에 맞춰 갱신하지 않는 알려진 버그가 있어
    (SpannedRowCtrl.onRowHeightChanged가 no-op으로 오버라이드됨),
    실제 하위 로우 높이 합을 직접 구해서 강제로 적용해야 한다.
  */
  const spanGroups = useMemo(() => {
    const groups: string[][] = [];
    let current: string[] = [];
    let currentKey: string | undefined;
    rows.forEach((row) => {
      if (row.headRowMerge && row.headRowMerge === currentKey) {
        current.push(row.id);
      } else {
        if (current.length > 1) groups.push(current);
        current = row.headRowMerge ? [row.id] : [];
        currentKey = row.headRowMerge;
      }
    });
    if (current.length > 1) groups.push(current);
    return groups;
  }, [rows]);

  const syncSpanCellHeights = useCallback(() => {
    const api = gridApiRef.current;
    const container = containerRef.current;
    if (!api || !container || spanGroups.length === 0) return;

    const spannedHeaderCells = container.querySelectorAll<HTMLElement>(
      ".ag-spanned-cell[col-id='headMain']",
    );

    spanGroups.forEach((ids, index) => {
      const cellEl = spannedHeaderCells[index];
      if (!cellEl) return;

      const heights = ids.map((id) => api.getRowNode(id)?.rowHeight);
      if (heights.some((h) => h == null)) return;

      const totalHeight = heights.reduce<number>((sum, h) => sum + (h ?? 0), 0);
      cellEl.style.setProperty('height', `${totalHeight}px`, 'important');
    });
  }, [spanGroups]);

  const scheduleSyncSpanCellHeights = useCallback(() => {
    requestAnimationFrame(() => requestAnimationFrame(syncSpanCellHeights));
  }, [syncSpanCellHeights]);

  const onGridReady = useCallback(
    (event: GridReadyEvent<GridRow>) => {
      gridApiRef.current = event.api;
      scheduleSyncSpanCellHeights();
    },
    [scheduleSyncSpanCellHeights],
  );

  useEffect(() => {
    scheduleSyncSpanCellHeights();
  }, [rows, scheduleSyncSpanCellHeights]);

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
    (field: 'h2' | 'h4') => (params: ICellRendererParams<GridRow, string>) => {
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
    (field: 'h3' | 'h5') => (params: ICellRendererParams<GridRow, string>) => {
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
          getPopupContainer={(triggerNode) =>
            triggerNode.parentElement ?? document.body
          }
        ></Select>
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
        width: headMainWidth,
        cellClassRules: headSubCellClassRules,
        pinned: 'left',
      },
      {
        field: 'h2',
        headerName: 'H2',
        flex: 1,
        cellRenderer: renderTextField('h2'),
        minWidth: 160,
      },
      {
        field: 'h3',
        headerName: 'H3',
        flex: 1,
        cellRenderer: renderSelectField('h3'),
        minWidth: 160,
      },
      {
        field: 'h4',
        headerName: 'H4',
        flex: 1,
        cellRenderer: renderTextField('h4'),
        minWidth: 160,
      },
      {
        field: 'h5',
        headerName: 'H5',
        flex: 1,
        cellRenderer: renderSelectField('h5'),
        minWidth: 160,
      },
    ],
    [headMainWidth, renderSelectField, renderTextField],
  );

  const containerStyle: CSSProperties & Record<string, string | number> = {
    height,
    '--head-main-width': `${headMainWidth}px`,
    '--head-bg': headBgColor,
  };

  return (
    <div
      ref={containerRef}
      className="aggrid-custom-header"
      style={containerStyle}
    >
      <AgGridReact<GridRow>
        rowData={rows}
        pinnedBottomRowData={pinnedBottomRowData}
        columnDefs={columnDefs}
        enableCellSpan
        defaultColDef={defaultColDef}
        getRowId={({ data }) => data.id}
        onGridReady={onGridReady}
        onModelUpdated={scheduleSyncSpanCellHeights}
        onFirstDataRendered={scheduleSyncSpanCellHeights}
        onGridSizeChanged={scheduleSyncSpanCellHeights}
      />
    </div>
  );
}
