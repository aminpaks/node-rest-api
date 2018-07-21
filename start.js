require('dotenv').config();
require('@babel/register')({
  // Turns cache system on for production
  cache: process.env.NODE_ENV === 'production',
  // Defines extensions for transpilation
  extensions: ['.es6', '.es', '.jsx', '.js', '.mjs', '.tsx', '.ts'],
});
require('./src/app');
