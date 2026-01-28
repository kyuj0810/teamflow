'use client';

import { useEffect, useState } from 'react';
import { getMyProfile } from '../lib/auth';

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getMyProfile()
      .then(setUser)
      .catch((err) => {
        console.error('유저 조회 실패', err);
      });
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
