const firebaseAdmin = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY ?? '{}'
)

const withFortress = require('next-fortress')({
  forts: [
    {
      source: '/vercel/:path*',
      mode: 'redirect',
      destination: '/',
      inspectBy: 'firebase'
    },
    {
      source: '/setting',
      mode: 'redirect',
      destination: '/',
      inspectBy: 'firebase'
    }
  ],
  host: process.env.VERCEL_URL ?? 'http://localhost:3000',
  firebase: {
    clientEmail: firebaseAdmin.client_email,
    projectId: firebaseAdmin.project_id,
    privateKey: firebaseAdmin.private_key
  }
})

module.exports = withFortress({
  reactStrictMode: true
})
