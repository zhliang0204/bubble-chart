import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

const fields = [
  { name: 'id' },
  { name: 'category' },
  { name: 'location' },
  { name: 'fundingAmount' },
  { name: 'announcedDate' },
];

const CustomTableRow = ({ node }) => {
  return (
    <TableRow>
      {fields.map((field, index) => (
        <TableCell align="right" key={index}>
          {node[field['name']]}
        </TableCell>
      ))}
    </TableRow>
  );
};

const CustomTable = ({ nodes }) => {
  return nodes ? (
    <Table>
      <TableHead>
        <TableRow style={{ backgroundColor: 'black' }}>
          {fields.map((field, index) => (
            <TableCell align="right" key={index} style={{ color: 'white' }}>
              {field.name}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {nodes.map((node, index) => (
          <CustomTableRow node={node} key={index} />
        ))}
      </TableBody>
    </Table>
  ) : null;
};

export default CustomTable;
