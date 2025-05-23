export default function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-6">
            <h1 className="text-6xl font-extrabold mb-4">404</h1>
            <h2 className="text-2xl mb-6">Page Not Found</h2>
            <p className="mb-8 max-w-md text-center">
                Sorry, the page you requested does not exist.
            </p>
            <a
                href="/"
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Go back home
            </a>
        </main>
    )
}
