'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Chapa Frontend Developer Test Task</h1>
      <p className="mb-6 text-lg">
        This project is a role-based dashboard Single Page Application (SPA) built with React (Next.js) for a fictional Payment Service Provider platform. It demonstrates how to render different UIs and features based on the logged-in user's role, using only mock data and simulated API calls (no real backend).
      </p>
      <h2 className="text-2xl font-semibold mb-2">Features & Walkthrough</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>
          <b>User Dashboard</b>:
          <ul className="list-disc pl-6">
            <li>Displays a mock wallet balance.</li>
            <li>Shows a list of recent transactions (hardcoded data).</li>
            <li>Includes a form to initiate a transaction (simulated with UI feedback).</li>
          </ul>
        </li>
        <li>
          <b>Admin Dashboard</b>:
          <ul className="list-disc pl-6">
            <li>Lists all users (mocked data).</li>
            <li>Allows activating/deactivating users (toggles state locally).</li>
            <li>Shows a summary of user payments (totals per user).</li>
          </ul>
        </li>
        <li>
          <b>Super Admin Dashboard</b>:
          <ul className="list-disc pl-6">
            <li>All Admin features, plus:</li>
            <li>Form to add or remove Admins (mocked, local state).</li>
            <li>Displays system-wide stats: total payments, active users, etc.</li>
          </ul>
        </li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Implementation Details</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Uses <b>mock data</b> for users, transactions, and stats (see <code>src/data/</code>).</li>
        <li>Role-based access is enforced on each dashboard page using a custom <code>useRequireRole</code> hook for authentication and authorization.</li>
        <li>All state changes (e.g., toggling user status, adding admins, sending transactions) are simulated locally with React state and <code>setTimeout</code> for async feedback.</li>
        <li>No real backend or API calls are used.</li>
      </ul>
      <h2 className="text-xl font-semibold mb-2">How to Explore</h2>
      <p className="mb-6">
        Log in as a <b>User</b>, <b>Admin</b>, or <b>Super Admin</b> to see the different dashboards and features. Each role unlocks different functionality as described above.
      </p>
      <p className="text-zinc-500">Submited by Dawit Mengistu</p>
      <div className="mt-2 flex gap-2 text-base">
        <a href="https://t.me/DawitMengistu" target="_blank" rel="noopener noreferrer" className="hover:underline">Telegram</a>
        <a href="https://github.com/DawitMengistu" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
        <a href="https://dawitmengistu.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Portfolio</a>
        <a href="tel:+251903035284" className="hover:underline">+251903035284</a>
        <a href="atdawitmengistu@gmail.com" className="hover:underline">atdawitmengistu@gmail.com</a>
      </div>
    </main>
  )
}
