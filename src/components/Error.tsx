import { ReactNode } from "react";

export default function Error({ children }: { children: ReactNode }) {
    return (
        <p className="text-center my-4 bg-red-600 text-white text-sm font-bold p-3 uppercase">
            {children}
        </p>
    );
}
