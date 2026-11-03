"use client"

export default function InteractiveCard ({children}: {children: React.ReactNode}) {

    function onCardSelected() {
        alert("Card is Clicked");
    }

    return (
        <div className="h-[300px] w-full rounded-lg shadow-lg bg-white overflow-hidden"
         onClick={() => onCardSelected()}
        >
            {children}
        </div>
    );
}