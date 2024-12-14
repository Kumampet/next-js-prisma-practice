"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import { PostTypes, FormSubmitValueTypes } from './types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Box
} from '@mui/material';

const _axios = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

const fetchData = async (): Promise<PostTypes[]> => {
  const res = await _axios.get('/posts');
  if (_isEmpty(_get(res, 'data'))) {
    return [];
  }
  return res.data;
}

const submitData = async (data: FormSubmitValueTypes, cb: () => Promise<void>) => {
  const res = await _axios.post('/posts', { data });
  if (res.status === 200) {
    await cb();
    alert('Success');
  }
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
  const [contentValue, setContentValue] = useState<string>('');
  const [titleValue, setTitleValue] = useState<string>('');

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setContentValue(newValue);
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setTitleValue(newValue);
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const data = {
      title: titleValue,
      content: contentValue,
    }
    await submitData(data, async () => {
      await getPostsData();
    })
    setTitleValue('');
    setContentValue('');
  }

  const getPostsData = async () => {
    await fetchData().then((data) => {
      setPosts(data);
    });
  }

  useEffect(() => {
    getPostsData()
    return () => {
      // cleanup
    }
  }, []);

  return (
    <div>
      <h1>Post</h1>
      <p>Get started by editing <code>pages/index.js</code>.</p>
      <Box component='form' sx={{ marginTop: '1rem' }}>
        <div>
          <TextField
            id="outlined-input-title"
            label="Title"
            type="text"
            value={titleValue}
            onChange={handleTitleChange}
          />
          <TextField
            id="outlined-input-content"
            label="Content"
            type="text"
            value={contentValue}
            onChange={handleContentChange}
          />
        <Button variant="contained" color="success" onClick={handleSubmit}>Submit</Button>
        </div>
      </Box>
      <DataTable rows={posts} />
    </div>
  );
}
