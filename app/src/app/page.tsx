"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import { PostTypes } from '../types';

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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
