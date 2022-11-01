export function getHost() {
  const dev = process.env.NODE_ENV !== 'production';

  return dev ? 'http://localhost:3000' : 'domain_here';
}
