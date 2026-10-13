import { existsSync, writeFileSync } from 'node:fs'
import { randomBytes } from 'node:crypto'
// Local development only. Never overwrite existing settings or credentials.
if (!process.env.BETTER_AUTH_SECRET && !existsSync('.env.local')) {
 if (process.env.BETTER_AUTH_URL && new URL(process.env.BETTER_AUTH_URL).hostname !== 'localhost') throw new Error('Configure BETTER_AUTH_SECRET securely for the deployment origin before setup')
 writeFileSync('.env.local',`BETTER_AUTH_SECRET=${randomBytes(48).toString('base64url')}\nBETTER_AUTH_URL=http://localhost:3000\n`,{mode:0o600,flag:'wx'})
 console.log('Created ignored local development authentication settings.')
} else console.log('Existing authentication settings preserved.')
