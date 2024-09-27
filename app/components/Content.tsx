
export default function Content({ children }: { children: React.ReactNode }) {
    return (
      <>
        <main className="bg-white flex-grow">{children}</main>
      </>
)}