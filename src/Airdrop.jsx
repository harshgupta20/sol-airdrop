import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

const Airdrop = () => {
    const wallet = useWallet();
    const { connection } = useConnection();

    const [accountAddress, setAccountAddress] = useState("");
    const [airDropAmount, setAirdropAmount] = useState(1);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (wallet.publicKey) {
            setAccountAddress(wallet.publicKey.toString());
        }
    }, [wallet.publicKey]);

    const handleAirdrop = async () => {
        if (!wallet.publicKey || !accountAddress || airDropAmount <= 0) {
            setStatus("❌ Please connect wallet and enter valid inputs.");
            return;
        }

        try {
            setLoading(true);
            setStatus("🚀 Requesting airdrop...");
            const airdropSignature = await connection.requestAirdrop(
                wallet.publicKey,
                airDropAmount * 1e9 // Convert SOL to lamports
            );

            if (airdropSignature?.error) {
                throw new Error(airdropSignature.error.message);
            }
            setStatus("✅ Airdrop successful!");
        } catch (error) {
            console.error("Airdrop failed:", error);
            setStatus("❌ Airdrop failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg space-y-4 border dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">💸 Solana Airdrop</h2>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Account Address
                </label>
                <input
                    type="text"
                    className="w-full px-4 py-2 rounded-md border dark:border-gray-600 dark:bg-gray-800 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={accountAddress}
                    onChange={(e) => setAccountAddress(e.target.value)}
                    disabled
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Amount (SOL)
                </label>
                <input
                    type="number"
                    className="w-full px-4 py-2 rounded-md border dark:border-gray-600 dark:bg-gray-800 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={airDropAmount}
                    onChange={(e) => setAirdropAmount(Number(e.target.value))}
                    min="0"
                />
            </div>

            <button
                onClick={handleAirdrop}
                disabled={!wallet.publicKey || loading}
                className={`w-full py-2 rounded-md text-white font-medium ${loading || !wallet.publicKey
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
            >
                {loading ? "Airdropping..." : "Airdrop SOL"}
            </button>

            {status && (
                <p className="text-sm text-center text-gray-700 dark:text-gray-300 mt-2">
                    {status}
                </p>
            )}
        </div>
    );
};

export default Airdrop;
