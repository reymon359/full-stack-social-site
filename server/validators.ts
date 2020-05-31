export const validatePassword = (ctx: string, str: string) => {
  if (typeof str !== 'string') {
    throw TypeError(`❌ ${ctx} must be a string`);
  }

  validateLength(ctx, str, 8, 30);

  if (!/[a-zA-Z]+/.test(str)) {
    throw TypeError(`❌ ${ctx} must contain english letters`);
  }

  if (!/\d+/.test(str)) {
    throw TypeError(`❌ ${ctx} must contain numbers`);
  }

  if (!/[^\da-zA-Z]+/.test(str)) {
    throw TypeError(`❌ ${ctx} must contain special charachters`);
  }
};

export const validateEmail = (ctx: string, str: string) => {
  if (typeof str !== 'string') {
    throw TypeError(`❌ ${ctx} must be a string`);
  }

  validateLength(ctx, str, 3, 70);

  if (!/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi.test(str)) {
    throw TypeError(`❌ ${ctx} must be a valid email`);
  }
};

export const validateLength = (ctx: string, str: string, ...args: number[]) => {
  let min, max;

  if (args.length === 1) {
    min = 0;
    max = args[0];
  } else {
    min = args[0];
    max = args[1];
  }

  if (typeof str !== 'string') {
    throw TypeError(`❌ ${ctx} must be a string`);
  }

  if (str.length < min) {
    throw TypeError(`❌ ${ctx} must be at least ${min} chars long`);
  }

  if (str.length > max) {
    throw TypeError(`❌ ${ctx} must contain ${max} chars at most`);
  }
};
