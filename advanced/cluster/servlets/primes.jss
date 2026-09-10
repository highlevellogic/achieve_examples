// advanced/cluster/servlets/primes.jss

exports.servlet = function(session) {
  const limit = 1000000;
  let count = 0;

  // Deliberately CPU-intensive work. In a single Node process these requests
  // must take turns; cluster workers can perform calculations in parallel.
  for (let n = 2; n <= limit; n++)
    if (isPrime(n)) count++;

  return String(count);
};

function isPrime(n) {
  if (n < 2) return false;

  for (let divisor = 2; divisor * divisor <= n; divisor++)
    if (n % divisor === 0) return false;

  return true;
}
