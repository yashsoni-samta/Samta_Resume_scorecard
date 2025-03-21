import { useEffect, useMemo, useState } from 'react';
import AuthLayout from '../../../../layout/AuthLayout';
import { Button, Group, Stack, Title } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MantineReactTable,
  MRT_ColumnDef,
  MRT_Row,
  useMantineReactTable,
} from 'mantine-react-table';
import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here

type ResumeObjs = {
  name?: string;
  content?: string;
  file_path?: string;
  key_feature?: string;
  score?: string;
};

const Details = () => {
  const location = useLocation();
  const { state } = location;
  const [scoreList, setscoreList] = useState<ResumeObjs[]>([]);

  const navigate = useNavigate();

  const csvConfig = mkConfig({
    filename: 'Resume Scores',
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  });

  const downLoadResume = async (resumePath: string = '') => {
    try {
      const url = resumePath; // Replace with your file URL
      const link = document.createElement('a');
      link.href = url;
      link.download = 'file.pdf'; // Optional: Specify a file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log('Error Getting Resume File', error);
      return false;
      // alert('Failed to submit the form. Please try again.');
    }
  };

  useEffect(() => {
    console.log('state', state?.data);

    const scLis = Object.entries(state?.data)
      .map((v) => {
        console.log('\n V', v);
        const trow: ResumeObjs = {} as ResumeObjs;
        const name = v[0];
        const oData: any = v[1];
        trow.name = name;
        trow.content = oData.content;
        trow.file_path = oData?.file_path;
        trow.key_feature = oData?.key_feature;
        trow.score = oData?.score;

        // console.log("trow", trow);

        return trow;
      })
      .sort((a: any, b: any) => b.score - a.score);

    // console.log("scLis", scLis);
    setscoreList(scLis);
  }, []);

  const handleExportRows = (rows: MRT_Row<ResumeObjs>[]) => {
    const rowData = rows
      .map((row) => row.original)
      .map((row) => {
        const tmpObj = {
          'Resume Name': row.name,
          Score: row.score,
        };
        return tmpObj;
      });

    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = (rows: MRT_Row<ResumeObjs>[]) => {
    const rowData = rows
      .map((row) => row.original)
      .map((row) => {
        console.log('row', row);
        const tmpObj = {
          'Resume Name': row.name,
          Score: row.score,
        };
        return tmpObj;
      });
    // console.log("rowData", rowData);

    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const columns = useMemo<MRT_ColumnDef<ResumeObjs>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Resume Name',
      },
      {
        accessorKey: 'score',
        header: 'Score',
      },
      {
        accessorKey: 'file_path',
        header: '',
        Cell: ({ row }) => {
          if (row.original.file_path) {
            return (
              <Button
                variant='outline'
                onClick={() => {
                  downLoadResume(row.original.file_path);
                }}
              >
                Download Resume
              </Button>
            );
          } else {
            return <></>;
          }
        },
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: scoreList, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: true,
    renderTopToolbarCustomActions: ({ table }) => (
      <Group>
        <Button
          color='blue'
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={() => {
            handleExportData(table.getRowModel().rows);
          }}
          variant='filled'
        >
          Export All Data
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          // leftIcon={<IconDownload />}
          variant='filled'
        >
          Export Selected Rows
        </Button>
      </Group>
    ),
  });

  return (
    <AuthLayout>
      <Stack align='center' justify='center' gap='md' p={'xl'}>
        <Title order={2}>Score Table</Title>

        <MantineReactTable table={table} />
        <Button
          onClick={() => {
            navigate('/');
          }}
          color='green'
        >
          Go to Home
        </Button>
      </Stack>
    </AuthLayout>
  );
};

export default Details;
