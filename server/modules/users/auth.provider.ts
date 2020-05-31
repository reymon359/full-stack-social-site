import { Injectable, Inject, ProviderScope } from '@graphql-modules/di';
import { ModuleSessionInfo } from '@graphql-modules/core';
import { Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secret, expiration } from '../../env';
import { validateLength, validatePassword } from '../../validators';
import { Users } from './users.provider';
import { User } from '../../db';

@Injectable({
  scope: ProviderScope.Session,
})
export class Auth {
  @Inject() private users: Users;
  @Inject() private module: ModuleSessionInfo;
  private _currentUser: User;

  private get req() {
    return this.module.session.req || this.module.session.request;
  }

  private get res(): Response {
    return this.module.session.res;
  }

  async signIn({ email, password }: { email: string; password: string }) {
    const user = await this.users.findByEmail(email);

    if (!user) {
      throw new Error('❌ There is no user with that email');
    }

    const passwordsMatch = bcrypt.compareSync(password, user.password);

    if (!passwordsMatch) {
      throw new Error('❌ The password is incorrect');
    }

    const authToken = jwt.sign(user.username, secret);

    this.res.cookie('authToken', authToken, { maxAge: expiration });

    return user;
  }

  async signUp({
    name,
    username,
    email,
    password,
    passwordConfirm,
  }: {
    name: string;
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }) {
    validateLength('Name', name, 3, 50);
    validateLength('Username', username, 3, 18);
    validateLength('Email', email, 3, 100);
    validatePassword('Password', password);

    if (password !== passwordConfirm) {
      throw Error("❌ Password and Confirm Password don't match");
    }

    const existingUserWithUsername = await this.users.findByUsername(username);

    if (existingUserWithUsername) {
      throw Error('❌ That username already exists');
    }

    const existingUserWithEmail = await this.users.findByEmail(email);

    if (existingUserWithEmail) {
      throw Error('❌ That email already exists');
    }

    return this.users.newUser({
      name,
      username,
      email,
      password,
    });
  }

  async currentUser(): Promise<User | null> {
    if (this._currentUser) {
      return this._currentUser;
    }

    if (this.req.cookies.authToken) {
      const username = jwt.verify(this.req.cookies.authToken, secret) as string;

      if (username) {
        this._currentUser = await this.users.findByUsername(username);
        return this._currentUser;
      }
    }

    return null;
  }
}
