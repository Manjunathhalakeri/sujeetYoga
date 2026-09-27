/**
 * Prints the URL to open on a phone, before `next start` takes over the
 * terminal.
 *
 * Why this exists: `next start -H 0.0.0.0` reports "Network:
 * http://0.0.0.0:3000", which is the bind address, not an address any device
 * can type in. This resolves the machine's actual addresses instead.
 *
 * No dependencies — `os.networkInterfaces()` is enough.
 */
import os from 'node:os';

const PORT = process.env.PORT || '3000';

/** Virtual adapters (WSL, Hyper-V, Docker, VirtualBox) answer on their own
 *  subnets and are NOT reachable from a phone. They are listed last so the
 *  real Wi-Fi address is the one the eye lands on first. */
const LIKELY_REAL = /^(192\.168\.|10\.)/;

const addresses = Object.entries(os.networkInterfaces())
  .flatMap(([name, infos]) =>
    (infos ?? [])
      .filter((i) => i.family === 'IPv4' && !i.internal)
      .map((i) => ({ name, address: i.address })),
  )
  .sort(
    (a, b) => Number(LIKELY_REAL.test(b.address)) - Number(LIKELY_REAL.test(a.address)),
  );

const line = '─'.repeat(52);
console.log(`\n${line}`);

if (addresses.length === 0) {
  console.log('  No external network address found.');
  console.log('  Are you connected to Wi-Fi?');
} else {
  console.log('  Open this on your phone (same Wi-Fi network):\n');
  for (const [i, { name, address }] of addresses.entries()) {
    const url = `http://${address}:${PORT}`;
    const hint = LIKELY_REAL.test(address)
      ? ''
      : '   (virtual adapter — probably not this one)';
    console.log(`  ${i === 0 ? '→' : ' '} ${url.padEnd(26)}${name}${hint}`);
  }
  console.log('\n  This is a PRODUCTION build: real bundle sizes, no dev overlay,');
  console.log('  images optimised. That is what you want for a device pass.');
  console.log('\n  If the phone cannot reach it, Windows Firewall is blocking');
  console.log('  Node — allow it on private networks when prompted.');
}

console.log(`${line}\n`);
