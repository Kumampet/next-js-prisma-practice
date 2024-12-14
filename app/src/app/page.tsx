import React from 'react';

const fetchData = async () => {
  const res = await fetch('/api/posts');
  const data = await res.json();

  return data;
}

export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>Get started by editing <code>pages/index.js</code>.</p>
    </div>
  );
}
