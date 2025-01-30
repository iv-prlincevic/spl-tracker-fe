import { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import axios from "axios";



export default function Wallets() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getWallets = async () => {
          try {
            const response = await axios.get("http://16.170.155.236:3000/wallets"); // No need to include the base URL
            setData(response.data);
          } catch (error) {
            console.error("Error fetching wallets:", error);
          }
        };
      
        getWallets();
      }, []);
      
      
      
  const columns = useMemo(
    () => [
      {
        accessorKey: 'owner',
        header: 'Owner',
        muiTableHeadCellProps: { sx: { color: 'green' } },
        Cell: ({ cell }) => {
            const owner = cell.getValue();
            return (
              <a
                href={`/balance/${owner}`}
                target="_blank"
                style={{ color: "blue", textDecoration: "underline" }} rel="noreferrer"
              >
                {owner}
              </a>
            );
        
      },
    },
    
      {
        accessorKey: 'address', 
        header: 'Address',
        muiTableHeadCellProps: { sx: { color: 'green' } }, 
        Cell: ({ cell }) => <span>{cell.getValue()}</span>, 
      },
      {
        accessorKey: 'amount',
        header: 'Ammount',
        muiTableHeadCellProps: { sx: { color: 'green' } },
        Cell: ({ cell }) => (
            <span>{parseFloat(cell.getValue()).toFixed(3)}</span>
          )      },
      {
        accessorKey: 'eligibilityPercentage', 
        header: 'Eligibility Percentage',
        muiTableHeadCellProps: { sx: { color: 'green' } }, 
        Cell: ({ cell }) => <span>{cell.getValue()}%</span>,
      },
      {
        accessorKey: 'eligible',
        header: 'Eligible',
        muiTableHeadCellProps: { sx: { color: 'green' } }, 
        Cell: ({ cell }) => <span>{cell.getValue() ? "Yes" : "No"}</span>,
      },
    ],
    [],
  );

  //optionally, you can manage any/all of the table state yourself
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
    <h1>Wallets</h1>
    <MaterialReactTable table={table} />
    </>
  );
}