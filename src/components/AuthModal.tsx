
type AuthModalProps = {
    open: boolean;
    onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
    if (!open) return null;
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Sign In</h2>
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition mb-4">Sign in with Google</button>
                <button className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition">Sign in with Email</button>
            </div>
        </div>
    )
}       