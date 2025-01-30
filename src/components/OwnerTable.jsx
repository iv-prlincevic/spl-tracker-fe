import { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import axios from "axios";
import { useParams } from 'react-router';


export default function OwnerTable() {
    const [data, setData] = useState([]);
    const owner = useParams().owner;

    useEffect(() => {
        const getWallets = async () => {
          try {
            const response = await axios.get(`http://16.170.155.236:3000/balance/${owner}`); // No need to include the base URL
            setData(response.data);
          } catch (error) {
            console.error("Error fetching wallets:", error);
          }
        };
      
        getWallets();
      }, [owner]);
      
      
      
  const columns = useMemo(
    () => [    
      {
        accessorKey: 'address', 
        header: 'Address',
        muiTableHeadCellProps: { sx: { color: 'green' } }, 
        Cell: ({ cell }) => <span>{cell.getValue()}</span>, 
      },
      {
        accessorKey: 'balance',
        header: 'Balance',
        muiTableHeadCellProps: { sx: { color: 'green' } }, 
        Cell: ({ cell }) => (
            <span>{parseFloat(cell.getValue()).toFixed(3)}</span>
          )      },
          {
            accessorKey: 'eligible',
            header: 'Eligible',
            muiTableHeadCellProps: { sx: { color: 'green' } }, 
            Cell: ({ cell }) => <span>{cell.getValue() ? "Yes" : "No"}</span>, 
          },
      {
        accessorKey: 'eligibilityPercentage', 
        header: 'Eligibility Percentage',
        muiTableHeadCellProps: { sx: { color: 'green' } },
        Cell: ({ cell }) => <span>{cell.getValue()}%</span>,
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        muiTableHeadCellProps: { sx: { color: "green" } },
        Cell: ({ cell }) => (
          <span>{new Date(cell.getValue()).toLocaleString()}</span>
        ),
      },
    ],
    [],
  );

  const [rowSelection, setRowSelection] = useState({});

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnOrdering: true, 
    // enableRowSelection: true,
    enablePagination: true, 
    onRowSelectionChange: setRowSelection, 
    state: { rowSelection },
  });


  return (
    <>
    <h1>Owner : <b>{owner}</b></h1>
    <MaterialReactTable table={table} />
    </>
  );
}