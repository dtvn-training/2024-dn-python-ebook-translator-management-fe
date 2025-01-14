function ContainTask({ children, title, quantity, className, ...props }) {
    return (
        <div {...props} className={`p-4 rounded-lg border-gray-400 border border-dashed space-y-4 ${className}`}>
            <div className="bg-task px-4 py-3 flex justify-between rounded-lg">
                <h2 className="font-bold">{title}</h2>
                <p className="rounded-full bg-slate-200 w-[25px] h-[25px] text-center leading-[25px] font-bold opacity-70">
                    {quantity}
                </p>
            </div>
            <div className="overflow-y-auto h-[500px] scrollable space-y-4">{children}</div>
        </div>
    );
}

export default ContainTask;
