"use client";
import { User } from '@prisma/client';
import React, { createContext, useEffect, useState } from 'react'

interface UserComponentProp {
  user: User | null,
  children: React.ReactNode
}

type UserProviderProp = User | null;

export const UserContext = createContext<UserProviderProp>(null)

function UserProvider({user, children}: UserComponentProp) {
  const [currentUser, setCurrentUser] = useState<UserProviderProp>(null);

  useEffect(() => {
    setCurrentUser(user);
  }, [user])

  return (
    <UserContext.Provider value={currentUser}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider