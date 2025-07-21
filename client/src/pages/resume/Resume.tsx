export default function Resume() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">resume</h1>
            <a
                href="/api/files/resume.pdf"
                download
                className="mt-4 inline-block text-blue-400 underline"
            >
                download as .pdf
            </a>
        </div>
    )
}
