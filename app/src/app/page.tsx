"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import { PostTypes } from './types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

const fetchData = async (): Promise<PostTypes[]> => {
  const _axios = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 5000,
  });
  const res = await _axios.get('/posts');
  if (_isEmpty(_get(res, 'data'))) {
    return [];
  }
  return res.data;
}

const DataTable = (props: { rows: PostTypes[] }) => {
  const { rows } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Content</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.content}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function Home() {
  const [posts, setPosts] = useState<PostTypes[]>([]);

  useEffect(() => {
    fetchData().then((data) => {
      setPosts(data);
    });
    return () => {
      // cleanup
    }
  }, []);
  return (
    <div>
      <h1>Post</h1>
      <p>Get started by editing <code>pages/index.js</code>.</p>
      <DataTable rows={posts} />
    </div>
  );
}
