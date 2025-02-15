import { Table } from 'lucide-react';
import React from 'react'
import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const TableDemo = () => {
  return (
    <>
        <Table>
    <TableCaption>A list of your recent messages</TableCaption>
    <TableHeader>
        <TableRow>
        <TableHead className="w-[100px]">Invoice</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead className="text-right">Amount</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        <TableRow>
        <TableCell className="font-medium">INV001</TableCell>
        <TableCell>Paid</TableCell>
        <TableCell>Credit Card</TableCell>
        <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
    </TableBody>
    </Table>
    </>
  )
}

export default TableDemo;