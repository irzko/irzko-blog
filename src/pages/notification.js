export default function Notification() {
  return (
    <div className="p-2 flex flex-col absolute w-64 right-2 min-h-[300px] top-7 bg-white border rounded-xl shadow-sm">
      <h2 className="text-2xl font-semibold">Thông báo</h2>
      <div className="flex justify-center">Bạn chưa có thông báo nào</div>
    </div>
  );
}
