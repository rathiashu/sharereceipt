import React from 'react'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy } from 'react-table'
// A great library for fuzzy filtering/sorting items
import matchSorter from 'match-sorter';
import sortList from '../utils';
import styles from '../styles/table.module.scss';


// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span>
      Search:{' '}
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  )
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()].sort((varA, varB) => {
      if (varA == null || varB == null) {
        // property doesn't exist on either object
        return 0;
      }
      varA = (typeof varA === 'string')
        ? varA.toUpperCase() : varA;
      varB = (typeof varB === 'string')
        ? varB.toUpperCase() : varB;
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return comparison;
  });
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

// Our table component
function Table({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
  )

  // // We don't want to render all of the rows for this example, so cap
  // // it for this use case
  // const firstPageRows = rows.slice(0, 10)

  return (
    <>
      <table className='details-table' {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={`header-${index}`} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => {
                return (
                // <th {...column.getHeaderProps()}>
                //   {column.render('Header')}
                //   {/* Render the columns filter UI */}
                // </th>
                <th key={`theader-${index}`} {...column.getHeaderProps(column.hideSort ? {} : column.getSortByToggleProps())} style={{width:`${column.width}%`}}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                  <div>{column.showfilter ? column.render('Filter') : null}</div>
                </th>
              )
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={`tr-${i}`}  className="dtable-row" {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return <td key={`col-${index}`} {...cell.getCellProps() } style={{width:`${cell.column.width}%`}}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <br />
    </>
  )
}

// // Define a custom filter filter function!
// function filterGreaterThan(rows, id, filterValue) {
//   return rows.filter(row => {
//     const rowValue = row.values[id]
//     return rowValue >= filterValue
//   })
// }

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
// filterGreaterThan.autoRemove = val => typeof val !== 'number'


export const RTable = (props) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Order Id',
        accessor: 'order_id',
        width: '6',
        Cell: ({ row }) => `R${row.original.order_id}`,
        // showfilter: true
      },
      {
        Header: 'Weaver Name',
        accessor: 'weaverName',
        showfilter: true,
        Filter: SelectColumnFilter,
        hideSort: true,
        width: '20'
      },
      {
        Header: 'Party Name',
        accessor: 'partyName',
        showfilter: true,
        Filter: SelectColumnFilter,
        hideSort: true,
        width: '20'
      },
      {
        Header: 'Order Date',
        accessor: 'orderDate',
        width: '9',
        sortType: (a, b) => {
          var a1 = new Date(a.original.createdAt).getTime();
          var b1 = new Date(b.original.createdAt).getTime();
          if(b1<a1)
            return 1;
          else if(b1>a1)
            return -1;
          else
            return 0;
        }
      },
      {
        Header: 'Quality',
        accessor: 'quality',
        width: '9'

      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
        width: '9'

      },
      {
        Header: 'Rate',
        accessor: 'rate',
        width: '9'

      },
      
      {
        Header: 'Weaver Price',
        accessor: 'weaverPrice',
        width: '9'

      },
      {
        Header: 'Payment',
        accessor: 'payment',
        width: '9'

      },
    ],
    []
  )

 
  const tableData = React.useMemo(() => props.data, [props.data])

  return (
    <Table columns={columns} data={tableData} />
  )
}

